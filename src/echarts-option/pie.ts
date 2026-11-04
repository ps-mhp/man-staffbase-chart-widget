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
 * Übersetzt in ein Kuchen- oder Ringdiagramm.
 *
 * Der einzige Typ, bei dem die **Kategorien** die Legende füllen und nicht
 * die Serien: Ein Kuchen zeigt die Aufteilung *einer* Reihe, und eine
 * Legende mit dem einen Eintrag „Anteil" wäre sinnlos.
 *
 * Weitere Serien bleiben in der Definition erhalten, werden aber nicht
 * gezeichnet — der Editor sagt das ausdrücklich, damit es nicht wie
 * Datenverlust aussieht.
 */

import { PreparedSpec } from "../chart-prepare";
import { formatMeasure } from "../format";
import { ChartTheme } from "../man-chart-theme";
import { ChartSize } from "../use-echarts";

/** Außenradius; der Rest der Fläche trägt Legende und Beschriftungen. */
const OUTER_RADIUS = "70%";

/**
 * Mittelpunkt senkrecht — rutscht mit Titel nach unten.
 *
 * Gefunden bei der Bildprüfung, nicht am Test: Bei einem sehr kleinen
 * Segment liegt dessen Außenlabel nahe der 12-Uhr-Position direkt unter der
 * Legende, und mit Titel reicht der Standard-Mittelpunkt (50 %) nicht, um
 * das zu vermeiden — das Label überlappte den Legendentext. `radius` bleibt
 * unverändert (und bleibt deshalb mit den Testwerten "70%" vergleichbar);
 * nur der Mittelpunkt weicht nach unten aus.
 */
const CENTER_Y = { withTitle: "58%", withoutTitle: "52%" } as const;

export function pieOption(
  p: PreparedSpec,
  theme: ChartTheme,
  locale: string,
  _size: ChartSize,
): Record<string, unknown> {
  const { spec } = p;
  const display = spec.display?.type === "pie" ? spec.display : undefined;
  const innerRadius = display?.innerRadius ?? 0;
  const labelMode = display?.label ?? "percent";

  const values = p.series[0]?.values ?? [];

  // Negative Werte fallen hier still heraus; gemeldet werden sie von
  // `validateSpec`, damit der Hinweis am Widget aus einer einzigen Kette
  // kommt.
  const filtered = spec.categories
    .map((category, index) => ({ category, index, value: values[index] }))
    .filter((entry): entry is { category: typeof entry.category; index: number; value: number } =>
      typeof entry.value === "number" && entry.value >= 0,
    );

  // `dataIndex` aus ECharts zeigt auf diese gefilterte Liste, nicht auf
  // `spec.categories` — nach dem Herausfiltern negativer Werte oder Lücken
  // laufen beide Nummerierungen auseinander. Formatter greifen deshalb über
  // `filtered`, nicht über eine Namenssuche in `spec.categories`.
  const data = filtered.map((entry) => ({
    name: entry.category.label,
    value: entry.value,
    itemStyle: { color: entry.category.color ?? theme.palette[entry.index % theme.palette.length] },
  }));

  return {
    animation: false,
    backgroundColor: "transparent",
    textStyle: { fontFamily: theme.fontFamily, color: theme.text },
    ...(spec.title === undefined && spec.footnote === undefined
      ? {}
      : {
          title: {
            text: spec.title,
            subtext: spec.footnote,
            left: "center",
            // `text` statt des im Brief genannten `textStrong`: Dieses Feld
            // gibt es auf `ChartTheme` nicht, siehe `cartesian.ts` für
            // dieselbe Abweichung.
            textStyle: { color: theme.text, fontFamily: theme.fontFamily },
            subtextStyle: { color: theme.textMuted, fontFamily: theme.fontFamily },
          },
        }),
    tooltip: {
      // `item`, nicht `axis`: Ein Kuchen hat keine Achse, und jedes Segment
      // steht für sich.
      trigger: "item",
      formatter: (params: unknown): string => {
        const entry = params as { dataIndex?: number; name?: string; percent?: number };
        const matched = filtered[entry.dataIndex ?? -1];
        const measure = formatMeasure(matched?.value ?? null, matched?.category, locale);
        return `${entry.name ?? ""}<br/>${measure} (${String(entry.percent ?? 0)} %)`;
      },
    },
    legend: {
      show: spec.legend.show,
      // Kategorien, nicht Serien — siehe Modulkommentar.
      data: spec.categories.map((category) => category.label),
      [spec.legend.position]: spec.legend.position === "top" ? (spec.title === undefined ? 8 : 40) : 0,
      textStyle: { color: theme.text, fontFamily: theme.fontFamily },
    },
    aria: { enabled: true },
    series: [
      {
        type: "pie",
        name: p.series[0]?.name ?? "",
        center: ["50%", spec.title === undefined ? CENTER_Y.withoutTitle : CENTER_Y.withTitle],
        radius: [`${String(innerRadius)}%`, OUTER_RADIUS],
        data,
        label: {
          show: labelMode !== "none",
          color: theme.text,
          fontFamily: theme.fontFamily,
          formatter: (params: unknown): string => {
            const entry = params as { dataIndex?: number; name?: string; percent?: number };
            const matched = filtered[entry.dataIndex ?? -1];
            const percent = `${String(entry.percent ?? 0)} %`;
            const measure = formatMeasure(matched?.value ?? null, matched?.category, locale);
            if (labelMode === "percent") return percent;
            if (labelMode === "value") return measure;
            return `${measure} (${percent})`;
          },
        },
        // `gridStrong` statt des im Brief genannten `axisLine`: Dieses Feld
        // gibt es auf `ChartTheme` nicht; `gridStrong` ist die fuer
        // Achsen-/Linienfarben vorgesehene Stufe (siehe `cartesian.ts`,
        // `radar.ts`).
        labelLine: { lineStyle: { color: theme.gridStrong } },
      },
    ],
  };
}
