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

import { ChartSpec, parseChartSpec, serializeChartSpec } from "./chart-model";
import { chartTranslationProvider } from "./translation-provider";
import { specToTranslatableHtml } from "./translation-payload";

const spec: ChartSpec = {
  version: 1,
  type: "radar",
  title: "Vergleich",
  legend: { show: true, position: "top" },
  categories: [{ label: "Gewicht", unit: "t" }],
  series: [{ name: "MAN eTGX", values: [1.8] }],
};

describe("chartTranslationProvider", () => {
  it("hängt am chart-Attribut des Bausteins", () => {
    expect(chartTranslationProvider.ref).toEqual({ tagName: "chart-widget", attribute: "chart" });
  });

  it("schickt nichts, wenn das Attribut leer ist", () => {
    expect(chartTranslationProvider.toTranslatable("")).toBeNull();
  });

  it("schickt nichts, wenn das Attribut unlesbar ist", () => {
    // Eine kaputte Konfiguration ist ein Fall für den Editor, nicht für
    // den Übersetzungsdienst.
    expect(chartTranslationProvider.toTranslatable("b64:###")).toBeNull();
  });

  it("schreibt die Übersetzung zurück und behält die Zahlen", () => {
    const stored = serializeChartSpec(spec);
    const answer = (specToTranslatableHtml(spec) ?? "").replace("Vergleich", "Comparison");
    const next = parseChartSpec(chartTranslationProvider.fromTranslated(answer, stored)).spec;
    expect(next.title).toBe("Comparison");
    expect(next.series[0].values).toEqual([1.8]);
    expect(next.categories[0].unit).toBe("t");
  });

  it("gibt das Attribut unverändert zurück, wenn die Antwort nichts hergibt", () => {
    const stored = serializeChartSpec(spec);
    expect(parseChartSpec(chartTranslationProvider.fromTranslated("<p>nichts</p>", stored)).spec).toEqual(spec);
  });
});
