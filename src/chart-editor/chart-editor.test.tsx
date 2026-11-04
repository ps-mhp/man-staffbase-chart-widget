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

/**
 * Rendert mit einer kurzen Teildefinition (nur `type`, `categories`,
 * `series`) und hält selbst den letzten Stand nach — die Testfälle wollen
 * nicht bei jeder Änderung `version` und `legend` mitschreiben, und ein
 * `onChange`, der nicht neu rendert, würde eine zweite Änderung auf dem
 * alten Stand aufsetzen lassen.
 */
function renderEditor(partial: Pick<ChartSpec, "type" | "categories" | "series">) {
  let current: ChartSpec = { version: 1, legend: { show: true, position: "top" }, ...partial };
  const view = render(
    <ChartEditor
      value={current}
      onChange={(next) => {
        current = next;
        rerender();
      }}
      onSave={jest.fn()}
      onClose={jest.fn()}
      dirty={false}
    />,
  );
  function rerender(): void {
    view.rerender(
      <ChartEditor
        value={current}
        onChange={(next) => {
          current = next;
          rerender();
        }}
        onSave={jest.fn()}
        onClose={jest.fn()}
        dirty={false}
      />,
    );
  }
  return { latest: () => current, container: view.container };
}

beforeEach(() => {
  (global as unknown as { ResizeObserver: unknown }).ResizeObserver = StubResizeObserver;
});

describe("ChartEditor", () => {
  it("nennt den Diagrammtyp, statt ihn zu verschweigen", () => {
    // Am alten Dialog war nicht zu erkennen, welche Art Diagramm man baut.
    setup();
    expect(screen.getByLabelText("Diagrammtyp")).toHaveValue("radar");
  });

  it("zeigt jede Achse als Zeile und jede Serie als Wertespalte", () => {
    setup();
    expect(screen.getByDisplayValue("Gewicht")).toBeInTheDocument();
    expect(screen.getByDisplayValue("MAN")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1,8")).toBeInTheDocument();
  });

  it("beschriftet jeden Wert mit seiner Serie und seiner Achse", () => {
    // Der alte Kopf sagte "Serie" ueber den Achsennamen — die Beschriftung
    // log, und genau deshalb landeten Achsen in Serienfeldern.
    setup();
    expect(screen.getByLabelText("Name der Achse 1")).toHaveValue("Gewicht");
    expect(screen.getByLabelText("Name der Serie 1")).toHaveValue("MAN");
    expect(screen.getByLabelText("MAN, Gewicht")).toHaveValue("1,8");
  });

  it("behält einen Zeilenumbruch im Achsennamen", () => {
    // ECharts bricht die Achsenbeschriftung am `\n` um. Ein einzeiliges Feld
    // verschluckte den Umbruch und zeigte "BenotungModularitaet".
    const { onChange } = setup();
    const field = screen.getByLabelText("Name der Achse 1");
    expect(field.tagName).toBe("TEXTAREA");
    fireEvent.change(field, { target: { value: "Benotung\nModularität" } });
    expect(onChange.mock.lastCall[0].categories[0].label).toBe("Benotung\nModularität");
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

  it("ergänzt eine Achse samt Wert in jeder Serie", () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByRole("button", { name: /Achse hinzufügen/ }));
    expect(onChange.mock.lastCall[0].categories).toHaveLength(3);
    expect(onChange.mock.lastCall[0].series[0].values).toHaveLength(3);
  });

  it("ergänzt eine Serie", () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByRole("button", { name: /Serie hinzufügen/ }));
    expect(onChange.mock.lastCall[0].series).toHaveLength(2);
  });

  it("verschiebt eine Achse samt ihrer Werte", () => {
    // Nur `categories` zu tauschen wuerde alle Werte um eine Achse
    // verschieben — ein Fehler, der erst in der Vorschau auffaellt.
    const { onChange } = setup();
    fireEvent.click(screen.getByRole("button", { name: /Achse nach unten: Gewicht/ }));
    const next = onChange.mock.lastCall[0];
    expect(next.categories.map((c: { label: string }) => c.label)).toEqual(["Energie", "Gewicht"]);
    expect(next.series[0].values).toEqual([240, 1.8]);
  });

  it("schaltet die Achsenrichtung um", () => {
    const { onChange } = setup();
    fireEvent.click(screen.getAllByRole("checkbox", { name: /Kleiner ist besser/ })[0]);
    expect(onChange.mock.lastCall[0].categories[0].inverted).toBe(true);
  });

  it("blendet die Feineinstellungen erst auf Wunsch ein", () => {
    // Drei unbeschriftete Kaestchen je Achse waren der Hauptgrund, warum der
    // Dialog unverstaendlich war.
    setup();
    expect(screen.queryByLabelText(/Minimum: Gewicht/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: /Feineinstellungen je Achse/ }));
    expect(screen.getByLabelText(/Minimum: Gewicht/)).toBeInTheDocument();
  });

  it("übernimmt eine eingefügte Tabelle mit Kennzahlen in den Zeilen", () => {
    const { onChange } = setup();
    fireEvent.change(screen.getByLabelText(/Tabelle einfügen/), {
      target: { value: "\tMAN\tMB\nLadeleistung\t750\t1.000" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Tabelle übernehmen/ }));
    const next = onChange.mock.lastCall[0];
    expect(next.categories.map((c: { label: string }) => c.label)).toEqual(["Ladeleistung"]);
    expect(next.series.map((s: { name: string }) => s.name)).toEqual(["MAN", "MB"]);
    expect(next.series[1].values).toEqual([1000]);
  });

  it("übernimmt eine eingefügte Tabelle auch andersherum", () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByRole("radio", { name: /Je Zeile eine Variante/ }));
    fireEvent.change(screen.getByLabelText(/Tabelle einfügen/), {
      target: { value: "Modell\tA\tB\nMAN\t1\t2" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Tabelle übernehmen/ }));
    const next = onChange.mock.lastCall[0];
    expect(next.categories.map((c: { label: string }) => c.label)).toEqual(["A", "B"]);
    expect(next.series.map((s: { name: string }) => s.name)).toEqual(["MAN"]);
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

  it("erklärt den Startzustand und bietet einen Einstieg an, statt leer dazustehen", () => {
    setup(emptySpec());
    expect(screen.getByText(/Noch keine Achsen und Serien/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Leere Tabelle anlegen/ })).toBeInTheDocument();
  });

  it("füllt über „Beispiel laden“ einen vollständigen Vergleich ein", () => {
    const { onChange } = setup(emptySpec());
    fireEvent.click(screen.getByRole("button", { name: /Beispiel laden/ }));
    const next = onChange.mock.lastCall[0];
    expect(next.categories).toHaveLength(6);
    expect(next.series.map((s: { name: string }) => s.name)).toEqual([
      "MAN eTGX",
      "Mercedes-Benz eActros 600",
    ]);
    expect(next.series[0].values).toHaveLength(6);
  });
});

