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
 * Brücke zwischen den MAN-Tokens und ECharts.
 *
 * ECharts zeichnet in SVG, nimmt Farben aber als Zeichenketten in der Option
 * entgegen und wertet keine CSS-Variablen aus. Also lesen wir die Tokens
 * einmal am Element aus und reichen fertige Werte weiter.
 *
 * Die Fallbackwerte sind identisch zu `src/shared/stylings/_man-tokens.scss`.
 * Weichen sie dort ab, sind sie hier nachzuziehen.
 */

/**
 * Die Serienfarben.
 *
 * Die MAN-Tokens enthalten keine kategoriale Datenpalette — sie beschreiben
 * Oberflächen, nicht Datenreihen. Diese Reihe ist aus ihnen abgeleitet und
 * nach Kontrast gegen Weiß sortiert. Die Reihenfolge ist verbindlich, weil
 * sich sonst bei einem Update bestehende Diagramme umfärben.
 *
 * `#ff6d00` erreicht nur 2,8:1 und verfehlt damit WCAG 1.4.11 (3:1). Es steht
 * deshalb zuletzt und ist der erste Austauschkandidat, sobald die CI eine
 * echte Datenpalette bekommt. Bis dahin tragen die Wertelabels am Datenpunkt
 * die Information auch ohne Farbunterscheidung.
 */
export const SERIES_PALETTE: readonly string[] = [
  "#e40045", // --man-red, 4,8:1
  "#3875b2", // --man-focus-color, 4,5:1
  "#303c49", // --man-slate, 11,2:1
  "#2d6300", // --man-success-ink, 7,3:1
  "#244b84", // --man-info-ink, 8,7:1
  "#ff6d00", // --man-warning-border, 2,8:1 — siehe oben
];

export interface ChartTheme {
  fontFamily: string;
  text: string;
  textMuted: string;
  /** Netzlinien. */
  grid: string;
  /** Achsenlinien, kräftiger als `grid`. */
  gridStrong: string;
  /** Hintergrund des Tooltips. */
  surface: string;
  border: string;
  radius: string;
  palette: readonly string[];
}

const FALLBACK: ChartTheme = {
  fontFamily: '"Man Europe", Arial, sans-serif',
  text: "#303c49",
  textMuted: "#5b6f85",
  grid: "#eaedf3",
  gridStrong: "#cbd3dc",
  surface: "#ffffff",
  border: "#cbd3dc",
  radius: "2px",
  palette: SERIES_PALETTE,
};

/** Ein Token, das nur Leerzeichen enthält, ist für ECharts keine Farbe. */
function token(style: CSSStyleDeclaration, name: string, fallback: string): string {
  const value = style.getPropertyValue(name).trim();
  return value.length > 0 ? value : fallback;
}

export function readChartTheme(element: HTMLElement | null): ChartTheme {
  if (!element) return { ...FALLBACK };
  const style = getComputedStyle(element);
  return {
    fontFamily: token(style, "--man-font-body", FALLBACK.fontFamily),
    text: token(style, "--man-text", FALLBACK.text),
    textMuted: token(style, "--man-text-muted", FALLBACK.textMuted),
    // Netzlinien zart, Achsenlinien eine Stufe kräftiger — beides sind
    // Craft-Haarlinien, keine Textfarben.
    grid: token(style, "--man-border-subtle", FALLBACK.grid),
    gridStrong: token(style, "--man-border", FALLBACK.gridStrong),
    surface: token(style, "--man-surface", FALLBACK.surface),
    border: token(style, "--man-border", FALLBACK.border),
    // Craft gibt Overlays Radius 2px (`radius-soft`), nicht den Grundradius 0.
    radius: token(style, "--man-radius-soft", FALLBACK.radius),
    palette: SERIES_PALETTE,
  };
}

/**
 * Das Theme-Objekt für `echarts.init`.
 *
 * Alles, was für jeden Diagrammtyp gleich gilt — Schrift, Textfarbe,
 * Serienfarben, Legende, Tooltip —, steht hier und nicht in den
 * Option-Übersetzern. Sonst gäbe es zwei Styling-Kanäle, und ein neuer
 * Diagrammtyp könnte das CI verfehlen, ohne dass es auffällt.
 */
export function echartsTheme(theme: ChartTheme): Record<string, unknown> {
  const text = { fontFamily: theme.fontFamily, color: theme.text };
  return {
    color: [...theme.palette],
    backgroundColor: "transparent",
    textStyle: { ...text, fontSize: 13 },
    title: {
      textStyle: { ...text, fontSize: 16, fontWeight: 600 },
      subtextStyle: { fontFamily: theme.fontFamily, color: theme.textMuted, fontSize: 12 },
    },
    legend: { textStyle: { ...text, fontSize: 13 }, icon: "roundRect", itemWidth: 14, itemHeight: 10 },
    tooltip: {
      backgroundColor: theme.surface,
      borderColor: theme.border,
      borderWidth: 1,
      textStyle: { ...text, fontSize: 13 },
      extraCssText: `border-radius:${theme.radius};box-shadow:0 2px 8px rgba(0,0,0,.12);`,
    },
  };
}
