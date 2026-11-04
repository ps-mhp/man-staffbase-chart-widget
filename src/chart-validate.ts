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
 * Beurteilt eine gelesene Definition typabhängig.
 *
 * Getrennt von `parseChartSpec`: Die liest Daten und beurteilt sie nicht — ob
 * ein negativer Wert ein Fehler ist, hängt am Diagrammtyp. Und getrennt von
 * den Übersetzern: Die liefern eine ECharts-Option, keine Problemliste, und
 * ihr Rückgabewert erreicht die Anzeige nie.
 *
 * Wirft nie, wie `parseChartSpec` auch.
 */

import { ChartProblem, ChartSpec } from "./chart-model";

export function validateSpec(spec: ChartSpec): ChartProblem[] {
  if (spec.type !== "pie") return [];

  // Nur die erste Serie: Weitere bleiben gespeichert, werden aber nicht
  // gezeichnet — ein negativer Wert dort hat keine Wirkung und wäre ein
  // Fehlalarm.
  const values = spec.series[0]?.values ?? [];

  return spec.categories.flatMap((category, index) => {
    const value = values[index];
    if (typeof value !== "number" || value >= 0) return [];
    // Ein Segment ist ein Anteil am Ganzen. Ein negativer Anteil ist kein
    // Darstellungsproblem, sondern ein Datenfehler — also benennen statt
    // zeichnen.
    return [{ code: "negative-share" as const, detail: category.label || `Kategorie ${index + 1}` }];
  });
}
