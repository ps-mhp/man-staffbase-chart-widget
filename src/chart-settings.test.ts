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

import { ChartSpec, emptySpec, serializeChartSpec } from "./chart-model";
import { adoptLegacySettings, readChartSettings, resolveChartSettings } from "./chart-settings";
import { DEFAULT_HEIGHT, MAX_HEIGHT } from "./configuration-schema";

const spec = (patch: Partial<ChartSpec> = {}): ChartSpec => ({ ...emptySpec(), ...patch });

describe("resolveChartSettings", () => {
  it("rendert einen alten Block ohne Angaben im Diagramm genau wie bisher", () => {
    // Bis 0.3: Höhe und Download nur als eigene Attribute.
    expect(resolveChartSettings(spec(), { height: "560", "allow-export": "true" })).toEqual({
      height: 560,
      allowExport: true,
    });
    expect(resolveChartSettings(spec(), { height: 300, "allow-export": false })).toEqual({
      height: 300,
      allowExport: false,
    });
  });

  it("nimmt ohne jede Angabe die Vorgaben", () => {
    expect(resolveChartSettings(spec(), {})).toEqual({ height: DEFAULT_HEIGHT, allowExport: false });
  });

  it("lässt den Wert im Diagramm vor dem Attribut gelten", () => {
    expect(resolveChartSettings(spec({ height: 640, allowExport: true }), { height: "300", "allow-export": "false" })).toEqual(
      { height: 640, allowExport: true },
    );
  });

  it("mischt je Schlüssel: was im Diagramm fehlt, kommt vom Attribut", () => {
    // Der Download stand im Studio-Dialog als Haken, der sich womöglich nicht
    // lesen ließ: dann fehlt er im Diagramm, und das Attribut gilt weiter.
    expect(resolveChartSettings(spec({ height: 640 }), { "allow-export": "true" })).toEqual({
      height: 640,
      allowExport: true,
    });
  });

  it("lässt ein ausdrückliches Nein im Diagramm vor einem Ja im Attribut gelten", () => {
    expect(resolveChartSettings(spec({ allowExport: false }), { "allow-export": true }).allowExport).toBe(false);
  });

  it("begrenzt die Höhe wie bisher das Attribut", () => {
    expect(resolveChartSettings(spec({ height: 5000 }), {}).height).toBe(MAX_HEIGHT);
  });
});

describe("readChartSettings", () => {
  it("liest die Angaben aus dem gespeicherten Attribut", () => {
    const raw = serializeChartSpec(spec({ height: 480, allowExport: true }));
    expect(readChartSettings(raw, { height: "300" })).toEqual({ height: 480, allowExport: true });
  });

  it("fällt bei leerem oder unlesbarem Diagramm auf die Attribute zurück", () => {
    expect(readChartSettings(undefined, { height: "300", "allow-export": "true" })).toEqual({
      height: 300,
      allowExport: true,
    });
    expect(readChartSettings("{kaputt", { height: "300" }).height).toBe(300);
  });
});

describe("adoptLegacySettings", () => {
  it("übernimmt lesbare Altwerte, wo das Diagramm nichts sagt", () => {
    expect(adoptLegacySettings(spec(), { height: 560, allowExport: true })).toMatchObject({
      height: 560,
      allowExport: true,
    });
  });

  it("lässt Werte im Diagramm vor den Altfeldern gelten", () => {
    expect(adoptLegacySettings(spec({ height: 300, allowExport: false }), { height: 560, allowExport: true })).toMatchObject(
      { height: 300, allowExport: false },
    );
  });

  it("lässt nicht Lesbares offen, statt es mit der Vorgabe zu füllen", () => {
    // Sonst schriebe „Übernehmen“ ohne Änderung die Vorgabe über den
    // gespeicherten Haken, und der Block verlöre seinen Download.
    const adopted = adoptLegacySettings(spec(), { height: 480 });
    expect(adopted.height).toBe(480);
    expect(JSON.parse(JSON.stringify(adopted))).not.toHaveProperty("allowExport");
  });

  it("übernimmt die Höhe so begrenzt, wie die Seite sie zeigt", () => {
    expect(adoptLegacySettings(spec(), { height: 5000 }).height).toBe(MAX_HEIGHT);
  });

  it("ändert beim Rendern nichts: Öffnen und Übernehmen zeigt den Block wie zuvor", () => {
    const legacy = { height: "560", "allow-export": "true" };
    const before = readChartSettings(serializeChartSpec(spec()), legacy);
    const adopted = adoptLegacySettings(spec(), { height: 560, allowExport: true });
    expect(readChartSettings(serializeChartSpec(adopted), legacy)).toEqual(before);
  });
});
