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
import { applyGrid, parseGrid } from "./grid-import";

describe("parseGrid", () => {
  it("liest eine aus Excel kopierte Tabelle mit Tabulatoren", () => {
    const grid = parseGrid("Modell\tGewicht\tEnergie\nMAN eTGX\t1,8\t240\neActros\t4,4\t600");
    expect(grid).toEqual({
      categories: ["Gewicht", "Energie"],
      rows: [
        { name: "MAN eTGX", values: [1.8, 240] },
        { name: "eActros", values: [4.4, 600] },
      ],
    });
  });

  it("liest auch Semikolon-getrennte Zeilen aus einer deutschen CSV", () => {
    const grid = parseGrid("Modell;Gewicht\nMAN;1,8");
    expect(grid?.rows[0].values).toEqual([1.8]);
  });

  it("versteht sowohl Komma als auch Punkt als Dezimaltrenner", () => {
    expect(parseGrid("x\tA\nS\t1.5")?.rows[0].values).toEqual([1.5]);
    expect(parseGrid("x\tA\nS\t1,5")?.rows[0].values).toEqual([1.5]);
  });

  it("macht aus leeren und unlesbaren Zellen eine Lücke statt einer Null", () => {
    // Eine 0 wäre eine Behauptung; eine Lücke ist die Wahrheit.
    expect(parseGrid("x\tA\tB\tC\nS\t\tk. A.\t3")?.rows[0].values).toEqual([null, null, 3]);
  });

  it("kommt mit Windows-Zeilenenden zurecht", () => {
    expect(parseGrid("x\tA\r\nS\t1")?.rows).toHaveLength(1);
  });

  it("überspringt leere Zeilen am Ende", () => {
    expect(parseGrid("x\tA\nS\t1\n\n")?.rows).toHaveLength(1);
  });

  it("liefert null, wenn es keine Datenzeile gibt", () => {
    expect(parseGrid("")).toBeNull();
    expect(parseGrid("nur eine Zeile")).toBeNull();
    expect(parseGrid("x\tA")).toBeNull();
  });
});

describe("applyGrid", () => {
  const base: ChartSpec = {
    version: 1,
    type: "radar",
    title: "Vergleich",
    legend: { show: true, position: "top" },
    categories: [{ label: "Gewicht", unit: "t", inverted: true }],
    series: [{ name: "alt", values: [9], color: "#123456" }],
  };

  it("ersetzt Kategorien und Serien", () => {
    const next = applyGrid(base, { categories: ["X", "Y"], rows: [{ name: "Neu", values: [1, 2] }] });
    expect(next.categories.map((c) => c.label)).toEqual(["X", "Y"]);
    expect(next.series).toEqual([{ name: "Neu", values: [1, 2] }]);
  });

  it("behält die Einstellungen gleichnamiger Kategorien, damit Einheiten nicht verloren gehen", () => {
    const next = applyGrid(base, { categories: ["Gewicht"], rows: [{ name: "Neu", values: [1] }] });
    expect(next.categories[0]).toEqual({ label: "Gewicht", unit: "t", inverted: true });
  });

  it("behält die Farbe einer gleichnamigen Serie", () => {
    const next = applyGrid(base, { categories: ["Gewicht"], rows: [{ name: "alt", values: [1] }] });
    expect(next.series[0].color).toBe("#123456");
  });

  it("rührt Titel und Legende nicht an", () => {
    const next = applyGrid(base, { categories: ["X"], rows: [{ name: "N", values: [1] }] });
    expect(next.title).toBe("Vergleich");
    expect(next.legend).toEqual(base.legend);
  });
});
