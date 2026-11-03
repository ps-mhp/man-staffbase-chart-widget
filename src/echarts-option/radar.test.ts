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
import { normalizeSpec } from "../chart-normalize";
import { SERIES_PALETTE, readChartTheme } from "../man-chart-theme";
import { radarOption } from "./radar";

const spec: ChartSpec = {
  version: 1,
  type: "radar",
  title: "eTGX gegen eActros 600",
  footnote: "Besser ist weiter außen.",
  legend: { show: true, position: "top" },
  categories: [
    { label: "Batteriegewicht [t]", inverted: true, unit: "t", decimals: 1 },
    { label: "Energie [kWh]", unit: "kWh", decimals: 0 },
  ],
  series: [
    { name: "MAN eTGX", values: [1.8, 240] },
    { name: "Mercedes-Benz eActros 600", values: [4.4, 600] },
  ],
};

const theme = readChartTheme(null);
/** Eine typische Containergröße; einzelne Tests geben eine eigene vor. */
const SIZE = { width: 640, height: 420 };
const build = (s: ChartSpec = spec, size = SIZE) =>
  radarOption(normalizeSpec(s, SERIES_PALETTE), theme, "de-DE", size);

type Indicator = { name: string; min: number; max: number };
type RadarAxis = { indicator: Indicator[]; splitNumber: number };
type SeriesEntry = { name: string; value: (number | null)[]; itemStyle: { color: string } };

type GraphicText = { style: { text: string; fontWeight?: number } };

const graphicTexts = (option: unknown): GraphicText[] =>
  (option as { graphic: { elements: GraphicText[] } }).graphic.elements;

/** Die Wertelabels sind die fetten unter den Textelementen. */
const valueTexts = (option: unknown): string[] =>
  graphicTexts(option)
    .filter((element) => element.style.fontWeight === 600)
    .map((element) => element.style.text);

describe("radarOption", () => {
  it("gibt jeder Achse dieselbe Skala, weil die Umrechnung schon passiert ist", () => {
    const radar = (build() as { radar: RadarAxis }).radar;
    expect(radar.indicator).toEqual([
      { name: "Batteriegewicht [t]", min: 0, max: 100 },
      { name: "Energie [kWh]", min: 0, max: 100 },
    ]);
  });

  it("legt alle Serien in eine ECharts-Serie, wie das Radar es verlangt", () => {
    const series = (build() as { series: [{ type: string; data: SeriesEntry[] }] }).series;
    expect(series).toHaveLength(1);
    expect(series[0].type).toBe("radar");
    expect(series[0].data.map((d) => d.name)).toEqual(["MAN eTGX", "Mercedes-Benz eActros 600"]);
  });

  it("gibt ECharts die normalisierten Werte, nicht die Rohwerte", () => {
    const data = (build() as { series: [{ data: SeriesEntry[] }] }).series[0].data;
    // Gewicht ist invertiert und laeuft von 0 bis 4,4: 1,8 t liegt bei 59.
    expect(data[0].value[0]).toBeCloseTo(59.09, 2);
    expect(data[0].value[1]).toBe(40);
  });

  it("färbt jede Serie aus der Palette", () => {
    const data = (build() as { series: [{ data: SeriesEntry[] }] }).series[0].data;
    expect(data[0].itemStyle.color).toBe(SERIES_PALETTE[0]);
    expect(data[1].itemStyle.color).toBe(SERIES_PALETTE[1]);
  });

  it("schreibt an jeden Punkt den Rohwert mit Einheit", () => {
    // Die Zahlen setzt das Widget selbst als Textelemente: ECharts kann ein
    // Label am Radar nicht nach außen ausrichten.
    expect(valueTexts(build())).toEqual(
      expect.arrayContaining(["1,8\u00a0t", "240\u00a0kWh", "4,4\u00a0t", "600\u00a0kWh"]),
    );
  });

  it("laesst einen fehlenden Wert weg, statt eine Zahl zu erfinden", () => {
    const sparse = { ...spec, series: [{ name: "A", values: [null, 240] }] };
    expect(valueTexts(build(sparse))).toEqual(["240\u00a0kWh"]);
  });

  it("schreibt jede Achsenbeschriftung selbst, damit ihr Abstand zur Richtung passt", () => {
    const texts = graphicTexts(build()).map((element) => element.style.text);
    expect(texts).toEqual(expect.arrayContaining(["Batteriegewicht [t]", "Energie [kWh]"]));
    // ECharts darf sie dann nicht noch einmal setzen.
    expect((build() as { radar: { axisName: { show: boolean } } }).radar.axisName.show).toBe(false);
  });

  it("nennt im Tooltip jede Achse mit Rohwert", () => {
    const tooltip = (build() as { tooltip: { formatter: (p: unknown) => string } }).tooltip;
    const html = tooltip.formatter({ dataIndex: 0, name: "MAN eTGX", color: "#e40045" });
    expect(html).toContain("MAN eTGX");
    expect(html).toContain("Batteriegewicht [t]");
    expect(html).toContain("1,8\u00a0t");
    expect(html).toContain("240\u00a0kWh");
  });

  it("hält den Tooltip im Container, damit er nicht aus dem Shadow-Root ragt", () => {
    expect((build() as { tooltip: { confine: boolean } }).tooltip.confine).toBe(true);
  });

  it("blendet die Legende aus, wenn sie abgeschaltet ist", () => {
    const hidden = { ...spec, legend: { show: false, position: "top" as const } };
    expect((build(hidden) as { legend: { show: boolean } }).legend.show).toBe(false);
  });

  it("stellt die Legende nach unten, wenn das eingestellt ist", () => {
    const bottom = { ...spec, legend: { show: true, position: "bottom" as const } };
    expect((build(bottom) as { legend: { bottom: number } }).legend.bottom).toBe(0);
  });

  it("nimmt die Zahl der Ringe aus den Anzeigeoptionen", () => {
    const seven = { ...spec, display: { type: "radar" as const, gridLevels: 7, filled: false } };
    expect((build(seven) as { radar: RadarAxis }).radar.splitNumber).toBe(7);
  });

  it("füllt die Flächen nur, wenn das verlangt ist", () => {
    const plain = (build() as { series: [{ data: { areaStyle?: unknown }[] }] }).series[0].data[0];
    expect(plain.areaStyle).toBeUndefined();

    const filledSpec = { ...spec, display: { type: "radar" as const, gridLevels: 5, filled: true } };
    const filled = (build(filledSpec) as { series: [{ data: { areaStyle?: { opacity: number } }[] }] }).series[0].data[0];
    expect(filled.areaStyle?.opacity).toBeGreaterThan(0);
  });

  it("setzt Titel und Fußnote", () => {
    const title = (build() as { title: { text: string; subtext: string } }).title;
    expect(title.text).toBe("eTGX gegen eActros 600");
    expect(title.subtext).toBe("Besser ist weiter außen.");
  });

  it("schaltet die Vorlesbarkeit ein", () => {
    expect((build() as { aria: { enabled: boolean } }).aria.enabled).toBe(true);
  });
});
