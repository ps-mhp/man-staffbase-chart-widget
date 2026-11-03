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
 * Das kann nur das Radar brauchen, und deshalb liegt es hier und nicht in der
 * typneutralen Vorbereitung: Ein Balken- oder Liniendiagramm zeichnet eine
 * echte Werteachse, und eine Beschriftung von 0 bis 100 statt „600 kWh" waere
 * dort unbrauchbar. Ebenso sind `Category.min`, `.max` und `.inverted` je
 * Kategorie definiert — bei einer gemeinsamen Werteachse ist das nicht
 * darstellbar.
 *
 * Warum wir die Umrechnung selbst tun, obwohl ECharts `min` und `max` je Achse
 * kann: ECharts kann keine Achse umdrehen. „Kleiner ist besser" — beim
 * Batteriegewicht — waere damit nicht darstellbar. Zwei Wege, einer ueber
 * ECharts-Grenzen und einer ueber eigene Umrechnung, waeren zwei Mengen an
 * Randfaellen und zwei Mengen an Tests. Also rechnen wir immer selbst, und
 * ECharts sieht nur noch Werte zwischen 0 und 100.
 */

import { Category, Series } from "../chart-model";
import { PreparedSeries } from "../chart-prepare";

export const NORMALIZED_MAX = 100;

export interface AxisBounds {
  min: number;
  max: number;
  inverted: boolean;
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

function toScale(value: number | null, bounds: AxisBounds | undefined): number | null {
  if (value === null || bounds === undefined) return null;
  const ratio = (value - bounds.min) / (bounds.max - bounds.min);
  // Begrenzen: Ein von Hand gesetztes `max` darf ein Ausreißer nicht
  // sprengen, sonst zeichnet ECharts außerhalb des Netzes.
  const clamped = Math.min(1, Math.max(0, ratio));
  const scaled = clamped * NORMALIZED_MAX;
  return bounds.inverted ? NORMALIZED_MAX - scaled : scaled;
}

/**
 * Die Werte je Serie auf 0–100, in derselben Reihenfolge wie die Serien.
 *
 * Getrennt von `PreparedSeries` und nicht als Feld darin: Nur das Radar
 * braucht diese Zahlen, und ein Feld, das drei von vier Typen nicht lesen,
 * wäre genau die Vermischung, die dieser Umbau auflöst.
 */
export function scaleSeries(series: PreparedSeries[], bounds: AxisBounds[]): (number | null)[][] {
  return series.map((entry) => entry.values.map((value, axis) => toScale(value, bounds[axis])));
}
