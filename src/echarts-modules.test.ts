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

import { loadECharts } from "./echarts-modules";

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
    jest.doMock("echarts/core", () => ({ init: jest.fn(), use: jest.fn() }));
    jest.doMock("echarts/components", () => ({
      TitleComponent: {},
      LegendComponent: {},
      TooltipComponent: {},
      AriaComponent: {},
      RadarComponent: {},
    }));
    jest.doMock("echarts/renderers", () => ({ SVGRenderer: {} }));
    jest.doMock("echarts/charts", () => ({ RadarChart: {} }));

    const { loadECharts: loadEchartsWithMocks } = await import("./echarts-modules");
    const core = (await loadEchartsWithMocks("radar")) as unknown as { use: jest.Mock };
    const callsAfterFirstLoad = core.use.mock.calls.length;

    await Promise.all([loadEchartsWithMocks("radar"), loadEchartsWithMocks("radar")]);

    // Schon registriert: ECharts würde eine zweite Registrierung zwar
    // schlucken, aber wir wollen den Lader nicht jedes Mal durchlaufen.
    expect(core.use.mock.calls.length).toBe(callsAfterFirstLoad);

    jest.dontMock("echarts/core");
    jest.dontMock("echarts/components");
    jest.dontMock("echarts/renderers");
    jest.dontMock("echarts/charts");
    jest.resetModules();
  });

  it("merkt sich keinen gescheiterten Kern, sondern versucht es erneut", async () => {
    jest.resetModules();
    let attempt = 0;
    jest.doMock("echarts/core", () => {
      attempt += 1;
      // Nur der erste Zugriff scheitert — wie ein abgebrochener Netzzugriff.
      if (attempt === 1) throw new Error("Netzwerk weg");
      return { init: jest.fn(), use: jest.fn() };
    });
    jest.doMock("echarts/components", () => ({
      TitleComponent: {},
      LegendComponent: {},
      TooltipComponent: {},
      AriaComponent: {},
      RadarComponent: {},
    }));
    jest.doMock("echarts/renderers", () => ({ SVGRenderer: {} }));
    jest.doMock("echarts/charts", () => ({ RadarChart: {} }));

    const { loadECharts: loadFlaky } = await import("./echarts-modules");
    await expect(loadFlaky("radar")).rejects.toThrow("Netzwerk weg");

    const core = await loadFlaky("radar");
    expect(typeof core.use).toBe("function");

    jest.dontMock("echarts/core");
    jest.dontMock("echarts/components");
    jest.dontMock("echarts/renderers");
    jest.dontMock("echarts/charts");
    jest.resetModules();
  });
});
