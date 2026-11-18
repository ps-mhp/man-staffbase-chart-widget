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
 * Die Leiste über dem Datenraster: links die gewählte Achse und ihre
 * Aktionen (nach oben, nach unten, duplizieren, löschen), rechts Achse und
 * Reihe hinzufügen, „Aus Excel einfügen“ und „Beispiel laden“.
 */

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@man/config-ui/primitives/button";
import { cn } from "@man/config-ui/primitives/utils";
import { ItemActions } from "@man/config-ui/sidebar/item-actions";

import { ChartSpec } from "../chart-model";
import { axisName } from "./editor-rules";

export interface DataBarProps {
  spec: ChartSpec;
  selected: number;
  onMove: (delta: -1 | 1) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onAddAxis: () => void;
  onAddSeries: () => void;
  onOpenPaste: () => void;
  onLoadExample: () => void;
}

/** 40 px hoch wie jedes Ziel im Rahmen, Schrift wie die Werkzeuge. */
const BAR_BUTTON = "h-10 px-3 text-[13px] font-semibold motion-reduce:transition-none";

export function DataBar(props: DataBarProps): React.ReactElement {
  const { spec, selected } = props;
  const count = spec.categories.length;
  const category = spec.categories[selected];

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2 border-b bg-background px-4 py-2">
      <h2 className="min-w-0 truncate text-[15px] font-semibold text-foreground" data-testid="chart-data-heading">
        {category === undefined ? "Daten" : `Achse ${selected + 1} von ${count} · ${axisName(category, selected)}`}
      </h2>
      {category !== undefined && (
        <ItemActions
          noun="Achse"
          onMoveBack={() => props.onMove(-1)}
          onMoveForward={() => props.onMove(1)}
          canMoveBack={selected > 0}
          canMoveForward={selected < count - 1}
          onDuplicate={props.onDuplicate}
          onDelete={props.onDelete}
        />
      )}
      <span className="flex-1" />
      <Button type="button" variant="ghost" size="sm" className={BAR_BUTTON} aria-label="Achse hinzufügen" title="Achse hinzufügen" onClick={props.onAddAxis}>
        <Plus aria-hidden />
        Achse
      </Button>
      <Button type="button" variant="ghost" size="sm" className={BAR_BUTTON} aria-label="Reihe hinzufügen" title="Reihe hinzufügen" onClick={props.onAddSeries}>
        <Plus aria-hidden />
        Reihe
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(BAR_BUTTON, "text-muted-foreground")}
        title="Eine ganze Tabelle aus Excel, PowerPoint oder Word übernehmen"
        onClick={props.onOpenPaste}
      >
        Aus Excel einfügen
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(BAR_BUTTON, "text-muted-foreground")}
        title="Ersetzt die Daten durch ein Beispiel zum gewählten Typ – rückgängig mit ⌘ Z"
        onClick={props.onLoadExample}
      >
        Beispiel laden
      </Button>
    </div>
  );
}
