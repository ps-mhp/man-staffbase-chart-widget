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
 * Der Diagramm-Editor im Rahmen von `@man/config-ui`, aufgebaut wie im
 * Screen „Diagramm · Editor“:
 *
 * - **Hauptfläche:** die Leiste mit der gewählten Achse und ihren Aktionen,
 *   darunter das Datenraster – eine Zeile je Achse, eine Spalte je Reihe.
 * - **Rechts:** das Panel „Diagramm“ mit Daten · Gestaltung · Achse ·
 *   Verhalten. Es bleibt in den Geräteansichten stehen, die Hauptfläche
 *   zeigt dort die echte Vorschau.
 * - **Aus Excel einfügen** öffnet eine Leiste über dem Panel; einzelne
 *   Blöcke fügt man direkt ins Raster ein.
 *
 * Kopf, Übernehmen, Rückgängig, Hilfe und Rückfrage kommen vom Rahmen; der
 * Editor hält keinen eigenen Stand der Definition – jede Änderung geht
 * sofort über `onChange` nach oben. Nachgeladen wird er nur im Studio
 * (`chart-editor-injector.ts`): die Bausteine bringen react-aria und
 * Tailwind mit, das gehört nicht ins Seitenbündel.
 */

import * as React from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ConfigWorkspace } from "@man/config-ui/layout/config-workspace";
import { Button } from "@man/config-ui/primitives/button";
import { useConfigShell } from "@man/config-ui/shell/shell-context";
import { useSidePanel } from "@man/config-ui/shell/side-panels";

import { ChartSpec } from "../chart-model";
import { useChartTheme } from "../use-chart-theme";
import { ChartInspector } from "./chart-inspector";
import { ChartPreview } from "./chart-preview";
import { DataBar } from "./data-bar";
import { DataGrid } from "./data-grid";
import { addCategory, addSeries, duplicateCategory, moveCategory, removeCategory } from "./editor-operations";
import { axisIssueIndexes, validateChart } from "./editor-rules";
import { exampleSpec, starterSpec } from "./example-spec";
import { Grid, applyGrid } from "./grid-import";
import { PastePanel } from "./paste-panel";

export { ChartEditorHelp } from "./chart-editor-help";

export interface ChartEditorProps {
  value: ChartSpec;
  onChange: (spec: ChartSpec) => void;
}

const PASTE_PANEL = "chart-paste";
const NO_AXES: ReadonlySet<number> = new Set();

/** Höhe und Download gehören zur Seite, nicht zu den Daten: ein Beispiel behält sie. */
const keepPageSettings = (next: ChartSpec, current: ChartSpec): ChartSpec => ({
  ...next,
  ...(current.height === undefined ? {} : { height: current.height }),
  ...(current.allowExport === undefined ? {} : { allowExport: current.allowExport }),
});

function Key({ children }: { children: React.ReactNode }): React.ReactElement {
  return <kbd className="rounded border bg-background px-1 font-sans text-xs text-foreground">{children}</kbd>;
}

function EmptyState({ onExample, onStarter }: { onExample: () => void; onStarter: () => void }): React.ReactElement {
  return (
    <div className="flex max-w-[560px] flex-col gap-3 rounded-lg border bg-background p-6" data-testid="chart-empty">
      <h3 className="text-[15px] font-semibold text-foreground">Noch keine Achsen und Reihen</h3>
      <p className="text-[13px] text-muted-foreground">
        Ein Diagramm besteht aus <strong>Achsen</strong> – den verglichenen Kennzahlen wie „Ladeleistung MCS“ – und{" "}
        <strong>Reihen</strong>, den verglichenen Varianten wie „MAN eTGX“. Jede Reihe trägt auf jeder Achse einen Wert.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" className="h-10" onClick={onExample}>
          Beispiel laden
        </Button>
        <Button type="button" variant="outline" className="h-10" onClick={onStarter}>
          Leere Tabelle anlegen
        </Button>
      </div>
      <p className="text-[13px] text-muted-foreground">Oder oben rechts „Aus Excel einfügen“.</p>
    </div>
  );
}

/** Die gewählte Achse; neue Achsen bekommen nach dem Zeichnen den Fokus in ihrem Namen. */
function useAxisSelection(count: number, rootRef: React.RefObject<HTMLDivElement | null>) {
  const [chosen, setChosen] = useState(0);
  const [focusName, setFocusName] = useState<number | null>(null);
  useEffect(() => {
    if (focusName === null) return;
    rootRef.current?.querySelector<HTMLElement>(`[aria-label="Name der Achse ${focusName + 1}"]`)?.focus();
    setFocusName(null);
  }, [focusName, rootRef]);
  return {
    selected: Math.min(chosen, Math.max(0, count - 1)),
    select: setChosen,
    focusNew: (index: number) => {
      setChosen(index);
      setFocusName(index);
    },
  };
}

