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

import { useEffect, useRef, useState } from "react";

import { ChartType } from "./chart-model";
import { EChartsCore, loadECharts } from "./echarts-modules";
import { ChartTheme, echartsTheme } from "./man-chart-theme";

export type ChartStatus = "loading" | "ready" | "failed";

/** Die gemessene Innenfläche des Containers in Pixeln. */
export interface ChartSize {
  width: number;
  height: number;
}

/** Nur das, was wir von der Instanz brauchen. */
interface ChartInstance {
  setOption(option: unknown, notMerge: boolean): void;
  resize(): void;
  dispose(): void;
}

interface UseEChartsArgs {
  type: ChartType;
  /**
   * Baut die Option zur gemessenen Containergröße.
   *
   * Als Funktion und nicht als fertiges Objekt, weil die Aufteilung der
   * Fläche — Netzradius, Platz für Achsenbeschriftungen, Lage der Legende —
   * nur mit der echten Größe zu rechnen ist, und die kennt erst dieser Hook.
   *
   * Muss vom Aufrufer stabil gehalten werden (`useCallback`), sonst läuft
   * `setOption` bei jedem Render.
   */
  makeOption: (size: ChartSize) => Record<string, unknown>;
  theme: ChartTheme;
}

/**
 * Hält eine ECharts-Instanz am Container.
 *
 * Die Reihenfolge ist wichtig und nicht beliebig: erst eine Größe abwarten,
 * dann das Modul laden, dann die Instanz anlegen. ECharts übernimmt die Maße
 * des Containers beim `init`. Im Content-Designer ist der Container im ersten
 * Frame häufig 0 Pixel breit — eine dort angelegte Instanz bliebe auch nach
 * dem Layout leer, weil nichts sie zum Neuzeichnen bringt.
 *
 * Das Theme kann ECharts nur beim `init` entgegennehmen. Ein Theme-Wechsel
 * bedeutet deshalb `dispose` und Neuanlage, nicht `setOption`.
 */
export function useECharts({ type, makeOption, theme: incomingTheme }: UseEChartsArgs): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  status: ChartStatus;
} {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ChartInstance | null>(null);
  const [core, setCore] = useState<EChartsCore | null>(null);
  const [size, setSize] = useState<ChartSize | null>(null);
  const [status, setStatus] = useState<ChartStatus>("loading");
  const hasSize = size !== null;

  // `theme` kommt oft als frisches Objekt herein (z.B. aus `readChartTheme`,
  // das keine Memoisierung verspricht). Ein `setStatus` weiter unten löst ein
  // Re-Render aus, das sonst erneut ein inhaltlich gleiches, aber anders
  // referenziertes Theme liefern würde — und den Theme-Wechsel-Effekt unten
  // fälschlich ein zweites `dispose`+`init` auslösen ließe. Deshalb wird die
  // Referenz nur erneuert, wenn sich der Inhalt tatsächlich ändert.
  const themeKeyRef = useRef<string>(JSON.stringify(incomingTheme));
  const themeRef = useRef<ChartTheme>(incomingTheme);
  const themeKey = JSON.stringify(incomingTheme);
  if (themeKeyRef.current !== themeKey) {
    themeKeyRef.current = themeKey;
    themeRef.current = incomingTheme;
  }
  const theme = themeRef.current;

  // 1. Auf eine brauchbare Größe warten und danach weiterzeichnen.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (width <= 0 || height <= 0) return;
      // Nur bei echter Änderung eine neue Referenz: Ein gleichbleibendes
      // Maß darf keinen neuen `setOption`-Lauf auslösen.
      setSize((previous) =>
        previous && previous.width === width && previous.height === height
          ? previous
          : { width, height },
      );
      chartRef.current?.resize();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // 2. Modul laden, sobald überhaupt Platz da ist.
  useEffect(() => {
    if (!hasSize) return;
    let cancelled = false;

    loadECharts(type)
      .then((loaded) => {
        if (!cancelled) setCore(loaded);
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });

    return () => {
      cancelled = true;
    };
  }, [hasSize, type]);

  // 3. Instanz anlegen oder die Option nachführen.
  useEffect(() => {
    const element = containerRef.current;
    if (!core || !element || !size) return;

    if (!chartRef.current) {
      chartRef.current = core.init(element, echartsTheme(theme), {
        renderer: "svg",
      }) as unknown as ChartInstance;
    }
    // `notMerge`: Weniger Serien als zuvor blieben sonst als Reste stehen.
    chartRef.current.setOption(makeOption(size), true);
    setStatus("ready");
  }, [core, makeOption, size, theme]);

  // Theme-Wechsel: alte Instanz weg, die nächste nimmt das neue Theme.
  useEffect(() => {
    return () => {
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, [core, theme]);

  return { containerRef, status };
}
