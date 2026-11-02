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
 * Hängt den Diagramm-Editor an das `chart`-Feld im Konfigurationsdialog.
 *
 * `startFieldModalInjector` übernimmt alles Wiederkehrende: das Finden des
 * Feldes, den Entwurf, die Rückfrage beim Verwerfen, den Knopf zum erneuten
 * Öffnen und das Zurückschreiben über den nativen Setter — ohne den bekäme
 * React die Änderung nicht mit.
 */

import { startFieldModalInjector } from "@shared/config-modal";

import { ChartSpec, emptySpec, parseChartSpec, serializeChartSpec } from "../chart-model";
import { CHART_ATTRIBUTE } from "../configuration-schema";
import { ChartEditor } from "./chart-editor";

export function startChartEditorInjector(): () => void {
  return startFieldModalInjector<ChartSpec>({
    fieldKey: CHART_ATTRIBUTE,
    reopenLabel: "Diagramm bearbeiten",
    // Fehler aus `parseChartSpec` werden hier bewusst verschluckt: Der Editor
    // ist der Weg, eine kaputte Konfiguration zu reparieren, und darf daran
    // nicht selbst scheitern. Was unlesbar war, wird eine leere Definition.
    parse: (raw) => (raw.trim().length === 0 ? emptySpec() : parseChartSpec(raw).spec),
    serialize: serializeChartSpec,
    render: ChartEditor,
    modalTestId: "chart-editor-modal",
    reopenTestId: "chart-editor-reopen",
    // Beim ersten Anlegen gleich öffnen — ein leeres Textfeld namens
    // „Diagramm" sagt niemandem, was zu tun ist. `startFieldModalInjector`
    // ruft diese Funktion einmal ab, wenn das Feld gefunden wird.
    openInitially: () => true,
  });
}
