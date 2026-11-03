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
 * Rechnet Achsen unterschiedlicher Einheiten auf eine gemeinsame Skala.
 *
 * Warum wir das selbst tun, obwohl ECharts `min` und `max` je Achse kann:
 * ECharts kann keine Achse umdrehen. „Kleiner ist besser" — beim
 * Batteriegewicht — wäre damit nicht darstellbar. Zwei Wege, einer über
 * ECharts-Grenzen und einer über eigene Umrechnung, wären zwei Mengen an
 * Randfällen und zwei Mengen an Tests. Also rechnen wir immer selbst, und
 * ECharts sieht nur noch Werte zwischen 0 und 100.
 */

import { Category, ChartSpec, Series } from "./chart-model";

export const NORMALIZED_MAX = 100;

export interface AxisBounds {
  min: number;
  max: number;
  inverted: boolean;
}

export interface NormalizedSeries {
  name: string;
  /** Aufgelöst — entweder eigene Farbe oder Palette. */
  color: string;
  /** Was ECharts zeichnet. */
  normalized: (number | null)[];
  /** Was im Label und im Tooltip steht. */
  raw: (number | null)[];
}

export interface NormalizedSpec {
  spec: ChartSpec;
  bounds: AxisBounds[];
  series: NormalizedSeries[];
}

/** Hälftige Aufspreizung, wenn alle Werte einer Achse gleich sind. */
const FLAT_AXIS_PADDING = 0.5;

export function axisBounds(categories: Category[], series: Series[]): AxisBounds[] {
  return categories.map((category, index) => {
    const values = series
      .map((s) => s.values[index])
      .filter((value): value is number => typeof value === "number");

    const dataMin = values.length > 0 ? Math.min(...values) : 0;
    const dataMax = values.length > 0 ? Math.max(...values) : 1;

    // Die Achse wird ohne eigene Angabe an der Null verankert, nicht am
    // kleinsten vorkommenden Wert. Am kleinsten Wert verankert läge die
    // schwächste Serie auf *jeder* Achse exakt im Mittelpunkt: 240 von 600
    // kWh sähe aus wie null, und sämtliche Wertelabels der Serie lägen im
    // Zentrum übereinander. Nur bei negativen Werten, für die es keine
    // natürliche Null als Rand gibt, bleibt es beim Datenrand.
    let min = category.min ?? Math.min(0, dataMin);
    let max = category.max ?? Math.max(0, dataMax);

    if (min === max) {
      // Ohne Spannweite wäre die Umrechnung eine Division durch null. Der
      // Punkt landet dann mittig auf der Achse, was ehrlicher ist als außen.
      min -= FLAT_AXIS_PADDING;
      max += FLAT_AXIS_PADDING;
    }
    if (min > max) [min, max] = [max, min];

    return { min, max, inverted: category.inverted === true };
  });
}

function toScale(value: number | null, bounds: AxisBounds): number | null {
  if (value === null) return null;
  const ratio = (value - bounds.min) / (bounds.max - bounds.min);
  // Begrenzen: Ein von Hand gesetztes `max` darf ein Ausreißer nicht
  // sprengen, sonst zeichnet ECharts außerhalb des Netzes.
  const clamped = Math.min(1, Math.max(0, ratio));
  const scaled = clamped * NORMALIZED_MAX;
  return bounds.inverted ? NORMALIZED_MAX - scaled : scaled;
}

export function normalizeSpec(spec: ChartSpec, palette: readonly string[]): NormalizedSpec {
  const bounds = axisBounds(spec.categories, spec.series);
  const series = spec.series.map((entry, index) => ({
    name: entry.name,
    color: entry.color ?? palette[index % palette.length],
    normalized: entry.values.map((value, axis) => toScale(value, bounds[axis])),
    raw: entry.values,
  }));
  return { spec, bounds, series };
}
