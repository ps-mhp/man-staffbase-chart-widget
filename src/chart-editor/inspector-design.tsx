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
 * Der Reiter „Gestaltung“ im Panel „Diagramm“, wie im Screen: Typ als
 * Pills, Titel, Fußnote, Legende, ein Abschnitt mit dem, was nur der
 * gewählte Typ kennt, und die Höhe auf der Seite.
 *
 * Die Einstellungen des Typs gelten nur für ihn: Wer von Balken auf Linie
 * wechselt und zurück, findet die Balken wie vorher, solange er nichts an
 * der Linie ändert – die Definition hält nur die Anzeige eines Typs.
 */

import * as React from "react";
import { Field } from "@man/config-ui/form/field";
import { FormSection } from "@man/config-ui/form/form-section";
import { SegmentedOption } from "@man/config-ui/form/segmented";
import { SegmentedField } from "@man/config-ui/form/segmented-field";
import { SwitchRow } from "@man/config-ui/form/switch-row";
import { Input } from "@man/config-ui/primitives/input";

import { CHART_TYPES, ChartSpec, ChartType, PieDisplay } from "../chart-model";
import { DEFAULT_HEIGHT, MAX_HEIGHT, MIN_HEIGHT } from "../configuration-schema";
import { CHART_TYPE_INFO } from "./chart-type-info";
import { barDisplay, lineDisplay, pieDisplay, radarDisplay, withDisplay } from "./display-defaults";
import { heightOutOfRange } from "./editor-rules";
import { NumberInput } from "./fields";

export interface InspectorTabProps {
  value: ChartSpec;
  onChange: (spec: ChartSpec) => void;
}

const TYPE_OPTIONS: readonly SegmentedOption<ChartType>[] = CHART_TYPES.map((type) => ({
  id: type,
  label: CHART_TYPE_INFO[type].label,
}));

type LegendChoice = "top" | "bottom" | "none";

const LEGEND_OPTIONS: readonly SegmentedOption<LegendChoice>[] = [
  { id: "top", label: "Über" },
  { id: "bottom", label: "Unter" },
  { id: "none", label: "Ausblenden" },
];

const ORIENTATION_OPTIONS: readonly SegmentedOption<"vertical" | "horizontal">[] = [
  { id: "vertical", label: "Senkrecht" },
  { id: "horizontal", label: "Waagerecht" },
];

const PIE_LABEL_OPTIONS: readonly SegmentedOption<PieDisplay["label"]>[] = [
  { id: "percent", label: "Prozent" },
  { id: "value", label: "Wert" },
  { id: "both", label: "Beides" },
  { id: "none", label: "Keine" },
];

function legendChoice(spec: ChartSpec): LegendChoice {
  return spec.legend.show ? spec.legend.position : "none";
}

function withLegend(spec: ChartSpec, choice: LegendChoice): ChartSpec {
  // Ausgeblendet behält die Legende ihre Lage – „Über“ und „Unter“ setzen sie neu.
  const legend = choice === "none" ? { ...spec.legend, show: false } : { show: true, position: choice };
  return { ...spec, legend };
}

function RadarSettings({ value, onChange }: InspectorTabProps): React.ReactElement {
  const display = radarDisplay(value);
  return (
    <>
      <Field label="Hilfslinien" hint="Zahl der Ringe im Netz, 5 ist üblich.">
        <NumberInput value={display.gridLevels} placeholder="5" className="max-w-[140px]" onCommit={(next) => onChange(withDisplay(value, { gridLevels: next ?? 5 }))} />
      </Field>
      <SwitchRow
        label="Flächen füllen"
        hint="Färbt die Fläche hinter den Linien."
        checked={display.filled}
        onCheckedChange={(filled) => onChange(withDisplay(value, { filled }))}
      />
    </>
  );
}

function BarSettings({ value, onChange }: InspectorTabProps): React.ReactElement {
  const display = barDisplay(value);
  return (
    <>
      <SegmentedField
        label="Richtung"
        options={ORIENTATION_OPTIONS}
        value={display.orientation}
        onChange={(orientation) => onChange(withDisplay(value, { orientation }))}
      />
      <SwitchRow
        label="Gestapelt"
        hint="Reihen übereinander statt nebeneinander."
        checked={display.stacked}
        onCheckedChange={(stacked) => onChange(withDisplay(value, { stacked }))}
      />
    </>
  );
}

