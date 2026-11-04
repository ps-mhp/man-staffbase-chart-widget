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
 * Grobe Textmaße für die Flächenaufteilung eines Diagramms.
 *
 * Warum geschätzt und nicht gemessen: Die Option wird gebaut, bevor ECharts
 * irgendetwas gezeichnet hat — es gibt zu diesem Zeitpunkt keinen Text, den
 * man messen könnte. Ein eigener Canvas-Messpfad wäre genauer, liefe aber im
 * Export (serialisiertes SVG) und im Test (jsdom ohne Textmetrik) ins Leere.
 *
 * Die Schätzung darf deshalb nie zu klein ausfallen: Zu viel reservierter
 * Rand macht das Netz etwas kleiner, zu wenig lässt Beschriftungen aus dem
 * Baustein herauslaufen — und genau das ist der Fehler, den diese Datei
 * verhindern soll.
 */

/**
 * Mittlere Zeichenbreite im Verhältnis zur Schriftgröße.
 *
 * 0,55 liegt bewusst über dem tatsächlichen Mittel der verwendeten
 * Grotesk-Schriften (etwa 0,50 für gemischten deutschen Satz), damit die
 * Schätzung in die sichere Richtung irrt.
 */
const AVERAGE_GLYPH_RATIO = 0.55;

/** Maße des Kopfbereichs; geteilt von allen Übersetzern, damit sie gleich aussehen. */
export const TITLE_FONT = 16;
export const TITLE_LINE = 22;
export const FOOTNOTE_FONT = 12;
export const FOOTNOTE_LINE = 16;
/** Abstand zwischen Titel und Fußnote. */
export const TITLE_GAP = 6;
/** Luft zwischen dem Kopfbereich und dem, was darunter folgt. */
const HEADER_PAD = 10;

/** Geschätzte Breite einer Textzeile in Pixeln. */
export function textWidth(text: string, fontSize: number): number {
  return text.length * fontSize * AVERAGE_GLYPH_RATIO;
}

/**
 * Zeilen, die ein Text in einer vorgegebenen Breite belegt.
 *
 * Eigene Zeilenumbrüche (`\n`) zählen immer; jede so entstandene Zeile wird
 * zusätzlich am Wortende umbrochen, so wie ECharts es mit
 * `overflow: "break"` tut.
 */
export function lineCount(text: string, maxWidth: number, fontSize: number): number {
  if (text === "") return 0;
  const charsPerLine = Math.max(1, Math.floor(maxWidth / (fontSize * AVERAGE_GLYPH_RATIO)));

  return text.split("\n").reduce((total, paragraph) => {
    let used = 0;
    let lines = 1;
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const needed = used === 0 ? word.length : used + 1 + word.length;
      if (needed <= charsPerLine) {
        used = needed;
        continue;
      }
      // Ein einzelnes Wort, das breiter ist als die Zeile, bricht ECharts
      // mitten im Wort — es belegt dann mehrere Zeilen. Steht die Zeile noch
      // leer, ist die erste davon die bereits gezählte.
      const needs = Math.max(1, Math.ceil(word.length / charsPerLine));
      lines += used === 0 ? needs - 1 : needs;
      used = word.length % charsPerLine;
    }
    return total + lines;
  }, 0);
}

/** Begrenzt einen Wert auf eine Spanne. */
export function clamp(value: number, low: number, high: number): number {
  return Math.min(high, Math.max(low, value));
}

/**
 * Höhe des Kopfbereichs aus Titel und Fußnote, in Pixeln.
 *
 * ECharts setzt Titel und Fußnote als einen Block, reserviert dafür aber
 * keinen Platz: Eine Legende mit `top: 0` landet darüber statt darunter.
 * Jeder Übersetzer muss den Abstand deshalb selbst kennen.
 *
 * Feste Werte je nachdem, *ob* ein Titel gesetzt ist, reichen dafür nicht.
 * Sie übersehen eine vorhandene Fußnote und ebenso einen Titel, der auf
 * schmalen Bausteinen umbricht — die Legende legt sich dann über den Text.
 * Gerechnet wird darum aus den echten Zeilenhöhen.
 */
/** Breite, auf die Titel und Fußnote umbrochen werden. */
export function headerWidth(width: number): number {
  return Math.max(80, width - 16);
}

export function headerHeight(
  title: string | undefined,
  footnote: string | undefined,
  width: number,
): number {
  const available = headerWidth(width);
  const titleHeight = title ? lineCount(title, available, TITLE_FONT) * TITLE_LINE : 0;
  const footnoteHeight = footnote ? lineCount(footnote, available, FOOTNOTE_FONT) * FOOTNOTE_LINE : 0;
  if (titleHeight + footnoteHeight === 0) return 0;
  // ECharts setzt zwischen Titel und Fußnote seinen `itemGap`; der steht
  // deshalb hier als Konstante und nicht auf dem Standardwert.
  return (
    titleHeight + (titleHeight > 0 && footnoteHeight > 0 ? TITLE_GAP : 0) + footnoteHeight + HEADER_PAD
  );
}
