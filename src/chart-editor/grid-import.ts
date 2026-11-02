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

/**
 * Liest eine Zahl aus einer Zelle oder einem Eingabefeld, auch wenn eine
 * Einheit daran klebt.
 *
 * Punkt und Komma sind je nach Herkunft Dezimal- oder Tausendertrenner.
 * Stehen beide in einer Zahl, ist das hintere das Dezimaltrennzeichen —
 * das gilt in jeder Schreibweise. Steht nur eines da, lesen wir deutsch:
 * ein Komma trennt die Nachkommastellen, ein Punkt gruppiert die
 * Tausender, sofern er wie eine Gruppierung aussieht. Aus `1.234` wird
 * also 1234 und nicht 1,234 — die Redaktion arbeitet in deutschen
 * Tabellen, und die stille Verwechslung um den Faktor tausend ist der
 * teuerste Fehler, den diese Funktion machen kann.
 */
export function readNumber(cell: string): number | null {
  const compact = cell.replace(/[\s\u00a0]/g, "");
  if (compact.length === 0) return null;

  // Die Zahl herausschneiden, damit eine angehaengte Einheit nicht stoert.
  const core = /-?\d[\d.,]*/.exec(compact)?.[0];
  if (core === undefined) return null;

  const value = Number.parseFloat(withPlainDecimalPoint(core));
  return Number.isFinite(value) ? value : null;
}

/** Bringt eine Zahl in die Schreibweise, die `parseFloat` versteht. */
function withPlainDecimalPoint(core: string): string {
  const lastComma = core.lastIndexOf(",");
  const lastDot = core.lastIndexOf(".");

  if (lastComma >= 0 && lastDot >= 0) {
    const decimal = lastComma > lastDot ? "," : ".";
    const grouping = decimal === "," ? "." : ",";
    return core.split(grouping).join("").replace(decimal, ".");
  }

  const sole = lastComma >= 0 ? "," : lastDot >= 0 ? "." : "";
  if (sole === "") return core;

  const parts = core.split(sole);
  // Mehr als ein Trennzeichen kann nur Gruppierung sein. Ein einzelner
  // Punkt gruppiert, wenn genau drei Ziffern folgen und hoechstens drei
  // vorangehen; ein einzelnes Komma trennt im Deutschen immer dezimal.
  const leadingDigits = parts[0].replace("-", "").length;
  const groups =
    parts.length > 2 || (sole === "." && parts[1].length === 3 && leadingDigits >= 1 && leadingDigits <= 3);
  return groups ? parts.join("") : parts.join(".");
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
      values: categories.map((_, index) => readNumber(cells[index + 1] ?? "")),
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
