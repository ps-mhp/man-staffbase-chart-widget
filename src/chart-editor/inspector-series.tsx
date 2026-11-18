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
 * Der Reiter „Daten“: die Reihen des Diagramms – Name, Farbe, Reihenfolge.
 *
 * Im Raster stehen die Reihen als Spalten mit Farbpunkt und Namen; bearbeitet
 * werden sie hier, als Unterliste mit genau einer aufgeklappten Reihe. Die
 * Reihenfolge bestimmt Legende und Palettenfarbe, deshalb ist sie
 * zugänglich.
 */

import * as React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Field } from "@man/config-ui/form/field";
import { FormSection } from "@man/config-ui/form/form-section";
import { SubList } from "@man/config-ui/form/sub-list";
import { Button } from "@man/config-ui/primitives/button";
import { Input } from "@man/config-ui/primitives/input";
import { ItemActions } from "@man/config-ui/sidebar/item-actions";

import { seriesColor, seriesName } from "./data-grid";
import { addSeries, moveSeries, removeSeries, updateSeries } from "./editor-operations";
import { ColorInput } from "./fields";
import type { InspectorTabProps } from "./inspector-design";

export interface SeriesTabProps extends InspectorTabProps {
  palette: readonly string[];
}

interface SeriesFormProps extends SeriesTabProps {
  index: number;
  onOpen: (index: number | null) => void;
}

function SeriesForm({ value, onChange, palette, index, onOpen }: SeriesFormProps): React.ReactElement {
  const series = value.series[index];
  const name = seriesName(series, index);
  // Auch im Kuchen frei: wer eine Reihe nach vorne holt, wählt damit die,
  // die gezeichnet wird – Kopf und Werte im Raster ziehen mit.
  const last = value.series.length - 1;
  const move = (delta: -1 | 1): void => {
    onChange(moveSeries(value, index, delta));
    onOpen(index + delta);
  };
  return (
    <>
      <ItemActions
        noun="Reihe"
        orientation="horizontal"
        className="self-end"
        onMoveBack={() => move(-1)}
        onMoveForward={() => move(1)}
        canMoveBack={index > 0}
        canMoveForward={index < last}
        onDelete={() => {
          onChange(removeSeries(value, index));
          onOpen(null);
        }}
      />
      <Field label="Name">
        <Input
          value={series.name}
          placeholder="z. B. MAN eTGX"
          onChange={(event) => onChange(updateSeries(value, index, { name: event.target.value }))}
        />
      </Field>
      {value.type !== "pie" && (
        <Field label="Farbe" hint="Ohne eigene Farbe gilt die Palette in der Reihenfolge der Reihen.">
          <ColorInput
            label={`Farbe: ${name}`}
            value={series.color}
            fallback={seriesColor(series, index, palette)}
            onChange={(color) => onChange(updateSeries(value, index, { color }))}
          />
        </Field>
      )}
    </>
  );
}

export function SeriesTab({ value, onChange, palette }: SeriesTabProps): React.ReactElement {
  const [open, setOpen] = useState<number | null>(null);
  const items = value.series.map((series, index) => ({
    id: String(index),
    label: seriesName(series, index),
    description: value.type === "pie" && index > 0 ? "Im Kuchen nicht gezeichnet" : (series.color ?? "Farbe aus der Palette"),
  }));

  return (
    <div className="flex flex-col gap-6">
      <FormSection
        title="Reihen"
        aside={String(value.series.length)}
        description="Je Reihe eine Spalte im Raster. Die Reihenfolge bestimmt Legende und Farbe."
      >
        <SubList
          aria-label="Reihen"
          items={items}
          openId={open === null ? null : String(open)}
          onOpenChange={(id) => setOpen(id === null ? null : Number(id))}
          emptyState="Noch keine Reihe."
          renderItem={(_item, index) => (
            <SeriesForm value={value} onChange={onChange} palette={palette} index={index} onOpen={setOpen} />
          )}
          footer={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-10 px-3 text-[13px] font-semibold"
              onClick={() => {
                onChange(addSeries(value));
                setOpen(value.series.length);
              }}
            >
              <Plus aria-hidden />
              Reihe hinzufügen
            </Button>
          }
        />
      </FormSection>
      {value.type === "pie" && value.series.length > 1 && (
        <p className="text-[13px] text-warning">
          Ein Kuchendiagramm zeichnet nur die erste Reihe. Die weiteren bleiben gespeichert und erscheinen wieder, sobald
          ein anderer Typ gewählt ist.
        </p>
      )}
    </div>
  );
}
