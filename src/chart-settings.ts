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
 * Höhe und Download: was davon gilt.
 *
 * Bis 0.3 waren beides eigene Felder im Staffbase-Dialog (`height`,
 * `allow-export`). Seit dem Vollbild-Editor stehen sie im Diagramm selbst
 * (`ChartSpec.height`, `ChartSpec.allowExport`), denn der Editor bekommt nur
 * das Feld `chart` und kann die übrigen weder lesen noch zurücknehmen.
 *
 * Je Schlüssel gilt: Wert im Diagramm, sonst das alte Attribut, sonst die
 * Vorgabe. Ein Block ohne Angaben im Diagramm rendert damit genau wie vor
 * der Umstellung, und ein Wert, den der Editor beim Öffnen nicht lesen
 * konnte, fehlt im Diagramm und lässt das Attribut weiter gelten.
 */

import { ChartSpec, parseChartSpec } from "./chart-model";
import { readExportAttribute } from "./chart-export";
import { readHeightAttribute } from "./configuration-schema";

/** Was sich aus den alten Feldern des Dialogs lesen ließ; ein fehlender Schlüssel war nicht lesbar. */
export interface LegacyDialogValues {
  height?: number;
  allowExport?: boolean;
}

export interface ChartSettings {
  height: number;
  allowExport: boolean;
}

/** Die alten Attribute, so wie sie am Element ankommen. */
export interface LegacyChartAttributes {
  height?: unknown;
  "allow-export"?: unknown;
}

export function resolveChartSettings(
  spec: Pick<ChartSpec, "height" | "allowExport">,
  legacy: LegacyChartAttributes,
): ChartSettings {
  return {
    // Auch der Wert aus dem Diagramm geht durch `readHeightAttribute`: dieselben
    // Grenzen wie bisher, und ein Ausreißer fällt nicht auf null Pixel.
    height: readHeightAttribute(spec.height ?? legacy.height),
    allowExport: spec.allowExport ?? readExportAttribute(legacy["allow-export"]),
  };
}

/** Wie {@link resolveChartSettings}, aber aus dem gespeicherten Attribut `chart`. */
export function readChartSettings(chart: string | undefined, legacy: LegacyChartAttributes): ChartSettings {
  return resolveChartSettings(parseChartSpec(chart).spec, legacy);
}

/**
 * Was der Editor beim Öffnen aus den alten Feldern übernimmt: nur, wo das
 * Diagramm selbst nichts sagt, und nur, was sich lesen ließ.
 *
 * Ein nicht lesbarer Schlüssel bleibt offen statt zur Vorgabe zu werden –
 * sonst schriebe „Übernehmen“ ohne jede Änderung eine Vorgabe über den
 * gespeicherten Wert, und der Block sähe danach anders aus. Die Höhe geht
 * durch dieselben Grenzen wie beim Rendern; übernommen wird also genau, was
 * die Seite gerade zeigt.
 */
export function adoptLegacySettings(spec: ChartSpec, legacy: LegacyDialogValues): ChartSpec {
  const height = spec.height ?? (legacy.height === undefined ? undefined : readHeightAttribute(legacy.height));
  const allowExport = spec.allowExport ?? legacy.allowExport;
  return {
    ...spec,
    ...(height === undefined ? {} : { height }),
    ...(allowExport === undefined ? {} : { allowExport }),
  };
}
