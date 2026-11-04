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

describe("Balkendiagramm", () => {
  const raw = (spec: Record<string, unknown>): string => JSON.stringify(spec);

  it("nimmt bar als Typ an", () => {
    const { spec, problems } = parseChartSpec(
      raw({ type: "bar", categories: [{ label: "A" }], series: [{ name: "x", values: [1] }] }),
    );
    expect(spec.type).toBe("bar");
    expect(problems).toEqual([]);
  });

  it("liest die Anzeigeoptionen von bar", () => {
    const { spec } = parseChartSpec(
      raw({ type: "bar", categories: [], series: [], display: { type: "bar", stacked: true, orientation: "horizontal" } }),
    );
    expect(spec.display).toEqual({ type: "bar", stacked: true, orientation: "horizontal" });
  });

  it("faellt auf stehend und ungestapelt zurueck", () => {
    const { spec } = parseChartSpec(raw({ type: "bar", categories: [], series: [], display: { type: "bar" } }));
    expect(spec.display).toEqual({ type: "bar", stacked: false, orientation: "vertical" });
  });

  it("verwirft Anzeigeoptionen eines anderen Typs", () => {
    const { spec } = parseChartSpec(
      raw({ type: "bar", categories: [], series: [], display: { type: "radar", gridLevels: 7, filled: true } }),
    );
    expect(spec.display).toBeUndefined();
  });

  it("behaelt min, max und inverted auch wenn bar sie nicht zeichnet", () => {
    const { spec } = parseChartSpec(
      raw({ type: "bar", categories: [{ label: "A", min: 2, max: 8, inverted: true }], series: [] }),
    );
    expect(spec.categories[0]).toMatchObject({ min: 2, max: 8, inverted: true });
  });
});

describe("Liniendiagramm", () => {
  const raw = (spec: Record<string, unknown>): string => JSON.stringify(spec);

  it("nimmt line als Typ an", () => {
    const { spec, problems } = parseChartSpec(
      raw({ type: "line", categories: [{ label: "A" }], series: [{ name: "x", values: [1] }] }),
    );
    expect(spec.type).toBe("line");
    expect(problems).toEqual([]);
  });

  it("liest die Anzeigeoptionen von line", () => {
    const { spec } = parseChartSpec(
      raw({ type: "line", categories: [], series: [], display: { type: "line", smooth: true, area: true, showPoints: false } }),
    );
    expect(spec.display).toEqual({ type: "line", smooth: true, area: true, showPoints: false });
  });

  it("faellt auf eckig, ohne Flaeche und mit Punkten zurueck", () => {
    const { spec } = parseChartSpec(raw({ type: "line", categories: [], series: [], display: { type: "line" } }));
    expect(spec.display).toEqual({ type: "line", smooth: false, area: false, showPoints: true });
  });

  it("verwirft Anzeigeoptionen eines anderen Typs", () => {
    const { spec } = parseChartSpec(
      raw({ type: "line", categories: [], series: [], display: { type: "radar", gridLevels: 7, filled: true } }),
    );
    expect(spec.display).toBeUndefined();
  });

  it("behaelt min, max und inverted auch wenn line sie nicht zeichnet", () => {
    const { spec } = parseChartSpec(
      raw({ type: "line", categories: [{ label: "A", min: 2, max: 8, inverted: true }], series: [] }),
    );
    expect(spec.categories[0]).toMatchObject({ min: 2, max: 8, inverted: true });
  });
});

describe("Kuchendiagramm", () => {
  const raw = (spec: Record<string, unknown>): string => JSON.stringify(spec);

  it("nimmt pie als Typ an", () => {
    const { spec, problems } = parseChartSpec(
      raw({ type: "pie", categories: [{ label: "A" }], series: [{ name: "x", values: [1] }] }),
    );
    expect(spec.type).toBe("pie");
    expect(problems).toEqual([]);
  });

  it("liest die Anzeigeoptionen von pie", () => {
    const { spec } = parseChartSpec(
      raw({ type: "pie", categories: [], series: [], display: { type: "pie", innerRadius: 45, label: "value" } }),
    );
    expect(spec.display).toEqual({ type: "pie", innerRadius: 45, label: "value" });
  });

  it("faellt auf den Vollkreis mit Prozentbeschriftung zurueck", () => {
    const { spec } = parseChartSpec(raw({ type: "pie", categories: [], series: [], display: { type: "pie" } }));
    expect(spec.display).toEqual({ type: "pie", innerRadius: 0, label: "percent" });
  });

  it("begrenzt den Innenradius auf 0 bis 90 Prozent", () => {
    const zuGross = parseChartSpec(
      raw({ type: "pie", categories: [], series: [], display: { type: "pie", innerRadius: 150 } }),
    );
    expect(zuGross.spec.display).toMatchObject({ innerRadius: 90 });

    const negativ = parseChartSpec(
      raw({ type: "pie", categories: [], series: [], display: { type: "pie", innerRadius: -20 } }),
    );
    expect(negativ.spec.display).toMatchObject({ innerRadius: 0 });
  });

  it("verwirft Anzeigeoptionen eines anderen Typs", () => {
    const { spec } = parseChartSpec(
      raw({ type: "pie", categories: [], series: [], display: { type: "radar", gridLevels: 7, filled: true } }),
    );
    expect(spec.display).toBeUndefined();
  });

  it("liest die Segmentfarbe einer Kategorie", () => {
    const { spec } = parseChartSpec(
      raw({ type: "pie", categories: [{ label: "A", color: "#f00" }], series: [] }),
    );
    expect(spec.categories[0].color).toBe("#f00");
  });

  it("behaelt die Segmentfarbe auch nach einem Typwechsel", () => {
    const { spec } = parseChartSpec(
      raw({ type: "radar", categories: [{ label: "A", color: "#f00" }], series: [] }),
    );
    expect(spec.categories[0].color).toBe("#f00");
  });
});
