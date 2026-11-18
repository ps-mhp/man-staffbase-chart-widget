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
import { axisIssueIndexes, chartChangesStatus, issueTarget, validateChart } from "./editor-rules";

const spec = (patch: Partial<ChartSpec> = {}): ChartSpec => ({
  version: 1,
  type: "radar",
  legend: { show: true, position: "top" },
  categories: [{ label: "Prozesse" }, { label: "Werk\nzeuge", min: 1, max: 0 }],
  series: [{ name: "Ist", values: [3, 2] }],
  ...patch,
});

describe("validateChart", () => {
  it("meldet im Netz ein Maximum, das nicht über dem Minimum liegt", () => {
    expect(validateChart(spec())).toEqual([{ id: "axis-1-bounds", message: "Achse „Werk zeuge“: Maximum zu klein" }]);
  });

  it("lässt Grenzen außerhalb des Netzes ungeprüft – sie wirken dort nicht", () => {
    expect(validateChart(spec({ type: "bar" }))).toEqual([]);
  });

  it("meldet negative Anteile im Kuchen, nur in der ersten Reihe", () => {
    const pie = spec({
      type: "pie",
      categories: [{ label: "A" }, { label: "" }],
      series: [
        { name: "1", values: [5, -1] },
        { name: "2", values: [-3, 1] },
      ],
    });
    expect(validateChart(pie)).toEqual([{ id: "axis-1-share", message: "„Achse 2“: negativer Anteil im Kuchen" }]);
  });

  it("meldet eine Höhe außerhalb von 160 bis 1200 Pixeln", () => {
    expect(validateChart(spec({ type: "bar", height: 100 }))).toEqual([
      { id: "height", message: "Höhe: erlaubt sind 160 bis 1200 Pixel" },
    ]);
    expect(validateChart(spec({ type: "bar", height: 420 }))).toEqual([]);
  });

  it("ordnet Fehler ihren Achsen zu", () => {
    expect(axisIssueIndexes([{ id: "axis-1-bounds", message: "" }, { id: "height", message: "" }])).toEqual(new Set([1]));
  });
});

describe("chartChangesStatus", () => {
  it("schweigt ohne Änderung", () => {
    expect(chartChangesStatus(spec(), spec())).toBeUndefined();
  });

  it("nennt Typ, Daten, Gestaltung und Download einzeln", () => {
    const saved = spec();
    expect(chartChangesStatus({ ...saved, type: "bar" }, saved)).toBe("Diagrammtyp geändert");
    expect(chartChangesStatus({ ...saved, series: [{ name: "Ist", values: [4, 2] }] }, saved)).toBe("Daten geändert");
    expect(chartChangesStatus({ ...saved, title: "Neu", height: 500 }, saved)).toBe("Gestaltung geändert");
    expect(chartChangesStatus({ ...saved, type: "line", allowExport: true }, saved)).toBe(
      "Diagrammtyp geändert · Download geändert",
    );
  });
});

describe("issueTarget", () => {
  it("führt die Höhe in den Reiter „Gestaltung“", () => {
    expect(issueTarget("height")).toEqual({ tab: "design", field: "Höhe in px" });
  });

  it("führt Achsenfehler in den Reiter „Achse“ der Achse", () => {
    expect(issueTarget("axis-3-bounds")).toEqual({ tab: "axis", axis: 3, field: "Maximum" });
    expect(issueTarget("axis-0-share")).toEqual({ tab: "axis", axis: 0 });
  });

  it("kennt keine fremden Kennungen", () => {
    expect(issueTarget("unbekannt")).toBeNull();
  });
});
