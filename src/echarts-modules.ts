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
 * Lädt ECharts in zwei Stufen nach.
 *
 * ECharts vollständig einzubinden wäre ein Vielfaches des übrigen Widgets.
 * Also zuerst nur der Kern mit dem, was jedes Diagramm braucht, und dann je
 * Typ ein eigener Nachschlag.
 *
 * Die `webpackExports`-Kommentare sind nicht kosmetisch: Ohne sie zieht
 * `import("echarts/charts")` jeden Diagrammtyp in denselben Chunk, und das
 * typweise Nachladen wäre wirkungslos. Jeder Typ braucht deshalb ein eigenes
 * `import()` mit eigener Export-Liste.
 */

import { ChartType } from "./chart-model";

export type EChartsCore = typeof import("echarts/core");

let corePromise: Promise<EChartsCore> | null = null;

/** Schon registrierte Typen — verhindert, dass der Lader mehrfach läuft. */
const loaded = new Set<ChartType>();

async function loadCore(): Promise<EChartsCore> {
  const [core, components, renderers] = await Promise.all([
    import(/* webpackChunkName: "echarts-core" */ "echarts/core"),
    import(
      /* webpackChunkName: "echarts-core" */
      /* webpackExports: ["TitleComponent", "LegendComponent", "TooltipComponent", "AriaComponent"] */
      "echarts/components"
    ),
    import(/* webpackChunkName: "echarts-core" */ /* webpackExports: ["SVGRenderer"] */ "echarts/renderers"),
  ]);

  // SVG statt Canvas: scharf im Druck und bei jedem Zoom, im Browser
  // inspizierbar — und in jsdom überhaupt testbar, weil kein
  // Canvas-Kontext gebraucht wird.
  core.use([
    components.TitleComponent,
    components.LegendComponent,
    components.TooltipComponent,
    components.AriaComponent,
    renderers.SVGRenderer,
  ]);
  return core;
}

const TYPE_LOADERS: Record<ChartType, (core: EChartsCore) => Promise<void>> = {
  radar: async (core) => {
    const [charts, components] = await Promise.all([
      import(/* webpackChunkName: "echarts-radar" */ /* webpackExports: ["RadarChart"] */ "echarts/charts"),
      // `RadarComponent` ist das Koordinatensystem, nicht die Serie. Ohne es
      // zeichnet ECharts nichts und meldet eine fehlende Komponente.
      import(/* webpackChunkName: "echarts-radar" */ /* webpackExports: ["RadarComponent"] */ "echarts/components"),
    ]);
    core.use([charts.RadarChart, components.RadarComponent]);
  },
};

/**
 * Liefert den ECharts-Kern, in dem der verlangte Typ registriert ist.
 *
 * Mehrfache und parallele Aufrufe sind unschädlich: Der Kern wird als
 * laufendes Promise gemerkt, und ein Typ wird nur beim ersten Mal geladen.
 */
export async function loadECharts(type: ChartType): Promise<EChartsCore> {
  corePromise ??= loadCore();
  const core = await corePromise;

  if (!loaded.has(type)) {
    // Erst markieren, dann laden: Zwei gleichzeitige Aufrufe würden den
    // Lader sonst beide starten, bevor einer fertig ist.
    loaded.add(type);
    try {
      await TYPE_LOADERS[type](core);
    } catch (error) {
      loaded.delete(type);
      throw error;
    }
  }
  return core;
}
