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
 * Die Anzeigeoptionen des gerade gewählten Typs, mit Vorgaben, solange die
 * Definition noch keine trägt.
 *
 * Die Optionen sind über `type` diskriminiert, und ein Teilstück davon lässt
 * sich nicht typsicher zusammensetzen, ohne die Vorgabe des *aktuellen* Typs
 * zu kennen. Deshalb steht sie hier und nicht beim Aufruf. Die Vorgaben sind
 * dieselben, die `parseChartSpec` beim Lesen annimmt.
 */

import { BarDisplay, ChartSpec, DisplayOptions, LineDisplay, PieDisplay, RadarDisplay } from "../chart-model";

export function radarDisplay(spec: ChartSpec): RadarDisplay {
  return spec.display?.type === "radar" ? spec.display : { type: "radar", gridLevels: 5, filled: false };
}

export function barDisplay(spec: ChartSpec): BarDisplay {
  return spec.display?.type === "bar" ? spec.display : { type: "bar", stacked: false, orientation: "vertical" };
}

export function lineDisplay(spec: ChartSpec): LineDisplay {
  return spec.display?.type === "line" ? spec.display : { type: "line", smooth: false, area: false, showPoints: true };
}

export function pieDisplay(spec: ChartSpec): PieDisplay {
  return spec.display?.type === "pie" ? spec.display : { type: "pie", innerRadius: 0, label: "percent" };
}

function displayOf(spec: ChartSpec): DisplayOptions {
  if (spec.type === "radar") return radarDisplay(spec);
  if (spec.type === "bar") return barDisplay(spec);
  if (spec.type === "line") return lineDisplay(spec);
  return pieDisplay(spec);
}

/** Ändert eine Anzeigeoption des aktuellen Typs; die übrigen behalten ihren Wert oder die Vorgabe. */
export function withDisplay(spec: ChartSpec, patch: Record<string, unknown>): ChartSpec {
  return { ...spec, display: { ...displayOf(spec), ...patch } as DisplayOptions };
}
