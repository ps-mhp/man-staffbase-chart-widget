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
 * Bild-Export des dargestellten Diagramms.
 *
 * Bewusst **keine** zweite Zeichnung über ECharts' `renderToSVGString`:
 * Exportiert wird das SVG, das bereits im DOM steht — genau das, was auf dem
 * Bildschirm zu sehen ist, samt allem, was wir selbst an Styling beigesteuert
 * haben. Ein zweiter Renderpfad wäre eine zweite Wahrheit, die irgendwann von
 * der ersten abweicht. Das Widget rendert deshalb mit dem SVG-Renderer
 * (siehe `use-echarts.ts`), genau damit dieser Weg offensteht.
 */

import { ChartTheme } from "./man-chart-theme";

/** Attributname, über den die Redaktion den Export erlaubt. */
export const EXPORT_ATTRIBUTE = "allow-export";

/**
 * Liest das Erlauben-Attribut.
 *
 * Staffbase liefert boolesche Attribute je nach Weg unterschiedlich: als
 * echtes `boolean`, als Zeichenkette `"true"`/`"1"`/`"yes"` oder — weil HTML
 * ein bloßes Vorhandensein eines Attributs oft mit dessen eigenem Namen
 * füllt — auch als der Attributname selbst. Alles andere, einschließlich
 * Fehlen, `null` und `"false"`, bedeutet Nein.
 */
export function readExportAttribute(raw: unknown): boolean {
  if (raw === true) return true;
  if (typeof raw !== "string") return false;
  const normalized = raw.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes" || normalized === EXPORT_ATTRIBUTE;
}

/**
 * Baut aus dem im Container stehenden `<svg>` eine eigenständige Datei.
 *
 * `null`, solange noch nichts gezeichnet ist — ein Knopf, der eine leere
 * Datei liefert, ist schlimmer als keiner.
 */
export function standaloneSvg(container: HTMLElement, theme: ChartTheme): string | null {
  const svg = container.querySelector("svg");
  if (!svg) return null;

  // Auf einer Kopie arbeiten: Das angezeigte Diagramm darf durch den Export
  // nicht verändert werden.
  const clone = svg.cloneNode(true) as SVGSVGElement;

  // Im Dokument braucht das `<svg>` seinen Namensraum nicht, als eigenständige
  // Datei schon — sonst öffnet sie kein Betrachter.
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  // Nur gesetzt, wenn tatsächlich Verweise vorkommen (z. B. Verläufe,
  // Clip-Pfade) — ohne sie löst kein Betrachter ein `xlink:href` auf.
  if (clone.innerHTML.includes("xlink:href")) {
    clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  }

  // Schriftfamilie an die Wurzel: ECharts setzt sie nur an den Textelementen,
  // nicht am `<svg>` selbst. Ein Betrachter ohne „Man Europe" fällt damit
  // wenigstens geordnet auf die übrige Kette (Arial, sans-serif) zurück.
  clone.style.fontFamily = theme.fontFamily;

  // Weiße (bzw. Theme-)Fläche einziehen: Auf der Seite ist der Hintergrund
  // durchsichtig und erbt die Seitenfarbe. In einer Datei wäre das dunkle
  // Schrift auf Nichts — etwa in einer Präsentation auf dunklem Grund.
  const width = clone.getAttribute("width") ?? "0";
  const height = clone.getAttribute("height") ?? "0";
  const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  background.setAttribute("x", "0");
  background.setAttribute("y", "0");
  background.setAttribute("width", width);
  background.setAttribute("height", height);
  background.setAttribute("fill", theme.surface);
  clone.insertBefore(background, clone.firstChild);

  const serialized = new XMLSerializer().serializeToString(clone);
  return `<?xml version="1.0" encoding="UTF-8"?>\n${serialized}`;
}

/**
 * Rendert ein SVG auf einen Canvas und liefert ihn als PNG.
 *
 * Nicht in jsdom testbar — dort gibt es keinen Canvas-Kontext und kein
 * `Image`-Decoding; dafür ist der Rauchtest in einem echten Browser da
 * (`scripts/smoke-chart.mjs`).
 */
export function svgToPngBlob(svg: string, width: number, height: number, scale: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = width * scale;
        canvas.height = height * scale;
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Kein Canvas-Kontext verfügbar."));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          // Objekt-URL freigeben, sonst bleibt sie bis zum Seitenwechsel liegen.
          URL.revokeObjectURL(url);
          if (blob) resolve(blob);
          else reject(new Error("Die PNG-Erzeugung ist fehlgeschlagen."));
        }, "image/png");
      } catch (error) {
        URL.revokeObjectURL(url);
        reject(error);
      }
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Das SVG konnte nicht als Bild geladen werden."));
    };
    image.src = url;
  });
}

/** Löst einen Download des übergebenen Blobs im Browser aus. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

/** Länge, auf die ein erzeugter Dateiname (ohne Endung) gekürzt wird. */
const MAX_STEM_LENGTH = 80;

/** Umlaute, die `exportFilename` ausschreibt, statt sie stillschweigend zu verschlucken. */
const UMLAUT_REPLACEMENTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/ä/g, "ae"],
  [/ö/g, "oe"],
  [/ü/g, "ue"],
  [/ß/g, "ss"],
];

/**
 * Macht aus dem Diagrammtitel einen brauchbaren Dateinamen.
 *
 * Kleinschreibung, ausgeschriebene Umlaute, alles Übrige zu `-`, mehrfache
 * `-` zusammengezogen, auf {@link MAX_STEM_LENGTH} Zeichen gekürzt. Bleibt
 * danach nichts übrig — kein Titel, oder einer nur aus Sonderzeichen —, greift
 * der feste Name `diagramm`.
 */
export function exportFilename(title: string | undefined, extension: "svg" | "png"): string {
  let stem = (title ?? "").toLowerCase();
  for (const [pattern, replacement] of UMLAUT_REPLACEMENTS) {
    stem = stem.replace(pattern, replacement);
  }
  stem = stem
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, MAX_STEM_LENGTH);

  return `${stem || "diagramm"}.${extension}`;
}
