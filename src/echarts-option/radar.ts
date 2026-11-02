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
 * Übersetzt eine normalisierte Definition in eine ECharts-Radar-Option.
 *
 * Hier steht nur, was das Radar von anderen Typen unterscheidet. Schrift,
 * Textfarben, Serienfarben, Legenden- und Tooltip-Gestaltung kommen aus
 * `echartsTheme` und werden hier bewusst nicht wiederholt.
 */

import { NORMALIZED_MAX, NormalizedSpec } from "../chart-normalize";
import { formatMeasure } from "../format";
import { ChartTheme } from "../man-chart-theme";

const DEFAULT_GRID_LEVELS = 5;
const AREA_OPACITY = 0.12;

/**
 * Was ECharts dem Label-Formatter beim Radar wirklich übergibt.
 *
 * `dimensionIndex` ist in den mitgelieferten Typen nicht offengelegt, weil
 * `label.formatter` eine über alle Diagrammtypen gemeinsame Union ist.
 * Deshalb diese schmale eigene Schnittstelle und unten ein Cast.
 */
interface RadarLabelParams {
  /** Beim Radar: welche unserer Serien. */
  dataIndex: number;
  /** Beim Radar: welche Achse. ECharts setzt das aus `labelDimIndex`. */
  dimensionIndex: number;
}

interface RadarTooltipParams {
  dataIndex: number;
  name: string;
  color: string;
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function radarOption(
  n: NormalizedSpec,
  theme: ChartTheme,
  locale: string,
): Record<string, unknown> {
  const { spec } = n;
  const display = spec.display?.type === "radar" ? spec.display : undefined;
  const filled = display?.filled === true;
  const legendTop = spec.legend.position === "top";

  // Jede Achse läuft von 0 bis 100, weil `normalizeSpec` die Einheiten und
  // die Achsenrichtung bereits aufgelöst hat. ECharts sieht nie einen Rohwert.
  const indicator = spec.categories.map((category) => ({
    name: category.label,
    min: 0,
    max: NORMALIZED_MAX,
  }));

  const labelFormatter = (params: RadarLabelParams): string =>
    formatMeasure(
      n.series[params.dataIndex]?.raw[params.dimensionIndex] ?? null,
      spec.categories[params.dimensionIndex],
      locale,
    );

  const tooltipFormatter = (params: RadarTooltipParams): string => {
    const series = n.series[params.dataIndex];
    if (!series) return "";
    const rows = spec.categories
      .map((category, index) => {
        const value = escapeHtml(formatMeasure(series.raw[index] ?? null, category, locale));
        const label = escapeHtml(category.label.replace(/\n/g, " "));
        return `<tr><td style="padding:1px 12px 1px 0">${label}</td><td style="text-align:right;font-weight:600">${value}</td></tr>`;
      })
      .join("");
    const dot = `<span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:${params.color};margin-right:6px"></span>`;
    return `<div style="font-weight:600;margin-bottom:4px">${dot}${escapeHtml(series.name)}</div><table>${rows}</table>`;
  };

  return {
    title: spec.title
      ? { text: spec.title, subtext: spec.footnote, left: "center", top: 0 }
      : { show: false },
    aria: { enabled: true },
    legend: {
      show: spec.legend.show,
      // `bottom: 0` nur in der unteren Lage — ECharts würde sonst oben und
      // unten gleichzeitig verankern und die Legende verzerren.
      ...(legendTop ? { top: spec.title ? 34 : 0 } : { bottom: 0 }),
      data: n.series.map((series) => series.name),
    },
    tooltip: {
      trigger: "item",
      // Pflicht im Shadow-Root: ECharts hängt den Tooltip in den Container.
      // Ohne Begrenzung ragte er am Rand aus dem Widget heraus und würde
      // vom Content-Designer abgeschnitten.
      confine: true,
      appendToBody: false,
      formatter: tooltipFormatter as unknown as string,
    },
    radar: {
      shape: "polygon",
      splitNumber: display?.gridLevels ?? DEFAULT_GRID_LEVELS,
      indicator,
      center: ["50%", "54%"],
      radius: "62%",
      axisName: {
        color: theme.text,
        fontFamily: theme.fontFamily,
        fontSize: 12,
        // Ohne gesetzte Zeilenhöhe stapelt ECharts mehrzeilige Beschriftungen
        // (`\n`) übereinander statt untereinander.
        lineHeight: 15,
      },
      axisLine: { lineStyle: { color: theme.gridStrong } },
      splitLine: { lineStyle: { color: theme.grid } },
      splitArea: { show: false },
    },
    series: [
      {
        type: "radar",
        symbolSize: 6,
        lineStyle: { width: 2 },
        emphasis: { focus: "series" },
        label: {
          show: true,
          position: "top",
          distance: 6,
          fontFamily: theme.fontFamily,
          fontSize: 12,
          fontWeight: 600,
          formatter: labelFormatter as unknown as string,
        },
        data: n.series.map((series) => ({
          name: series.name,
          value: series.normalized,
          itemStyle: { color: series.color },
          lineStyle: { color: series.color },
          label: { color: series.color },
          ...(filled ? { areaStyle: { color: series.color, opacity: AREA_OPACITY } } : {}),
        })),
      },
    ],
  };
}
