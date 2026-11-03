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

import { ChartSpec, emptySpec } from "./chart-model";
import {
  applyTranslatedTexts,
  isTranslatedChartHtml,
  readTranslatedTexts,
  specToTranslatableHtml,
} from "./translation-payload";

const spec: ChartSpec = {
  version: 1,
  type: "radar",
  title: "eTGX gegen eActros 600",
  footnote: "Besser ist weiter außen.",
  legend: { show: true, position: "top" },
  categories: [
    { label: "Batteriegewicht\nminimal [t]", unit: "t" },
    { label: "Energie [kWh]", unit: "kWh" },
  ],
  series: [{ name: "MAN eTGX", values: [1.8, 240] }],
};

describe("specToTranslatableHtml", () => {
  it("schickt Titel, Fußnote, Achsen und Seriennamen mit, jedes unter seinem Schlüssel", () => {
    const html = specToTranslatableHtml(spec) ?? "";
    expect(html).toContain('data-chart-text="title"');
    expect(html).toContain('data-chart-text="footnote"');
    expect(html).toContain('data-chart-text="category:0"');
    expect(html).toContain('data-chart-text="category:1"');
    expect(html).toContain('data-chart-text="series:0"');
    expect(html).toContain("MAN eTGX");
  });

  it("schickt keine Zahlen mit — die sind sprachunabhängig", () => {
    expect(specToTranslatableHtml(spec)).not.toContain("240");
  });

  it("überträgt den Zeilenumbruch einer Beschriftung als br", () => {
    // Ein rohes \n überlebt den HTML-Umlauf nicht; als Element schon.
    expect(specToTranslatableHtml(spec)).toContain("Batteriegewicht<br>minimal [t]");
  });

  it("maskiert spitze Klammern im Text", () => {
    const risky = { ...spec, title: "<b>Titel</b>" };
    expect(specToTranslatableHtml(risky)).toContain("&lt;b&gt;Titel&lt;/b&gt;");
  });

  it("liefert null, wenn es nichts zu übersetzen gibt", () => {
    // Sonst ginge für jedes frisch eingefügte, leere Diagramm eine
    // Übersetzungsanfrage raus.
    expect(specToTranslatableHtml(emptySpec())).toBeNull();
    const numbersOnly = { ...emptySpec(), categories: [{ label: "" }], series: [{ name: "", values: [1] }] };
    expect(specToTranslatableHtml(numbersOnly)).toBeNull();
  });

  it("lässt eine fehlende Fußnote weg, statt einen leeren Eintrag zu schicken", () => {
    const withoutFootnote = { ...spec, footnote: undefined };
    expect(specToTranslatableHtml(withoutFootnote)).not.toContain('data-chart-text="footnote"');
  });
});

describe("readTranslatedTexts", () => {
  it("liest die übersetzten Texte unter ihren Schlüsseln zurück", () => {
    const html = '<div data-cw-chart="1"><p data-chart-text="title">Title</p><p data-chart-text="series:0">MAN eTGX</p></div>';
    expect(readTranslatedTexts(html)).toEqual(
      new Map([
        ["title", "Title"],
        ["series:0", "MAN eTGX"],
      ]),
    );
  });

  it("macht aus einem br wieder einen Zeilenumbruch", () => {
    const html = '<div data-cw-chart="1"><p data-chart-text="category:0">Battery<br>weight</p></div>';
    expect(readTranslatedTexts(html).get("category:0")).toBe("Battery\nweight");
  });

  it("liefert eine leere Zuordnung, wenn die Antwort nichts Brauchbares enthält", () => {
    expect(readTranslatedTexts("<p>irgendwas</p>").size).toBe(0);
    expect(readTranslatedTexts("").size).toBe(0);
  });
});

describe("applyTranslatedTexts", () => {
  it("setzt die übersetzten Texte ein und lässt die Zahlen unberührt", () => {
    const next = applyTranslatedTexts(
      spec,
      new Map([
        ["title", "eTGX versus eActros 600"],
        ["category:1", "Energy [kWh]"],
        ["series:0", "MAN eTGX"],
      ]),
    );
    expect(next.title).toBe("eTGX versus eActros 600");
    expect(next.categories[1].label).toBe("Energy [kWh]");
    expect(next.series[0].values).toEqual([1.8, 240]);
  });

  it("behält den alten Text, wo keine Übersetzung kam", () => {
    // Eine halbe Antwort darf keine Beschriftung löschen.
    const next = applyTranslatedTexts(spec, new Map([["title", "T"]]));
    expect(next.categories[0].label).toBe("Batteriegewicht\nminimal [t]");
  });

  it("rührt Einheiten nicht an, weil sie keine Sprache haben", () => {
    const next = applyTranslatedTexts(spec, new Map([["category:0", "Battery weight"]]));
    expect(next.categories[0].unit).toBe("t");
  });

  it("ignoriert Schlüssel, die es nicht mehr gibt", () => {
    expect(() => applyTranslatedTexts(spec, new Map([["category:9", "X"]]))).not.toThrow();
  });
});

describe("isTranslatedChartHtml", () => {
  it("erkennt eine Antwort auf unsere Anfrage", () => {
    expect(isTranslatedChartHtml('<p data-chart-text="title">X</p>')).toBe(true);
    expect(isTranslatedChartHtml("<p>X</p>")).toBe(false);
  });
});

// Zusätzlich zum Brief: Der Hin- und Rückweg muss zueinander passen. Ein
// Text, der nur aus ASCII-Buchstaben besteht, deckt den Fehler nicht auf,
// den `element.innerHTML` hier zunächst verursacht hat (siehe Bericht) —
// deshalb hier Umlaute, Anführungszeichen, `&`/`<`/`>` und ein Zeilenumbruch.
describe("Hin- und Rückweg", () => {
  it("liefert nach specToTranslatableHtml und readTranslatedTexts denselben Text zurück", () => {
    const risky: ChartSpec = {
      version: 1,
      type: "radar",
      title: 'Übersicht & Vergleich <"eTGX" vs "eActros">\nZeile zwei',
      footnote: 'Größer ist „besser" – außer bei Gewicht.',
      legend: { show: true, position: "top" },
      categories: [{ label: "Reichweite\n(WLTP) [km]", unit: "km" }],
      series: [{ name: 'MAN eTGX® – Variante „Max"', values: [800] }],
    };

    const html = specToTranslatableHtml(risky) ?? "";
    const texts = readTranslatedTexts(html);
    const next = applyTranslatedTexts(risky, texts);

    expect(next.title).toBe(risky.title);
    expect(next.footnote).toBe(risky.footnote);
    expect(next.categories[0].label).toBe(risky.categories[0].label);
    expect(next.series[0].name).toBe(risky.series[0].name);
  });
});