describe("Feldsichtbarkeit je Typ", () => {
  const typeSpec = (type: ChartSpec["type"], categories: ChartSpec["categories"] = []): ChartSpec => ({
    version: 1,
    type,
    legend: { show: true, position: "top" },
    categories,
    series: [],
  });

  it("zeigt kleiner-ist-besser beim Radar", () => {
    setup(typeSpec("radar", [{ label: "A" }]));
    expect(screen.getByLabelText(/Kleiner ist besser/)).toBeInTheDocument();
  });

  it("blendet kleiner-ist-besser beim Balken aus", () => {
    setup(typeSpec("bar", [{ label: "A" }]));
    expect(screen.queryByLabelText(/Kleiner ist besser/)).not.toBeInTheDocument();
  });

  it("blendet Minimum und Maximum beim Balken aus, auch mit Feineinstellungen", () => {
    setup(typeSpec("bar", [{ label: "A" }]));
    fireEvent.click(screen.getByRole("checkbox", { name: /Feineinstellungen je Achse/ }));
    expect(screen.queryByLabelText(/^Minimum/)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^Nachkomma/)).toBeInTheDocument();
  });

  it("zeigt Stapeln und Richtung nur beim Balken", () => {
    setup(typeSpec("bar"));
    expect(screen.getByLabelText(/Balken stapeln/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Richtung/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Hilfslinien im Netz/)).not.toBeInTheDocument();
  });

  it("verliert min und max beim Typwechsel nicht", () => {
    const { onChange } = setup(typeSpec("radar", [{ label: "A", min: 2 }]));
    fireEvent.change(screen.getByLabelText("Diagrammtyp"), { target: { value: "bar" } });
    const next = onChange.mock.lastCall[0] as ChartSpec;
    expect(next.categories[0].min).toBe(2);
  });

  it("blendet kleiner-ist-besser bei der Linie aus", () => {
    setup(typeSpec("line", [{ label: "A" }]));
    expect(screen.queryByLabelText(/Kleiner ist besser/)).not.toBeInTheDocument();
  });

  it("blendet Minimum und Maximum bei der Linie aus, auch mit Feineinstellungen", () => {
    setup(typeSpec("line", [{ label: "A" }]));
    fireEvent.click(screen.getByRole("checkbox", { name: /Feineinstellungen je Achse/ }));
    expect(screen.queryByLabelText(/^Minimum/)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^Nachkomma/)).toBeInTheDocument();
  });

  it("zeigt die Linienfelder nur bei der Linie", () => {
    setup(typeSpec("line"));
    expect(screen.getByLabelText("Linien glätten")).toBeInTheDocument();
    expect(screen.getByLabelText("Fläche füllen")).toBeInTheDocument();
    expect(screen.getByLabelText("Punkte zeigen")).toBeInTheDocument();
  });

  it("blendet die Linienfelder beim Balken aus", () => {
    setup(typeSpec("bar"));
    expect(screen.queryByLabelText("Linien glätten")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Fläche füllen")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Punkte zeigen")).not.toBeInTheDocument();
  });
});

