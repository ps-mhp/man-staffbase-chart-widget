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

import { ChartSpec } from "./chart-model";
import { validateSpec } from "./chart-validate";

const spec = (patch: Partial<ChartSpec>): ChartSpec => ({
  version: 1,
  type: "pie",
  legend: { show: true, position: "top" },
  categories: [{ label: "Antrieb" }, { label: "Aufbau" }],
  series: [{ name: "Anteil", values: [60, 40] }],
  ...patch,
});

describe("validateSpec", () => {
  it("meldet nichts bei sauberen Anteilen", () => {
    expect(validateSpec(spec({}))).toEqual([]);
  });

  it("meldet einen negativen Anteil mit Kategorienamen", () => {
    const problems = validateSpec(spec({ series: [{ name: "Anteil", values: [60, -5] }] }));
    expect(problems).toEqual([{ code: "negative-share", detail: "Aufbau" }]);
  });

  it("meldet jede betroffene Kategorie einzeln", () => {
    const problems = validateSpec(spec({ series: [{ name: "Anteil", values: [-1, -2] }] }));
    expect(problems).toHaveLength(2);
  });

  it("sieht nur die erste Serie an, weil nur die gezeichnet wird", () => {
    const problems = validateSpec(
      spec({ series: [{ name: "a", values: [60, 40] }, { name: "b", values: [-9, -9] }] }),
    );
    expect(problems).toEqual([]);
  });

  it("laesst negative Werte bei allen anderen Typen durch", () => {
    for (const type of ["radar", "bar", "line"] as const) {
      expect(validateSpec(spec({ type, series: [{ name: "x", values: [-5, 1] }] }))).toEqual([]);
    }
  });

  it("stoert sich nicht an Luecken", () => {
    expect(validateSpec(spec({ series: [{ name: "x", values: [null, 40] }] }))).toEqual([]);
  });

  it("kommt ohne Serien zurecht", () => {
    expect(validateSpec(spec({ series: [] }))).toEqual([]);
  });

  it("benennt eine namenlose Kategorie ueber ihre Position", () => {
    const problems = validateSpec(spec({ categories: [{ label: "" }], series: [{ name: "x", values: [-1] }] }));
    expect(problems[0].detail).toBe("Kategorie 1");
  });
});
