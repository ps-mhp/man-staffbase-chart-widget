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
 * Die Hilfe des Diagramm-Editors in der Leiste des Rahmens. Tasten und den
 * Satz zu „Übernehmen“ ergänzt der Rahmen selbst.
 *
 * Ein aufklappbarer Abschnitt je Thema: die Leiste ist schmal, und wer
 * „Wie füge ich aus Excel ein?“ sucht, öffnet nur diesen. Kommt mit dem
 * Editor nachgeladen – im Seitenbündel hätte der Text nichts verloren.
 */

import * as React from "react";

import { CHART_TYPES } from "../chart-model";
import { CHART_TYPE_INFO } from "./chart-type-info";

interface HelpEntry {
  title: string;
  text: React.ReactNode;
}

interface HelpTopic {
  id: string;
  label: string;
  entries: readonly HelpEntry[];
}

const TOPICS: readonly HelpTopic[] = [
  {
    id: "data",
    label: "Daten",
    entries: [
      { title: "Das Raster", text: "Jede Zeile ist eine Achse (eine Kennzahl), jede Spalte rechts eine Reihe (eine Variante)." },
      { title: "Achse wählen", text: "Ein Klick in eine Zeile wählt die Achse. Darüber stehen ihre Aktionen, rechts unter „Achse“ ihre Feineinstellungen." },
      { title: "Reihen", text: "Namen, Farben und Reihenfolge der Reihen stehen rechts unter „Daten“." },
      { title: "Zahlen", text: "Deutsch geschrieben: Komma vor den Nachkommastellen, Punkt zwischen den Tausendern. Eine angehängte Einheit stört nicht." },
    ],
  },
  {
    id: "excel",
    label: "Aus Excel",
    entries: [
      { title: "Ab einem Feld", text: "Zellen in Excel kopieren, im Raster ein Feld wählen, ⌘ V (Strg V). Der Block landet ab diesem Feld; fehlende Achsen und Reihen kommen dazu." },
      {
        title: "Ganze Tabelle",
        text: "„Aus Excel einfügen“ ersetzt Achsen und Reihen in einem Zug. Einheiten, Grenzen und Farben gleichnamiger Achsen und Reihen bleiben.",
      },
    ],
  },
  {
    id: "types",
    label: "Typen",
    entries: CHART_TYPES.map((type) => ({ title: CHART_TYPE_INFO[type].name, text: CHART_TYPE_INFO[type].hint })),
  },
  {
    id: "fields",
    label: "Welche Felder wann erscheinen",
    entries: [
      { title: "Nur im Netz", text: "Minimum, Maximum und „Kleiner ist besser“." },
      { title: "Nur im Kuchen", text: "Segmentfarbe je Achse. Gezeichnet wird nur die erste Reihe." },
      {
        title: "Nichts geht verloren",
        text: "Ausgeblendete Felder behalten ihren Wert. Die Einstellungen eines Typs unter „Gestaltung“ gelten nur für ihn.",
      },
    ],
  },
  {
    id: "page",
    label: "Auf der Seite",
    entries: [
      { title: "Höhe", text: "160 bis 1200 Pixel. Die Breite folgt immer der Spalte." },
      { title: "Download", text: "Unter „Verhalten“: zwei Knöpfe unter dem Diagramm, „Als SVG“ und „Als PNG“." },
      { title: "Vorschau", text: "Desktop, Tablet und Mobil zeigen das Diagramm wie auf der Seite; das Panel rechts bleibt stehen." },
    ],
  },
];

export function ChartEditorHelp(): React.ReactElement {
  return (
    <div className="flex flex-col gap-2" data-testid="chart-editor-help">
      {TOPICS.map((topic, index) => (
        <details key={topic.id} className="rounded-md border px-3" open={index === 0}>
          <summary className="flex min-h-10 cursor-pointer items-center text-[13px] font-semibold text-foreground">
            {topic.label}
          </summary>
          <dl className="flex flex-col gap-2 pb-3">
            {topic.entries.map((entry) => (
              <div key={entry.title}>
                <dt className="font-semibold text-foreground">{entry.title}</dt>
                <dd className="text-muted-foreground">{entry.text}</dd>
              </div>
            ))}
          </dl>
        </details>
      ))}
    </div>
  );
}
