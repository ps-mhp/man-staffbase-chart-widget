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
 * Das Übertragungsformat für die *eigene* Übersetzungsanfrage des Diagramms.
 *
 * `POST /api/translations` übersetzt Textknoten und lässt Attribute stehen —
 * deshalb fährt jeder Text als eigener Textknoten, und der Schlüssel, der ihn
 * im {@link ChartSpec} wiederfindet, als Attribut daneben. Nach demselben
 * Muster wie `table-widget/src/translation-payload.ts`.
 *
 * Mitgeschickt wird nur echte Sprache: Titel, Fußnote, Achsenbeschriftungen
 * und Seriennamen. Zahlen, Einheiten, Farben und Achsengrenzen bleiben
 * draußen — eine übersetzte Einheit wäre falsch („t" wird nicht zu „ton"),
 * eine übersetzte Zahl wäre Unsinn.
 */

import { ChartSpec } from "./chart-model";

/** Markiert den Behälter, damit sich die Antwort in jeder Form wiederfindet. */
export const CHART_MARKER = "data-cw-chart";
/** Der Schlüssel eines Texts — `title`, `footnote`, `category:<i>`, `series:<i>`. */
export const TEXT_ATTRIBUTE = "data-chart-text";

/** Maskiert `&`, `<` und `>`, damit roher Text kein Element aufmacht. */
function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** `\n` wird zu `<br>`, weil ein rohes `\n` den HTML-Umlauf nicht überlebt. */
function toHtmlText(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

/**
 * Liest den Text eines Elements, `<br>` wird zu `\n`.
 *
 * Über die Kindknoten statt über `element.innerHTML`: `innerHTML` serialisiert
 * neu und maskiert `&`, `<` und `>` dabei erneut — ein Text, der echte
 * kaufmännische Und-Zeichen oder spitze Klammern enthält, käme sonst mit
 * `&amp;`/`&lt;`/`&gt;` statt des ursprünglichen Zeichens zurück.
 */
function readElementText(element: Element): string {
  let text = "";
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) text += node.textContent ?? "";
    else if (node.nodeName === "BR") text += "\n";
  });
  return text;
}

interface TextUnit {
  key: string;
  text: string;
}

/** Jeder Text des Diagramms mit seinem Schlüssel, leere Texte ausgenommen. */
function collectTextUnits(spec: ChartSpec): TextUnit[] {
  const units: TextUnit[] = [];
  if (spec.title) units.push({ key: "title", text: spec.title });
  if (spec.footnote) units.push({ key: "footnote", text: spec.footnote });
  spec.categories.forEach((category, index) => {
    if (category.label) units.push({ key: `category:${index}`, text: category.label });
  });
  spec.series.forEach((series, index) => {
    if (series.name) units.push({ key: `series:${index}`, text: series.name });
  });
  return units;
}

/**
 * Die übersetzbaren Texte eines Diagramms als eigene Übersetzungsanfrage.
 *
 * `null`, wenn es nichts zu übersetzen gibt — sonst ginge für jedes frisch
 * eingefügte, leere Diagramm eine Anfrage raus.
 */
export function specToTranslatableHtml(spec: ChartSpec): string | null {
  const units = collectTextUnits(spec);
  if (units.length === 0) return null;
  const paragraphs = units
    .map((unit) => `<p ${TEXT_ATTRIBUTE}="${unit.key}">${toHtmlText(unit.text)}</p>`)
    .join("");
  return `<div ${CHART_MARKER}="1">${paragraphs}</div>`;
}

/** True für eine Zeichenkette, die wie eine Antwort auf {@link specToTranslatableHtml} aussieht. */
export const isTranslatedChartHtml = (html: string): boolean => html.includes(TEXT_ATTRIBUTE);

/** Liest die übersetzten Texte zurück, unter ihrem Schlüssel aus {@link TEXT_ATTRIBUTE}. */
export function readTranslatedTexts(html: string): Map<string, string> {
  const texts = new Map<string, string>();
  if (!isTranslatedChartHtml(html)) return texts;
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  doc.body.querySelectorAll(`[${TEXT_ATTRIBUTE}]`).forEach((element) => {
    const key = element.getAttribute(TEXT_ATTRIBUTE);
    if (key === null || texts.has(key)) return;
    texts.set(key, readElementText(element));
  });
  return texts;
}

/**
 * Liefert `spec` mit jedem Text ersetzt, für den `texts` eine Übersetzung
 * mitbringt. Zahlen, Einheiten und übrige Einstellungen bleiben unberührt.
 *
 * Nur gesetzt wird, wofür ein Schlüssel kam — eine unvollständige Antwort
 * darf keine Beschriftung löschen.
 */
export function applyTranslatedTexts(spec: ChartSpec, texts: ReadonlyMap<string, string>): ChartSpec {
  if (texts.size === 0) return spec;

  const title = texts.get("title") ?? spec.title;
  const footnote = texts.get("footnote") ?? spec.footnote;
  const categories = spec.categories.map((category, index) => {
    const translated = texts.get(`category:${index}`);
    return translated === undefined ? category : { ...category, label: translated };
  });
  const series = spec.series.map((entry, index) => {
    const translated = texts.get(`series:${index}`);
    return translated === undefined ? entry : { ...entry, name: translated };
  });

  return { ...spec, title, footnote, categories, series };
}
