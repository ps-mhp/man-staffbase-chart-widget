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

import { encodePayload } from "@shared/payload";

import { ChartSpec, emptySpec, parseChartSpec, serializeChartSpec } from "./chart-model";

const valid: ChartSpec = {
  version: 1,
  type: "radar",
  title: "eTGX gegen eActros 600",
  footnote: "Die besseren Bewertungen sind jeweils weiter außen.",
  legend: { show: true, position: "top" },
  categories: [
    { label: "Batteriegewicht minimal [t]", inverted: true, unit: "t", decimals: 1 },
    { label: "Nutzbare Energie\nminimal [kWh]", unit: "kWh", decimals: 0 },
  ],
  series: [
    { name: "MAN eTGX", values: [1.8, 240], color: "#1f7ec4" },
    { name: "Mercedes-Benz eActros 600", values: [4.4, 600] },
  ],
};

describe("parseChartSpec", () => {
  it("meldet 'empty' und liefert eine leere Definition, wenn nichts konfiguriert ist", () => {
    for (const raw of ["", "   ", undefined, null]) {
      const { spec, problems } = parseChartSpec(raw);
      expect(problems).toEqual([{ code: "empty" }]);
      expect(spec).toEqual(emptySpec());
    }
  });

  it("liest eine verpackte Definition zurück", () => {
    const { spec, problems } = parseChartSpec(serializeChartSpec(valid));
    expect(problems).toEqual([]);
    expect(spec).toEqual(valid);
  });

  it("liest auch rohes JSON, damit von Hand reparierte Attribute greifen", () => {
    const { spec, problems } = parseChartSpec(JSON.stringify(valid));
    expect(problems).toEqual([]);
    expect(spec).toEqual(valid);
  });

  it("meldet 'unreadable' bei kaputtem JSON, ohne zu werfen", () => {
    const { spec, problems } = parseChartSpec(encodePayload("{ das ist kein json"));
    expect(problems).toEqual([{ code: "unreadable" }]);
    expect(spec).toEqual(emptySpec());
  });

  it("meldet 'unreadable', wenn die Verpackung beschädigt ist", () => {
    const { problems } = parseChartSpec("b64:###");
    expect(problems).toEqual([{ code: "unreadable" }]);
  });

  it("meldet 'unknown-type' samt gelesenem Namen und nennt ihn nicht 'radar'", () => {
    const { spec, problems } = parseChartSpec(JSON.stringify({ ...valid, type: "sunburst" }));
    expect(problems).toEqual([{ code: "unknown-type", detail: "sunburst" }]);
    expect(spec).toEqual(emptySpec());
  });

  it("lässt 'detail' leer, wenn gar kein Typ dasteht, statt 'undefined' zu nennen", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Feld wird bewusst weggelassen, nicht gebraucht.
    const { type: _omitted, ...withoutType } = valid;
    const { problems } = parseChartSpec(JSON.stringify(withoutType));
    expect(problems).toEqual([{ code: "unknown-type", detail: undefined }]);
  });

  it("füllt zu kurze Serien mit null auf und meldet das", () => {
    const short = { ...valid, series: [{ name: "MAN eTGX", values: [1.8] }] };
    const { spec, problems } = parseChartSpec(JSON.stringify(short));
    expect(spec.series[0].values).toEqual([1.8, null]);
    expect(problems).toEqual([{ code: "short-series", detail: "MAN eTGX" }]);
  });

  it("kürzt zu lange Serien auf die Zahl der Kategorien", () => {
    const long = { ...valid, series: [{ name: "MAN eTGX", values: [1.8, 240, 99] }] };
    const { spec } = parseChartSpec(JSON.stringify(long));
    expect(spec.series[0].values).toEqual([1.8, 240]);
  });

  it("ersetzt unbrauchbare Zahlen durch null statt das Diagramm zu verlieren", () => {
    const dirty = { ...valid, series: [{ name: "X", values: ["1,8", Number.NaN, Infinity, 7] }] };
    const { spec } = parseChartSpec(JSON.stringify(dirty));
    expect(spec.series[0].values).toEqual([null, null]);
  });

  it("ergänzt eine fehlende Legende mit der Vorgabe", () => {
    const { spec } = parseChartSpec(JSON.stringify({ ...valid, legend: undefined }));
    expect(spec.legend).toEqual({ show: true, position: "top" });
  });

  it("wirft nie, egal was im Attribut steht", () => {
    for (const raw of ["null", "[]", "42", '"text"', encodePayload("[]")]) {
      expect(() => parseChartSpec(raw)).not.toThrow();
    }
  });
});

describe("serializeChartSpec", () => {
  it("verpackt, damit die Inhaltsübersetzung den Wert nicht am Anführungszeichen abschneidet", () => {
    expect(serializeChartSpec(valid).startsWith("b64:")).toBe(true);
  });

  it("ist zu parseChartSpec umkehrbar", () => {
    expect(parseChartSpec(serializeChartSpec(valid)).spec).toEqual(valid);
  });
});