/** „Aus Excel einfügen“: als Leiste im Rahmen, ohne Rahmen über dem Raster. */
function usePastePanel(value: ChartSpec, onChange: (spec: ChartSpec) => void) {
  const panels = useSidePanel();
  const [inline, setInline] = useState(false);
  // Die Leiste hält ihren Inhalt fest; sie schreibt über den jüngsten Stand.
  const latest = useRef({ value, onChange });
  useLayoutEffect(() => {
    latest.current = { value, onChange };
  });
  const { close, open, available } = panels;
  const apply = useCallback(
    (grid: Grid) => {
      latest.current.onChange(applyGrid(latest.current.value, grid));
      close(PASTE_PANEL);
      setInline(false);
    },
    [close],
  );
  const show = (): void => {
    if (!available) {
      setInline((current) => !current);
      return;
    }
    open({ id: PASTE_PANEL, title: "Aus Excel einfügen", width: 420, content: <PastePanel onApply={apply} /> });
  };
  return { show, inline: inline && !available ? <PastePanel onApply={apply} /> : null };
}

export function ChartEditor({ value, onChange }: ChartEditorProps): React.ReactElement {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const theme = useChartTheme(rootRef);
  const { issuesVisible } = useConfigShell();
  const axes = useAxisSelection(value.categories.length, rootRef);
  const paste = usePastePanel(value, onChange);
  const issues = useMemo(() => validateChart(value), [value]);
  const invalidAxes = issuesVisible ? axisIssueIndexes(issues) : NO_AXES;
  const { selected } = axes;
  const isEmpty = value.categories.length === 0 && value.series.length === 0;

  const loadExample = (): void => onChange(keepPageSettings(exampleSpec(value.type), value));

  return (
    <div ref={rootRef} className="flex h-full min-h-0 w-full flex-col" data-testid="chart-editor">
      <ConfigWorkspace
        className="min-h-0 flex-1"
        inspector={
          <ChartInspector
            value={value}
            onChange={onChange}
            selected={selected}
            invalidAxes={invalidAxes}
            issuesVisible={issuesVisible}
            palette={theme.palette}
          />
        }
        preview={<ChartPreview spec={value} />}
      >
        <div className="flex h-full min-h-0 flex-col">
          <DataBar
            spec={value}
            selected={selected}
            onMove={(delta) => {
              onChange(moveCategory(value, selected, delta));
              axes.select(selected + delta);
            }}
            onDuplicate={() => {
              onChange(duplicateCategory(value, selected));
              axes.select(selected + 1);
            }}
            onDelete={() => onChange(removeCategory(value, selected))}
            onAddAxis={() => {
              onChange(addCategory(value));
              axes.focusNew(value.categories.length);
            }}
            onAddSeries={() => onChange(addSeries(value))}
            onOpenPaste={paste.show}
            onLoadExample={loadExample}
          />
          <div className="flex min-h-0 flex-1 flex-col items-start gap-3 overflow-auto bg-secondary p-4">
            {paste.inline !== null && <section className="w-full max-w-[560px] rounded-lg border bg-background p-4">{paste.inline}</section>}
            {isEmpty ? (
              <EmptyState onExample={loadExample} onStarter={() => onChange(keepPageSettings(starterSpec(value.type), value))} />
            ) : (
              <DataGrid
                spec={value}
                selected={selected}
                onSelect={axes.select}
                onChange={onChange}
                invalid={invalidAxes}
                palette={theme.palette}
              />
            )}
            <p className="max-w-[720px] text-[13px] text-muted-foreground">
              Werte aus Excel: Zellen kopieren, hier ein Feld wählen, <Key>⌘</Key> <Key>V</Key>. Namen und Farben der Reihen
              stehen rechts unter „Daten“, die Feineinstellungen der gewählten Achse unter „Achse“.
            </p>
            {value.type === "pie" && value.series.length > 1 && (
              <p className="max-w-[720px] text-[13px] text-warning">
                Ein Kuchendiagramm zeichnet nur die erste Reihe. Die weiteren bleiben gespeichert und erscheinen wieder,
                sobald ein anderer Typ gewählt ist.
              </p>
            )}
          </div>
        </div>
      </ConfigWorkspace>
    </div>
  );
}
