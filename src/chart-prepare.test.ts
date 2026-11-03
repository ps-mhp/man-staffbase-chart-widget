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
import { prepareSpec } from "./chart-prepare";

const PALETTE = ["#aaa", "#bbb"] as const;

const spec = (series: ChartSpec["series"]): ChartSpec => ({
  version: 1,
  type: "radar",
  legend: { show: true, position: "top" },
  categories: [{ label: "A" }],
  series,
});

describe("prepareSpec", () => {
  it("vergibt Palettenfarben nach Position", () => {
    const result = prepareSpec(spec([{ name: "x", values: [1] }, { name: "y", values: [2] }]), PALETTE);
    expect(result.series.map((s) => s.color)).toEqual(["#aaa", "#bbb"]);
  });

  it("laesst eine eigene Farbe gewinnen", () => {
    const result = prepareSpec(spec([{ name: "x", values: [1], color: "#f00" }]), PALETTE);
    expect(result.series[0].color).toBe("#f00");
  });

  it("wiederholt die Palette, wenn es mehr Serien als Farben gibt", () => {
    const result = prepareSpec(
      spec([{ name: "a", values: [1] }, { name: "b", values: [1] }, { name: "c", values: [1] }]),
      PALETTE,
    );
    expect(result.series[2].color).toBe("#aaa");
  });

  it("reicht die Rohwerte unveraendert durch", () => {
    const result = prepareSpec(spec([{ name: "x", values: [600, null] }]), PALETTE);
    expect(result.series[0].values).toEqual([600, null]);
  });

  it("behaelt die Definition als Referenz", () => {
    const given = spec([{ name: "x", values: [1] }]);
    expect(prepareSpec(given, PALETTE).spec).toBe(given);
  });
});
