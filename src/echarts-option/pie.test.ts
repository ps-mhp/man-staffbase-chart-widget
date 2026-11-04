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
import { prepareSpec } from "../chart-prepare";
import { readChartTheme } from "../man-chart-theme";
import { pieOption } from "./pie";

const theme = readChartTheme(document.createElement("div"));
const SIZE = { width: 640, height: 360 };

const spec = (patch: Partial<ChartSpec> = {}): ChartSpec => ({
  version: 1,
  type: "pie",
  legend: { show: true, position: "top" },
  categories: [{ label: "Antrieb", unit: "%" }, { label: "Aufbau", unit: "%" }],
  series: [{ name: "Anteil", values: [60, 40] }],
  ...patch,
});

type PieDataEntry = { name: string; value: number; itemStyle: { color: string } };
type LabelFormatterArgs = { dataIndex?: number; name?: string; percent?: number };
type PieSeriesEntry = {
  type: string;
  name: string;
  radius: [string, string];
  data: PieDataEntry[];
  label: { show: boolean; formatter: (args: LabelFormatterArgs) => string };
};
type PieOption = {
  series: PieSeriesEntry[];
  legend: { show: boolean; data: string[] };
};

// Getippte Rueckgabe statt des im Plan vorgegebenen `Record<string, any>`:
// Das Projekt verbietet `any` per ESLint, der Plantext widersprach dieser
// bestehenden Regel (siehe `cartesian.test.ts`, dieselbe Abweichung dort).
const build = (patch: Partial<ChartSpec> = {}): PieOption => {
  const given = spec(patch);
  return pieOption(prepareSpec(given, theme.palette), theme, "de-DE", SIZE) as unknown as PieOption;
};

describe("pieOption", () => {
  it("macht genau eine Serie", () => {
    expect(build().series).toHaveLength(1);
    expect(build().series[0].type).toBe("pie");
  });

  it("macht ein Segment je Kategorie", () => {
    expect(build().series[0].data.map((d) => d.name)).toEqual(["Antrieb", "Aufbau"]);
    expect(build().series[0].data.map((d) => d.value)).toEqual([60, 40]);
  });

  it("zeichnet nur die erste Serie", () => {
    const option = build({ series: [{ name: "a", values: [60, 40] }, { name: "b", values: [1, 2] }] });
    expect(option.series[0].data.map((d) => d.value)).toEqual([60, 40]);
  });

  it("listet die Kategorien in der Legende, nicht die Serien", () => {
    expect(build().legend.data).toEqual(["Antrieb", "Aufbau"]);
  });

  it("faerbt nach Kategorienfarbe, sonst nach Palette", () => {
    const option = build({ categories: [{ label: "A", color: "#f00" }, { label: "B" }] });
    expect(option.series[0].data[0].itemStyle.color).toBe("#f00");
    expect(option.series[0].data[1].itemStyle.color).toBe(theme.palette[1]);
  });

  it("laesst Luecken heraus", () => {
    expect(build({ series: [{ name: "x", values: [60, null] }] }).series[0].data).toHaveLength(1);
  });

  it("laesst negative Werte heraus, statt sie zu zeichnen", () => {
    expect(build({ series: [{ name: "x", values: [60, -40] }] }).series[0].data).toHaveLength(1);
  });

  it("macht ohne Innenradius einen Vollkreis", () => {
    expect(build().series[0].radius).toEqual(["0%", "70%"]);
  });

  it("macht mit Innenradius einen Ring", () => {
    const option = build({ display: { type: "pie", innerRadius: 45, label: "percent" } });
    expect(option.series[0].radius).toEqual(["45%", "70%"]);
  });

  it("beschriftet standardmaessig mit dem Anteil", () => {
    expect(build().series[0].label.show).toBe(true);
  });

  it("blendet die Beschriftung aus", () => {
    const option = build({ display: { type: "pie", innerRadius: 0, label: "none" } });
    expect(option.series[0].label.show).toBe(false);
  });

  it("beschriftet mit dem Absolutwert samt Einheit", () => {
    const option = build({ display: { type: "pie", innerRadius: 0, label: "value" } });
    const text = option.series[0].label.formatter({ dataIndex: 0, percent: 60 });
    expect(text).toContain("60");
    expect(text).toContain("%");
  });

  it("bleibt leer, wenn keine Kategorie einen Wert hat", () => {
    expect(build({ series: [] }).series[0].data).toEqual([]);
  });
});
