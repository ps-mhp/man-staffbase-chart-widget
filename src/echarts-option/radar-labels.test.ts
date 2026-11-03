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

import {
  LABEL_GAP,
  axisDirection,
  axisNameGaps,
  axisNameLabels,
  separateLabels,
  valueLabels,
} from "./radar-labels";

const CENTER = { centerX: 200, centerY: 200, radius: 100 };

describe("axisDirection", () => {
  it("setzt die erste Achse senkrecht nach oben", () => {
    const first = axisDirection(0, 4);
    expect(first.x).toBeCloseTo(0, 6);
    expect(first.y).toBeCloseTo(-1, 6);
  });

  it("läuft gegen den Uhrzeigersinn weiter, so wie ECharts die Achsen verteilt", () => {
    const second = axisDirection(1, 4);
    expect(second.x).toBeCloseTo(-1, 6);
    expect(second.y).toBeCloseTo(0, 6);
  });
});

describe("valueLabels", () => {
  const build = (values: (number | null)[][]) =>
    valueLabels({
      ...CENTER,
      axisCount: 2,
      series: values.map((normalized, index) => ({ color: `c${index}`, normalized })),
      text: (seriesIndex, axisIndex) => `s${seriesIndex}a${axisIndex}`,
    });

  it("richtet die Zahl so aus, dass sie vom Mittelpunkt weg wächst", () => {
    // Achse 1 zeigt bei zwei Achsen nach unten.
    const [top, bottom] = build([[100, 100]]);
    expect(top.verticalAlign).toBe("bottom");
    expect(bottom.verticalAlign).toBe("top");
  });

  it("setzt die Zahl außerhalb ihres Punktes", () => {
    const [top] = build([[100, null]]);
    expect(top.y).toBeCloseTo(CENTER.centerY - CENTER.radius - LABEL_GAP, 6);
  });

  it("fächert zwei Serien senkrecht auf, damit sie nicht übereinander liegen", () => {
    const [first, second] = build([
      [100, null],
      [100, null],
    ]);
    expect(Math.abs(first.y - second.y)).toBeGreaterThan(10);
  });

  it("stellt den größeren Wert auf die Außenseite, damit die Auffächerung den Abstand nicht aufhebt", () => {
    // Beide auf derselben nach oben zeigenden Achse: Der größere Wert liegt
    // weiter oben und muss auch die obere Zeile bekommen.
    const [small, large] = build([
      [40, null],
      [90, null],
    ]);
    expect(large.y).toBeLessThan(small.y);
  });

  it("lässt einen fehlenden Wert aus", () => {
    expect(build([[null, 50]]).map((label) => label.text)).toEqual(["s0a1"]);
  });
});

describe("axisNameGaps", () => {
  it("hält seitlich mehr Platz frei als oben, weil die Zahl dort in die Breite geht", () => {
    const gaps = axisNameGaps({ axisCount: 4, seriesCount: 2, valueWidth: 60, valueLine: 16 });
    // Achse 0 zeigt nach oben, Achse 1 zur Seite.
    expect(gaps[1]).toBeGreaterThan(gaps[0]);
  });

  it("wächst mit der Zahl der Serien, weil die Auffächerung Höhe braucht", () => {
    const base = { axisCount: 4, valueWidth: 60, valueLine: 16 };
    const two = axisNameGaps({ ...base, seriesCount: 2 })[0];
    const four = axisNameGaps({ ...base, seriesCount: 4 })[0];
    expect(four).toBeGreaterThan(two);
  });
});

describe("axisNameLabels", () => {
  it("setzt jeden Namen um seinen eigenen Abstand nach außen", () => {
    const [top] = axisNameLabels({
      ...CENTER,
      names: ["oben", "unten"],
      gaps: [40, 10],
      color: "#000",
    });
    expect(top.y).toBeCloseTo(CENTER.centerY - CENTER.radius - 40, 6);
    expect(top.verticalAlign).toBe("bottom");
  });
});

describe("separateLabels", () => {
  it("rückt zwei Zahlen auseinander, die übereinander liegen", () => {
    const stacked = [0, 1].map(() => ({
      x: 100,
      y: 100,
      text: "4,4 t",
      color: "#000",
      align: "left" as const,
      verticalAlign: "middle" as const,
    }));
    const [first, second] = separateLabels(stacked, 12, 16);
    expect(Math.abs(first.y - second.y)).toBeGreaterThanOrEqual(16);
  });

  it("lässt Zahlen in Ruhe, die sich ohnehin nicht berühren", () => {
    const apart = [
      { x: 0, y: 0, text: "a", color: "#000", align: "left" as const, verticalAlign: "top" as const },
      { x: 0, y: 90, text: "b", color: "#000", align: "left" as const, verticalAlign: "top" as const },
    ];
    expect(separateLabels(apart, 12, 16)).toEqual(apart);
  });
});
