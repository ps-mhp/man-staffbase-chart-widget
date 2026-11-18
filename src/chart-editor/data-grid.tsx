/*!
 * Copyright 2026, MHP Management und IT-Beratung GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Das Datenraster in der Hauptfläche: eine Zeile je Achse, eine Spalte je
 * Reihe – wie im Screen „Diagramm · Editor“.
 *
 * Warum Achsen in Zeilen: Ein Netzdiagramm hat typischerweise sechs Achsen
 * und zwei Reihen. Als Spalten wüchse das Raster aus dem Bild, als Zeilen
 * wächst es nach unten, wo Platz ist.
 *
 * Jede Zelle ist ein Feld; wer in eine Zeile klickt oder tabbt, wählt damit
 * die Achse, deren Feineinstellungen rechts unter „Achse“ stehen. Ein aus
 * Excel kopierter Block landet ab dem Feld, in dem ⌘ V gedrückt wird
 * (`grid-paste.ts`).
 */

import * as React from "react";
import { TriangleAlert } from "lucide-react";
import { Input } from "@man/config-ui/primitives/input";
import { cn } from "@man/config-ui/primitives/utils";

import { Category, ChartSpec, Series } from "../chart-model";
import { setValue, updateCategory } from "./editor-operations";
import { axisName } from "./editor-rules";
import { NumberInput } from "./fields";
import { LEADING_COLUMNS, pasteCells, splitClipboard } from "./grid-paste";

export interface DataGridProps {
  spec: ChartSpec;
  /** Die gewählte Achse; ihre Zeile ist hinterlegt. */
  selected: number;
  onSelect: (index: number) => void;
  onChange: (spec: ChartSpec) => void;
  /** Achsen mit Fehlern – erst gezeigt, wenn „Übernehmen“ an ihnen scheiterte. */
  invalid: ReadonlySet<number>;
  /** Farben der Palette, für Reihen ohne eigene Farbe. */
  palette: readonly string[];
  /** Zusätzliche Klassen der Tabelle, etwa um sie bündig an den Rand zu legen. */
  className?: string;
}

/** Benennt eine Reihe, auch solange sie noch keinen Namen hat. */
export const seriesName = (series: Series, index: number): string => series.name.trim() || `Reihe ${index + 1}`;

/** Die Farbe, mit der eine Reihe tatsächlich gezeichnet wird. */
export const seriesColor = (series: Series, index: number, palette: readonly string[]): string =>
  series.color ?? palette[index % Math.max(1, palette.length)] ?? "#303c49";

/** Im Kuchen zeigt das Raster nur die eine Reihe, die gezeichnet wird. */
export const shownSeriesOf = (spec: ChartSpec): Series[] => (spec.type === "pie" ? spec.series.slice(0, 1) : spec.series);

const HEAD = "h-10 border border-border bg-secondary px-3 text-left text-xs font-semibold whitespace-nowrap text-secondary-foreground";
const CELL = "h-10 border border-border p-0 align-top";
/** Ein Feld füllt seine Zelle; der Fokus zeigt sich als Rahmen der Zelle. */
const CELL_INPUT =
  "h-10 w-full rounded-none border-0 bg-transparent px-3 text-sm shadow-none focus-visible:ring-0 focus:outline-2 focus:-outline-offset-2 focus:outline-primary";

interface CellProps {
  row: number;
  column: number;
  children: React.ReactNode;
  className?: string;
}

/** Eine Zelle mit ihrer Lage im Raster, damit Einfügen weiß, wo es beginnt. */
function Cell({ row, column, children, className }: CellProps): React.ReactElement {
  return (
    <td data-row={row} data-column={column} className={cn(CELL, className)}>
      {children}
    </td>
  );
}

interface AxisRowProps {
  spec: ChartSpec;
  category: Category;
  index: number;
  selected: boolean;
  invalid: boolean;
  shownSeries: readonly Series[];
  onSelect: (index: number) => void;
  onChange: (spec: ChartSpec) => void;
}

