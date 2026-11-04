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

import { render, screen, waitFor } from "@testing-library/react";
import * as React from "react";

import { ChartSpec, serializeChartSpec } from "./chart-model";
import { ChartWidget } from "./chart-widget";

jest.mock("./echarts-modules");
import { loadECharts } from "./echarts-modules";

const mockedLoad = loadECharts as jest.MockedFunction<typeof loadECharts>;
const instance = { setOption: jest.fn(), resize: jest.fn(), dispose: jest.fn() };

// jsdom berechnet kein Layout: `clientWidth`/`clientHeight` bleiben sonst 0,
// der Hook wartete endlos auf eine Größe, und `loadECharts` würde nie
// aufgerufen. Deshalb wird am beobachteten Element hier eine Größe
// hinterlegt, wie `use-echarts.test.tsx` (Task 7) es vormacht.
class StubResizeObserver {
  constructor(private readonly callback: () => void) {}
  observe(target: Element): void {
    Object.defineProperty(target, "clientWidth", { value: 400, configurable: true });
    Object.defineProperty(target, "clientHeight", { value: 400, configurable: true });
    this.callback();
  }
  disconnect(): void {}
}

const spec: ChartSpec = {
  version: 1,
  type: "radar",
  title: "eTGX gegen eActros 600",
  legend: { show: true, position: "top" },
  categories: [{ label: "Batteriegewicht [t]", unit: "t", decimals: 1, inverted: true }],
  series: [{ name: "MAN eTGX", values: [1.8] }],
};

beforeEach(() => {
  jest.clearAllMocks();
  (global as unknown as { ResizeObserver: unknown }).ResizeObserver = StubResizeObserver;
  mockedLoad.mockResolvedValue({ init: () => instance } as unknown as Awaited<ReturnType<typeof loadECharts>>);
});

describe("ChartWidget", () => {
  it("bittet um Konfiguration, wenn nichts eingestellt ist", () => {
    render(<ChartWidget chart="" height={420} />);
    expect(screen.getByText(/Noch kein Diagramm eingerichtet/)).toBeInTheDocument();
    expect(mockedLoad).not.toHaveBeenCalled();
  });

  it("nennt den unlesbaren Inhalt beim Namen, statt leer zu bleiben", () => {
    render(<ChartWidget chart="b64:###" height={420} />);
    expect(screen.getByText(/konnte nicht gelesen werden/)).toBeInTheDocument();
  });

  it("nennt einen unbekannten Diagrammtyp mit seinem Namen", () => {
    render(<ChartWidget chart={JSON.stringify({ ...spec, type: "sunburst" })} height={420} />);
    expect(screen.getByText(/sunburst/)).toBeInTheDocument();
  });

  it("kommt ohne leere Anfuehrungszeichen aus, wenn gar kein Typ dasteht", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Feld wird bewusst weggelassen, nicht gebraucht.
    const { type: _omitted, ...withoutType } = spec;
    render(<ChartWidget chart={JSON.stringify(withoutType)} height={420} />);
    expect(screen.getByText(/Der eingerichtete Diagrammtyp ist dieser Version/)).toBeInTheDocument();
  });

  it("weist auf fehlende Daten hin, wenn es keine Serien gibt", () => {
    const bare = { ...spec, series: [] };
    render(<ChartWidget chart={serializeChartSpec(bare)} height={420} />);
    expect(screen.getByText(/Noch keine Daten/)).toBeInTheDocument();
  });

  it("rendert das Diagramm und setzt die konfigurierte Höhe", async () => {
    const { container } = render(<ChartWidget chart={serializeChartSpec(spec)} height={500} />);
    await waitFor(() => expect(mockedLoad).toHaveBeenCalledWith("radar"));
    const figure = container.querySelector(".man-chart__canvas") as HTMLElement;
    expect(figure.style.height).toBe("500px");
  });

  it("stellt die Werte zusätzlich als Tabelle für Screenreader bereit", async () => {
    render(<ChartWidget chart={serializeChartSpec(spec)} height={420} />);
    const table = await screen.findByRole("table");
    expect(table).toHaveTextContent("Batteriegewicht [t]");
    // `toHaveTextContent` ersetzt ein geschütztes Leerzeichen immer gegen ein
    // gewöhnliches (auch mit `normalizeWhitespace: false`) — genau das
    // Zeichen, auf das es hier ankommt. Deshalb direkt am `textContent`
    // geprüft.
    expect(table.textContent).toContain("1,8\u00a0t");
  });

  it("meldet einen fehlgeschlagenen Ladevorgang sichtbar", async () => {
    mockedLoad.mockRejectedValue(new Error("offline"));
    render(<ChartWidget chart={serializeChartSpec(spec)} height={420} />);
    expect(await screen.findByText(/konnte nicht geladen werden/)).toBeInTheDocument();
  });

  it("zeigt keine Export-Knöpfe, solange das Attribut es nicht erlaubt", async () => {
    render(<ChartWidget chart={serializeChartSpec(spec)} height={420} />);
    // Wartet auf "ready", ohne den Status selbst abzufragen (siehe oben).
    await screen.findByRole("table");
    expect(screen.queryByRole("button", { name: "Als SVG" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Als PNG" })).not.toBeInTheDocument();
  });

  it("zeigt zwei Export-Knöpfe, sobald gezeichnet ist und das Attribut es erlaubt", async () => {
    render(<ChartWidget chart={serializeChartSpec(spec)} height={420} allowExport />);
    expect(await screen.findByRole("button", { name: "Als SVG" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Als PNG" })).toBeInTheDocument();
  });

  it("ersetzt den Kuchen bei einem negativen Anteil durch den Hinweis", async () => {
    const pie: ChartSpec = {
      version: 1,
      type: "pie",
      legend: { show: true, position: "top" },
      categories: [{ label: "Antrieb" }, { label: "Aufbau" }],
      series: [{ name: "Anteil", values: [60, -5] }],
    };
    render(<ChartWidget chart={serializeChartSpec(pie)} height={420} />);
    expect(await screen.findByText(/„Aufbau“ hat einen negativen Wert/)).toBeInTheDocument();
    // Blockierend: Ein Kuchen ohne das negative Segment verteilt die Reste
    // auf den vollen Kreis und zeigt verfaelschte Prozentwerte.
    expect(document.querySelector(".man-chart__canvas")).toBeNull();
    expect(mockedLoad).not.toHaveBeenCalledWith("pie");
  });
});
