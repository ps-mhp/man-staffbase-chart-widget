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

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { loadECharts } from "./echarts-modules";

/**
 * Die Einzelmodule, die der Lader für ein Radar anfasst.
 *
 * Jedes davon reicht genau einen Export `install` heraus — anders als die
 * Sammelmodule `echarts/charts` und `echarts/components`, die benannte
 * Exporte liefern.
 */
function mockRadarModules(core: unknown): void {
  jest.doMock("echarts/core", () => core);
  for (const path of [
    "echarts/lib/component/title/install.js",
    "echarts/lib/component/legend/install.js",
    "echarts/lib/component/tooltip/install.js",
    "echarts/lib/component/aria/install.js",
    "echarts/lib/renderer/installSVGRenderer.js",
    "echarts/lib/chart/radar/install.js",
    "echarts/lib/component/radar/install.js",
    "echarts/lib/component/graphic/install.js",
  ]) {
    jest.doMock(path, () => ({ install: {} }));
  }
}

describe("loadECharts", () => {
  it("liefert den Kern mit registriertem Radar", async () => {
    const core = await loadECharts("radar");
    expect(typeof core.init).toBe("function");
    expect(typeof core.use).toBe("function");
  });

  it("liefert bei wiederholtem Aufruf denselben Kern, statt neu zu laden", async () => {
    const [first, second] = await Promise.all([loadECharts("radar"), loadECharts("radar")]);
    expect(first).toBe(second);
  });

  it("registriert Radar genau einmal, auch bei parallelen Aufrufen", async () => {
    // `jest.spyOn(core, "use")` scheitert hier an Babels Interop-Hülle für
    // `import()` gegen CommonJS-Pakete: Die Hülle liefert nur Getter ohne
    // Setter und als nicht konfigurierbar (`configurable: false`) — spyOn
    // wie auch eine einfache Zuweisung schlagen daran fehl
    // ("Cannot redefine property"/"which has only a getter"), unabhängig
    // von dieser Implementierung. Siehe Testbericht für den Nachweis.
    // Daher zählen wir Aufrufe über ein eigenes Modul-Mock statt über
    // einen Spion auf dem echten Kern.
    jest.resetModules();
    mockRadarModules({ init: jest.fn(), use: jest.fn() });

    const { loadECharts: loadEchartsWithMocks } = await import("./echarts-modules");
    const core = (await loadEchartsWithMocks("radar")) as unknown as { use: jest.Mock };
    const callsAfterFirstLoad = core.use.mock.calls.length;

    await Promise.all([loadEchartsWithMocks("radar"), loadEchartsWithMocks("radar")]);

    // Schon registriert: ECharts würde eine zweite Registrierung zwar
    // schlucken, aber wir wollen den Lader nicht jedes Mal durchlaufen.
    expect(core.use.mock.calls.length).toBe(callsAfterFirstLoad);

    jest.resetModules();
  });

  it("merkt sich keinen gescheiterten Kern, sondern versucht es erneut", async () => {
    jest.resetModules();
    let attempt = 0;
    mockRadarModules(undefined);
    jest.doMock("echarts/core", () => {
      attempt += 1;
      // Nur der erste Zugriff scheitert — wie ein abgebrochener Netzzugriff.
      if (attempt === 1) throw new Error("Netzwerk weg");
      return { init: jest.fn(), use: jest.fn() };
    });

    const { loadECharts: loadFlaky } = await import("./echarts-modules");
    await expect(loadFlaky("radar")).rejects.toThrow("Netzwerk weg");

    const core = await loadFlaky("radar");
    expect(typeof core.use).toBe("function");

    jest.resetModules();
  });
});

describe("Chunk-Trennung", () => {
  // Webpack schneidet Chunks je Modul. Die Sammelmodule `echarts/charts`
  // und `echarts/components` sind je eine einzige Datei — nennen zwei
  // `import()`-Stellen sie, landen alle Diagrammtypen in einem Chunk, und
  // ein Balkendiagramm lädt den Radar-Code mit. `webpackExports` verhindert
  // das nicht, denn es wirkt nur innerhalb eines Chunks. Dieser Test hält
  // die Rückkehr zu den Sammelmodulen auf, die sich sonst nur an der
  // Größe der gebauten Dateien zeigen würde.
  it("laedt keine Sammelmodule von ECharts", () => {
    // Die Blockkommentare müssen zuerst weg: `webpackChunkName: "echarts-…"`
    // steht zwischen `import(` und dem Modulpfad und sähe sonst wie einer aus.
    const source = readFileSync(join(__dirname, "echarts-modules.ts"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    const imports = [...source.matchAll(/\bimport\(\s*"([^"]+)"\s*\)/g)].map((match) => match[1]);

    expect(imports.length).toBeGreaterThan(0);
    expect(imports.filter((name) => /^echarts\/(charts|components|renderers)(\.js)?$/.test(name))).toEqual([]);
  });
});
