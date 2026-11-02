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

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";

import { ChartSpec, emptySpec } from "../chart-model";
import { ChartEditor } from "./chart-editor";

jest.mock("../echarts-modules");

const spec: ChartSpec = {
  version: 1,
  type: "radar",
  title: "Vergleich",
  legend: { show: true, position: "top" },
  categories: [{ label: "Gewicht" }, { label: "Energie" }],
  series: [{ name: "MAN", values: [1.8, 240] }],
};

class StubResizeObserver {
  observe(): void {}
  disconnect(): void {}
}

function setup(value: ChartSpec = spec) {
  const onChange = jest.fn();
  render(<ChartEditor value={value} onChange={onChange} onSave={jest.fn()} onClose={jest.fn()} dirty={false} />);
  return { onChange };
}

beforeEach(() => {
  (global as unknown as { ResizeObserver: unknown }).ResizeObserver = StubResizeObserver;
});

describe("ChartEditor", () => {
  it("zeigt jede Kategorie als Spalte und jede Serie als Zeile", () => {
    setup();
    expect(screen.getByDisplayValue("Gewicht")).toBeInTheDocument();
    expect(screen.getByDisplayValue("MAN")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1,8")).toBeInTheDocument();
  });

  it("meldet einen geänderten Wert nach oben", () => {
    const { onChange } = setup();
    fireEvent.change(screen.getByDisplayValue("1,8"), { target: { value: "2,5" } });
    expect(onChange.mock.lastCall[0].series[0].values[0]).toBe(2.5);
  });

  it("liest einen getippten Tausenderpunkt wie beim Einfügen einer Tabelle", () => {
    // Drehmoment und Leistung kommen vierstellig. Ein zweiter, schwächerer
    // Parser im Editor hätte hier still um Faktor tausend danebengelegen.
    const { onChange } = setup();
    fireEvent.change(screen.getByDisplayValue("1,8"), { target: { value: "1.234,56" } });
    expect(onChange.mock.lastCall[0].series[0].values[0]).toBe(1234.56);
  });

  it("macht aus einem geleerten Feld eine Lücke, nicht eine Null", () => {
    const { onChange } = setup();
    fireEvent.change(screen.getByDisplayValue("1,8"), { target: { value: "" } });
    expect(onChange.mock.lastCall[0].series[0].values[0]).toBeNull();
  });

  it("ergänzt eine Kategorie samt Spalte", () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByRole("button", { name: /Kategorie hinzufügen/ }));
    expect(onChange.mock.lastCall[0].categories).toHaveLength(3);
    expect(onChange.mock.lastCall[0].series[0].values).toHaveLength(3);
  });

  it("ergänzt eine Serie", () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByRole("button", { name: /Serie hinzufügen/ }));
    expect(onChange.mock.lastCall[0].series).toHaveLength(2);
  });

  it("schaltet die Achsenrichtung um", () => {
    const { onChange } = setup();
    fireEvent.click(screen.getAllByRole("checkbox", { name: /Kleiner ist besser/ })[0]);
    expect(onChange.mock.lastCall[0].categories[0].inverted).toBe(true);
  });

  it("übernimmt eine eingefügte Tabelle", () => {
    const { onChange } = setup();
    const area = screen.getByLabelText(/Tabelle einfügen/);
    fireEvent.change(area, { target: { value: "Modell\tA\tB\nNeu\t1\t2" } });
    fireEvent.click(screen.getByRole("button", { name: /Tabelle übernehmen/ }));
    expect(onChange.mock.lastCall[0].categories.map((c: { label: string }) => c.label)).toEqual(["A", "B"]);
  });

  it("sagt, wenn eine eingefügte Tabelle nicht lesbar war, statt stillzuhalten", () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Tabelle einfügen/), { target: { value: "nur eine Zeile" } });
    fireEvent.click(screen.getByRole("button", { name: /Tabelle übernehmen/ }));
    expect(screen.getByText(/konnte nicht gelesen werden/)).toBeInTheDocument();
  });

  it("zeigt eine Vorschau mit denselben Daten", () => {
    setup();
    expect(screen.getByTestId("chart-editor-preview")).toBeInTheDocument();
  });

  it("kommt mit einer leeren Definition zurecht", () => {
    setup(emptySpec());
    expect(screen.getByRole("button", { name: /Kategorie hinzufügen/ })).toBeInTheDocument();
  });
});