function LineSettings({ value, onChange }: InspectorTabProps): React.ReactElement {
  const display = lineDisplay(value);
  return (
    <>
      <SwitchRow label="Geglättet" checked={display.smooth} onCheckedChange={(smooth) => onChange(withDisplay(value, { smooth }))} />
      <SwitchRow
        label="Fläche füllen"
        hint="Färbt die Fläche unter jeder Linie."
        checked={display.area}
        onCheckedChange={(area) => onChange(withDisplay(value, { area }))}
      />
      <SwitchRow
        label="Punkte zeigen"
        hint="Markiert jeden Wert; ohne Punkte ist nicht zu sehen, wo nur verbunden wird."
        checked={display.showPoints}
        onCheckedChange={(showPoints) => onChange(withDisplay(value, { showPoints }))}
      />
    </>
  );
}

function PieSettings({ value, onChange }: InspectorTabProps): React.ReactElement {
  const display = pieDisplay(value);
  return (
    <>
      <Field label="Innenradius in %" hint="0 ergibt einen Vollkreis, 45 einen Ring.">
        <NumberInput value={display.innerRadius} placeholder="0" className="max-w-[140px]" onCommit={(next) => onChange(withDisplay(value, { innerRadius: next ?? 0 }))} />
      </Field>
      <SegmentedField
        label="Beschriftung der Segmente"
        options={PIE_LABEL_OPTIONS}
        value={display.label}
        onChange={(label) => onChange(withDisplay(value, { label }))}
      />
    </>
  );
}

const TYPE_SETTINGS: Record<ChartType, (props: InspectorTabProps) => React.ReactElement> = {
  radar: RadarSettings,
  bar: BarSettings,
  line: LineSettings,
  pie: PieSettings,
};

export interface DesignTabProps extends InspectorTabProps {
  /** Ob Fehler schon gezeigt werden – erst, wenn „Übernehmen“ an ihnen scheiterte. */
  issuesVisible: boolean;
}

export function DesignTab({ value, onChange, issuesVisible }: DesignTabProps): React.ReactElement {
  const TypeSettings = TYPE_SETTINGS[value.type];
  const heightError =
    issuesVisible && heightOutOfRange(value.height) ? `Erlaubt sind ${MIN_HEIGHT} bis ${MAX_HEIGHT} Pixel.` : undefined;

  return (
    <div className="flex flex-col gap-6">
      <SegmentedField
        label="Typ"
        options={TYPE_OPTIONS}
        value={value.type}
        onChange={(type) => onChange({ ...value, type })}
        hint={CHART_TYPE_INFO[value.type].hint}
      />
      <Field label="Titel">
        <Input
          value={value.title ?? ""}
          placeholder="z. B. MAN eTGX vs. MB eActros 600"
          onChange={(event) => onChange({ ...value, title: event.target.value || undefined })}
        />
      </Field>
      <Field label="Fußnote">
        <Input
          value={value.footnote ?? ""}
          placeholder="z. B. Je 4x2 Sattelzugmaschine"
          onChange={(event) => onChange({ ...value, footnote: event.target.value || undefined })}
        />
      </Field>
      <SegmentedField
        label="Legende"
        options={LEGEND_OPTIONS}
        value={legendChoice(value)}
        onChange={(choice) => onChange(withLegend(value, choice))}
      />
      <FormSection title={CHART_TYPE_INFO[value.type].label}>
        <TypeSettings value={value} onChange={onChange} />
      </FormSection>
      <Field label="Höhe in px" hint={`${MIN_HEIGHT} bis ${MAX_HEIGHT}. Leer: wie bisher, sonst ${DEFAULT_HEIGHT}.`} error={heightError}>
        <NumberInput
          value={value.height}
          placeholder={String(DEFAULT_HEIGHT)}
          className="max-w-[140px]"
          // Leer heißt: keine eigene Höhe – es gilt, was der Block bisher hatte.
          onCommit={(next) => onChange({ ...value, height: next ?? undefined })}
        />
      </Field>
    </div>
  );
}
