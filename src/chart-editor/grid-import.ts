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
 * Übernahme einer Tabelle aus der Zwischenablage.
 *
 * Diagrammdaten stehen fast immer schon irgendwo — in Excel, in einer
 * Präsentation, in einer CSV. Sie Zelle für Zelle abzutippen ist die
 * wahrscheinlichste Fehlerquelle des ganzen Widgets. Deshalb ein eigener
 * Weg für das Einfügen, bewusst nachsichtig gegenüber Trennzeichen und
 * Zahlenformaten.
 *
 * Erwartete Form: erste Zeile Kopf, erste Spalte Seriennamen.
 */

import { Category, ChartSpec } from "../chart-model";

export interface Grid {
  categories: string[];
  rows: { name: string; values: (number | null)[] }[];
}

/** Trennzeichen nach Häufigkeit: Excel-Einfügen, deutsche CSV, englische CSV. */
const SEPARATORS = ["\t", ";", ","] as const;

function detectSeparator(headerLine: string): string {
  // Das erste Trennzeichen, das überhaupt trennt. Das Komma steht zuletzt,
  // weil es in deutschen Zahlen als Dezimaltrenner vorkommt.
  return SEPARATORS.find((separator) => headerLine.includes(separator)) ?? "\t";
}

function readCell(cell: string): number | null {
  const text = cell.trim();
  if (text.length === 0) return null;
  // Tausenderpunkte lassen sich nicht sicher von Dezimalpunkten trennen,
  // deshalb nur Komma zu Punkt und sonst nichts entfernen.
  const value = Number.parseFloat(text.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(value) ? value : null;
}

export function parseGrid(text: string): Grid | null {
  const lines = text
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .filter((line) => line.trim().length > 0);
  if (lines.length < 2) return null;

  const separator = detectSeparator(lines[0]);
  const header = lines[0].split(separator).map((cell) => cell.trim());
  const categories = header.slice(1);
  if (categories.length === 0) return null;

  const rows = lines.slice(1).map((line) => {
    const cells = line.split(separator);
    return {
      name: (cells[0] ?? "").trim(),
      values: categories.map((_, index) => readCell(cells[index + 1] ?? "")),
    };
  });

  return { categories, rows };
}

/**
 * Setzt eine eingelesene Tabelle in die Definition ein.
 *
 * Gleichnamige Kategorien und Serien behalten ihre Einstellungen. Sonst
 * verlöre ein zweites Einfügen — der Normalfall beim Korrigieren eines
 * Zahlendrehers — alle mühsam gesetzten Einheiten, Achsenrichtungen und
 * Farben.
 */
export function applyGrid(spec: ChartSpec, grid: Grid): ChartSpec {
  const previousCategories = new Map(spec.categories.map((category) => [category.label, category]));
  const previousColors = new Map(
    spec.series.filter((series) => series.color).map((series) => [series.name, series.color]),
  );

  const categories: Category[] = grid.categories.map((label) => previousCategories.get(label) ?? { label });
  const series = grid.rows.map((row) => {
    const color = previousColors.get(row.name);
    return { name: row.name, values: row.values, ...(color ? { color } : {}) };
  });

  return { ...spec, categories, series };
}
