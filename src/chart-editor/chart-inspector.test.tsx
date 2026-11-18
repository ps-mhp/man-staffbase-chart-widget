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
 * Das Panel „Diagramm“ rechts im Rahmen: Daten · Gestaltung · Achse ·
 * Verhalten, wie im Screen.
 */

import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChartSpec } from "../chart-model";
import { ChartInspector, ChartInspectorProps } from "./chart-inspector";
import { axisIssueIndexes, validateChart } from "./editor-rules";

const spec = (patch: Partial<ChartSpec> = {}): ChartSpec => ({
  version: 1,
  type: "bar",
  title: "Reifegrad",
  legend: { show: true, position: "bottom" },
  categories: [{ label: "Prozesse", unit: "Stufe" }, { label: "Werkzeuge" }],
  series: [
    { name: "Ist", values: [3, 2] },
    { name: "Ziel", values: [4, 4], color: "#e40045" },
  ],
  height: 420,
  ...patch,
});

type Options = Partial<Omit<ChartInspectorProps, "value" | "onChange">>;

function setup(value: ChartSpec = spec(), options: Options = {}) {
  const onChange = jest.fn<void, [ChartSpec]>();
  const issuesVisible = options.issuesVisible ?? false;
  function Harness(): React.ReactElement {
    const [current, setCurrent] = React.useState(value);
    return (
      <ChartInspector
        value={current}
        onChange={(next) => {
          onChange(next);
          setCurrent(next);
        }}
        selected={options.selected ?? 0}
        invalidAxes={issuesVisible ? axisIssueIndexes(validateChart(current)) : new Set()}
        issuesVisible={issuesVisible}
        palette={options.palette ?? ["#303c49", "#e40045"]}
      />
    );
  }
  render(<Harness />);
  return { onChange, latest: (): ChartSpec => onChange.mock.calls.at(-1)![0] };
}

const tab = (name: string | RegExp): HTMLElement => screen.getByRole("tab", { name });
const pill = (group: string, name: string): HTMLElement =>
  within(screen.getByRole("radiogroup", { name: group })).getByRole("radio", { name });

