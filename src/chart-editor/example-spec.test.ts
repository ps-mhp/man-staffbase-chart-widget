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

import { CHART_TYPES, ChartType } from "../chart-model";
import { exampleSpec, starterSpec } from "./example-spec";

describe.each(CHART_TYPES)("Vorlagen für %s", (type: ChartType) => {
  it("hat den verlangten Typ", () => {
    expect(exampleSpec(type).type).toBe(type);
    expect(starterSpec(type).type).toBe(type);
  });

  it("hat Achsen und Serien", () => {
    const spec = exampleSpec(type);
    expect(spec.categories.length).toBeGreaterThan(1);
    expect(spec.series.length).toBeGreaterThan(0);
  });

  it("hat zu jeder Achse einen Wert je Serie", () => {
    const spec = exampleSpec(type);
    for (const series of spec.series) expect(series.values).toHaveLength(spec.categories.length);
  });

  it("traegt die passenden Anzeigeoptionen oder gar keine", () => {
    const display = exampleSpec(type).display;
    if (display !== undefined) expect(display.type).toBe(type);
  });
});

describe("Vorlage für pie", () => {
  it("hat genau eine Serie, weil nur die erste gezeichnet wird", () => {
    expect(exampleSpec("pie").series).toHaveLength(1);
  });

  it("nennt ueberall dieselbe Einheit", () => {
    const units = new Set(exampleSpec("pie").categories.map((c) => c.unit));
    expect(units.size).toBe(1);
  });

  it("hat keine negativen Anteile", () => {
    for (const value of exampleSpec("pie").series[0].values) expect(value ?? 0).toBeGreaterThanOrEqual(0);
  });
});

describe("Vorlagen für bar und line", () => {
  it.each(["bar", "line"] as const)("nennt bei %s ueberall dieselbe Einheit", (type) => {
    const units = new Set(exampleSpec(type).categories.map((c) => c.unit));
    expect(units.size).toBe(1);
  });
});
