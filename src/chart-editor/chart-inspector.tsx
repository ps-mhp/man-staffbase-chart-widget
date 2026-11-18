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
 * Das Panel „Diagramm“ rechts im Rahmen, mit den Reitern des Screens:
 * Daten · Gestaltung · Achse · Verhalten. Es bleibt auch in den
 * Geräteansichten stehen – dort sieht man die Wirkung jeder Einstellung
 * gleich daneben.
 */

import * as React from "react";
import { SwitchRow } from "@man/config-ui/form/switch-row";
import { InspectorPanel, InspectorTab } from "@man/config-ui/inspector/inspector-panel";

import { ChartSpec } from "../chart-model";
import { heightOutOfRange } from "./editor-rules";
import { AxisTab } from "./inspector-axis";
import { DesignTab } from "./inspector-design";
import { SeriesTab } from "./inspector-series";

/** See `webpack.common.ts`; `release.sh` bumps it before building. */
declare const __WIDGET_VERSION__: string;

export interface ChartInspectorProps {
  value: ChartSpec;
  onChange: (spec: ChartSpec) => void;
  /** Die im Raster gewählte Achse. */
  selected: number;
  /** Achsen mit Fehlern; leer, solange Fehler nicht gezeigt werden. */
  invalidAxes: ReadonlySet<number>;
  issuesVisible: boolean;
  palette: readonly string[];
}

/** Die rote Marke am Reiter, mit der Zahl der Fehler darin. */
function IssueBadge({ count }: { count: number }): React.ReactElement | null {
  if (count === 0) return null;
  return (
    <>
      <span
        aria-hidden
        className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[11px] font-semibold text-white"
      >
        {count}
      </span>
      <span className="sr-only">{count === 1 ? ", 1 Fehler" : `, ${count} Fehler`}</span>
    </>
  );
}

function BehaviorTab({ value, onChange }: Pick<ChartInspectorProps, "value" | "onChange">): React.ReactElement {
  return (
    <div className="flex flex-col gap-6">
      <SwitchRow
        label="Download erlauben"
        hint={
          value.allowExport === undefined
            ? "Zeigt unter dem Diagramm „Als SVG“ und „Als PNG“. Noch nicht hier festgelegt – es gilt, was der Block bisher hatte."
            : "Zeigt unter dem Diagramm „Als SVG“ und „Als PNG“. Die Datei enthält nur das Diagramm, nicht die Seite."
        }
        checked={value.allowExport === true}
        onCheckedChange={(allowExport) => onChange({ ...value, allowExport })}
        data-testid="chart-allow-export"
      />
      {/* Wer einen Fehler meldet, findet die Version hier. */}
      <p className="text-xs text-muted-foreground">{`Version ${__WIDGET_VERSION__}`}</p>
    </div>
  );
}

export function ChartInspector(props: ChartInspectorProps): React.ReactElement {
  const { value, onChange, selected, invalidAxes, issuesVisible, palette } = props;
  const heightIssues = issuesVisible && heightOutOfRange(value.height) ? 1 : 0;
  const axisIssues = invalidAxes.has(selected) ? 1 : 0;

  const tabs: InspectorTab[] = [
    { id: "data", label: "Daten", content: <SeriesTab value={value} onChange={onChange} palette={palette} /> },
    {
      id: "design",
      label: "Gestaltung",
      badge: <IssueBadge count={heightIssues} />,
      content: <DesignTab value={value} onChange={onChange} issuesVisible={issuesVisible} />,
    },
    {
      id: "axis",
      label: "Achse",
      badge: <IssueBadge count={axisIssues} />,
      content: <AxisTab value={value} onChange={onChange} selected={selected} issuesVisible={issuesVisible} palette={palette} />,
    },
    { id: "behavior", label: "Verhalten", content: <BehaviorTab value={value} onChange={onChange} /> },
  ];

  return <InspectorPanel title="Diagramm" tabs={tabs} defaultTab="design" />;
}
