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
 * Zellen aus Excel direkt ins Datenraster einfügen: Zellen kopieren, ein
 * Feld wählen, ⌘ V – der Block landet ab diesem Feld, wie in einer
 * Tabellenkalkulation.
 *
 * Die Spalten des Rasters sind: Achse, Einheit, dann je Reihe ihre Werte.
 * Reicht der Block über die letzte Achse hinaus, kommen Achsen dazu; über
 * die letzte Reihe hinaus Reihen – außer im Kuchen, der nur eine zeigt.
 * Das ganze Ersetzen einer Tabelle bleibt „Aus Excel einfügen“
 * (`grid-import.ts`).
 */

import { ChartSpec } from "../chart-model";
import { addCategory, addSeries, setValue, updateCategory } from "./editor-operations";
import { readNumber } from "./grid-import";

/** Die zwei Spalten vor den Werten: Achse und Einheit. */
export const LEADING_COLUMNS = 2;

/**
 * Liest, was Excel in die Zwischenablage legt: Zeilen mit Zeilenumbruch,
 * Zellen mit Tabulator. `null` für einen einzelnen Wert – den fügt das Feld
 * selbst ein, wie jedes Textfeld.
 */
export function splitClipboard(text: string): string[][] | null {
  // Excel schließt mit einem Zeilenumbruch ab; der ist keine leere Zeile.
  const normalized = text.replace(/\r\n?/g, "\n").replace(/\n$/, "");
  if (!normalized.includes("\t") && !normalized.includes("\n")) return null;
  return normalized.split("\n").map((line) => line.split("\t"));
}

export interface PasteTarget {
  /** Die Achse (Zeile des Rasters), an der der Block beginnt. */
  row: number;
  /** Die Spalte des Rasters: 0 Achse, 1 Einheit, ab 2 die Reihen. */
  column: number;
  /** Wie viele Reihen das Raster höchstens zeigt: im Kuchen 1, sonst unbegrenzt. */
  maxSeries: number;
}

function ensureRows(spec: ChartSpec, count: number): ChartSpec {
  let next = spec;
  while (next.categories.length < count) next = addCategory(next);
  return next;
}

function ensureSeries(spec: ChartSpec, count: number): ChartSpec {
  let next = spec;
  while (next.series.length < count) next = addSeries(next);
  return next;
}

function writeCell(spec: ChartSpec, row: number, column: number, text: string): ChartSpec {
  if (column === 0) return updateCategory(spec, row, { label: text.trim() });
  if (column === 1) return updateCategory(spec, row, { unit: text.trim() || undefined });
  return setValue(spec, column - LEADING_COLUMNS, row, readNumber(text));
}

/** Schreibt den Block ab `target` in die Definition; liefert eine neue. */
export function pasteCells(spec: ChartSpec, cells: readonly (readonly string[])[], target: PasteTarget): ChartSpec {
  const width = Math.max(0, ...cells.map((row) => row.length));
  const seriesNeeded = Math.min(target.column + width - LEADING_COLUMNS, target.maxSeries);
  let next = ensureSeries(ensureRows(spec, target.row + cells.length), seriesNeeded);

  cells.forEach((line, r) =>
    line.forEach((text, c) => {
      const column = target.column + c;
      // Rechts über das Raster hinaus: im Kuchen fällt es weg, statt eine
      // unsichtbare Reihe zu füllen.
      if (column - LEADING_COLUMNS >= target.maxSeries) return;
      next = writeCell(next, target.row + r, column, text);
    }),
  );
  return next;
}
