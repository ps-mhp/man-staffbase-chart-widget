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

import { Category, ChartSpec, Series } from "../chart-model";
import { PreparedSeries } from "../chart-prepare";
import { NORMALIZED_MAX, axisBounds, scaleSeries } from "./radar-scale";

const categories = (...labels: string[]): Category[] => labels.map((label) => ({ label }));

const prepared = (values: (number | null)[]): PreparedSeries => ({
  name: "s",
  color: "#000",
  values,
});

describe("axisBounds", () => {
  it("verankert ohne eigene Angabe an der Null statt am kleinsten Wert", () => {
    const series: Series[] = [{ name: "a", values: [240] }, { name: "b", values: [600] }];
    expect(axisBounds(categories("Energie"), series)[0]).toEqual({ min: 0, max: 600, inverted: false });
  });

  it("bleibt bei negativen Werten am Datenrand", () => {
    const series: Series[] = [{ name: "a", values: [-5] }, { name: "b", values: [3] }];
    expect(axisBounds(categories("Delta"), series)[0]).toEqual({ min: -5, max: 3, inverted: false });
  });

  it("spreizt eine Achse ohne Spannweite haelftig auf", () => {
    // Abweichung vom Brief-Wortlaut: Werte von 7 wuerden axisBounds nicht
    // flach treffen, weil ohne eigene Angabe an der Null verankert wird
    // (min = Math.min(0, 7) = 0, max = Math.max(0, 7) = 7 - keine
    // Division durch null). Abflachung tritt nur ein, wenn der Datenwert
    // selbst 0 ist.
    const series: Series[] = [{ name: "a", values: [0] }, { name: "b", values: [0] }];
    expect(axisBounds(categories("Flach"), series)[0]).toEqual({ min: -0.5, max: 0.5, inverted: false });
  });

  it("dreht eigene Grenzen um, wenn min groesser als max ist", () => {
    const given: Category[] = [{ label: "Dreh", min: 10, max: 2 }];
    expect(axisBounds(given, [{ name: "a", values: [5] }])[0]).toMatchObject({ min: 2, max: 10 });
  });

  it("uebernimmt inverted aus der Kategorie", () => {
    const given: Category[] = [{ label: "Gewicht", inverted: true }];
    expect(axisBounds(given, [{ name: "a", values: [2] }])[0].inverted).toBe(true);
  });

  it("laesst gesetzte Grenzen stehen", () => {
    const given: Category[] = [{ label: "t", min: 0, max: 5 }, { label: "kWh" }];
    const series: Series[] = [{ name: "A", values: [1.8, 240] }, { name: "B", values: [4.4, 600] }];
    expect(axisBounds(given, series)[0]).toEqual({ min: 0, max: 5, inverted: false });
  });

  it("liefert 0 bis 1 fuer eine Achse ganz ohne Werte", () => {
    expect(axisBounds(categories("x"), [{ name: "A", values: [null] }])[0]).toEqual({
      min: 0,
      max: 1,
      inverted: false,
    });
  });

  it("ignoriert fehlende Werte bei der Spannweite", () => {
    const series: Series[] = [
      { name: "A", values: [null] },
      { name: "B", values: [3] },
      { name: "C", values: [9] },
    ];
    expect(axisBounds(categories("x"), series)[0]).toEqual({ min: 0, max: 9, inverted: false });
  });
});

describe("scaleSeries", () => {
  it("rechnet auf 0 bis 100", () => {
    const bounds = axisBounds(categories("Energie"), [{ name: "a", values: [0] }, { name: "b", values: [600] }]);
    expect(scaleSeries([prepared([300])], bounds)[0][0]).toBe(NORMALIZED_MAX / 2);
  });

  it("dreht eine umgekehrte Achse", () => {
    const bounds = axisBounds([{ label: "Gewicht", inverted: true, min: 0, max: 10 }], []);
    expect(scaleSeries([prepared([2])], bounds)[0][0]).toBe(80);
  });

  it("dreht invertierte Achsen, damit 'besser' immer weiter aussen liegt", () => {
    const given: Category[] = [{ label: "Gewicht", inverted: true }, { label: "Energie" }];
    const series: Series[] = [
      { name: "MAN", values: [1.8, 240] },
      { name: "MB", values: [4.4, 600] },
    ];
    const bounds = axisBounds(given, series);
    const normalized = scaleSeries([prepared([1.8, 240]), prepared([4.4, 600])], bounds);
    // 1,8 t ist der kleinere und damit bessere Wert -> weiter aussen. Die
    // Achse laeuft von 0 bis 4,4; ganz aussen liegt deshalb erst die Null.
    expect(normalized[0][0]).toBeGreaterThan(normalized[1][0] as number);
    expect(normalized[1][0]).toBe(0);
  });

  it("begrenzt Ausreisser auf den Rand", () => {
    const bounds = axisBounds([{ label: "Grenze", min: 0, max: 10 }], []);
    expect(scaleSeries([prepared([25])], bounds)[0][0]).toBe(NORMALIZED_MAX);
  });

  it("reicht null unveraendert durch", () => {
    const bounds = axisBounds([{ label: "Luecke", min: 0, max: 10 }], []);
    expect(scaleSeries([prepared([null])], bounds)[0][0]).toBeNull();
  });
});

describe("ChartSpec-Vollstaendigkeit", () => {
  it("rechnet ueber mehrere Achsen und Serien hinweg", () => {
    const spec: ChartSpec = {
      version: 1,
      type: "radar",
      legend: { show: true, position: "top" },
      categories: [{ label: "A", min: 0, max: 10 }, { label: "B", min: 0, max: 100 }],
      series: [{ name: "x", values: [5, 50] }],
    };
    const bounds = axisBounds(spec.categories, spec.series);
    expect(scaleSeries([prepared([5, 50])], bounds)[0]).toEqual([50, 50]);
  });
});
