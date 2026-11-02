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

import { SERIES_PALETTE, echartsTheme, readChartTheme } from "./man-chart-theme";

describe("SERIES_PALETTE", () => {
  it("führt die Farben in der festgelegten Reihenfolge, Primärrot zuerst", () => {
    expect(SERIES_PALETTE[0]).toBe("#e40045");
    expect(SERIES_PALETTE).toHaveLength(6);
    expect(new Set(SERIES_PALETTE).size).toBe(SERIES_PALETTE.length);
  });
});

describe("readChartTheme", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("liefert die Fallbackwerte, wenn kein Element da ist", () => {
    const theme = readChartTheme(null);
    expect(theme.text).toBe("#303c49");
    expect(theme.palette).toEqual(SERIES_PALETTE);
  });

  it("nimmt gesetzte Tokens vom Element", () => {
    const el = document.createElement("div");
    el.style.setProperty("--man-text", "rgb(10, 20, 30)");
    el.style.setProperty("--man-font-body", "Arial");
    document.body.appendChild(el);

    const theme = readChartTheme(el);
    expect(theme.text).toBe("rgb(10, 20, 30)");
    expect(theme.fontFamily).toBe("Arial");
  });

  it("ignoriert leere Tokens, statt eine leere Farbe an ECharts zu geben", () => {
    const el = document.createElement("div");
    el.style.setProperty("--man-text", "   ");
    document.body.appendChild(el);
    expect(readChartTheme(el).text).toBe("#303c49");
  });
});

describe("echartsTheme", () => {
  it("trägt Schrift und Farben, damit die Übersetzer sie nicht je Typ wiederholen", () => {
    const theme = { ...readChartTheme(null), fontFamily: "TestFont" };
    const option = echartsTheme(theme) as {
      textStyle: { fontFamily: string; color: string };
      color: string[];
    };
    expect(option.textStyle.fontFamily).toBe("TestFont");
    expect(option.textStyle.color).toBe(theme.text);
    expect(option.color).toEqual([...SERIES_PALETTE]);
  });

  it("setzt einen durchsichtigen Hintergrund, damit die Seitenfarbe durchscheint", () => {
    expect((echartsTheme(readChartTheme(null)) as { backgroundColor: string }).backgroundColor).toBe("transparent");
  });
});
