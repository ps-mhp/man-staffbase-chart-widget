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
 * Übersetzt in ein Balken- oder Liniendiagramm.
 *
 * Eine Datei für beide Typen: Achsen, Raster, Tooltip, Legende, Titel und
 * Fußnote sind Zeile für Zeile gleich. Zwei Dateien wären zu etwa neun
 * Zehnteln identisch, und jede Korrektur müsste zweimal passieren.
 *
 * Anders als beim Radar teilt hier **ECharts** die Fläche auf
 * (`grid.containLabel`). Die eigene Flächenrechnung des Radars ist eine
 * Notlösung für ein Koordinatensystem, das keinen Platz für Achsennamen
 * reserviert — kartesisch gibt es dieses Problem nicht, und `size` bleibt
 * deshalb ungenutzt.
 */

import { Category, ChartSpec } from "../chart-model";
import { PreparedSpec } from "../chart-prepare";
import { formatMeasure } from "../format";
import { ChartTheme } from "../man-chart-theme";
import { ChartSize } from "../use-echarts";
import {
  FOOTNOTE_FONT,
  FOOTNOTE_LINE,
  TITLE_FONT,
  TITLE_GAP,
  TITLE_LINE,
  headerHeight,
  headerWidth,
  textWidth,
} from "./text-layout";

/** Höhe einer Legendenzeile. */
const LEGEND_LINE = 22;
const LEGEND_FONT = 12;
/** Breite eines Legendensymbols samt Abstand zu seinem Text. */
const LEGEND_SYMBOL = 32;
/** Abstand zwischen zwei Legendeneinträgen. */
const LEGEND_GAP = 10;
/** Luft zwischen dem Kopfbereich und der Zeichenfläche. */
const GRID_PAD = 8;

type CartesianKind = "bar" | "line";

/**
 * Die Einheit der Werteachse — oder `undefined`.
 *
 * Nur wenn **alle** Kategorien mit Werten dieselbe nennen. Unterschiedliche
 * Einheiten auf einer gemeinsamen Achse sind genau das Problem, das das Radar
 * löst; kartesisch wird es nicht beschönigt, sondern die Beschriftung bleibt
 * weg. Kategorien ganz ohne Werte zählen nicht mit: Eine leere Spalte darf
 * die Beschriftung nicht verhindern.
 */
function sharedUnit(spec: ChartSpec): string | undefined {
  const used = spec.categories.filter((_, index) =>
    spec.series.some((series) => typeof series.values[index] === "number"),
  );
  const units = new Set(used.map((category) => category.unit ?? ""));
  if (units.size !== 1) return undefined;
  const [only] = [...units];
  return only.length > 0 ? only : undefined;
}

function axisLabel(category: Category): string {
  return category.label;
}

