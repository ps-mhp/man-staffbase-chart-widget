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
import { barOption, lineOption } from "./cartesian";

const theme = readChartTheme(document.createElement("div"));
const SIZE = { width: 640, height: 360 };

const spec = (patch: Partial<ChartSpec> = {}): ChartSpec => ({
  version: 1,
  type: "bar",
  legend: { show: true, position: "top" },
  categories: [{ label: "Reichweite", unit: "km" }, { label: "Ladeleistung", unit: "km" }],
  series: [{ name: "eTGX", values: [740, 750] }, { name: "eActros", values: [500, 1000] }],
  ...patch,
});

type BarSeriesEntry = {
  type: string;
  name: string;
  data: (number | null)[];
  itemStyle: { color: string };
  stack?: string;
};
type BarAxis = { type: string; data?: string[]; name?: string };
type BarOption = {
  xAxis: BarAxis;
  yAxis: BarAxis;
  series: BarSeriesEntry[];
  grid: { containLabel: boolean };
  tooltip: { trigger: string };
  legend: { show: boolean; data: string[] };
  title: { text?: string; subtext?: string };
};

const build = (patch: Partial<ChartSpec> = {}): BarOption => {
  const given = spec(patch);
  return barOption(prepareSpec(given, theme.palette), theme, "de-DE", SIZE) as unknown as BarOption;
};

type LineSeriesEntry = BarSeriesEntry & {
  smooth?: boolean;
  symbol?: string;
  areaStyle?: { color: string };
};
type LineOption = Omit<BarOption, "series"> & { series: LineSeriesEntry[] };

describe("barOption", () => {
  it("setzt die Kategorien auf die x-Achse", () => {
    const option = build();
    expect(option.xAxis).toMatchObject({ type: "category", data: ["Reichweite", "Ladeleistung"] });
    expect(option.yAxis).toMatchObject({ type: "value" });
  });

  it("macht eine Serie je Definition", () => {
    const option = build();
    expect(option.series).toHaveLength(2);
    expect(option.series[0]).toMatchObject({ type: "bar", name: "eTGX", data: [740, 750] });
  });

  it("faerbt nach der Palette", () => {
    const option = build();
    expect(option.series[0].itemStyle.color).toBe(theme.palette[0]);
    expect(option.series[1].itemStyle.color).toBe(theme.palette[1]);
  });

  it("stapelt auf Wunsch", () => {
    const option = build({ display: { type: "bar", stacked: true, orientation: "vertical" } });
    expect(option.series.every((s) => s.stack === "total")).toBe(true);
  });

  it("stapelt standardmaessig nicht", () => {
    expect(build().series[0].stack).toBeUndefined();
  });

  it("tauscht die Achsen bei liegenden Balken", () => {
    const option = build({ display: { type: "bar", stacked: false, orientation: "horizontal" } });
    expect(option.yAxis).toMatchObject({ type: "category", data: ["Reichweite", "Ladeleistung"] });
    expect(option.xAxis).toMatchObject({ type: "value" });
  });

  it("beschriftet die Werteachse, wenn alle Kategorien dieselbe Einheit nennen", () => {
    const option = build();
    expect(option.yAxis.name).toBe("km");
  });

  it("laesst die Einheit weg, wenn die Kategorien sich unterscheiden", () => {
    const option = build({ categories: [{ label: "A", unit: "km" }, { label: "B", unit: "kWh" }] });
    expect(option.yAxis.name).toBeUndefined();
  });

  it("uebergeht Kategorien ohne Werte bei der Einheitenpruefung", () => {
    const option = build({
      categories: [{ label: "A", unit: "km" }, { label: "B", unit: "kWh" }],
      series: [{ name: "x", values: [1, null] }],
    });
    expect(option.yAxis.name).toBe("km");
  });

  it("laesst ECharts die Flaeche aufteilen", () => {
    expect(build().grid).toMatchObject({ containLabel: true });
  });

  it("zeigt alle Serien einer Kategorie im Tooltip", () => {
    expect(build().tooltip).toMatchObject({ trigger: "axis" });
  });

  it("listet die Serien in der Legende", () => {
    expect(build().legend).toMatchObject({ show: true, data: ["eTGX", "eActros"] });
  });

  it("blendet die Legende aus", () => {
    expect(build({ legend: { show: false, position: "top" } }).legend.show).toBe(false);
  });

  it("uebernimmt Titel und Fussnote", () => {
    const option = build({ title: "Vergleich", footnote: "Je 4x2" });
    expect(option.title.text).toBe("Vergleich");
    expect(option.title.subtext).toBe("Je 4x2");
  });

  it("reicht Luecken als null durch, statt sie zu Null zu machen", () => {
    const option = build({ series: [{ name: "x", values: [null, 5] }] });
    expect(option.series[0].data[0]).toBeNull();
  });
});

describe("lineOption", () => {
  // Getippte Rueckgabe statt des im Plan vorgegebenen `Record<string, any>`:
  // Das Projekt verbietet `any` per ESLint, der Plantext widersprach dieser
  // bestehenden Regel.
  const buildLine = (display?: ChartSpec["display"]): LineOption => {
    const given = spec({ type: "line", display });
    return lineOption(prepareSpec(given, theme.palette), theme, "de-DE", SIZE) as unknown as LineOption;
  };

  it("macht Linienserien", () => {
    expect(buildLine().series[0]).toMatchObject({ type: "line", name: "eTGX" });
  });

  it("glaettet auf Wunsch", () => {
    expect(buildLine({ type: "line", smooth: true, area: false, showPoints: true }).series[0].smooth).toBe(true);
  });

  it("fuellt die Flaeche auf Wunsch", () => {
    const option = buildLine({ type: "line", smooth: false, area: true, showPoints: true });
    expect(option.series[0].areaStyle?.color).toBe(theme.palette[0]);
  });

  it("laesst die Flaeche standardmaessig weg", () => {
    expect(buildLine().series[0].areaStyle).toBeUndefined();
  });

  it("blendet die Punkte aus", () => {
    expect(buildLine({ type: "line", smooth: false, area: false, showPoints: false }).series[0].symbol).toBe("none");
  });

  it("zeigt die Punkte standardmaessig", () => {
    expect(buildLine().series[0].symbol).toBe("circle");
  });

  it("stapelt nie, auch nicht mit Balkenoptionen", () => {
    const given = spec({ type: "line", display: { type: "bar", stacked: true, orientation: "vertical" } });
    // `lineOption` direkt aufgerufen (nicht über `buildLine`) liefert laut Signatur
    // `Record<string, unknown>`; der Cast ist hier noetig, weil der Plan diesen Test ohne
    // ihn vorgab und `option.series` sonst als `unknown` indiziert wuerde.
    const option = lineOption(prepareSpec(given, theme.palette), theme, "de-DE", SIZE) as unknown as LineOption;
    expect(option.series[0].stack).toBeUndefined();
  });

  it("kippt nie, auch nicht mit Balkenoptionen", () => {
    const given = spec({ type: "line", display: { type: "bar", stacked: false, orientation: "horizontal" } });
    const option = lineOption(prepareSpec(given, theme.palette), theme, "de-DE", SIZE) as unknown as LineOption;
    expect(option.xAxis).toMatchObject({ type: "category" });
  });
});
