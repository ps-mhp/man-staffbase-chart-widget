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
 * Die Beispielvorlage hinter „Beispiel laden".
 *
 * Ein leeres Raster erklärt niemandem, was Achse, Serie und Richtung
 * bedeuten — ein ausgefülltes schon. Deshalb genau der Vergleich, für den
 * dieses Widget gebaut wurde: Er zeigt alle Eigenheiten auf einmal, also
 * unterschiedliche Einheiten je Achse, zwei Serien mit eigenen Farben und
 * Achsen, auf denen der kleinere Wert der bessere ist.
 *
 * Als Funktion und nicht als Konstante, aus demselben Grund wie
 * `emptySpec()`: Ein geteiltes Objekt könnte der Editor verändern und die
 * Vorlage damit dauerhaft verfälschen.
 */

import { ChartSpec } from "../chart-model";

/** MAN-Blau und MAN-Rot — dieselbe Zuordnung wie in der Quellgrafik. */
const MAN_BLUE = "#3875b2";
const COMPETITOR_RED = "#e40045";

export function exampleSpec(): ChartSpec {
  return {
    version: 1,
    type: "radar",
    title: "MAN eTGX vs. Mercedes-Benz eActros 600",
    footnote: "Je 4x2 Sattelzugmaschine. Die besseren Bewertungen sind jeweils weiter aussen angeordnet.",
    legend: { show: true, position: "top" },
    display: { type: "radar", gridLevels: 5, filled: false },
    categories: [
      { label: "Benotung\nModularität", inverted: true, min: 1, max: 6, decimals: 0 },
      { label: "Batteriegewicht\nminimal", unit: "t", inverted: true, decimals: 1 },
      { label: "Batteriegewicht\nmaximal", unit: "t", inverted: true, decimals: 1 },
      { label: "Nutzbare Energie\nminimal", unit: "kWh", decimals: 0 },
      { label: "Nutzbare Energie\nmaximal", unit: "kWh", decimals: 0 },
      { label: "Ladeleistung MCS", unit: "kW", decimals: 0 },
    ],
    series: [
      { name: "MAN eTGX", color: MAN_BLUE, values: [1, 1.8, 3.7, 240, 480, 750] },
      { name: "Mercedes-Benz eActros 600", color: COMPETITOR_RED, values: [5, 4.4, 4.4, 600, 600, 1000] },
    ],
  };
}

/**
 * Eine leere, aber bediente Tabelle: drei Achsen und zwei Serien.
 *
 * `emptySpec()` hat gar keine Zeilen, und eine Tabelle ohne Zeilen ist für
 * den Einstieg nutzlos — es gäbe nichts zu sehen und nichts zu tippen.
 */
export function starterSpec(): ChartSpec {
  return {
    version: 1,
    type: "radar",
    legend: { show: true, position: "top" },
    display: { type: "radar", gridLevels: 5, filled: false },
    categories: [{ label: "" }, { label: "" }, { label: "" }],
    series: [
      { name: "", values: [null, null, null] },
      { name: "", values: [null, null, null] },
    ],
  };
}