describe("ChartInspector", () => {
  it("steht als Panel „Diagramm“ mit den vier Reitern, Gestaltung vorn", () => {
    setup();
    expect(screen.getByRole("complementary", { name: "Diagramm" })).toBeInTheDocument();
    expect(screen.getAllByRole("tab").map((element) => element.textContent)).toEqual(["Daten", "Gestaltung", "Achse", "Verhalten"]);
    expect(tab("Gestaltung")).toHaveAttribute("aria-selected", "true");
  });

  describe("Gestaltung", () => {
    it("wählt den Typ über Pills und erklärt ihn", async () => {
      const { latest } = setup();
      expect(pill("Typ", "Balken")).toHaveAttribute("aria-checked", "true");
      await userEvent.click(pill("Typ", "Netz"));
      expect(latest().type).toBe("radar");
      expect(screen.getByText(/Vergleicht wenige Varianten/)).toBeInTheDocument();
    });

    it("setzt Titel, Fußnote und Legende", async () => {
      const { latest } = setup();
      fireEvent.change(screen.getByLabelText("Titel"), { target: { value: "Neu" } });
      expect(latest().title).toBe("Neu");
      fireEvent.change(screen.getByLabelText("Fußnote"), { target: { value: "" } });
      expect(latest().footnote).toBeUndefined();

      expect(pill("Legende", "Unter")).toHaveAttribute("aria-checked", "true");
      await userEvent.click(pill("Legende", "Ausblenden"));
      expect(latest().legend).toEqual({ show: false, position: "bottom" });
      await userEvent.click(pill("Legende", "Über"));
      expect(latest().legend).toEqual({ show: true, position: "top" });
    });

    it("zeigt im Abschnitt „Balken“ Richtung und Stapeln", async () => {
      const { latest } = setup();
      const section = screen.getByRole("region", { name: "Balken" });
      await userEvent.click(within(section).getByRole("radio", { name: "Waagerecht" }));
      expect(latest().display).toEqual({ type: "bar", stacked: false, orientation: "horizontal" });
      await userEvent.click(within(section).getByRole("switch", { name: "Gestapelt" }));
      expect(latest().display).toEqual({ type: "bar", stacked: true, orientation: "horizontal" });
    });

    it("zeigt je Typ dessen eigene Einstellungen", () => {
      setup(spec({ type: "line" }));
      expect(screen.getByRole("switch", { name: "Punkte zeigen" })).toBeChecked();
      expect(screen.queryByRole("region", { name: "Balken" })).toBeNull();
    });

    it("nimmt die Beschriftung des Kuchens als Pills", async () => {
      const { latest } = setup(spec({ type: "pie" }));
      await userEvent.click(pill("Beschriftung der Segmente", "Beides"));
      expect(latest().display).toEqual({ type: "pie", innerRadius: 0, label: "both" });
    });

    it("setzt die Höhe und nennt den Rahmen erst als Fehler, wenn Übernehmen scheiterte", () => {
      const { latest } = setup(spec({ height: 90 }));
      expect(screen.getByLabelText("Höhe in px")).toHaveValue("90");
      expect(screen.queryByRole("alert")).toBeNull();

      fireEvent.change(screen.getByLabelText("Höhe in px"), { target: { value: "560" } });
      expect(latest().height).toBe(560);
    });

    it("zeigt eine zu kleine Höhe als Fehler und am Reiter", () => {
      setup(spec({ height: 90 }), { issuesVisible: true });
      expect(screen.getByLabelText("Höhe in px")).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByRole("alert")).toHaveTextContent("160 bis 1200");
      expect(tab(/Gestaltung/)).toHaveTextContent("1 Fehler");
    });
  });

  describe("Achse", () => {
    it("bearbeitet die gewählte Achse; Grenzen gibt es außerhalb des Netzes nicht", async () => {
      const { latest } = setup(spec(), { selected: 1 });
      await userEvent.click(tab("Achse"));
      expect(screen.getByLabelText("Bezeichnung")).toHaveValue("Werkzeuge");

      fireEvent.change(screen.getByLabelText("Einheit"), { target: { value: "Stufe" } });
      expect(latest().categories[1].unit).toBe("Stufe");
      fireEvent.change(screen.getByLabelText("Nachkommastellen"), { target: { value: "1" } });
      expect(latest().categories[1].decimals).toBe(1);
      expect(screen.queryByLabelText("Minimum")).toBeNull();
    });

    it("zeigt im Netz Minimum, Maximum und „Kleiner ist besser“", async () => {
      const { latest } = setup(spec({ type: "radar" }));
      await userEvent.click(tab("Achse"));
      fireEvent.change(screen.getByLabelText("Minimum"), { target: { value: "1" } });
      fireEvent.change(screen.getByLabelText("Maximum"), { target: { value: "5" } });
      await userEvent.click(screen.getByRole("switch", { name: "Kleiner ist besser" }));
      expect(latest().categories[0]).toMatchObject({ min: 1, max: 5, inverted: true });
    });

    it("meldet ein zu kleines Maximum wie im Screen, mit Marke am Reiter", async () => {
      const faulty = spec({ type: "radar", categories: [{ label: "Prozesse" }, { label: "Werkzeuge", min: 1, max: 0 }] });
      setup(faulty, { selected: 1, issuesVisible: true });
      expect(tab(/Achse/)).toHaveTextContent("1 Fehler");
      await userEvent.click(tab(/Achse/));

      expect(screen.getByLabelText("Maximum")).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByLabelText("Maximum")).toHaveAccessibleDescription(/Maximum muss größer als Minimum sein – zum Beispiel 4/);
    });

    it("bietet im Kuchen die Segmentfarbe an", async () => {
      const { latest } = setup(spec({ type: "pie" }));
      await userEvent.click(tab("Achse"));
      fireEvent.change(screen.getByLabelText("Segmentfarbe: Prozesse"), { target: { value: "#112233" } });
      expect(latest().categories[0].color).toBe("#112233");
    });
  });

  describe("Daten", () => {
    it("listet die Reihen und bearbeitet die aufgeklappte", async () => {
      const { latest } = setup();
      await userEvent.click(tab("Daten"));
      const list = screen.getByRole("list", { name: "Reihen" });
      await userEvent.click(within(list).getByRole("button", { name: /Ziel/ }));

      fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Plan" } });
      expect(latest().series[1].name).toBe("Plan");

      await userEvent.click(screen.getByRole("button", { name: "Farbe: Plan: Palette verwenden" }));
      expect(latest().series[1].color).toBeUndefined();

      await userEvent.click(screen.getByRole("button", { name: "Reihe nach vorne" }));
      expect(latest().series.map((series) => series.name)).toEqual(["Plan", "Ist"]);

      await userEvent.click(screen.getByRole("button", { name: "Reihe löschen" }));
      expect(latest().series.map((series) => series.name)).toEqual(["Ist"]);
    });

    it("legt eine Reihe an und klappt sie auf", async () => {
      const { latest } = setup();
      await userEvent.click(tab("Daten"));
      await userEvent.click(screen.getByRole("button", { name: "Reihe hinzufügen" }));
      expect(latest().series).toHaveLength(3);
      expect(screen.getByLabelText("Name")).toHaveValue("");
    });
  });

  describe("Verhalten", () => {
    it("schaltet den Download", async () => {
      const { latest } = setup(spec({ allowExport: false }));
      await userEvent.click(tab("Verhalten"));
      await userEvent.click(screen.getByRole("switch", { name: "Download erlauben" }));
      expect(latest().allowExport).toBe(true);
    });

    it("sagt, wenn der Download noch nicht hier festgelegt ist", async () => {
      setup(spec());
      await userEvent.click(tab("Verhalten"));
      expect(screen.getByRole("switch", { name: "Download erlauben" })).toHaveAccessibleDescription(/es gilt, was der Block bisher hatte/);
    });
  });
});
