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

import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";

export const CHART_ATTRIBUTE = "chart";
export const HEIGHT_ATTRIBUTE = "height";

/** Höhe in Pixeln, wenn nichts konfiguriert ist. */
export const DEFAULT_HEIGHT = 420;

/** Grenzen, innerhalb derer eine konfigurierte Höhe gilt. */
export const MIN_HEIGHT = 160;
export const MAX_HEIGHT = 1200;

/**
 * Das Schema des Konfigurationsdialogs.
 *
 * `chart` steht als gewöhnliches Textfeld, obwohl es niemand von Hand
 * ausfüllen soll: Staffbase rendert den Dialog selbst und kennt nur die
 * Feldtypen von RJSF. Der Diagramm-Editor tritt zur Laufzeit an seine Stelle
 * (`chart-editor/chart-editor-injector.ts`). Fällt er aus, bleibt das
 * Textfeld sichtbar und die Konfiguration damit reparierbar statt
 * unerreichbar.
 *
 * Die Höhe ist bewusst ein echtes Feld und nicht Teil des JSON: Sie ist das
 * einzige, was sich ohne den Editor sinnvoll von Hand ändern lässt.
 *
 * @see https://rjsf-team.github.io/react-jsonschema-form/docs/
 */
export const configurationSchema: JSONSchema7 = {
  properties: {
    [CHART_ATTRIBUTE]: {
      type: "string",
      title: "Diagramm",
      default: "",
    },
    [HEIGHT_ATTRIBUTE]: {
      type: "number",
      title: "Höhe in Pixeln",
      default: DEFAULT_HEIGHT,
      minimum: MIN_HEIGHT,
      maximum: MAX_HEIGHT,
    },
  },
};

/**
 * @see https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
 */
export const uiSchema: UiSchema = {
  [CHART_ATTRIBUTE]: {
    "ui:help":
      "Diagrammtyp, Werte, Achsen und Beschriftung. Der Diagramm-Editor öffnet sich von selbst; " +
      "das Textfeld dahinter ist die Rohfassung und muss nicht angefasst werden.",
  },
  [HEIGHT_ATTRIBUTE]: {
    "ui:help":
      "Wie hoch das Diagramm auf der Seite steht. Die Breite richtet sich immer nach der Spalte. " +
      `Erlaubt sind ${MIN_HEIGHT} bis ${MAX_HEIGHT} Pixel.`,
  },
};

/**
 * Liest die Höhe aus einem Attribut.
 *
 * Staffbase liefert Zahlen je nach Weg als Zeichenkette oder — über
 * `parseAttributes` — als echte `number`. Alles, was keine Zahl in den
 * Grenzen ergibt, bedeutet die Vorgabe: Eine unlesbare Höhe darf das
 * Diagramm nicht auf null Pixel zusammenfallen lassen, denn ein Container
 * der Höhe 0 bleibt bei ECharts dauerhaft leer.
 */
export function readHeightAttribute(raw: unknown): number {
  const value = typeof raw === "number" ? raw : Number.parseFloat(String(raw ?? ""));
  if (!Number.isFinite(value)) return DEFAULT_HEIGHT;
  return Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.round(value)));
}
