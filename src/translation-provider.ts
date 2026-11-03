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
 * Wie die Texte dieses Bausteins durch Staffbases Inhaltsübersetzung fahren.
 *
 * Die Definition liegt im Attribut `chart`, und `POST /api/translations`
 * fasst Textknoten an, aber keine Attribute. Ohne diesen Anbieter bliebe das
 * Diagramm in einem übersetzten Artikel einsprachig. Die gemeinsame
 * Registrierung schickt die Texte als eigene Anfrage neben der des Editors
 * und schreibt das Ergebnis ins Attribut zurück.
 */

import { TranslationProvider } from "@shared/translation/carriers";

import { parseChartSpec, serializeChartSpec } from "./chart-model";
import { CHART_ATTRIBUTE } from "./configuration-schema";
import {
  applyTranslatedTexts,
  isTranslatedChartHtml,
  readTranslatedTexts,
  specToTranslatableHtml,
} from "./translation-payload";

export const chartTranslationProvider: TranslationProvider = {
  id: "chart-widget",
  label: "Diagramm-Widget",
  ref: { tagName: "chart-widget", attribute: CHART_ATTRIBUTE },

  toTranslatable: (stored) => {
    if (!stored) return null;
    const { spec, problems } = parseChartSpec(stored);
    // Unlesbares nicht übersetzen: Der Rückschreibweg würde die kaputte
    // Fassung durch eine leere ersetzen und den Schaden vergrößern.
    if (problems.some((problem) => problem.code === "unreadable" || problem.code === "unknown-type")) {
      return null;
    }
    return specToTranslatableHtml(spec);
  },

  fromTranslated: (html, stored) =>
    serializeChartSpec(applyTranslatedTexts(parseChartSpec(stored).spec, readTranslatedTexts(html))),

  acceptsTranslated: isTranslatedChartHtml,
};
