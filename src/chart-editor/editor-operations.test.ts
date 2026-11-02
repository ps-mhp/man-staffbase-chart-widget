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
import {
  addCategory,
  addSeries,
  moveSeries,
  removeCategory,
  removeSeries,
  setValue,
  updateCategory,
  updateSeries,
} from "./editor-operations";

const base: ChartSpec = {
  version: 1,
  type: "radar",
  legend: { show: true, position: "top" },
  categories: [{ label: "A" }, { label: "B" }],
  series: [
    { name: "S1", values: [1, 2] },
    { name: "S2", values: [3, 4] },
  ],
};

describe("editor-operations", () => {
  it("lässt die übergebene Definition unangetastet", () => {
    const copy = JSON.parse(JSON.stringify(base));
    addCategory(base);
    removeSeries(base, 0);
    setValue(base, 0, 0, 9);
    expect(base).toEqual(copy);
  });

  it("ergänzt bei einer neuen Kategorie in jeder Serie eine Lücke", () => {
    const next = addCategory(base);
    expect(next.categories).toHaveLength(3);
    expect(next.series.map((s) => s.values)).toEqual([
      [1, 2, null],
      [3, 4, null],
    ]);
  });

  it("entfernt mit einer Kategorie auch deren Spalte", () => {
    const next = removeCategory(base, 0);
    expect(next.categories.map((c) => c.label)).toEqual(["B"]);
    expect(next.series.map((s) => s.values)).toEqual([[2], [4]]);
  });

  it("trifft auch die mittlere Spalte, statt hinten abzuschneiden", () => {
    // Drei Kategorien mit eindeutigen Werten: Nur so faellt auf, wenn der
    // Code den letzten Wert kappt, statt den an der richtigen Stelle.
    const wide: ChartSpec = {
      ...base,
      categories: [{ label: "A" }, { label: "B" }, { label: "C" }],
      series: [{ name: "S", values: [10, 20, 30] }],
    };
    const next = removeCategory(wide, 1);
    expect(next.categories.map((c) => c.label)).toEqual(["A", "C"]);
    expect(next.series[0].values).toEqual([10, 30]);
  });

  it("schiebt beim Einfuegen einer Kategorie die Werte dahinter mit", () => {
    const wide: ChartSpec = {
      ...base,
      categories: [{ label: "A" }, { label: "B" }],
      series: [{ name: "S", values: [10, 20] }],
    };
    const next = addCategory(wide);
    expect(next.categories).toHaveLength(3);
    expect(next.series[0].values).toEqual([10, 20, null]);
  });

  it("ändert eine Kategorie, ohne die anderen zu berühren", () => {
    const next = updateCategory(base, 1, { inverted: true, unit: "t" });
    expect(next.categories[1]).toEqual({ label: "B", inverted: true, unit: "t" });
    expect(next.categories[0]).toEqual({ label: "A" });
  });

  it("legt eine neue Serie mit so vielen Lücken an, wie es Kategorien gibt", () => {
    const next = addSeries(base);
    expect(next.series[2].values).toEqual([null, null]);
  });

  it("entfernt eine Serie", () => {
    expect(removeSeries(base, 0).series.map((s) => s.name)).toEqual(["S2"]);
  });

  it("ändert Name und Farbe einer Serie", () => {
    const next = updateSeries(base, 0, { name: "MAN", color: "#123456" });
    expect(next.series[0]).toEqual({ name: "MAN", values: [1, 2], color: "#123456" });
  });

  it("setzt einen Wert und nimmt null für 'leer'", () => {
    expect(setValue(base, 1, 0, 7).series[1].values).toEqual([7, 4]);
    expect(setValue(base, 1, 0, null).series[1].values).toEqual([null, 4]);
  });

  it("verschiebt eine Serie und damit ihre Farbe aus der Palette", () => {
    expect(moveSeries(base, 1, -1).series.map((s) => s.name)).toEqual(["S2", "S1"]);
  });

  it("lässt eine Verschiebung über den Rand hinaus wirkungslos", () => {
    expect(moveSeries(base, 0, -1).series.map((s) => s.name)).toEqual(["S1", "S2"]);
    expect(moveSeries(base, 1, 1).series.map((s) => s.name)).toEqual(["S1", "S2"]);
  });
});
