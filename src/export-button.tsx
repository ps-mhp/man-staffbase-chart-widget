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

import * as React from "react";
import { useState } from "react";

import { downloadBlob, exportFilename, standaloneSvg, svgToPngBlob } from "./chart-export";
import { ChartTheme } from "./man-chart-theme";

export interface ExportButtonsProps {
  /** Derselbe Ref wie der ECharts-Container — das Ausgezeichnete, nicht der Knopfbereich selbst. */
  containerRef: React.RefObject<HTMLDivElement | null>;
  theme: ChartTheme;
  title?: string;
}

/** 2× für eine brauchbare Auflösung in Präsentationen und Ausdrucken. */
const PNG_SCALE = 2;

const MESSAGES = {
  failed: "Der Export ist fehlgeschlagen. Bitte versuchen Sie es erneut.",
} as const;

/** Liest Breite und Höhe aus dem SVG-String; ohne Angabe die Maße des Containers. */
function svgDimensions(svg: string, fallbackWidth: number, fallbackHeight: number): { width: number; height: number } {
  const widthMatch = svg.match(/width="(\d+(?:\.\d+)?)"/);
  const heightMatch = svg.match(/height="(\d+(?:\.\d+)?)"/);
  return {
    width: widthMatch ? Number.parseFloat(widthMatch[1]) : fallbackWidth,
    height: heightMatch ? Number.parseFloat(heightMatch[1]) : fallbackHeight,
  };
}

/**
 * Zwei Knöpfe unter dem Diagramm, „Als SVG“ und „Als PNG“.
 *
 * Scheitert die Erzeugung, erscheint ein Hinweis statt einer stillen
 * Nichtreaktion — etwa, wenn der Container (noch) kein `<svg>` enthält.
 */
export function ExportButtons({ containerRef, theme, title }: ExportButtonsProps): React.JSX.Element {
  const [error, setError] = useState<string | null>(null);

  function readSvgOrFail(): string | null {
    const container = containerRef.current;
    const svg = container ? standaloneSvg(container, theme) : null;
    if (!svg) setError(MESSAGES.failed);
    return svg;
  }

  function handleSvgClick(): void {
    const svg = readSvgOrFail();
    if (!svg) return;
    setError(null);
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    downloadBlob(blob, exportFilename(title, "svg"));
  }

  function handlePngClick(): void {
    const svg = readSvgOrFail();
    if (!svg) return;
    const container = containerRef.current;
    const { width, height } = svgDimensions(svg, container?.clientWidth ?? 0, container?.clientHeight ?? 0);
    svgToPngBlob(svg, width, height, PNG_SCALE)
      .then((blob) => {
        setError(null);
        downloadBlob(blob, exportFilename(title, "png"));
      })
      .catch(() => setError(MESSAGES.failed));
  }

  return (
    <div className="man-chart__export">
      <button type="button" className="man-chart__export-button" onClick={handleSvgClick}>
        Als SVG
      </button>
      <button type="button" className="man-chart__export-button" onClick={handlePngClick}>
        Als PNG
      </button>
      {error ? (
        <p className="man-chart__export-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
