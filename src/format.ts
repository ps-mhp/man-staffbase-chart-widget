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

/** Zahlen und Einheiten für Labels, Tooltip und die Datentabelle. */

import { Category } from "./chart-model";

const FALLBACK_LOCALE = "de-DE";

/** Platzhalter für einen fehlenden Wert. */
const MISSING = "\u2013";

/** Verbindet Zahl und Einheit, damit sie beim Umbruch zusammenbleiben. */
const NBSP = "\u00a0";

/**
 * Macht aus Staffbases Sprachkennung ein BCP-47-Tag.
 *
 * Staffbase liefert `de_DE`, `Intl` erwartet `de-DE`. Eine unbrauchbare
 * Angabe fällt auf Deutsch zurück, statt `Intl` werfen zu lassen.
 */
export function intlLocale(contentLanguage?: string): string {
  const candidate = (contentLanguage ?? "").replace(/_/g, "-").trim();
  if (candidate.length === 0) return FALLBACK_LOCALE;
  try {
    return Intl.NumberFormat.supportedLocalesOf([candidate]).length > 0 ? candidate : FALLBACK_LOCALE;
  } catch {
    return FALLBACK_LOCALE;
  }
}

/** Nachkommastellen aus dem Wert, wenn die Kategorie keine vorgibt. */
function inferDecimals(value: number): number {
  if (Number.isInteger(value)) return 0;
  const text = String(value);
  const dot = text.indexOf(".");
  return dot < 0 ? 0 : Math.min(4, text.length - dot - 1);
}

/**
 * Formatiert einen Rohwert so, wie er am Datenpunkt und im Tooltip steht.
 *
 * Immer der Rohwert, nie der normalisierte: Die Normalisierung ist eine
 * Zeichenhilfe, die auf der Seite nirgends sichtbar werden darf.
 */
export function formatMeasure(value: number | null, category: Category | undefined, locale: string): string {
  if (value === null) return MISSING;
  const decimals = category?.decimals ?? inferDecimals(value);
  const number = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
  const unit = category?.unit;
  return unit ? `${number}${NBSP}${unit}` : number;
}
