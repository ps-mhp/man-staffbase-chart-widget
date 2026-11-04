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
 * Die Diagramm-Definition, wie das Widget sie speichert und liest.
 *
 * Dieses Modul kennt ECharts nicht und importiert es nicht. Redakteursdaten,
 * Import, Export und der Großteil der Tests hängen an diesen Typen, nicht an
 * einer Fremd-API — ein Bibliothekswechsel beträfe damit nur die
 * Übersetzerschicht unter `echarts-option/`.
 */

import { decodePayload, isPayload } from "@shared/payload";
import { encodePayload } from "@shared/payload";

/** Die unterstützten Diagrammtypen. Wächst mit jedem Übersetzer in `echarts-option/`. */
export type ChartType = "radar" | "bar" | "line" | "pie";

export const CHART_TYPES: readonly ChartType[] = ["radar", "bar", "line", "pie"];

/**
 * Eine Achse beziehungsweise Kategorie.
 *
 * Die Achseneinstellungen hängen hier und nicht an einer eigenen Liste, weil
 * sie dieselbe Kardinalität haben: Zwei parallele Listen laufen auseinander,
 * sobald eine Kategorie gelöscht wird.
 */
export interface Category {
  /** Beschriftung; `\n` erzeugt einen Zeilenumbruch. */
  label: string;
  /** Untere Grenze der Achse; ohne Angabe aus den Werten abgeleitet. */
  min?: number;
  /** Obere Grenze der Achse; ohne Angabe aus den Werten abgeleitet. */
  max?: number;
  /** „Kleiner ist besser" — der kleinere Wert liegt dann weiter außen. */
  inverted?: boolean;
  /** Einheit, nur für Beschriftung und Tooltip. */
  unit?: string;
  /** Nachkommastellen; ohne Angabe aus dem Wert abgeleitet. */
  decimals?: number;
  /**
   * Nur `pie`: Farbe des Segments.
   *
   * Nicht über `Series.color` zu lösen: Ein Kuchen färbt nach Segment, und
   * Segmente sind Kategorien — `Series.color` träfe alle Segmente auf einmal.
   */
  color?: string;
}

export interface Series {
  name: string;
  /** Nach Position den Kategorien zugeordnet. */
  values: (number | null)[];
  /** Überschreibt die Palette. */
  color?: string;
}

/** Was nur das Radar kennt. */
export interface RadarDisplay {
  type: "radar";
  /** Zahl der konzentrischen Ringe. */
  gridLevels: number;
  /** Flächen hinter den Linien füllen. */
  filled: boolean;
}

/** Was nur das Balkendiagramm kennt. */
export interface BarDisplay {
  type: "bar";
  /** Serien übereinander statt nebeneinander. */
  stacked: boolean;
  /** `"horizontal"` legt die Balken; die Kategorien stehen dann links. */
  orientation: "vertical" | "horizontal";
}

/** Was nur das Liniendiagramm kennt. */
export interface LineDisplay {
  type: "line";
  smooth: boolean;
  /** Fläche unter der Linie füllen. */
  area: boolean;
  /** Punkte an den Stützstellen zeigen. */
  showPoints: boolean;
}

/** Was nur das Kuchendiagramm kennt. */
export interface PieDisplay {
  type: "pie";
  /** Anteil des Lochs in Prozent; `0` ergibt den Vollkreis. */
  innerRadius: number;
  label: "percent" | "value" | "both" | "none";
}

/**
 * Über `type` diskriminiert. Hier steht nur, was ein einzelner Typ kennt —
 * alles Geteilte (Titel, Fußnote, Legende, Farben) steht an `ChartSpec`,
 * damit es einen Typwechsel im Editor überlebt.
 */
export type DisplayOptions = RadarDisplay | BarDisplay | LineDisplay | PieDisplay;

export interface Legend {
  show: boolean;
  position: "top" | "bottom";
}

export interface ChartSpec {
  version: 1;
  type: ChartType;
  title?: string;
  footnote?: string;
  legend: Legend;
  categories: Category[];
  series: Series[];
  display?: DisplayOptions;
}

export type ChartProblemCode = "empty" | "unreadable" | "unknown-type" | "short-series" | "negative-share";

export interface ChartProblem {
  code: ChartProblemCode;
  /** Was genau — der gelesene Typname, der Name der zu kurzen Serie. */
  detail?: string;
}

/**
 * Eine frische leere Definition.
 *
 * Als Funktion und nicht als Konstante: Ein geteiltes Objekt wäre vom Editor
 * versehentlich veränderbar und würde die „leere" Vorlage dauerhaft
 * verfälschen.
 */
