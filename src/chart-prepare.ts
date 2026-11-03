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
 * Bereitet eine Definition fuer die Uebersetzer vor.
 *
 * Hier steht ausschliesslich, was fuer **jeden** Diagrammtyp gilt — und das
 * ist wenig: die Zuordnung einer Farbe je Serie. Alles andere ist typeigen
 * und gehoert in den jeweiligen Uebersetzer unter `echarts-option/`.
 *
 * Dass das Modul so klein ist, ist kein Versehen: Frueher rechnete es jede
 * Achse auf 0–100 und las Achsengrenzen je Kategorie. Beides kann nur das
 * Radar brauchen und liegt deshalb jetzt in `echarts-option/radar-scale.ts`.
 */

import { ChartSpec } from "./chart-model";

export interface PreparedSeries {
  name: string;
  /** Aufgelöst — entweder eigene Farbe oder Palette. */
  color: string;
  /** Die Rohwerte, nach Position den Kategorien zugeordnet. */
  values: (number | null)[];
}

export interface PreparedSpec {
  spec: ChartSpec;
  series: PreparedSeries[];
}

export function prepareSpec(spec: ChartSpec, palette: readonly string[]): PreparedSpec {
  const series = spec.series.map((entry, index) => ({
    name: entry.name,
    // Modulo statt Abbruch: Mehr Serien als Palettenfarben ist zulaessig,
    // die Farben wiederholen sich dann.
    color: entry.color ?? palette[index % palette.length],
    values: entry.values,
  }));
  return { spec, series };
}
