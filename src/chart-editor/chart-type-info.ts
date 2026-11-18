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

import { ChartType } from "../chart-model";

/**
 * Was zu jedem Diagrammtyp im Editor steht.
 *
 * `label` ist das kurze Wort auf der Pill („Netz“), `name` der Fachbegriff,
 * unter dem die Redaktion die Vorlage aus der Präsentation kennt, und
 * `hint` sagt, wofür der Typ taugt – er steht unter den Pills und in der
 * Hilfe. Ohne ihn war am Dialog nicht zu erkennen, welche Art Diagramm man
 * gerade baut.
 */
export const CHART_TYPE_INFO: Record<ChartType, { label: string; name: string; hint: string }> = {
  radar: {
    label: "Netz",
    name: "Netzdiagramm (Radar / Spinne)",
    hint: "Vergleicht wenige Varianten über mehrere Kennwerte hinweg. Jede Achse darf eine eigene Einheit haben.",
  },
  bar: {
    label: "Balken",
    name: "Balkendiagramm (Säulen)",
    hint: "Vergleicht Werte über wenige Kategorien. Alle Balken teilen sich eine Werteachse – nur bei gleicher Einheit sinnvoll.",
  },
  line: {
    label: "Linie",
    name: "Liniendiagramm (Verlauf)",
    hint: "Zeigt eine Entwicklung über eine geordnete Reihe hinweg – etwa über Jahre. Die Reihenfolge der Achsen ist die im Raster.",
  },
  pie: {
    label: "Kuchen",
    name: "Kuchendiagramm (Torte / Ring)",
    hint: "Zeigt die Aufteilung eines Ganzen. Gezeichnet wird nur die erste Reihe; alle Werte sollten dieselbe Einheit haben.",
  },
};
