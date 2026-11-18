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


import { ChartSpec } from "../chart-model";
import { pasteCells, splitClipboard } from "./grid-paste";

const spec = (patch: Partial<ChartSpec> = {}): ChartSpec => ({
  version: 1,
  type: "bar",
  legend: { show: true, position: "top" },
  categories: [{ label: "A" }, { label: "B" }],
  series: [{ name: "Ist", values: [1, 2] }],
  ...patch,
});

describe("splitClipboard", () => {
  it("liest Zeilen und Zellen, wie Excel sie kopiert", () => {
    expect(splitClipboard("1\t2\r\n3\t4\r\n")).toEqual([
      ["1", "2"],
      ["3", "4"],
    ]);
  });

  it("überlässt einen einzelnen Wert dem Feld", () => {
    expect(splitClipboard("42")).toBeNull();
    expect(splitClipboard("42\n")).toBeNull();
  });

  it("nimmt auch eine einzelne Spalte", () => {
    expect(splitClipboard("1\n2")).toEqual([["1"], ["2"]]);
  });
});

describe("pasteCells", () => {
  it("schreibt Werte ab dem gewählten Feld, im deutschen Zahlenformat", () => {
    const next = pasteCells(spec(), [["1.234,5"], ["7"]], { row: 0, column: 2, maxSeries: Infinity });
    expect(next.series[0].values).toEqual([1234.5, 7]);
  });

  it("schreibt Achsen und Einheiten in die ersten beiden Spalten", () => {
    const next = pasteCells(spec(), [["Gewicht", "t", "3"]], { row: 1, column: 0, maxSeries: Infinity });
    expect(next.categories[1]).toEqual({ label: "Gewicht", unit: "t" });
    expect(next.series[0].values).toEqual([1, 3]);
  });

  it("legt fehlende Achsen und Reihen an, statt den Rest zu verwerfen", () => {
    const next = pasteCells(spec(), [["5", "6"], ["7", "8"]], { row: 1, column: 2, maxSeries: Infinity });
    expect(next.categories).toHaveLength(3);
    expect(next.series).toHaveLength(2);
    expect(next.series.map((series) => series.values)).toEqual([
      [1, 5, 7],
      [null, 6, 8],
    ]);
  });

  it("füllt im Kuchen nur die sichtbare Reihe", () => {
    const next = pasteCells(spec({ type: "pie" }), [["5", "6"]], { row: 0, column: 2, maxSeries: 1 });
    expect(next.series).toHaveLength(1);
    expect(next.series[0].values).toEqual([5, 2]);
  });

  it("legt im leeren Kuchen die eine Reihe an", () => {
    const next = pasteCells(spec({ type: "pie", series: [] }), [["5"], ["6"]], { row: 0, column: 2, maxSeries: 1 });
    expect(next.series).toEqual([{ name: "", values: [5, 6] }]);
  });

  it("macht aus Unlesbarem eine Lücke", () => {
    const next = pasteCells(spec(), [["k. A."]], { row: 0, column: 2, maxSeries: Infinity });
    expect(next.series[0].values[0]).toBeNull();
  });
});
