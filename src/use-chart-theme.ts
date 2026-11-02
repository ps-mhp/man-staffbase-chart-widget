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

import { RefObject, useEffect, useState } from "react";

import { ChartTheme, readChartTheme } from "./man-chart-theme";

/** Wann noch einmal gelesen wird, falls das Tenant-Stylesheet spät kommt. */
const RECHECK_DELAY_MS = 500;

/**
 * Liest das Theme vom Element, sobald es im Dokument hängt.
 *
 * Zwei Dinge, die hier leicht schiefgehen:
 *
 * Erstens darf das Theme nicht bei jedem Render neu gelesen werden. Es wäre
 * jedes Mal ein neues Objekt, und da es in die Abhängigkeiten des
 * ECharts-Effekts geht, würde die Instanz endlos neu angelegt. Deshalb
 * State, und Zuweisung nur bei tatsächlicher Abweichung.
 *
 * Zweitens lädt Staffbase das Tenant-Stylesheet gelegentlich erst nach dem
 * ersten Render. Ein einziger Lesedurchgang beim Mount liefert dann die
 * Fallbackwerte und bliebe dabei. Darum nach kurzer Zeit ein zweiter.
 */
export function useChartTheme(ref: RefObject<HTMLElement | null>): ChartTheme {
  const [theme, setTheme] = useState<ChartTheme>(() => readChartTheme(null));

  useEffect(() => {
    let cancelled = false;

    const read = () => {
      if (cancelled) return;
      const next = readChartTheme(ref.current);
      setTheme((current) => (JSON.stringify(current) === JSON.stringify(next) ? current : next));
    };

    read();
    const timer = window.setTimeout(read, RECHECK_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [ref]);

  return theme;
}
