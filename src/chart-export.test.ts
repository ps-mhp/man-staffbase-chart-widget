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

import { readChartTheme } from "./man-chart-theme";
import { downloadBlob, EXPORT_ATTRIBUTE, exportFilename, readExportAttribute, standaloneSvg } from "./chart-export";

describe("readExportAttribute", () => {
  it("ist aus, solange es niemand einschaltet", () => {
    // Ein Knopf, den niemand bestellt hat, gehört nicht auf die Seite.
    for (const raw of [undefined, null, "", "false", false]) {
      expect(readExportAttribute(raw)).toBe(false);
    }
  });

  it("erkennt die Schreibweisen, in denen Staffbase ein Ja liefert", () => {
    for (const raw of [true, "true", "1", "yes", EXPORT_ATTRIBUTE]) {
      expect(readExportAttribute(raw)).toBe(true);
    }
  });

  it("hält sich an die Liste, statt jeden Wert als Ja zu deuten", () => {
    // Die naheliegende Abkürzung wäre "irgendein Text heißt an". Dann
    // schaltete ein Tippfehler oder ein durchgereichtes "0" den Knopf ein.
    for (const raw of ["0", "no", "nein", "off", "irgendwas", " ", "undefined"]) {
      expect(readExportAttribute(raw)).toBe(false);
    }
  });
});

describe("standaloneSvg", () => {
  const theme = readChartTheme(null);

  it("liefert null, wenn noch nichts gezeichnet ist", () => {
    expect(standaloneSvg(document.createElement("div"), theme)).toBeNull();
  });

  it("ergänzt den Namensraum, ohne den die Datei nirgends aufgeht", () => {
    const container = document.createElement("div");
    container.innerHTML = '<svg width="400" height="300"><rect /></svg>';
    const svg = standaloneSvg(container, theme) ?? "";
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  it("legt eine weiße Fläche unter das Bild", () => {
    // Auf der Seite ist der Hintergrund durchsichtig und erbt die
    // Seitenfarbe. In einer Datei gäbe das schwarze Schrift auf Nichts.
    const container = document.createElement("div");
    container.innerHTML = '<svg width="400" height="300"></svg>';
    expect(standaloneSvg(container, theme)).toContain("#ffffff");
  });

  it("schreibt die Schriftfamilie in das Wurzelelement", () => {
    const container = document.createElement("div");
    container.innerHTML = '<svg width="400" height="300"></svg>';
    expect(standaloneSvg(container, theme)).toContain("Man Europe");
  });

  it("verändert das angezeigte Diagramm nicht — gearbeitet wird auf einer Kopie", () => {
    const container = document.createElement("div");
    container.innerHTML = '<svg width="400" height="300"><rect fill="transparent" /></svg>';
    const before = container.innerHTML;
    standaloneSvg(container, theme);
    expect(container.innerHTML).toBe(before);
  });
});

describe("exportFilename", () => {
  it("macht aus dem Titel einen brauchbaren Dateinamen", () => {
    expect(exportFilename("eTGX gegen eActros 600", "svg")).toBe("etgx-gegen-eactros-600.svg");
  });

  it("ersetzt Umlaute, statt sie in den Namen zu schreiben", () => {
    expect(exportFilename("Verbrauch für Fahrzeuge größer 40t", "png")).toBe(
      "verbrauch-fuer-fahrzeuge-groesser-40t.png",
    );
  });

  it("fällt auf einen festen Namen zurück, wenn kein Titel da ist", () => {
    expect(exportFilename(undefined, "svg")).toBe("diagramm.svg");
    expect(exportFilename("!!!", "png")).toBe("diagramm.png");
  });

  it("kürzt sehr lange Titel", () => {
    expect(exportFilename("w".repeat(200), "svg").length).toBeLessThanOrEqual(84);
  });
});

describe("downloadBlob", () => {
  // jsdom kennt `URL.createObjectURL` nicht (siehe Brief) — hier lokal
  // gestubbt, statt `test/jest-setup.ts` global anzufassen.
  let createObjectURL: jest.Mock;
  let revokeObjectURL: jest.Mock;

  beforeEach(() => {
    createObjectURL = jest.fn(() => "blob:mock-url");
    revokeObjectURL = jest.fn();
    (URL as unknown as { createObjectURL: typeof createObjectURL }).createObjectURL = createObjectURL;
    (URL as unknown as { revokeObjectURL: typeof revokeObjectURL }).revokeObjectURL = revokeObjectURL;
  });

  it("löst einen Klick auf einen Anker mit dem gewünschten Dateinamen aus", () => {
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);
    const blob = new Blob(["<svg></svg>"], { type: "image/svg+xml" });

    downloadBlob(blob, "diagramm.svg");

    expect(createObjectURL).toHaveBeenCalledWith(blob);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    // Die Anker-Eigenschaften sind zum Klickzeitpunkt bereits gesetzt und
    // lassen sich nach dem Klick nicht mehr vom Element ablesen (es wird nie
    // eingehängt) — deshalb werden sie über den `this`-Kontext des Spys geprüft.
    const anchor = clickSpy.mock.contexts[0] as HTMLAnchorElement;
    expect(anchor.href).toBe("blob:mock-url");
    expect(anchor.download).toBe("diagramm.svg");
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");

    clickSpy.mockRestore();
  });
});