describe("Kuchendiagramm im Editor", () => {
  const pieSpec: Pick<ChartSpec, "type" | "categories" | "series"> = {
    type: "pie",
    categories: [{ label: "Antrieb" }, { label: "Aufbau" }],
    series: [
      { name: "Anteil", values: [60, 40] },
      { name: "Zweite", values: [1, 2] },
    ],
  };

  it("zeigt nur die erste Serienspalte", () => {
    renderEditor(pieSpec);
    expect(screen.getByLabelText("Anteil, Antrieb")).toBeInTheDocument();
    expect(screen.queryByLabelText("Zweite, Antrieb")).not.toBeInTheDocument();
  });

  it("sagt, dass weitere Serien erhalten bleiben", () => {
    // Der Typ-Hinweis über dem Raster enthält ebenfalls die Wendung "nur die
    // erste Serie" (er beschreibt den Typ allgemein) — deshalb hier auf eine
    // Formulierung geprüft, die nur im Warn-Hinweis unter dem Raster steht.
    renderEditor(pieSpec);
    expect(screen.getByText(/Die weiteren bleiben gespeichert/i)).toBeInTheDocument();
  });

  it("zeigt den Hinweis nicht, wenn es nur eine Serie gibt", () => {
    renderEditor({ ...pieSpec, series: [pieSpec.series[0]] });
    expect(screen.queryByText(/Die weiteren bleiben gespeichert/i)).not.toBeInTheDocument();
  });

  it("bietet eine Segmentfarbe je Kategorie", () => {
    const { latest } = renderEditor(pieSpec);
    fireEvent.change(screen.getByLabelText("Segmentfarbe: Antrieb"), { target: { value: "#ff0000" } });
    expect(latest().categories[0].color).toBe("#ff0000");
  });

  it("zeigt die Segmentfarbe bei keinem anderen Typ", () => {
    renderEditor({ ...pieSpec, type: "bar" });
    expect(screen.queryByLabelText(/Segmentfarbe/)).not.toBeInTheDocument();
  });

  it("zeigt Innenradius und Segmentbeschriftung", () => {
    renderEditor(pieSpec);
    expect(screen.getByLabelText("Innenradius")).toBeInTheDocument();
    expect(screen.getByLabelText("Segmentbeschriftung")).toBeInTheDocument();
  });
});

// Container-Abfragen greifen in jsdom nicht (kein Layout, keine
// Containergröße) — geprüft wird deshalb, dass die Beschriftungen im DOM
// stehen, aus denen der per CSS zugeschaltete Kartenmodus seinen Inhalt
// zieht. Ob er unter 700px tatsächlich erscheint, prüft die Sichtprüfung
// am Bild (siehe Spezifikation, Abschnitt 9).
describe("Kartenmodus", () => {
  it("beschriftet jede Rasterzelle, damit sie ohne Kopfzeile lesbar bleibt", () => {
    const { container } = renderEditor({
      type: "radar",
      categories: [{ label: "Reichweite" }],
      series: [{ name: "eTGX", values: [740] }],
    });
    const cells = container.querySelectorAll(".chart-editor__cell");
    expect(cells.length).toBeGreaterThan(0);
    for (const cell of cells) expect(cell.getAttribute("data-label")).toBeTruthy();
  });

  it("nennt in der Wertzelle den Serienname", () => {
    const { container } = renderEditor({
      type: "radar",
      categories: [{ label: "Reichweite" }],
      series: [{ name: "eTGX", values: [740] }],
    });
    const labels = [...container.querySelectorAll(".chart-editor__cell")].map((c) => c.getAttribute("data-label"));
    expect(labels).toContain("eTGX");
  });
});
