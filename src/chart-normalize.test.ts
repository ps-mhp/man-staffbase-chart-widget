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

import { Category, ChartSpec, Series } from "./chart-model";
import { NORMALIZED_MAX, axisBounds, normalizeSpec } from "./chart-normalize";

const PALETTE = ["#e40045", "#3875b2", "#303c49"] as const;

describe("axisBounds", () => {
  const series: Series[] = [
    { name: "A", values: [1.8, 240] },
    { name: "B", values: [4.4, 600] },
  ];

  it("verankert eine Achse ohne eigene Grenzen an der Null", () => {
    const categories: Category[] = [{ label: "t" }, { label: "kWh" }];
    // Nicht am kleinsten Wert: Sonst laege die schwaechere Serie auf jeder
    // Achse im Mittelpunkt und saehe aus wie null.
    expect(axisBounds(categories, series)).toEqual([
      { min: 0, max: 4.4, inverted: false },
      { min: 0, max: 600, inverted: false },
    ]);
  });

  it("nimmt einen negativen Wert als Untergrenze, weil die Null dann nicht mehr unten liegt", () => {
    const bounds = axisBounds([{ label: "x" }], [{ name: "A", values: [-4] }, { name: "B", values: [9] }]);
    expect(bounds[0]).toEqual({ min: -4, max: 9, inverted: false });
  });

  it("lässt gesetzte Grenzen stehen", () => {
    const categories: Category[] = [{ label: "t", min: 0, max: 5 }, { label: "kWh" }];
    expect(axisBounds(categories, series)[0]).toEqual({ min: 0, max: 5, inverted: false });
  });

  it("übernimmt die Richtung der Achse", () => {
    expect(axisBounds([{ label: "t", inverted: true }], series)[0].inverted).toBe(true);
  });

  it("spreizt eine Achse ohne Spannweite auf, damit nicht durch null geteilt wird", () => {
    const bounds = axisBounds([{ label: "x" }], [{ name: "A", values: [0] }]);
    expect(bounds[0]).toEqual({ min: -0.5, max: 0.5, inverted: false });
  });

  it("liefert 0 bis 1 für eine Achse ganz ohne Werte", () => {
    expect(axisBounds([{ label: "x" }], [{ name: "A", values: [null] }])[0]).toEqual({
      min: 0,
      max: 1,
      inverted: false,
    });
  });

  it("ignoriert fehlende Werte bei der Spannweite", () => {
    const bounds = axisBounds([{ label: "x" }], [{ name: "A", values: [null] }, { name: "B", values: [3] }, { name: "C", values: [9] }]);
    expect(bounds[0]).toEqual({ min: 0, max: 9, inverted: false });
  });
});

describe("normalizeSpec", () => {
  const spec: ChartSpec = {
    version: 1,
    type: "radar",
    legend: { show: true, position: "top" },
    categories: [{ label: "Gewicht", inverted: true }, { label: "Energie" }],
    series: [
      { name: "MAN", values: [1.8, 240] },
      { name: "MB", values: [4.4, 600] },
    ],
  };

  it("legt die Werte auf 0 bis 100", () => {
    const n = normalizeSpec(spec, PALETTE);
    expect(n.series[1].normalized).toEqual([0, NORMALIZED_MAX]);
  });

  it("dreht invertierte Achsen, damit 'besser' immer weiter außen liegt", () => {
    const n = normalizeSpec(spec, PALETTE);
    // 1,8 t ist der kleinere und damit bessere Wert -> weiter außen. Die
    // Achse laeuft von 0 bis 4,4; ganz außen liegt deshalb erst die Null.
    expect(n.series[0].normalized[0]).toBeGreaterThan(n.series[1].normalized[0] as number);
    expect(n.series[1].normalized[0]).toBe(0);
  });

  it("führt die Rohwerte unverändert mit, weil die Labels sie zeigen", () => {
    const n = normalizeSpec(spec, PALETTE);
    expect(n.series[0].raw).toEqual([1.8, 240]);
  });

  it("lässt fehlende Werte als null durch und erfindet keine Null", () => {
    const n = normalizeSpec({ ...spec, series: [{ name: "A", values: [null, 240] }] }, PALETTE);
    expect(n.series[0].normalized[0]).toBeNull();
  });

  it("vergibt Farben der Reihe nach und wiederholt sie bei Bedarf", () => {
    const many = { ...spec, series: [0, 1, 2, 3].map((i) => ({ name: `S${i}`, values: [1, 1] })) };
    expect(normalizeSpec(many, PALETTE).series.map((s) => s.color)).toEqual([
      "#e40045",
      "#3875b2",
      "#303c49",
      "#e40045",
    ]);
  });

  it("lässt eine eigene Farbe die Palette schlagen", () => {
    const own = { ...spec, series: [{ name: "A", values: [1, 1], color: "#123456" }] };
    expect(normalizeSpec(own, PALETTE).series[0].color).toBe("#123456");
  });

  it("legt einen Wert außerhalb der gesetzten Grenzen auf den Rand statt darüber hinaus", () => {
    const clamped = { ...spec, categories: [{ label: "x", min: 0, max: 10 }], series: [{ name: "A", values: [40] }] };
    expect(normalizeSpec(clamped, PALETTE).series[0].normalized[0]).toBe(NORMALIZED_MAX);
  });
});
