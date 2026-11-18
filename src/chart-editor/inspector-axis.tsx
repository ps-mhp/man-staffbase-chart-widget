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
 * Der Reiter „Achse“: die Feineinstellungen der im Raster gewählten Achse.
 *
 * Früher standen Nachkommastellen, Minimum und Maximum als Spalten im
 * Raster, hinter einem Haken „Feineinstellungen“ – drei unbeschriftete
 * Kästchen je Zeile. Hier haben sie Namen, Hinweise und Platz. Minimum,
 * Maximum und „Kleiner ist besser“ wirken nur im Netz und stehen nur dort;
 * die Segmentfarbe nur im Kuchen. Ausgeblendete Werte bleiben gespeichert.
 */

import * as React from "react";
import { useId } from "react";
import { Field } from "@man/config-ui/form/field";
import { IssueText } from "@man/config-ui/form/issue-text";
import { SwitchRow } from "@man/config-ui/form/switch-row";
import { Input } from "@man/config-ui/primitives/input";
import { Textarea } from "@man/config-ui/primitives/textarea";

import { Category, ChartSpec } from "../chart-model";
import { updateCategory } from "./editor-operations";
import { boundsConflict } from "./editor-rules";
import { ColorInput, NumberInput, formatEditorNumber } from "./fields";
import type { InspectorTabProps } from "./inspector-design";

export interface AxisTabProps extends InspectorTabProps {
  selected: number;
  issuesVisible: boolean;
  palette: readonly string[];
}

/** Ein Vorschlag für das Maximum: der größte Wert der Achse, sonst eins über dem Minimum. */
function suggestedMax(spec: ChartSpec, index: number, min: number): number {
  const values = spec.series.map((series) => series.values[index]).filter((value): value is number => typeof value === "number");
  const largest = Math.max(...values);
  return Number.isFinite(largest) && largest > min ? largest : min + 1;
}

interface BoundsProps {
  spec: ChartSpec;
  category: Category;
  index: number;
  issuesVisible: boolean;
  patch: (change: Partial<Category>) => void;
}

/**
 * Minimum und Maximum nebeneinander, der Fehler darunter über die ganze
 * Breite wie im Screen – am Maximum per `aria-describedby` angebunden.
 */
function BoundsFields({ spec, category, index, issuesVisible, patch }: BoundsProps): React.ReactElement {
  const errorId = `${useId()}-bounds`;
  const conflict = issuesVisible && boundsConflict(spec, category);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Minimum">
          <NumberInput value={category.min} placeholder="auto" onCommit={(next) => patch({ min: next ?? undefined })} />
        </Field>
        <Field label="Maximum">
          <NumberInput
            value={category.max}
            placeholder="auto"
            aria-invalid={conflict || undefined}
            aria-describedby={conflict ? errorId : undefined}
            onCommit={(next) => patch({ max: next ?? undefined })}
          />
        </Field>
      </div>
      {conflict && category.min !== undefined ? (
        <IssueText id={errorId}>
          {`Maximum muss größer als Minimum sein – zum Beispiel ${formatEditorNumber(suggestedMax(spec, index, category.min))}.`}
        </IssueText>
      ) : (
        <p className="text-[13px] text-muted-foreground">Leer: aus den Werten abgeleitet. Werte darüber hinaus stehen am Rand.</p>
      )}
    </div>
  );
}

export function AxisTab({ value, onChange, selected, issuesVisible, palette }: AxisTabProps): React.ReactElement {
  const category = value.categories[selected];
  if (category === undefined) {
    return <p className="text-[13px] text-muted-foreground">Noch keine Achse. Mit „+ Achse“ über dem Raster legen Sie eine an.</p>;
  }
  const patch = (change: Partial<Category>): void => onChange(updateCategory(value, selected, change));
  const share = value.series[0]?.values[selected];
  const negativeShare = issuesVisible && value.type === "pie" && typeof share === "number" && share < 0;

  return (
    <div className="flex flex-col gap-6" data-testid="chart-axis-tab">
      <Field label="Bezeichnung" hint="Die Eingabetaste bricht lange Beschriftungen um.">
        <Textarea
          rows={Math.max(1, category.label.split("\n").length)}
          value={category.label}
          placeholder="z. B. Ladeleistung MCS"
          onChange={(event) => patch({ label: event.target.value })}
          className="min-h-10 resize-none"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Einheit">
          <Input value={category.unit ?? ""} placeholder="z. B. kW" onChange={(event) => patch({ unit: event.target.value || undefined })} />
        </Field>
        <Field label="Nachkommastellen">
          <NumberInput value={category.decimals} placeholder="auto" onCommit={(next) => patch({ decimals: next ?? undefined })} />
        </Field>
      </div>
      {value.type === "radar" && (
        <>
          <BoundsFields spec={value} category={category} index={selected} issuesVisible={issuesVisible} patch={patch} />
          <SwitchRow
            label="Kleiner ist besser"
            hint="Kehrt die Achse im Netzdiagramm um: der kleinere Wert liegt außen."
            checked={category.inverted === true}
            onCheckedChange={(inverted) => patch({ inverted: inverted || undefined })}
          />
        </>
      )}
      {value.type === "pie" && (
        <Field label="Segmentfarbe">
          <ColorInput
            label={`Segmentfarbe: ${category.label.replace(/\n/g, " ") || `Achse ${selected + 1}`}`}
            value={category.color}
            fallback={palette[selected % Math.max(1, palette.length)] ?? "#303c49"}
            onChange={(color) => patch({ color })}
          />
        </Field>
      )}
      {negativeShare && <IssueText>Der Wert dieses Segments ist negativ. Ein Kuchen zeigt nur Anteile ab null.</IssueText>}
    </div>
  );
}
