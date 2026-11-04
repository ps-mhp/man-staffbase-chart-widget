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

import { headerHeight, lineCount } from "./text-layout";

/** Bei dieser Schriftgröße passen rund zehn Zeichen in 66 Pixel. */
const FONT = 12;
const TEN_CHARS = 66;

describe("lineCount", () => {
  it("zählt eine leere Beschriftung als gar keine Zeile", () => {
    expect(lineCount("", TEN_CHARS, FONT)).toBe(0);
  });

  it("bricht am Wortende um", () => {
    expect(lineCount("Nutzbare Energie", TEN_CHARS, FONT)).toBe(2);
  });

  it("zählt einen eigenen Zeilenumbruch mit, auch wenn die Zeile kurz ist", () => {
    expect(lineCount("a\nb\nc", TEN_CHARS, FONT)).toBe(3);
  });

  it("verteilt ein Wort, das breiter ist als die Zeile, auf mehrere Zeilen", () => {
    // 23 Zeichen bei zehn je Zeile: ECharts bricht mitten im Wort.
    expect(lineCount("Batteriegewichtsgrenze", TEN_CHARS, FONT)).toBe(3);
  });

  it("belegt mindestens eine Zeile, auch wenn gar keine Breite da ist", () => {
    expect(lineCount("Energie", 0, FONT)).toBeGreaterThanOrEqual(1);
  });
});

describe("headerHeight", () => {
  it("bleibt bei null, wenn weder Titel noch Fussnote gesetzt sind", () => {
    expect(headerHeight(undefined, undefined, 400)).toBe(0);
  });

  // Der Fehler, der dazu gefuehrt hat: Feste Werte je nachdem, ob ein Titel
  // gesetzt ist, uebersahen die Fussnote - die Legende lag auf ihrem Text.
  it("zaehlt eine Fussnote mit, auch wenn kein Titel gesetzt ist", () => {
    expect(headerHeight(undefined, "Herstellerangaben.", 400)).toBeGreaterThan(0);
  });

  it("wird hoeher, wenn zur Ueberschrift eine Fussnote tritt", () => {
    const withBoth = headerHeight("Reichweite", "Herstellerangaben.", 400);
    expect(withBoth).toBeGreaterThan(headerHeight("Reichweite", undefined, 400));
  });

  it("waechst, wenn ein Titel auf schmalem Baustein umbricht", () => {
    const long = "Reichweite der schweren Sattelzugmaschinen im Vergleich";
    expect(headerHeight(long, undefined, 200)).toBeGreaterThan(headerHeight(long, undefined, 800));
  });
});
