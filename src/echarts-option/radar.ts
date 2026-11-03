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

import { PreparedSpec } from "../chart-prepare";
import { formatMeasure } from "../format";
import { ChartTheme } from "../man-chart-theme";
import { ChartSize } from "../use-echarts";
import {
  anchorFor,
  axisDirection,
  axisNameGaps,
  axisNameLabels,
  separateLabels,
  valueLabels,
} from "./radar-labels";
import type { Direction, TextAnchor } from "./radar-labels";
import { NORMALIZED_MAX, axisBounds, scaleSeries } from "./radar-scale";
import { clamp, lineCount, textWidth } from "./text-layout";

const DEFAULT_GRID_LEVELS = 5;
const AREA_OPACITY = 0.12;

/* Schriftgrößen und Zeilenhöhen, aus denen die Flächenaufteilung rechnet. */
const TITLE_FONT = 16;
const TITLE_LINE = 22;
const FOOTNOTE_FONT = 12;
const FOOTNOTE_LINE = 16;
/** Abstand zwischen Titel und Fußnote. */
const TITLE_GAP = 6;
/** Luft zwischen dem Kopfbereich und dem, was darunter folgt. */
const HEADER_PAD = 10;
const LEGEND_FONT = 12;
const LEGEND_LINE = 22;
const AXIS_NAME_FONT = 12;
const VALUE_FONT = 12;
const VALUE_LINE = 16;
/** Waagerechte Polsterung der Fläche hinter einer Zahl, beide Seiten. */
const VALUE_PAD = 6;
const AXIS_NAME_LINE = 15;
/** Breite eines Legendensymbols samt Abstand zu seinem Text. */
const LEGEND_SYMBOL = 32;
/** Abstand zwischen zwei Legendeneinträgen. */
const LEGEND_GAP = 10;
/** Schmalste Spalte, in der eine Beschriftung noch lesbar umbricht. */
const MIN_NAME_WIDTH = 44;
/** Kleinster sinnvoller Netzradius — darunter ist nichts mehr ablesbar. */
const MIN_RADIUS = 48;

interface RadarLayout {
  centerX: number;
  centerY: number;
  radius: number;
  /** Breite, auf die eine Achsenbeschriftung umbrochen wird. */
  nameWidth: number;
  /** Abstand vom Netzrand zum Achsennamen, je Achse. */
  nameGaps: number[];
  /** Oberkante der Legende, wenn sie oben steht. */
  legendTopOffset: number;
  /** Breite, auf die Titel und Fußnote umbrochen werden. */
  headerWidth: number;
}

/**
 * Teilt die Fläche des Containers auf.
 *
 * ECharts reserviert für Achsenbeschriftungen am Radar **keinen** Platz: Es
 * legt das Netz mittig an und schreibt die Namen darüber hinaus, auch wenn
 * sie dabei aus dem Container laufen. Ebenso verankert eine Legende mit
 * `top: 0` über dem Untertitel statt darunter. Beides muss deshalb hier
 * ausgerechnet werden, und zwar aus der echten Containergröße — eine feste
 * Prozentangabe kann nicht wissen, wie lang die Beschriftungen sind.
 */