export function cartesianOption(
  p: PreparedSpec,
  theme: ChartTheme,
  locale: string,
  size: ChartSize,
  kind: CartesianKind,
): Record<string, unknown> {
  const { spec } = p;
  const bar = spec.display?.type === "bar" ? spec.display : undefined;
  const line = spec.display?.type === "line" ? spec.display : undefined;
  const horizontal = kind === "bar" && bar?.orientation === "horizontal";

  const categoryAxis = {
    type: "category" as const,
    data: spec.categories.map(axisLabel),
    axisLabel: { color: theme.textMuted, fontFamily: theme.fontFamily },
    // `gridStrong`, nicht `grid`: Achsenlinien sind eine Stufe kräftiger als
    // Netzlinien, siehe `man-chart-theme.ts` und dessen Verwendung in
    // `radar.ts` (dort `radar.axisLine`).
    axisLine: { lineStyle: { color: theme.gridStrong } },
    axisTick: { show: false },
  };

  const unit = sharedUnit(spec);
  const valueAxis = {
    type: "value" as const,
    ...(unit === undefined ? {} : { name: unit }),
    nameTextStyle: { color: theme.textMuted, fontFamily: theme.fontFamily },
    axisLabel: { color: theme.textMuted, fontFamily: theme.fontFamily },
    splitLine: { lineStyle: { color: theme.grid } },
  };

  const series = p.series.map((entry) => ({
    type: kind,
    name: entry.name,
    // Rohwerte, keine Umrechnung: Die Achse ist eine echte Werteachse. `null`
    // bleibt `null`, damit ECharts eine Lücke zeichnet statt einer Null.
    data: entry.values,
    itemStyle: { color: entry.color },
    ...(kind === "line"
      ? {
          lineStyle: { color: entry.color },
          smooth: line?.smooth === true,
          symbol: line?.showPoints === false ? "none" : "circle",
          ...(line?.area === true ? { areaStyle: { color: entry.color, opacity: 0.2 } } : {}),
        }
      : {}),
    ...(kind === "bar" && bar?.stacked === true ? { stack: "total" } : {}),
  }));

  // Der Kopfbereich wird aus den echten Zeilenhöhen gerechnet, nicht danach
  // geschätzt, *ob* ein Titel gesetzt ist. Feste Werte übersahen eine
  // vorhandene Fußnote: Die Legende legte sich dann über deren Text.
  const header = headerHeight(spec.title, spec.footnote, size.width);

  // ECharts bricht die Legende selbst um, sobald die Einträge nicht mehr
  // nebeneinander passen. Für die Höhe wird derselbe Umbruch geschätzt —
  // auf schmalen Bausteinen legten sich sonst die Achsenbeschriftungen auf
  // eine untenstehende Legende.
  const legendWidth = p.series.reduce(
    (total, entry) => total + textWidth(entry.name, LEGEND_FONT) + LEGEND_SYMBOL + LEGEND_GAP,
    0,
  );
  const legendHeight = spec.legend.show
    ? Math.max(1, Math.ceil(legendWidth / Math.max(1, size.width))) * LEGEND_LINE
    : 0;
  const legendAtTop = spec.legend.show && spec.legend.position === "top";
  const legendTop = legendAtTop ? header + legendHeight : header;
  const gridBottom =
    GRID_PAD + (spec.legend.show && spec.legend.position === "bottom" ? legendHeight : 0);

  return {
    animation: false,
    backgroundColor: "transparent",
    textStyle: { fontFamily: theme.fontFamily, color: theme.text },
    ...(spec.title === undefined && spec.footnote === undefined
      ? {}
      : {
          title: {
            text: spec.title ?? "",
            subtext: spec.footnote,
            left: "center",
            // Gepinnt wie in `radar.ts`: Ohne `top: 0` setzt ECharts den
            // Block mit eigenem Versatz, und ohne feste Schriftmaße weicht
            // seine Höhe von der Schätzung ab — die Legende landete dann
            // auf der Fußnote. `width`/`overflow` halten eine lange Fußnote
            // zudem im Container statt über seinen Rand hinaus.
            top: 0,
            itemGap: TITLE_GAP,
            textStyle: {
              color: theme.text,
              fontFamily: theme.fontFamily,
              fontSize: TITLE_FONT,
              lineHeight: TITLE_LINE,
              width: headerWidth(size.width),
              overflow: "break",
            },
            subtextStyle: {
              color: theme.textMuted,
              fontFamily: theme.fontFamily,
              fontSize: FOOTNOTE_FONT,
              lineHeight: FOOTNOTE_LINE,
              width: headerWidth(size.width),
              overflow: "break",
            },
          },
        }),
    // `containLabel` statt eigener Rechnung: ECharts kennt die Breite der
    // Achsenbeschriftungen erst beim Zeichnen, und genau dann rückt es das
    // Raster ein.
    grid: { containLabel: true, left: 8, right: 16, top: legendTop + GRID_PAD, bottom: gridBottom },
    // `axis` statt `item`: Beim Vergleich zweier Fahrzeuge will man beide
    // Werte einer Kategorie nebeneinander sehen, nicht einen einzelnen Balken.
    tooltip: {
      trigger: "axis",
      axisPointer: { type: kind === "bar" ? "shadow" : "line" },
      valueFormatter: undefined,
      formatter: (params: unknown): string => {
        const list = Array.isArray(params) ? params : [params];
        const first = list[0] as { dataIndex?: number; axisValueLabel?: string } | undefined;
        const index = first?.dataIndex ?? 0;
        const category = spec.categories[index];
        const rows = list
          .map((item) => {
            const entry = item as { seriesIndex?: number; marker?: string; seriesName?: string };
            const value = p.series[entry.seriesIndex ?? 0]?.values[index] ?? null;
            return `${entry.marker ?? ""}${entry.seriesName ?? ""}: ${formatMeasure(value, category, locale)}`;
          })
          .join("<br/>");
        return `${first?.axisValueLabel ?? category?.label ?? ""}<br/>${rows}`;
      },
    },
    legend: {
      show: spec.legend.show,
      data: p.series.map((entry) => entry.name),
      [spec.legend.position]: spec.legend.position === "top" ? header : 0,
      textStyle: { color: theme.text, fontFamily: theme.fontFamily },
    },
    aria: { enabled: true },
    xAxis: horizontal ? valueAxis : categoryAxis,
    yAxis: horizontal ? categoryAxis : valueAxis,
    series,
  };
}

export const barOption = (
  p: PreparedSpec,
  theme: ChartTheme,
  locale: string,
  size: ChartSize,
): Record<string, unknown> => cartesianOption(p, theme, locale, size, "bar");

export const lineOption = (
  p: PreparedSpec,
  theme: ChartTheme,
  locale: string,
  size: ChartSize,
): Record<string, unknown> => cartesianOption(p, theme, locale, size, "line");
