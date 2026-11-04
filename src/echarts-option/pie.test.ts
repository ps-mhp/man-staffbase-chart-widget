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
  radius: [number, number];
  center: [string, number];
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
const build = (patch: Partial<ChartSpec> = {}, size = SIZE): PieOption => {
  const given = spec(patch);
  return pieOption(prepareSpec(given, theme.palette), theme, "de-DE", size) as unknown as PieOption;
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
    const [inner, outer] = build().series[0].radius;
    expect(inner).toBe(0);
    expect(outer).toBeGreaterThan(0);
  });

  it("macht mit Innenradius einen Ring, dessen Loch ein Anteil des Kuchens ist", () => {
    const [inner, outer] = build({ display: { type: "pie", innerRadius: 45, label: "percent" } }).series[0].radius;
    expect(inner).toBeCloseTo(outer * 0.45);
  });

  // Der Radius misst sich an der freien Flaeche. Ein fester Prozentwert des
  // Containers liess den Kuchen gross, waehrend die Legende ihm Hoehe nahm —
  // die Beschriftung des kleinsten Segments stiess dann in die Legende.
  it("verkleinert den Kuchen, wenn die Legende Hoehe wegnimmt", () => {
    const without = build({ legend: { show: false, position: "top" } }).series[0].radius[1];
    expect(build({ legend: { show: true, position: "top" } }).series[0].radius[1]).toBeLessThan(without);
  });

  it("faellt nie unter einen ablesbaren Radius", () => {
    expect(build({ title: "Titel" }, { width: 120, height: 60 }).series[0].radius[1]).toBeGreaterThan(0);
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

  it("bleibt leer, wenn alle Werte fehlen", () => {
    const option = build({ series: [{ name: "Anteil", values: [null, null] }] });
    expect(option.series[0].data).toEqual([]);
  });

  it("wiederholt die Palette, wenn es mehr Kategorien als Farben gibt", () => {
    const count = theme.palette.length + 2;
    const option = build({
      categories: Array.from({ length: count }, (_unused, index) => ({ label: `K${String(index)}` })),
      series: [{ name: "Anteil", values: Array.from({ length: count }, () => 1) }],
    });
    const colors = option.series[0].data.map((entry) => entry.itemStyle.color);
    expect(colors[theme.palette.length]).toBe(colors[0]);
    expect(new Set(colors).size).toBe(theme.palette.length);
  });

  // Der Mittelpunkt weicht dem aus, was Titel und Legende an Platz belegen.
  // Ohne diese Rechnung stiess das Label eines sehr kleinen Segments an der
  // 12-Uhr-Position in den Legendentext.
  it("schiebt die Legende unter eine vorhandene Fussnote", () => {
    const top = (patch: Partial<ChartSpec>): number =>
      (build(patch).legend as unknown as { top: number }).top;
    expect(top({ title: "Anteile", footnote: "Acht Jahre Haltedauer." })).toBeGreaterThan(
      top({ title: "Anteile" }),
    );
  });

  describe("Mittelpunkt", () => {
    const center = (patch: Partial<ChartSpec>): number => build(patch).series[0].center[1];
    const bare = { legend: { show: false, position: "top" } } as const;

    it("sitzt in der Containermitte, wenn nichts Platz wegnimmt", () => {
      expect(center(bare)).toBe(SIZE.height / 2);
    });

    it("rueckt nach unten, wenn die Legende oben steht", () => {
      expect(center({ legend: { show: true, position: "top" } })).toBeGreaterThan(SIZE.height / 2);
    });

    it("rueckt nach oben, wenn die Legende unten steht", () => {
      expect(center({ legend: { show: true, position: "bottom" } })).toBeLessThan(SIZE.height / 2);
    });

    it("rueckt weiter nach unten, wenn zusaetzlich ein Titel oben steht", () => {
      const withTitle = center({ title: "Aufteilung", legend: { show: true, position: "top" } });
      expect(withTitle).toBeGreaterThan(center({ legend: { show: true, position: "top" } }));
    });

    it("zaehlt auch eine Fussnote zum Titelblock", () => {
      expect(center({ footnote: "Quelle", ...bare })).toBeGreaterThan(center(bare));
    });

    // Der Fall, der die Rechnung noetig gemacht hat: Acht lange Namen passen
    // nicht in eine Zeile, ECharts bricht die Legende um, und ein fester
    // Prozentwert haette die zweite Zeile uebersehen.
    it("beruecksichtigt eine Legende, die auf mehrere Zeilen umbricht", () => {
      const many = {
        legend: { show: true, position: "top" } as const,
        categories: [
          "Antriebsstrang und Getriebe",
          "Fahrerhaus und Innenausstattung",
          "Rahmen und Fahrwerk",
          "Elektrik und Bordnetz",
          "Batteriesystem",
          "Aufbau und Sonderausstattung",
          "Lackierung",
          "Sonstiges",
        ].map((label) => ({ label })),
        series: [{ name: "Anteil", values: [28, 17, 14, 12, 11, 9, 6, 3] }],
      };
      const few = { legend: { show: true, position: "top" } as const };
      expect(center(many)).toBeGreaterThan(center(few));
    });

    it("bleibt im Container, wenn oben und unten mehr Platz belegt ist als vorhanden", () => {
      const value = build({ title: "Titel", footnote: "Quelle" }, { width: 200, height: 40 }).series[0].center[1];
      expect(value).toBeGreaterThanOrEqual(0);
      expect(Number.isFinite(value)).toBe(true);
    });
  });
});
