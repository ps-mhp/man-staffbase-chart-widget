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

import * as React from "react";

import { ChartSpec } from "./chart-model";
import { formatMeasure } from "./format";

/**
 * Dieselben Werte als Tabelle.
 *
 * Ein Diagramm ist für Screenreader auch mit `aria` von ECharts nur grob
 * erfassbar. Die Tabelle trägt die Zahlen vollständig und steht optisch
 * verborgen daneben — sie ist der eigentliche barrierefreie Zugang, nicht
 * ein Zusatz.
 */
export function ChartTable({ spec, locale }: { spec: ChartSpec; locale: string }): React.JSX.Element {
  return (
    <table className="man-chart__table">
      {spec.title ? <caption>{spec.title}</caption> : null}
      <thead>
        <tr>
          <th scope="col">Serie</th>
          {spec.categories.map((category, index) => (
            <th key={index} scope="col">
              {category.label.replace(/\n/g, " ")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {spec.series.map((series, row) => (
          <tr key={row}>
            <th scope="row">{series.name}</th>
            {spec.categories.map((category, column) => (
              <td key={column}>{formatMeasure(series.values[column] ?? null, category, locale)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