function radarLayout(
  p: PreparedSpec,
  size: ChartSize,
  legendTop: boolean,
  valueWidth: number,
): RadarLayout {
  const { spec } = p;
  const headerWidth = Math.max(80, size.width - 16);

  const titleHeight = spec.title ? lineCount(spec.title, headerWidth, TITLE_FONT) * TITLE_LINE : 0;
  const footnoteHeight = spec.footnote
    ? lineCount(spec.footnote, headerWidth, FOOTNOTE_FONT) * FOOTNOTE_LINE
    : 0;
  // ECharts setzt zwischen Titel und Fußnote seinen `itemGap`; der steht
  // deshalb hier als Konstante und nicht auf dem Standardwert.
  const headerHeight =
    titleHeight +
    (titleHeight > 0 && footnoteHeight > 0 ? TITLE_GAP : 0) +
    footnoteHeight +
    (titleHeight + footnoteHeight > 0 ? HEADER_PAD : 0);

  // Die Legende bricht bei ECharts selbst um, sobald die Einträge nicht
  // mehr nebeneinander passen. Für die Höhe wird derselbe Umbruch geschätzt.
  const legendWidth = p.series.reduce(
    (total, series) => total + textWidth(series.name, LEGEND_FONT) + LEGEND_SYMBOL + LEGEND_GAP,
    0,
  );
  const legendHeight = spec.legend.show
    ? Math.max(1, Math.ceil(legendWidth / Math.max(1, size.width))) * LEGEND_LINE
    : 0;

  // Seitlich: die breiteste eigene Zeile einer Beschriftung, gedeckelt auf
  // ein Viertel der Breite, damit lange Namen das Netz nicht aufzehren —
  // darüber hinaus bricht `overflow: "break"` sie um.
  const widestName = spec.categories.reduce(
    (widest, category) =>
      Math.max(widest, ...category.label.split("\n").map((line) => textWidth(line, AXIS_NAME_FONT))),
    0,
  );
  const axisCount = spec.categories.length;
  const nameGaps = axisNameGaps({
    axisCount,
    seriesCount: p.series.length,
    valueWidth,
    valueLine: VALUE_LINE,
  });

  /*
   * Wie breit eine Beschriftung sein darf, entscheidet der Container: Was
   * neben dem kleinsten noch lesbaren Netz samt Zahlen übrig bleibt, ist die
   * Obergrenze. Ohne sie liefe die Beschriftung in einem schmalen Container
   * aus dem Widget heraus, statt umzubrechen.
   */
  const sideShare = spec.categories.reduce(
    (largest, _category, index) => Math.max(largest, Math.abs(axisDirection(index, axisCount).x)),
    0,
  );
  const widestGap = nameGaps.reduce((largest, gap) => Math.max(largest, gap), 0);
  const roomForName = size.width / 2 - MIN_RADIUS - sideShare * widestGap;
  const nameWidth = clamp(widestName, MIN_NAME_WIDTH, Math.max(MIN_NAME_WIDTH, Math.min(size.width * 0.26, roomForName)));

  const nameHeight = spec.categories.reduce(
    (tallest, category) => Math.max(tallest, lineCount(category.label, nameWidth, AXIS_NAME_FONT)),
    1,
  ) * AXIS_NAME_LINE;

  /*
   * Wie weit ein Achsenname über den Netzrand hinausragt, hängt an seiner
   * Richtung: Der Name auf 12 Uhr steht mit seiner vollen Höhe über dem
   * Netz, der auf 3 Uhr mit seiner vollen Breite daneben, ein schräger mit
   * dem jeweiligen Anteil. Der Anteil `|Richtung|` ist zugleich der Anteil,
   * mit dem der Abstand selbst in diese Richtung zählt.
   */
  const extent = (
    share: (direction: Direction) => number,
    reach: (anchor: TextAnchor) => number,
    span: number,
  ): number =>
    spec.categories.reduce((largest, _category, index) => {
      const direction = axisDirection(index, axisCount);
      const toward = share(direction);
      if (toward <= 0) return largest;
      // Der Abstand zählt anteilig zur Richtung, der Text dagegen mit seiner
      // vollen Ausdehnung: Eine schräge Achse stellt ihren Namen genauso
      // breit, nur eben etwas weniger weit außen.
      return Math.max(largest, toward * (nameGaps[index] ?? 0) + reach(anchorFor(direction)) * span);
    }, 0);

  const topExtent = extent(
    (d) => Math.max(0, -d.y),
    (a) => (a.verticalAlign === "bottom" ? 1 : a.verticalAlign === "middle" ? 0.5 : 0),
    nameHeight,
  );
  const bottomExtent = extent(
    (d) => Math.max(0, d.y),
    (a) => (a.verticalAlign === "top" ? 1 : a.verticalAlign === "middle" ? 0.5 : 0),
    nameHeight,
  );
  const sideExtent = Math.max(
    extent(
      (d) => Math.max(0, d.x),
      (a) => (a.align === "left" ? 1 : a.align === "center" ? 0.5 : 0),
      nameWidth,
    ),
    extent(
      (d) => Math.max(0, -d.x),
      (a) => (a.align === "right" ? 1 : a.align === "center" ? 0.5 : 0),
      nameWidth,
    ),
  );

  const topReserve = headerHeight + (legendTop ? legendHeight : 0);
  const bottomReserve = legendTop ? 0 : legendHeight;

  const radius = Math.max(
    MIN_RADIUS,
    Math.min(
      size.width / 2 - sideExtent,
      (size.height - topReserve - bottomReserve - topExtent - bottomExtent) / 2,
    ),
  );

  return {
    centerX: size.width / 2,
    centerY: topReserve + topExtent + radius,
    radius,
    nameWidth,
    nameGaps,
    legendTopOffset: headerHeight,
    headerWidth,
  };
}

