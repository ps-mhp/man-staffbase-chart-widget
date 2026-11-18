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
 * Hängt den Diagramm-Editor im Vollbild-Rahmen an das Feld `chart` und
 * blendet die alten Felder Höhe und Download aus.
 *
 * `startFieldModalInjector` übernimmt alles Wiederkehrende: Feld finden und
 * verbergen, Entwurf mit Verlauf, Rückfrage, Knopf zum Wiederöffnen und das
 * Zurückschreiben über den nativen Setter. Kopf, Übernehmen, Rückgängig und
 * Hilfe kommen aus `@man/config-ui`.
 *
 * Beim Öffnen übernimmt der Entwurf, was die alten Felder lesbar tragen
 * (`adoptLegacySettings`); erst „Übernehmen“ schreibt es ins Diagramm. Was
 * sich nicht lesen ließ, bleibt offen, und das alte Attribut gilt weiter.
 */

import * as React from "react";
import { ChartColumn } from "lucide-react";

import { FieldModalShellOptions, startFieldModalInjector } from "@shared/config-modal";
import { LegacyFieldSpec, readLegacyFields, startHiddenFields } from "@shared/legacy-fields";

import { ChartSpec, emptySpec, parseChartSpec, serializeChartSpec } from "../chart-model";
import { LegacyDialogValues, adoptLegacySettings } from "../chart-settings";
import { CHART_ATTRIBUTE, EXPORT_ATTRIBUTE, HEIGHT_ATTRIBUTE } from "../configuration-schema";
import { chartChangesStatus, validateChart } from "./editor-rules";

/**
 * Die alten Felder `height` und `allow-export`: seit 0.3 stehen beide im
 * Diagramm. `height` hat auch der Hero-Slider, `allow-export` die
 * Projekt-Zeitleiste – gelesen und ausgeblendet wird nur im eigenen Dialog.
 */
const LEGACY_FIELDS: Record<string, LegacyFieldSpec> = {
  [HEIGHT_ATTRIBUTE]: { kind: "number" },
  [EXPORT_ATTRIBUTE]: { kind: "boolean" },
};
const LEGACY_FIELD_KEYS = Object.keys(LEGACY_FIELDS);

/** Was sich aus den alten Feldern lesen ließ; ein fehlender Schlüssel war nicht lesbar. */
function readLegacyFromDialog(root: ParentNode): LegacyDialogValues {
  const { values } = readLegacyFields(LEGACY_FIELDS, CHART_ATTRIBUTE, root);
  const height = values[HEIGHT_ATTRIBUTE];
  const allowExport = values[EXPORT_ATTRIBUTE];
  return {
    ...(typeof height === "number" ? { height } : {}),
    ...(typeof allowExport === "boolean" ? { allowExport } : {}),
  };
}

/**
 * Der Editor kommt erst, wenn ein Dialog ihn zeigt: er baut auf
 * `@man/config-ui` (react-aria, Radix, Tailwind) – nichts davon gehört ins
 * Seitenbündel, das jede Leserin lädt. Hier bleiben nur Prüfung und Status;
 * beide braucht der Rahmen, bevor der Editor da ist.
 */
const loadEditor = () => import("./chart-editor");

const LazyChartEditor = React.lazy(() => loadEditor().then((module) => ({ default: module.ChartEditor })));

/** Die Hilfe aus demselben Chunk wie der Editor; ihr Text ist zu lang fürs Seitenbündel. */
const LazyChartEditorHelp = React.lazy(() => loadEditor().then((module) => ({ default: module.ChartEditorHelp })));

const LOADING = React.createElement("p", { className: "p-6 text-sm text-muted-foreground" }, "Editor wird geladen …");

/** Was der gemeinsame Rahmen vom Diagramm wissen muss. Offengelegt für Tests. */
export const chartEditorShell: FieldModalShellOptions<ChartSpec> = {
  widgetName: "Diagramm",
  title: "Diagramm bearbeiten",
  icon: ChartColumn,
  preview: true,
  help: React.createElement(React.Suspense, { fallback: null }, React.createElement(LazyChartEditorHelp)),
  statusText: chartChangesStatus,
  validate: validateChart,
};

/**
 * Liest das Feld in den Entwurf. Fehler aus `parseChartSpec` werden bewusst
 * verschluckt: Der Editor ist der Weg, eine kaputte Konfiguration zu
 * reparieren, und darf daran nicht selbst scheitern. Was unlesbar war, wird
 * eine leere Definition.
 */
export function parseForEditor(raw: string, root: ParentNode = document): ChartSpec {
  const spec = raw.trim().length === 0 ? emptySpec() : parseChartSpec(raw).spec;
  return adoptLegacySettings(spec, readLegacyFromDialog(root));
}

/**
 * Wartet auf den Konfigurationsdialog und setzt den Editor an die Stelle
 * von `chart`; die alten Felder blendet er nur im eigenen Dialog aus.
 *
 * @param root der zu beobachtende Teilbaum; standardmäßig das Dokument.
 * Offengelegt, damit Tests den Beobachter auf einen Container begrenzen.
 * @returns eine Funktion, die die Beobachtung beendet und alles abbaut.
 */
export function startChartEditorInjector(root: ParentNode = document): () => void {
  const stopModal = startFieldModalInjector<ChartSpec>({
    fieldKey: CHART_ATTRIBUTE,
    root,
    reopenLabel: "Diagramm bearbeiten",
    modalTestId: "chart-editor-modal",
    reopenTestId: "chart-editor-reopen",
    parse: (raw) => parseForEditor(raw, root),
    serialize: serializeChartSpec,
    shell: chartEditorShell,
    render: ({ value, onChange }) =>
      React.createElement(React.Suspense, { fallback: LOADING }, React.createElement(LazyChartEditor, { value, onChange })),
    // Beim ersten Anlegen gleich öffnen – ein leeres Textfeld namens
    // „Diagramm“ sagt niemandem, was zu tun ist.
    openInitially: () => true,
  });
  const stopHiding = startHiddenFields(LEGACY_FIELD_KEYS, CHART_ATTRIBUTE, root);
  return () => {
    stopModal();
    stopHiding();
  };
}
