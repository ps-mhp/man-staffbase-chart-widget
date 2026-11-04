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
 * Was in der Typ-Auswahl steht.
 *
 * Der Klammerzusatz nennt den Fachbegriff, unter dem die Redaktion die
 * Vorlage aus der Präsentation kennt; der Satz dahinter sagt, wofür der Typ
 * taugt. Beides fehlte, und deshalb war am Dialog nicht zu erkennen, welche
 * Art Diagramm man überhaupt gerade baut.
 */
export const CHART_TYPE_INFO: Record<ChartType, { label: string; hint: string }> = {
  radar: {
    label: "Netzdiagramm (Radar / Spinne)",
    hint: "Vergleicht wenige Varianten über mehrere Kennwerte hinweg. Jede Achse darf eine eigene Einheit haben.",
  },
  bar: {
    label: "Balkendiagramm (Säulen)",
    hint: "Vergleicht Werte über wenige Kategorien. Alle Balken teilen sich eine Werteachse — nur bei gleicher Einheit sinnvoll.",
  },
  line: {
    label: "Liniendiagramm (Verlauf)",
    hint: "Zeigt eine Entwicklung über eine geordnete Reihe hinweg — etwa über Jahre. Die Reihenfolge der Achsen ist die Reihenfolge im Raster.",
  },
  pie: {
    label: "Kuchendiagramm (Torte / Ring)",
    hint: "Zeigt die Aufteilung eines Ganzen. Es wird nur die erste Serie gezeichnet, und alle Werte sollten dieselbe Einheit haben.",
  },
};
