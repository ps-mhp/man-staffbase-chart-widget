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
 * Typen für die Einzelmodule von ECharts.
 *
 * `echarts/charts` und `echarts/components` sind Sammelmodule: eine einzige
 * Datei, die alles weiterreicht. Webpack teilt Chunks je Modul auf, nicht je
 * Export — sobald zwei `import()`-Stellen dasselbe Sammelmodul nennen, landet
 * es vollständig in einem Chunk. `webpackExports` ändert daran nichts, denn
 * es steuert nur das Tree-Shaking innerhalb eines Chunks. Ein Balkendiagramm
 * hätte so den gesamten Radar-Code mitgeladen.
 *
 * Deshalb lädt `echarts-modules.ts` die Einzelmodule unter `echarts/lib/…`.
 * Das sind getrennte Dateien, also auch getrennte Chunks. ECharts liefert für
 * sie keine Typdeklarationen mit — die stehen nur für die Sammelmodule unter
 * `types/dist/` bereit. Diese Datei holt das nach.
 *
 * Jedes dieser Module reicht genau einen Export `install` heraus, den
 * `core.use()` entgegennimmt. Der Typ wird von `core.use` selbst abgeleitet,
 * damit er nicht auseinanderläuft, wenn ECharts aktualisiert wird. `use`
 * nimmt wahlweise einen einzelnen Installer oder eine Liste davon — `Exclude`
 * streicht die Listenvariante, denn ein Modul liefert immer genau einen.
 */

declare module "echarts/lib/chart/*" {
  export const install: Exclude<Parameters<typeof import("echarts/core").use>[0], readonly unknown[]>;
}

declare module "echarts/lib/component/*" {
  export const install: Exclude<Parameters<typeof import("echarts/core").use>[0], readonly unknown[]>;
}

declare module "echarts/lib/renderer/*" {
  export const install: Exclude<Parameters<typeof import("echarts/core").use>[0], readonly unknown[]>;
}
