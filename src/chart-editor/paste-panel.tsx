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
 * „Aus Excel einfügen“: eine ganze Tabelle übernehmen. Steht als Leiste
 * rechts über dem Panel „Diagramm“, damit das Raster daneben sichtbar
 * bleibt.
 *
 * Abtippen ist die wahrscheinlichste Fehlerquelle – dieser Weg ersetzt die
 * Tabelle in einem Zug. Einzelne Blöcke fügt man direkt ins Raster ein
 * (`grid-paste.ts`).
 */

import * as React from "react";
import { useState } from "react";
import { Field } from "@man/config-ui/form/field";
import { SegmentedField } from "@man/config-ui/form/segmented-field";
import { Button } from "@man/config-ui/primitives/button";
import { Textarea } from "@man/config-ui/primitives/textarea";

import { Grid, parseGrid, transposeGrid } from "./grid-import";

/** Wie die eingefügte Tabelle herum steht. */
export type PasteOrientation = "axes-in-rows" | "axes-in-columns";

const ORIENTATIONS = [
  { id: "axes-in-rows", label: "Achsen in Zeilen" },
  { id: "axes-in-columns", label: "Achsen in Spalten" },
] as const;

const ORIENTATION_HINTS: Record<PasteOrientation, string> = {
  "axes-in-rows": "Je Zeile eine Kennzahl (Achse), je Spalte eine Variante (Reihe) – wie im Raster.",
  "axes-in-columns": "Je Zeile eine Variante (Reihe), je Spalte eine Kennzahl (Achse).",
};

const PLACEHOLDER = `Beispiel:

\tMAN eTGX\tMB eActros 600
Ladeleistung MCS [kW]\t750\t1.000
Nutzbare Energie [kWh]\t480\t600`;

export interface PastePanelProps {
  /** Bekommt die gelesene Tabelle, schon so gedreht, dass Achsen Kategorien sind. */
  onApply: (grid: Grid) => void;
}

export function PastePanel({ onApply }: PastePanelProps): React.ReactElement {
  const [text, setText] = useState("");
  const [orientation, setOrientation] = useState<PasteOrientation>("axes-in-rows");
  const [unreadable, setUnreadable] = useState(false);

  const apply = (): void => {
    const parsed = parseGrid(text);
    if (parsed === null) {
      setUnreadable(true);
      return;
    }
    setUnreadable(false);
    // `parseGrid` liest immer „erste Zeile = Achsen“. Stehen die Achsen in
    // Zeilen, wie im Raster, wird die Tabelle einmal gekippt.
    onApply(orientation === "axes-in-rows" ? transposeGrid(parsed) : parsed);
  };

  return (
    <div className="flex flex-col gap-6" data-testid="chart-paste-panel">
      <p className="text-[13px] text-muted-foreground">
        Tabelle in Excel, PowerPoint oder Word markieren, kopieren und hier einfügen. Abgetippte Zahlen sind die häufigste
        Fehlerquelle.
      </p>
      <Field
        label="Tabelle"
        hint="Erste Zeile und erste Spalte sind Überschriften."
        error={
          unreadable
            ? "Die Tabelle ließ sich nicht lesen. Erwartet werden mindestens zwei Zeilen mit Überschriften in der ersten Zeile und Spalte."
            : undefined
        }
      >
        <Textarea
          data-autofocus
          rows={8}
          placeholder={PLACEHOLDER}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setUnreadable(false);
          }}
          className="min-h-40 font-mono text-[13px]"
        />
      </Field>
      <SegmentedField
        label="Wie steht die Tabelle?"
        options={ORIENTATIONS}
        value={orientation}
        onChange={setOrientation}
        hint={ORIENTATION_HINTS[orientation]}
      />
      <div className="flex flex-col gap-1.5">
        <Button type="button" className="h-10 self-start" onClick={apply}>
          Tabelle übernehmen
        </Button>
        <p className="text-[13px] text-muted-foreground">
          Ersetzt Achsen und Reihen. Einheiten, Grenzen und Farben gleichnamiger Achsen und Reihen bleiben.
        </p>
      </div>
    </div>
  );
}
