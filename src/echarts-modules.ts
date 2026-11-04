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
 * Geladen werden die Einzelmodule unter `echarts/lib/…`, nicht die
 * Sammelmodule `echarts/charts` und `echarts/components`. Das ist für die
 * Aufteilung entscheidend: Webpack schneidet Chunks je Modul, nicht je
 * Export. Ein Sammelmodul, das zwei `import()`-Stellen nennen, landet
 * vollständig in einem gemeinsamen Chunk — ein Balkendiagramm hätte den
 * Radar-Code mitgeladen. `webpackExports` hilft dagegen nicht, denn es
 * steuert nur das Tree-Shaking innerhalb eines Chunks.
 *
 * Die Einzelmodule sind getrennte Dateien und damit auch getrennte Chunks.
 * Sie tragen keine Typdeklarationen; die liefert `echarts-lib.d.ts` nach.
 * Die `.js`-Endung ist nötig, weil die `exports`-Tabelle von ECharts diese
 * Pfade nur über ihren Auffang-Eintrag freigibt.
 */

import { ChartType } from "./chart-model";

export type EChartsCore = typeof import("echarts/core");

let corePromise: Promise<EChartsCore> | null = null;

/** Schon registrierte Typen — verhindert, dass der Lader mehrfach läuft. */
const loaded = new Set<ChartType>();

async function loadCore(): Promise<EChartsCore> {
  const [core, title, legend, tooltip, aria, svg] = await Promise.all([
    import(/* webpackChunkName: "echarts-core" */ "echarts/core"),
    import(/* webpackChunkName: "echarts-core" */ "echarts/lib/component/title/install.js"),
    import(/* webpackChunkName: "echarts-core" */ "echarts/lib/component/legend/install.js"),
    import(/* webpackChunkName: "echarts-core" */ "echarts/lib/component/tooltip/install.js"),
    import(/* webpackChunkName: "echarts-core" */ "echarts/lib/component/aria/install.js"),
    import(/* webpackChunkName: "echarts-core" */ "echarts/lib/renderer/installSVGRenderer.js"),
  ]);

  // SVG statt Canvas: scharf im Druck und bei jedem Zoom, im Browser
  // inspizierbar — und in jsdom überhaupt testbar, weil kein
  // Canvas-Kontext gebraucht wird.
  core.use([title.install, legend.install, tooltip.install, aria.install, svg.install]);
  return core;
}

const TYPE_LOADERS: Record<ChartType, (core: EChartsCore) => Promise<void>> = {
  radar: async (core) => {
    const [chart, coordinateSystem, graphic] = await Promise.all([
      import(/* webpackChunkName: "echarts-radar" */ "echarts/lib/chart/radar/install.js"),
      // Das Radar-Koordinatensystem, nicht die Serie. Ohne es zeichnet
      // ECharts nichts und meldet eine fehlende Komponente.
      import(/* webpackChunkName: "echarts-radar" */ "echarts/lib/component/radar/install.js"),
      // Trägt die Wertelabels, die das Radar selbst setzt
      // (siehe `echarts-option/radar-labels.ts`).
      import(/* webpackChunkName: "echarts-radar" */ "echarts/lib/component/graphic/install.js"),
    ]);
    core.use([chart.install, coordinateSystem.install, graphic.install]);
  },
  bar: async (core) => {
    const [chart, grid] = await Promise.all([
      import(/* webpackChunkName: "echarts-cartesian" */ "echarts/lib/chart/bar/install.js"),
      // Das kartesische Koordinatensystem. Derselbe Chunk wie bei `line`:
      // Beide brauchen dieses Raster, zwei Chunks lieferten es doppelt aus.
      import(/* webpackChunkName: "echarts-cartesian" */ "echarts/lib/component/grid/install.js"),
    ]);
    core.use([chart.install, grid.install]);
  },
  line: async (core) => {
    const [chart, grid] = await Promise.all([
      // Derselbe Chunk wie `bar`: Lädt jemand erst das eine und dann das
      // andere, ist der Chunk bereits da und dieser Lader registriert nur
      // noch die Serie.
      import(/* webpackChunkName: "echarts-cartesian" */ "echarts/lib/chart/line/install.js"),
      import(/* webpackChunkName: "echarts-cartesian" */ "echarts/lib/component/grid/install.js"),
    ]);
    core.use([chart.install, grid.install]);
  },
  pie: async (core) => {
    // Eigener Chunk: Ein Kuchen braucht kein Koordinatensystem und soll die
    // GridComponent des kartesischen Chunks nicht mitschleppen.
    const chart = await import(/* webpackChunkName: "echarts-pie" */ "echarts/lib/chart/pie/install.js");
    core.use([chart.install]);
  },
};

/**
 * Liefert den ECharts-Kern, in dem der verlangte Typ registriert ist.
 *
 * Mehrfache und parallele Aufrufe sind unschädlich: Der Kern wird als
 * laufendes Promise gemerkt, und ein Typ wird nur beim ersten Mal geladen.
 */
export async function loadECharts(type: ChartType): Promise<EChartsCore> {
  // Bleibt ein abgelehntes Promise gemerkt, scheitert jeder spaetere Aufruf
  // ohne neuen Versuch — ein abgebrochener Netzzugriff waere endgueltig.
  corePromise ??= loadCore().catch((error: unknown) => {
    corePromise = null;
    throw error;
  });
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