export function emptySpec(): ChartSpec {
  return {
    version: 1,
    type: "radar",
    legend: { show: true, position: "top" },
    categories: [],
    series: [],
  };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Zahl oder `null`. `NaN` und `Infinity` sind für ein Diagramm keine Werte. */
const readNumber = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

const readOptionalNumber = (value: unknown): number | undefined => readNumber(value) ?? undefined;

const readText = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

function readLegend(value: unknown): Legend {
  if (!isRecord(value)) return { show: true, position: "top" };
  return {
    show: value.show !== false,
    position: value.position === "bottom" ? "bottom" : "top",
  };
}

function readCategory(value: unknown): Category {
  if (!isRecord(value)) return { label: "" };
  return {
    label: typeof value.label === "string" ? value.label : "",
    min: readOptionalNumber(value.min),
    max: readOptionalNumber(value.max),
    inverted: value.inverted === true ? true : undefined,
    unit: readText(value.unit),
    decimals: readOptionalNumber(value.decimals),
    color: readText(value.color),
  };
}

function readDisplay(value: unknown, type: ChartType): DisplayOptions | undefined {
  if (!isRecord(value) || value.type !== type) return undefined;
  if (type === "radar") {
    return {
      type: "radar",
      gridLevels: readNumber(value.gridLevels) ?? 5,
      filled: value.filled === true,
    };
  }
  if (type === "bar") {
    return {
      type: "bar",
      stacked: value.stacked === true,
      // Alles außer dem ausdrücklichen "horizontal" ist stehend: Das ist die
      // erwartete Form, und ein verschriebener Wert soll kein gekipptes
      // Diagramm ergeben.
      orientation: value.orientation === "horizontal" ? "horizontal" : "vertical",
    };
  }
  if (type === "line") {
    return {
      type: "line",
      smooth: value.smooth === true,
      area: value.area === true,
      // Punkte sind die Vorgabe: Ohne sie ist bei wenigen Kategorien nicht zu
      // erkennen, wo ein Wert liegt und wo nur interpoliert wird.
      showPoints: value.showPoints !== false,
    };
  }
  if (type === "pie") {
    const label = value.label;
    return {
      type: "pie",
      // Begrenzen statt übernehmen: Über 90 % bliebe vom Ring nichts übrig,
      // unter 0 ist keine Größe.
      innerRadius: Math.min(90, Math.max(0, readNumber(value.innerRadius) ?? 0)),
      label: label === "value" || label === "both" || label === "none" ? label : "percent",
    };
  }
  return undefined;
}

/**
 * Liest die Definition aus einem Attribut.
 *
 * Wirft nie. `spec` ist immer ein gültiges Objekt — notfalls ein leeres —,
 * weil ein Diagramm nie auf eine weiße Fläche zurückfallen darf: Eine leere
 * Stelle auf der Seite ist für Redakteur:innen nicht von einem Layoutfehler
 * zu unterscheiden.
 */
export function parseChartSpec(raw: string | null | undefined): {
  spec: ChartSpec;
  problems: ChartProblem[];
} {
  const trimmed = (raw ?? "").trim();
  if (trimmed.length === 0) return { spec: emptySpec(), problems: [{ code: "empty" }] };

  // Rohes JSON bleibt lesbar: ein von Hand repariertes Attribut ist nicht
  // verpackt, und genau dann wird es gebraucht.
  const json = isPayload(trimmed) ? decodePayload(trimmed) : trimmed;
  if (json === null) return { spec: emptySpec(), problems: [{ code: "unreadable" }] };

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { spec: emptySpec(), problems: [{ code: "unreadable" }] };
  }
  if (!isRecord(parsed)) return { spec: emptySpec(), problems: [{ code: "unreadable" }] };

  const type = parsed.type;
  if (typeof type !== "string" || !CHART_TYPES.includes(type as ChartType)) {
    return {
      spec: emptySpec(),
      // Ohne Typfeld gibt es nichts zu nennen; `detail` bleibt dann leer,
      // statt die Zeichenkette "undefined" in eine Meldung zu tragen.
      problems: [{ code: "unknown-type", detail: typeof type === "string" ? type : undefined }],
    };
  }

  const problems: ChartProblem[] = [];
  const categories = Array.isArray(parsed.categories) ? parsed.categories.map(readCategory) : [];

  const rawSeries = Array.isArray(parsed.series) ? parsed.series : [];
  // Einträge, die keine Objekte sind, lässt der Editor nie entstehen; sie
  // könnten nur aus einem von Hand verbogenen Attribut stammen. Für die gibt
  // es nichts sinnvoll zu melden, also fallen sie still heraus.
  const series: Series[] = rawSeries.filter(isRecord).map((entry) => {
    const name = typeof entry.name === "string" ? entry.name : "";
    const given = Array.isArray(entry.values) ? entry.values : [];
    // Auffüllen statt verwerfen: Ein fehlender Wert ist eine Lücke im
    // Diagramm, kein Grund, die ganze Serie zu unterschlagen.
    if (given.length < categories.length) problems.push({ code: "short-series", detail: name });
    const values = categories.map((_, index) => readNumber(given[index]));
    return { name, values, color: readText(entry.color) };
  });

  return {
    spec: {
      version: 1,
      type: type as ChartType,
      title: readText(parsed.title),
      footnote: readText(parsed.footnote),
      legend: readLegend(parsed.legend),
      categories,
      series,
      display: readDisplay(parsed.display, type as ChartType),
    },
    problems,
  };
}

/**
 * Schreibt die Definition in die Form, die ins Attribut geht.
 *
 * Immer verpackt: Staffbases Inhaltsübersetzung serialisiert Artikel-HTML neu
 * und gibt innere Anführungszeichen unmaskiert aus, wodurch rohes JSON am
 * ersten Anführungszeichen abgeschnitten würde.
 */
export function serializeChartSpec(spec: ChartSpec): string {
  return encodePayload(JSON.stringify(spec));
}
