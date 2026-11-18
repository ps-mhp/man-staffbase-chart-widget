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

/**
 * Die Hauptfläche des Diagramm-Editors: Leiste, Datenraster, Einfügen und
 * die Vorschau in den Geräteansichten. Das Panel rechts prüft
 * `chart-inspector.test.tsx`.
 */

import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfigShellProvider, type ConfigShellState } from "@man/config-ui/shell/shell-context";

import { ChartSpec, emptySpec } from "../chart-model";
import { ChartEditor } from "./chart-editor";

jest.mock("../echarts-modules");

class StubResizeObserver {
  observe(): void {}
  disconnect(): void {}
}

beforeEach(() => {
  (global as unknown as { ResizeObserver: unknown }).ResizeObserver = StubResizeObserver;
});

const spec = (patch: Partial<ChartSpec> = {}): ChartSpec => ({
  version: 1,
  type: "radar",
  title: "Vergleich",
  legend: { show: true, position: "top" },
  categories: [{ label: "Gewicht", unit: "t" }, { label: "Energie" }],
  series: [{ name: "MAN", values: [1.8, 240] }],
  ...patch,
});

const shellState = (overrides: Partial<ConfigShellState> = {}): ConfigShellState => ({
  view: "editor",
  setView: () => undefined,
  preview: true,
  issuesVisible: false,
  ...overrides,
});

/** Baut den Editor mit lebendem Zustand auf: mehrere Schritte sehen jeweils den neuen Stand. */
function setup(value: ChartSpec = spec(), shell: Partial<ConfigShellState> = {}) {
  const onChange = jest.fn<void, [ChartSpec]>();
  function Harness(): React.ReactElement {
    const [current, setCurrent] = React.useState(value);
    return (
      <ConfigShellProvider value={shellState(shell)}>
        <ChartEditor
          value={current}
          onChange={(next) => {
            onChange(next);
            setCurrent(next);
          }}
        />
      </ConfigShellProvider>
    );
  }
  render(<Harness />);
  return { onChange, latest: (): ChartSpec => onChange.mock.calls.at(-1)![0] };
}

const grid = (): HTMLElement => screen.getByRole("table", { name: /Diagrammdaten/ });
const heading = (): HTMLElement => screen.getByTestId("chart-data-heading");