function AxisRow({ spec, category, index, selected, invalid, shownSeries, onSelect, onChange }: AxisRowProps): React.ReactElement {
  const name = axisName(category, index);
  return (
    <tr className={cn(selected && "bg-primary-soft")} onFocus={() => onSelect(index)} data-testid={`axis-row-${index}`}>
      <th scope="row" className="h-10 w-10 border border-border bg-secondary p-0 text-center text-xs font-normal">
        <button
          type="button"
          aria-label={`Achse ${index + 1} wählen`}
          aria-pressed={selected}
          onClick={() => onSelect(index)}
          className={cn(
            "flex h-10 w-10 cursor-pointer items-center justify-center text-muted-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
            selected && "font-semibold text-primary",
          )}
        >
          {index + 1}
        </button>
      </th>
      <Cell row={index} column={0} className={cn(invalid && "bg-destructive/10 outline-2 -outline-offset-2 outline-destructive")}>
        <div className="flex items-start">
          {invalid && (
            <span className="flex h-10 items-center pl-3 text-destructive">
              <TriangleAlert className="size-3.5" aria-hidden />
              <span className="sr-only">Fehlerhaft</span>
            </span>
          )}
          <textarea
            // Wächst mit den Zeilen der Beschriftung; die Eingabetaste bricht um.
            rows={Math.max(1, category.label.split("\n").length)}
            aria-label={`Name der Achse ${index + 1}`}
            aria-invalid={invalid || undefined}
            placeholder="z. B. Ladeleistung"
            value={category.label}
            onChange={(event) => onChange(updateCategory(spec, index, { label: event.target.value }))}
            className="block min-h-10 w-full resize-none bg-transparent px-3 py-2.5 text-sm leading-5 outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
          />
        </div>
      </Cell>
      <Cell row={index} column={1}>
        <Input
          type="text"
          aria-label={`Einheit: ${name}`}
          placeholder="z. B. kW"
          value={category.unit ?? ""}
          onChange={(event) => onChange(updateCategory(spec, index, { unit: event.target.value || undefined }))}
          className={CELL_INPUT}
        />
      </Cell>
      {shownSeries.map((series, seriesIndex) => (
        <Cell key={seriesIndex} row={index} column={LEADING_COLUMNS + seriesIndex}>
          <NumberInput
            aria-label={`${seriesName(series, seriesIndex)}, ${name}`}
            placeholder="Wert"
            value={series.values[index]}
            onCommit={(next) => onChange(setValue(spec, seriesIndex, index, next))}
            className={cn(CELL_INPUT, "text-right tabular-nums")}
          />
        </Cell>
      ))}
    </tr>
  );
}

/** Woher ein Einfügen kommt: die Zelle um das Feld mit dem Fokus. */
function pasteOrigin(target: EventTarget): { row: number; column: number } | null {
  const cell = target instanceof Element ? target.closest<HTMLElement>("td[data-row]") : null;
  if (cell === null) return null;
  return { row: Number(cell.dataset.row), column: Number(cell.dataset.column) };
}

export function DataGrid({ spec, selected, onSelect, onChange, invalid, palette, className }: DataGridProps): React.ReactElement {
  const shownSeries = shownSeriesOf(spec);

  const handlePaste = (event: React.ClipboardEvent): void => {
    const cells = splitClipboard(event.clipboardData.getData("text/plain"));
    const origin = pasteOrigin(event.target);
    if (cells === null || origin === null) return;
    event.preventDefault();
    onChange(pasteCells(spec, cells, { ...origin, maxSeries: spec.type === "pie" ? 1 : Infinity }));
  };

  return (
    <table
      aria-label="Diagrammdaten: Achsen in Zeilen, Reihen in Spalten"
      data-testid="chart-data-grid"
      className={cn("border-collapse bg-background text-sm text-foreground", className)}
    >
      <thead>
        <tr>
          <th scope="col" className={cn(HEAD, "w-10 px-0")}>
            <span className="sr-only">Nr.</span>
          </th>
          <th scope="col" className={cn(HEAD, "min-w-[220px]")}>
            Achse
          </th>
          <th scope="col" className={cn(HEAD, "min-w-[110px]")}>
            Einheit
          </th>
          {shownSeries.map((series, index) => (
            <th key={index} scope="col" className={cn(HEAD, "min-w-[120px]")}>
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="size-3.5 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(16,24,40,0.3)]"
                  style={{ background: seriesColor(series, index, palette) }}
                />
                {seriesName(series, index)}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody onPaste={handlePaste}>
        {spec.categories.map((category, index) => (
          <AxisRow
            key={index}
            spec={spec}
            category={category}
            index={index}
            selected={index === selected}
            invalid={invalid.has(index)}
            shownSeries={shownSeries}
            onSelect={onSelect}
            onChange={onChange}
          />
        ))}
      </tbody>
    </table>
  );
}
