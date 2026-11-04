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
 * Die Beispielvorlage hinter „Beispiel laden" und "Leere Tabelle anlegen".
 *
 * Je Typ ein eigenes, plausibles Beispiel aus demselben Themenfeld: Eine
 * Radar-Vorlage in einem Kuchendiagramm hilft niemandem — drei Achsen mit
 * verschiedenen Einheiten ergeben als Kuchen Unsinn.
 *
 * Als Funktionen und nicht als Konstanten, aus demselben Grund wie
 * `emptySpec()`: Ein geteiltes Objekt könnte der Editor verändern und die
 * Vorlage damit dauerhaft verfälschen.
 *
 * `Record<ChartType, () => ChartSpec>` statt eines `switch`: Ein künftiger
 * Diagrammtyp ohne eigenen Eintrag wird so zum Compilerfehler statt zu einer
 * stillschweigend falschen Vorlage.
 */

import { ChartSpec, ChartType } from "../chart-model";

/** MAN-Blau und MAN-Rot — dieselbe Zuordnung wie in der Quellgrafik. */
const MAN_BLUE = "#3875b2";
const COMPETITOR_RED = "#e40045";
/** MAN-Orange — dritte Farbe für Vergleiche mit mehr als zwei Serien. */
const MAN_ORANGE = "#eb690b";

const exampleSpecs: Record<ChartType, () => ChartSpec> = {
  radar: () => ({
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
  }),
  bar: () => ({
    version: 1,
    type: "bar",
    title: "Reichweite nach Fahrzeug",
    footnote: "Herstellerangaben unter Normbedingungen.",
    legend: { show: true, position: "top" },
    display: { type: "bar", stacked: false, orientation: "vertical" },
    categories: [
      { label: "MAN eTGX", unit: "km", decimals: 0 },
      { label: "MAN eTGM", unit: "km", decimals: 0 },
      { label: "MAN eTGS", unit: "km", decimals: 0 },
    ],
    series: [
      { name: "Sommer", color: MAN_BLUE, values: [330, 280, 310] },
      { name: "Winter", color: MAN_ORANGE, values: [260, 220, 240] },
    ],
  }),
  line: () => ({
    version: 1,
    type: "line",
    title: "Reichweite über die Baujahre",
    footnote: "Herstellerangaben unter Normbedingungen.",
    legend: { show: true, position: "top" },
    display: { type: "line", smooth: false, area: false, showPoints: true },
    categories: [
      { label: "2023", unit: "km", decimals: 0 },
      { label: "2024", unit: "km", decimals: 0 },
      { label: "2025", unit: "km", decimals: 0 },
      { label: "2026", unit: "km", decimals: 0 },
    ],
    series: [{ name: "MAN eTGX", color: MAN_BLUE, values: [280, 300, 320, 330] }],
  }),
  pie: () => ({
    version: 1,
    type: "pie",
    title: "Flottenkosten nach Anteil",
    footnote: "Gesamtkosten über acht Jahre Haltedauer.",
    legend: { show: true, position: "top" },
    display: { type: "pie", innerRadius: 0, label: "percent" },
    categories: [
      { label: "Energie", unit: "%", decimals: 0, color: MAN_BLUE },
      { label: "Wartung", unit: "%", decimals: 0, color: MAN_ORANGE },
      { label: "Versicherung", unit: "%", decimals: 0, color: COMPETITOR_RED },
      { label: "Sonstiges", unit: "%", decimals: 0, color: "#8a8a8a" },
    ],
    series: [{ name: "Anteil", values: [45, 25, 20, 10] }],
  }),
};

export function exampleSpec(type: ChartType): ChartSpec {
  return exampleSpecs[type]();
}

/**
 * Eine leere, aber bediente Tabelle: dieselben Achsennamen wie das
 * Beispiel, nur ohne Werte — sie ist der Startpunkt für eigene Daten, nicht
 * die Vorführung.
 */
const starterSpecs: Record<ChartType, () => ChartSpec> = {
  radar: () => ({
    version: 1,
    type: "radar",
    legend: { show: true, position: "top" },
    display: { type: "radar", gridLevels: 5, filled: false },
    categories: [{ label: "" }, { label: "" }, { label: "" }],
    series: [
      { name: "", values: [null, null, null] },
      { name: "", values: [null, null, null] },
    ],
  }),
  bar: () => ({
    version: 1,
    type: "bar",
    legend: { show: true, position: "top" },
    display: { type: "bar", stacked: false, orientation: "vertical" },
    categories: [{ label: "", unit: "km" }, { label: "", unit: "km" }, { label: "", unit: "km" }],
    series: [
      { name: "", values: [null, null, null] },
      { name: "", values: [null, null, null] },
    ],
  }),
  line: () => ({
    version: 1,
    type: "line",
    legend: { show: true, position: "top" },
    display: { type: "line", smooth: false, area: false, showPoints: true },
    categories: [
      { label: "", unit: "km" },
      { label: "", unit: "km" },
      { label: "", unit: "km" },
      { label: "", unit: "km" },
    ],
    series: [{ name: "", values: [null, null, null, null] }],
  }),
  pie: () => ({
    version: 1,
    type: "pie",
    legend: { show: true, position: "top" },
    display: { type: "pie", innerRadius: 0, label: "percent" },
    categories: [{ label: "", unit: "%" }, { label: "", unit: "%" }, { label: "", unit: "%" }, { label: "", unit: "%" }],
    series: [{ name: "", values: [null, null, null, null] }],
  }),
};

export function starterSpec(type: ChartType): ChartSpec {
  return starterSpecs[type]();
}
