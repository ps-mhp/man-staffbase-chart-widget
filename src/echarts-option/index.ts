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
 * Wählt den Übersetzer zum Diagrammtyp.
 *
 * Ein neuer Typ braucht genau zwei Stellen: einen Eintrag hier und einen in
 * `echarts-modules.ts`. Weil `OPTION_BUILDERS` vollständig über `ChartType`
 * getypt ist, meldet der Compiler einen vergessenen Eintrag.
 */

import { ChartType } from "../chart-model";
import { PreparedSpec } from "../chart-prepare";
import { ChartTheme } from "../man-chart-theme";
import { ChartSize } from "../use-echarts";
import { barOption, lineOption } from "./cartesian";
import { radarOption } from "./radar";

export type OptionBuilder = (
  p: PreparedSpec,
  theme: ChartTheme,
  locale: string,
  size: ChartSize,
) => Record<string, unknown>;

export const OPTION_BUILDERS: Record<ChartType, OptionBuilder> = {
  radar: radarOption,
  bar: barOption,
  line: lineOption,
};

export function buildOption(
  p: PreparedSpec,
  theme: ChartTheme,
  locale: string,
  size: ChartSize,
): Record<string, unknown> {
  return OPTION_BUILDERS[p.spec.type](p, theme, locale, size);
}
