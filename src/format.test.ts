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

import { Category } from "./chart-model";
import { formatMeasure, intlLocale } from "./format";

describe("intlLocale", () => {
  it("nimmt die Sprache des Blocks, wenn sie brauchbar ist", () => {
    expect(intlLocale("en_US")).toBe("en-US");
    expect(intlLocale("de")).toBe("de");
  });

  it("fällt auf de-DE zurück, wenn nichts oder Unbrauchbares kommt", () => {
    expect(intlLocale(undefined)).toBe("de-DE");
    expect(intlLocale("")).toBe("de-DE");
    expect(intlLocale("!!!")).toBe("de-DE");
  });
});

describe("formatMeasure", () => {
  const t: Category = { label: "Batteriegewicht", unit: "t", decimals: 1 };

  it("schreibt Zahlen im Format der Sprache", () => {
    expect(formatMeasure(1.8, t, "de-DE")).toBe("1,8\u00a0t");
    expect(formatMeasure(1.8, t, "en-US")).toBe("1.8\u00a0t");
  });

  it("verbindet Zahl und Einheit mit einem geschützten Leerzeichen", () => {
    // Sonst bricht die Einheit beim Umbruch in die nächste Zeile.
    expect(formatMeasure(600, { label: "Energie", unit: "kWh", decimals: 0 }, "de-DE")).toBe("600\u00a0kWh");
  });

  it("lässt die Einheit weg, wenn keine gesetzt ist", () => {
    expect(formatMeasure(42, { label: "Punkte" }, "de-DE")).toBe("42");
  });

  it("leitet die Nachkommastellen aus dem Wert ab, wenn nichts gesetzt ist", () => {
    expect(formatMeasure(1.25, { label: "x" }, "de-DE")).toBe("1,25");
    expect(formatMeasure(3, { label: "x" }, "de-DE")).toBe("3");
  });

  it("zeigt einen Gedankenstrich für fehlende Werte", () => {
    expect(formatMeasure(null, t, "de-DE")).toBe("\u2013");
  });

  it("kommt ohne Kategorie aus", () => {
    expect(formatMeasure(5, undefined, "de-DE")).toBe("5");
  });
});
