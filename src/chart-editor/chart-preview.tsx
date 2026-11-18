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
 * Die Vorschau des Entwurfs in den Ansichten Desktop, Tablet und Mobil: die
 * echte Leseansicht (`ChartWidget`), keine Nachbildung – Höhe, Legende,
 * Download-Knöpfe und Hinweise sehen aus wie auf der Seite.
 *
 * `ChartWidget` taugt dafür ohne eigenen Vorschau-Schalter: es meldet sich
 * weder an `document` noch an `window` an, misst nur seinen eigenen Kasten
 * und lädt nur auf Klick herunter. Die Bühne ist `inert`, also gibt es
 * keinen Klick – kein Download, kein Tooltip, kein Tab durch Knöpfe, die
 * hier nichts bedeuten.
 *
 * Höhe und Download nimmt die Vorschau aus dem Entwurf; fehlen sie dort,
 * gelten die Vorgaben. Der Wert eines alten Feldes, der sich beim Öffnen
 * nicht lesen ließ, ist hier nicht bekannt.
 */

import * as React from "react";
import { useMemo } from "react";

import { ChartSpec, serializeChartSpec } from "../chart-model";
import { ChartWidget } from "../chart-widget";
import { resolveChartSettings } from "../chart-settings";

export interface ChartPreviewProps {
  spec: ChartSpec;
}

export function ChartPreview({ spec }: ChartPreviewProps): React.ReactElement {
  const chart = useMemo(() => serializeChartSpec(spec), [spec]);
  const settings = resolveChartSettings(spec, {});
  return (
    <div inert data-testid="chart-preview" className="px-10 py-8">
      <ChartWidget chart={chart} height={settings.height} allowExport={settings.allowExport} contentLanguage="de_DE" />
    </div>
  );
}
