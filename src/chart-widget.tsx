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
import { useLayoutEffect, useMemo, useRef } from "react";

import { ensureStyleElement } from "@shared/style-root";

import { ChartTable } from "./chart-table";
import { ChartProblem, parseChartSpec } from "./chart-model";
import { normalizeSpec } from "./chart-normalize";
import { buildOption } from "./echarts-option";
import { ExportButtons } from "./export-button";
import { intlLocale } from "./format";
import { useChartTheme } from "./use-chart-theme";
import { useECharts } from "./use-echarts";
import css from "./chart-widget.scss";

/**
 * Heißt bewusst nicht `ChartWidgetProps` — so nennt `index.tsx` die rohen
 * Attribute des Bausteins. Hier sind sie bereits gelesen und geprüft.
 */
export interface ChartViewProps {
  chart?: string;
  height?: number;
  contentLanguage?: string;
  allowExport?: boolean;
}

/** Kennzeichnet das Stylesheet in seinem Root und verhindert eine zweite Kopie. */
const STYLE_ELEMENT_ID = "man-chart-widget-styles";

/** Wortlaut der Hinweise an einer Stelle, damit die Doku ihn zitieren kann. */
const MESSAGES = {
  empty: "Noch kein Diagramm eingerichtet. Öffnen Sie die Einstellungen des Bausteins.",
  unreadable: "Das Diagramm konnte nicht gelesen werden. Bitte richten Sie es in den Einstellungen neu ein.",
  unknownType: (name: string) =>
    `Der Diagrammtyp „${name}“ ist dieser Version des Bausteins nicht bekannt. Bitte aktualisieren Sie den Baustein.`,
  unknownTypeUnnamed:
    "Der eingerichtete Diagrammtyp ist dieser Version des Bausteins nicht bekannt. Bitte aktualisieren Sie den Baustein.",
  noData: "Noch keine Daten im Diagramm. Ergänzen Sie Kategorien und Serien in den Einstellungen.",
  loadFailed: "Das Diagramm konnte nicht geladen werden. Bitte laden Sie die Seite neu.",
} as const;

function noticeFor(problems: ChartProblem[]): string | null {
  const unreadable = problems.find((problem) => problem.code === "unreadable");
  if (unreadable) return MESSAGES.unreadable;
  const unknown = problems.find((problem) => problem.code === "unknown-type");
  // Fehlt das Typfeld ganz, gibt es keinen Namen zu nennen; leere
  // Anfuehrungszeichen waeren fuer die Redaktion nur verwirrend.
  if (unknown) return unknown.detail ? MESSAGES.unknownType(unknown.detail) : MESSAGES.unknownTypeUnnamed;
  if (problems.some((problem) => problem.code === "empty")) return MESSAGES.empty;
  return null;
}

export function ChartWidget({ chart, height, contentLanguage, allowExport }: ChartViewProps): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const theme = useChartTheme(rootRef);
  const locale = intlLocale(contentLanguage);

  // `useLayoutEffect`, damit der Stil vor dem ersten Anzeigen steht — sonst
  // blitzt das Widget ungestylt auf. Mehrere Diagramme auf einer Seite teilen
  // sich einen Root; `ensureStyleElement` legt es dort nur einmal an.
  useLayoutEffect(() => {
    ensureStyleElement(rootRef.current, STYLE_ELEMENT_ID, css);
  }, []);

  const { spec, problems } = useMemo(() => parseChartSpec(chart), [chart]);
  const notice = noticeFor(problems);
  const hasData = spec.categories.length > 0 && spec.series.length > 0;

  // Ohne `useMemo` wäre die Option bei jedem Render ein neues Objekt, und
  // der Hook riefe `setOption` endlos auf.
  const option = useMemo(
    () => (hasData ? buildOption(normalizeSpec(spec, theme.palette), theme, locale) : {}),
    [hasData, spec, theme, locale],
  );

  const { containerRef, status } = useECharts({ type: spec.type, option, theme });
  const blocked = notice !== null || !hasData;

  return (
    <div className="man-chart" ref={rootRef}>
      {blocked ? (
        <p className={`man-chart__notice${notice ? " man-chart__notice--error" : ""}`}>
          {notice ?? MESSAGES.noData}
        </p>
      ) : (
        <>
          {status === "failed" ? (
            <p className="man-chart__notice man-chart__notice--error">{MESSAGES.loadFailed}</p>
          ) : null}
          <div
            className="man-chart__canvas"
            ref={containerRef}
            style={{ height: `${height}px` }}
            role="img"
            aria-label={spec.title ?? "Diagramm"}
          />
          {allowExport && status === "ready" ? (
            <ExportButtons containerRef={containerRef} theme={theme} title={spec.title} />
          ) : null}
          <ChartTable spec={spec} locale={locale} />
        </>
      )}
    </div>
  );
}
