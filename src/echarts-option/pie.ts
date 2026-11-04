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
import { ChartSize } from "../use-echarts";

/**
 * Weite, die eine Außenbeschriftung über den Kuchenrand hinaus braucht:
 * die beiden Abschnitte der Führungslinie und die Zeile selbst.
 */
const LABEL_REACH = 44;
/** Luft zwischen Beschriftung und dem, was darüber oder darunter steht. */
const LABEL_GAP = 8;
/** Kleinster Radius, bei dem ein Kuchen noch ablesbar ist. */
const MIN_RADIUS = 40;

const LEGEND_FONT = 12;
const LEGEND_LINE = 22;
/** Breite eines Legendensymbols samt Abstand zu seinem Text. */
const LEGEND_SYMBOL = 32;
/** Abstand zwischen zwei Legendeneinträgen. */
const LEGEND_GAP = 10;

interface PieLayout {
  /** Mittelpunkt senkrecht, in Pixeln vom oberen Rand. */
  centerY: number;
  /** Außenradius in Pixeln. */
  radius: number;
  /** Oberkante der Legende, wenn sie oben steht. */
  legendTop: number;
}

/**
 * Teilt die Höhe des Containers auf.
 *
 * Ein Kuchen genau in der Mitte des Containers ignoriert, dass Titel und
 * Legende oben oder unten bereits Platz wegnehmen. Bei einem sehr kleinen
 * Segment stieß dessen Außenlabel nahe der 12-Uhr-Position deshalb in den
 * Legendentext — gefunden bei der Bildprüfung, nicht am Test.
 *
 * Feste Prozentwerte lösen das nicht: Wie hoch die Legende ausfällt, hängt
 * an der Zahl der Kategorien, der Länge ihrer Namen und der Breite des
 * Containers. Bei acht langen Namen bricht ECharts sie auf zwei Zeilen um,
 * und jede angenommene Bandhöhe liegt daneben. Gerechnet wird deshalb aus
 * den echten Maßen, nach demselben Muster wie `radarLayout` in `radar.ts`.
 */
function pieLayout(p: PreparedSpec, size: ChartSize): PieLayout {
  const { spec } = p;
  const header = headerHeight(spec.title, spec.footnote, size.width);

  // Die Legende bricht bei ECharts selbst um, sobald die Einträge nicht mehr
  // nebeneinander passen. Für die Höhe wird derselbe Umbruch geschätzt.
  // Anders als bei den übrigen Typen stehen hier die Kategorien darin.
  const legendWidth = spec.categories.reduce(
    (total, category) => total + textWidth(category.label, LEGEND_FONT) + LEGEND_SYMBOL + LEGEND_GAP,
    0,
  );
  const legendHeight = spec.legend.show
    ? Math.max(1, Math.ceil(legendWidth / Math.max(1, size.width))) * LEGEND_LINE
    : 0;

  const top = header + (spec.legend.position === "top" ? legendHeight : 0);
  const bottom = spec.legend.position === "bottom" ? legendHeight : 0;

  const free = Math.max(0, size.height - top - bottom);
  // Die Mitte der freien Fläche, nicht die Mitte des Containers.
  const centerY = top + free / 2;

  // Ein fester Prozentwert als Radius misst sich am ganzen Container und
  // weiß nichts davon, dass die Legende Höhe weggenommen hat. Genau daran
  // scheiterte der erste Versuch: Der Kuchen blieb groß, der Mittelpunkt
  // rückte nach unten, und die Beschriftung des kleinsten Segments stieß
  // oben trotzdem in die Legende. Der Radius muss deshalb mitschrumpfen.
  const vertical = free / 2 - LABEL_REACH - LABEL_GAP;
  const horizontal = size.width / 2 - LABEL_REACH - LABEL_GAP;
  return { centerY, radius: Math.max(MIN_RADIUS, Math.min(vertical, horizontal)), legendTop: header };
}

export function pieOption(
  p: PreparedSpec,
  theme: ChartTheme,
  locale: string,
  size: ChartSize,
): Record<string, unknown> {
  const { spec } = p;
  const layout = pieLayout(p, size);
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
      // Unter dem Kopfbereich, nicht auf ihm: Ein fester Wert je nachdem, ob
      // ein Titel gesetzt ist, übersieht eine Fußnote und einen Titel, der
      // auf schmalen Bausteinen umbricht.
      [spec.legend.position]: spec.legend.position === "top" ? layout.legendTop : 0,
      textStyle: { color: theme.text, fontFamily: theme.fontFamily },
    },
    aria: { enabled: true },
    series: [
      {
        type: "pie",
        name: p.series[0]?.name ?? "",
        center: ["50%", layout.centerY],
        // `innerRadius` ist der Anteil des Lochs am Kuchen. Als Anteil statt
        // als Containerprozent bleibt das Loch bei jeder Größe gleich breit
        // und kann den mitschrumpfenden Außenrand nie überholen.
        radius: [(layout.radius * innerRadius) / 100, layout.radius],
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