interface RadarTooltipParams {
  dataIndex: number;
  name: string;
  color: string;
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function radarOption(
  p: PreparedSpec,
  theme: ChartTheme,
  locale: string,
  size: ChartSize,
): Record<string, unknown> {
  const { spec } = p;
  const display = spec.display?.type === "radar" ? spec.display : undefined;
  const filled = display?.filled === true;
  const legendTop = spec.legend.position === "top";

  // Die Umrechnung auf 0–100 passiert jetzt hier statt in der Vorbereitung:
  // Sie ist eine Radar-Eigenheit, kein gemeinsamer Zwischenschritt.
  const bounds = axisBounds(spec.categories, spec.series);
  const normalized = scaleSeries(p.series, bounds);

  // Die Zahlen stehen zwischen dem äußersten Punkt einer Achse und deren
  // Namen. Wie viel Platz das braucht, hängt an der längsten Zahl — „1.000
  // kW" ist breiter als „5". Ohne diese Reserve schreibt die Zahl der
  // äußersten Serie in den Achsennamen hinein.
  const widestValue = p.series.reduce(
    (widest, series) =>
      Math.max(
        widest,
        ...spec.categories.map((category, axisIndex) =>
          textWidth(formatMeasure(series.values[axisIndex] ?? null, category, locale), VALUE_FONT),
        ),
      ),
    0,
  );
  const layout = radarLayout(p, size, legendTop, widestValue + VALUE_PAD);

  // Jede Achse läuft von 0 bis 100, weil die Umrechnung oben die Einheiten
  // und die Achsenrichtung bereits aufgelöst hat. ECharts sieht nie einen
  // Rohwert.
  const indicator = spec.categories.map((category) => ({
    name: category.label,
    min: 0,
    max: NORMALIZED_MAX,
  }));

  const labels = separateLabels(
    valueLabels({
      centerX: layout.centerX,
      centerY: layout.centerY,
      radius: layout.radius,
      axisCount: spec.categories.length,
      series: p.series.map((entry, index) => ({ color: entry.color, normalized: normalized[index] })),
      text: (seriesIndex, axisIndex) =>
        formatMeasure(p.series[seriesIndex]?.values[axisIndex] ?? null, spec.categories[axisIndex], locale),
    }),
    VALUE_FONT,
    VALUE_LINE,
  );

  const names = axisNameLabels({
    centerX: layout.centerX,
    centerY: layout.centerY,
    radius: layout.radius,
    names: spec.categories.map((category) => category.label),
    gaps: layout.nameGaps,
    color: theme.text,
  });

  const tooltipFormatter = (params: RadarTooltipParams): string => {
    const series = p.series[params.dataIndex];
    if (!series) return "";
    const rows = spec.categories
      .map((category, index) => {
        const value = escapeHtml(formatMeasure(series.values[index] ?? null, category, locale));
        const label = escapeHtml(category.label.replace(/\n/g, " "));
        return `<tr><td style="padding:1px 12px 1px 0">${label}</td><td style="text-align:right;font-weight:600">${value}</td></tr>`;
      })
      .join("");
    const dot = `<span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:${params.color};margin-right:6px"></span>`;
    return `<div style="font-weight:600;margin-bottom:4px">${dot}${escapeHtml(series.name)}</div><table>${rows}</table>`;
  };

  return {
    // Auch eine Fußnote ohne Titel muss erscheinen — `show: false` hätte sie
    // stillschweigend verschluckt. ECharts stellt beides als ein Block dar,
    // der Titel darf dafür leer bleiben.
    title:
      spec.title || spec.footnote
        ? {
            text: spec.title ?? "",
            subtext: spec.footnote,
            left: "center",
            top: 0,
            itemGap: TITLE_GAP,
            // Ohne Breitenbegrenzung schreibt ECharts eine lange Fußnote in
            // einer Zeile über den Containerrand hinaus.
            textStyle: { width: layout.headerWidth, overflow: "break", fontSize: TITLE_FONT },
            subtextStyle: {
              width: layout.headerWidth,
              overflow: "break",
              fontSize: FOOTNOTE_FONT,
              lineHeight: FOOTNOTE_LINE,
            },
          }
        : { show: false },
    aria: { enabled: true },
    legend: {
      show: spec.legend.show,
      // Oben beginnt die Legende unterhalb von Titel und Fußnote — mit
      // `top: 0` läge sie sonst auf der Fußnote. `bottom: 0` nur in der
      // unteren Lage, weil ECharts sonst oben und unten gleichzeitig
      // verankert und die Legende verzerrt.
      ...(legendTop ? { top: layout.legendTopOffset } : { bottom: 0 }),
      textStyle: { fontSize: LEGEND_FONT },
      data: p.series.map((series) => series.name),
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
      center: [layout.centerX, layout.centerY],
      radius: layout.radius,
      // Die Namen setzt `graphic` weiter unten selbst, je Achse mit eigenem
      // Abstand — siehe `radar-labels.ts`.
      axisName: { show: false },
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
        // Die Zahlen setzt `graphic` weiter unten selbst — siehe
        // `radar-labels.ts` dazu, warum ECharts' eigene Label am Radar
        // nicht ausreichen.
        label: { show: false },
        data: p.series.map((series, index) => ({
          name: series.name,
          value: normalized[index],
          itemStyle: { color: series.color },
          lineStyle: { color: series.color },
          ...(filled ? { areaStyle: { color: series.color, opacity: AREA_OPACITY } } : {}),
        })),
      },
    ],
    // Achsennamen und Wertelabels als freie Textelemente in
    // Containerkoordinaten. `silent`, damit sie den Tooltip der
    // darunterliegenden Punkte nicht abfangen.
    graphic: {
      elements: [
        ...names.map((name) => ({
          type: "text",
          x: name.x,
          y: name.y,
          silent: true,
          style: {
            text: name.text,
            fill: name.color,
            fontFamily: theme.fontFamily,
            fontSize: AXIS_NAME_FONT,
            lineHeight: AXIS_NAME_LINE,
            // Der Platz dafür ist in der Aufteilung eingerechnet; hier wird
            // durchgesetzt, dass lange Namen ihn auch einhalten.
            width: layout.nameWidth,
            overflow: "break",
            align: name.align,
            verticalAlign: name.verticalAlign,
          },
        })),
        ...labels.map((label) => ({
          type: "text",
          x: label.x,
          y: label.y,
          silent: true,
          // Über die Datenpunkte, damit ein Punkt nicht die erste Ziffer
          // seiner eigenen Zahl verdeckt.
          z: 100,
          style: {
            text: label.text,
            fill: label.color,
            fontFamily: theme.fontFamily,
            fontSize: VALUE_FONT,
            fontWeight: 600,
            // Eine Zahl landet zwangsläufig irgendwann auf einer Netz- oder
            // Datenlinie. Die Fläche in Hintergrundfarbe hält sie dort
            // lesbar, ohne die Linie darunter zu verdecken.
            backgroundColor: theme.surface,
            padding: [1, 3],
            borderRadius: 2,
            align: label.align,
            verticalAlign: label.verticalAlign,
          },
        })),
      ],
    },
  };
}