describe("Datenraster", () => {
  it("zeigt jede Achse als Zeile und jede Reihe als Spalte mit Farbpunkt und Namen", () => {
    setup();
    expect(within(grid()).getByRole("columnheader", { name: "MAN" })).toBeInTheDocument();
    expect(screen.getByLabelText("Name der Achse 1")).toHaveValue("Gewicht");
    expect(screen.getByLabelText("Einheit: Gewicht")).toHaveValue("t");
    expect(screen.getByLabelText("MAN, Gewicht")).toHaveValue("1,8");
  });

  it("liest getippte Zahlen deutsch und behält Umbrüche im Achsennamen", () => {
    const { latest } = setup();
    fireEvent.change(screen.getByLabelText("MAN, Energie"), { target: { value: "1.234,5" } });
    expect(latest().series[0].values[1]).toBe(1234.5);

    fireEvent.change(screen.getByLabelText("Name der Achse 1"), { target: { value: "Gewicht\nleer" } });
    expect(latest().categories[0].label).toBe("Gewicht\nleer");
  });

  it("wählt die Achse, in deren Zeile der Fokus steht, und nennt sie in der Leiste", () => {
    setup();
    expect(heading()).toHaveTextContent("Achse 1 von 2 · Gewicht");

    fireEvent.focus(screen.getByLabelText("MAN, Energie"));
    expect(heading()).toHaveTextContent("Achse 2 von 2 · Energie");
    expect(screen.getByRole("button", { name: "Achse 2 wählen" })).toHaveAttribute("aria-pressed", "true");
  });

  it("fügt einen aus Excel kopierten Block ab dem gewählten Feld ein", () => {
    const { latest } = setup();
    fireEvent.paste(screen.getByLabelText("MAN, Energie"), {
      clipboardData: { getData: () => "300\t5\n7\t8\n" },
    });

    expect(latest().categories).toHaveLength(3);
    expect(latest().series.map((series) => series.values)).toEqual([
      [1.8, 300, 7],
      [null, 5, 8],
    ]);
  });

  it("lässt einen einzelnen Wert das Feld selbst einfügen", () => {
    const { onChange } = setup();
    fireEvent.paste(screen.getByLabelText("MAN, Energie"), { clipboardData: { getData: () => "42" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("zeigt im Kuchen nur die gezeichnete Reihe und sagt, warum", () => {
    setup(spec({ type: "pie", series: [{ name: "A", values: [1, 2] }, { name: "B", values: [3, 4] }] }));
    expect(within(grid()).queryByRole("columnheader", { name: "B" })).toBeNull();
    expect(screen.getAllByText(/zeichnet nur die erste Reihe/).length).toBeGreaterThan(0);
  });

  it("markiert eine fehlerhafte Achse erst, wenn Übernehmen an ihr scheiterte", () => {
    const faulty = spec({ categories: [{ label: "Gewicht", min: 5, max: 1 }, { label: "Energie" }] });
    setup(faulty);
    expect(screen.getByLabelText("Name der Achse 1")).not.toHaveAttribute("aria-invalid");
  });

  it("zeigt den Fehler an der Achse, sobald Fehler sichtbar sind", () => {
    const faulty = spec({ categories: [{ label: "Gewicht", min: 5, max: 1 }, { label: "Energie" }] });
    setup(faulty, { issuesVisible: true });
    expect(screen.getByLabelText("Name der Achse 1")).toHaveAttribute("aria-invalid", "true");
    expect(within(screen.getByTestId("axis-row-0")).getByText("Fehlerhaft")).toBeInTheDocument();
  });
});

describe("Leiste über dem Raster", () => {
  it("verschiebt, dupliziert und löscht die gewählte Achse samt Werten", async () => {
    const { latest } = setup();

    await userEvent.click(screen.getByRole("button", { name: "Achse nach unten" }));
    expect(latest().categories.map((category) => category.label)).toEqual(["Energie", "Gewicht"]);
    expect(latest().series[0].values).toEqual([240, 1.8]);
    expect(heading()).toHaveTextContent("Achse 2 von 2 · Gewicht");

    await userEvent.click(screen.getByRole("button", { name: "Achse duplizieren" }));
    expect(latest().categories.map((category) => category.label)).toEqual(["Energie", "Gewicht", "Gewicht"]);
    expect(heading()).toHaveTextContent("Achse 3 von 3");

    await userEvent.click(screen.getByRole("button", { name: "Achse löschen" }));
    expect(latest().categories).toHaveLength(2);
    expect(heading()).toHaveTextContent("Achse 2 von 2");
  });

  it("sperrt „nach oben“ an der ersten Achse", () => {
    setup();
    expect(screen.getByRole("button", { name: "Achse nach oben" })).toHaveAttribute("aria-disabled", "true");
  });

  it("legt eine Achse an und setzt den Fokus in ihren Namen", async () => {
    const { latest } = setup();
    await userEvent.click(screen.getByRole("button", { name: "Achse hinzufügen" }));
    expect(latest().categories).toHaveLength(3);
    expect(latest().series[0].values).toHaveLength(3);
    expect(screen.getByLabelText("Name der Achse 3")).toHaveFocus();
  });

  it("legt eine Reihe an", async () => {
    const { latest } = setup();
    await userEvent.click(screen.getByRole("button", { name: "Reihe hinzufügen" }));
    expect(latest().series).toHaveLength(2);
    expect(within(grid()).getByRole("columnheader", { name: "Reihe 2" })).toBeInTheDocument();
  });

  it("lädt ein Beispiel zum gewählten Typ und behält Höhe und Download", async () => {
    const { latest } = setup(spec({ type: "bar", height: 500, allowExport: true }));
    await userEvent.click(screen.getByRole("button", { name: "Beispiel laden" }));
    expect(latest().type).toBe("bar");
    expect(latest().categories.length).toBeGreaterThan(1);
    expect(latest()).toMatchObject({ height: 500, allowExport: true });
  });
});

describe("Leerer Anfang", () => {
  it("erklärt Achsen und Reihen und bietet Beispiel oder leere Tabelle an", async () => {
    const { latest } = setup({ ...emptySpec(), height: 420 });
    const empty = screen.getByTestId("chart-empty");
    expect(empty).toHaveTextContent("Noch keine Achsen und Reihen");

    await userEvent.click(within(empty).getByRole("button", { name: "Leere Tabelle anlegen" }));
    expect(latest().categories.length).toBeGreaterThan(0);
    expect(latest().height).toBe(420);
    expect(screen.queryByTestId("chart-empty")).toBeNull();
  });
});

describe("Aus Excel einfügen", () => {
  it("übernimmt eine ganze Tabelle – ohne Rahmen über dem Raster", async () => {
    const { latest } = setup();
    await userEvent.click(screen.getByRole("button", { name: "Aus Excel einfügen" }));

    const panel = screen.getByTestId("chart-paste-panel");
    fireEvent.change(within(panel).getByLabelText("Tabelle"), {
      target: { value: "\tMAN\tMB\nGewicht\t1,8\t2\nReichweite\t500\t480" },
    });
    await userEvent.click(within(panel).getByRole("button", { name: "Tabelle übernehmen" }));

    expect(latest().categories.map((category) => category.label)).toEqual(["Gewicht", "Reichweite"]);
    // Gleichnamige Achsen behalten ihre Einstellungen.
    expect(latest().categories[0].unit).toBe("t");
    expect(latest().series.map((series) => series.name)).toEqual(["MAN", "MB"]);
    expect(screen.queryByTestId("chart-paste-panel")).toBeNull();
  });

  it("meldet eine unlesbare Tabelle am Feld", async () => {
    const { onChange } = setup();
    await userEvent.click(screen.getByRole("button", { name: "Aus Excel einfügen" }));
    const panel = screen.getByTestId("chart-paste-panel");
    fireEvent.change(within(panel).getByLabelText("Tabelle"), { target: { value: "nur eine Zeile" } });
    await userEvent.click(within(panel).getByRole("button", { name: "Tabelle übernehmen" }));

    expect(within(panel).getByRole("alert")).toHaveTextContent("ließ sich nicht lesen");
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("Vorschau", () => {
  it("zeigt in den Geräteansichten die echte Leseansicht, still gestellt, und lässt das Panel stehen", () => {
    setup(spec({ height: 360 }), { view: "desktop" });

    const preview = screen.getByTestId("chart-preview");
    expect(preview).toHaveAttribute("inert");
    expect(screen.getByRole("region", { name: "Vorschau Desktop" })).toContainElement(preview);
    expect(preview.querySelector<HTMLElement>(".man-chart__canvas")?.style.height).toBe("360px");
    expect(screen.queryByRole("table", { name: /Diagrammdaten/ })).toBeNull();
    expect(screen.getByRole("complementary", { name: "Diagramm" })).toBeInTheDocument();
  });
});
