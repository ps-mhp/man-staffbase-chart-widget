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
 * Prüfung und Status des Diagramm-Editors.
 *
 * Liegt im Seitenbündel, nicht beim nachgeladenen Editor: der Rahmen braucht
 * beides schon, bevor der Editor da ist. Darum nur reine Funktionen, nichts
 * aus `@man/config-ui` außer Typen.
 */

import type { ValidationIssue } from "@man/config-ui/shell/shell-context";

import { Category, ChartSpec } from "../chart-model";
import { MAX_HEIGHT, MIN_HEIGHT } from "../configuration-schema";

export const HEIGHT_ISSUE = "height";

/** Kennung des Fehlers „Maximum nicht größer als Minimum“ an einer Achse. */
export const boundsIssueId = (index: number): string => `axis-${index}-bounds`;

/** Kennung des Fehlers „negativer Anteil“ an einem Kuchensegment. */
export const shareIssueId = (index: number): string => `axis-${index}-share`;

/** Wohin ein Fehler im Editor führt: Reiter des Panels, Achse und Feld. */
export interface IssueTarget {
  tab: "design" | "axis";
  axis?: number;
  /** Beschriftung des Felds, das den Fokus bekommt; ohne Feld bleibt es beim Reiter. */
  field?: string;
}

const AXIS_ISSUE = /^axis-(\d+)-(bounds|share)$/;

/**
 * Löst die Kennung eines Fehlers in sein Ziel auf. Die Kennungen kommen aus
 * `validateChart`; eine fremde führt nirgends hin. Ein negativer Anteil hat
 * im Panel kein eigenes Feld (er steht im Raster), dort bleibt es beim Reiter.
 */
export function issueTarget(id: string): IssueTarget | null {
  if (id === HEIGHT_ISSUE) return { tab: "design", field: "Höhe in px" };
  const match = AXIS_ISSUE.exec(id);
  if (match === null) return null;
  const axis = Number(match[1]);
  return match[2] === "bounds" ? { tab: "axis", axis, field: "Maximum" } : { tab: "axis", axis };
}

/** Benennt eine Achse für Meldungen, auch solange sie noch keinen Namen hat. */
export const axisName = (category: Category, index: number): string =>
  category.label.replace(/\n/g, " ").trim() || `Achse ${index + 1}`;

/** Ob Minimum und Maximum einer Achse sich widersprechen; gilt nur im Netz. */
export function boundsConflict(spec: ChartSpec, category: Category): boolean {
  if (spec.type !== "radar") return false;
  return category.min !== undefined && category.max !== undefined && category.max <= category.min;
}

/** Ob die Höhe außerhalb der Grenzen liegt, in denen die Seite sie zeigt. */
export const heightOutOfRange = (height: number | undefined): boolean =>
  height !== undefined && (height < MIN_HEIGHT || height > MAX_HEIGHT);

/**
 * Warum der Entwurf so nicht übernommen werden kann.
 *
 * - Ein Maximum, das nicht über dem Minimum liegt, zeichnet das Netz
 *   gekippt oder flach – die Seite zeigte stillschweigend etwas anderes.
 * - Ein negativer Wert im Kuchen sperrt auf der Seite das ganze Diagramm.
 * - Eine Höhe außerhalb von 160 bis 1200 Pixeln würde beim Rendern still
 *   auf den Rand gesetzt.
 */
export function validateChart(spec: ChartSpec): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  spec.categories.forEach((category, index) => {
    if (boundsConflict(spec, category)) {
      issues.push({ id: boundsIssueId(index), message: `Achse „${axisName(category, index)}“: Maximum zu klein` });
    }
  });
  if (spec.type === "pie") {
    const values = spec.series[0]?.values ?? [];
    spec.categories.forEach((category, index) => {
      const value = values[index];
      if (typeof value === "number" && value < 0) {
        issues.push({ id: shareIssueId(index), message: `„${axisName(category, index)}“: negativer Anteil im Kuchen` });
      }
    });
  }
  if (heightOutOfRange(spec.height)) {
    issues.push({ id: HEIGHT_ISSUE, message: `Höhe: erlaubt sind ${MIN_HEIGHT} bis ${MAX_HEIGHT} Pixel` });
  }
  return issues;
}

/** Die Fehler, die an einer Achse hängen – für Raster, Reiter „Achse“ und die Marke daran. */
export const axisIssueIndexes = (issues: readonly ValidationIssue[]): Set<number> =>
  new Set(
    issues.flatMap((issue) => {
      const match = /^axis-(\d+)-/.exec(issue.id);
      return match === null ? [] : [Number(match[1])];
    }),
  );

const sameJson = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

/** Gestaltung: alles, was das Aussehen bestimmt, aber nicht die Daten. */
function designChanged(draft: ChartSpec, saved: ChartSpec): boolean {
  return (
    draft.title !== saved.title ||
    draft.footnote !== saved.footnote ||
    !sameJson(draft.legend, saved.legend) ||
    !sameJson(draft.display, saved.display) ||
    draft.height !== saved.height
  );
}

/**
 * Was sich gegenüber dem übernommenen Stand geändert hat, etwa
 * „Diagrammtyp geändert · Daten geändert“; `undefined`, wenn nichts.
 */
export function chartChangesStatus(draft: ChartSpec, saved: ChartSpec): string | undefined {
  const parts = [
    draft.type !== saved.type && "Diagrammtyp geändert",
    !sameJson([draft.categories, draft.series], [saved.categories, saved.series]) && "Daten geändert",
    designChanged(draft, saved) && "Gestaltung geändert",
    draft.allowExport !== saved.allowExport && "Download geändert",
  ].filter((part): part is string => part !== false);
  return parts.length === 0 ? undefined : parts.join(" · ");
}
