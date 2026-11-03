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
 * Die Änderungen, die der Editor an der Definition vornimmt.
 *
 * Alle Funktionen liefern eine neue Definition und verändern die übergebene
 * nicht. So bleibt die Entwurfsverwaltung von `@shared/config-modal`
 * zuverlässig: Sie erkennt Änderungen am Objektvergleich und übersähe eine
 * Änderung am Ort.
 *
 * Kategorien und Werte hängen zusammen: Jede Serie hat genau so viele Werte
 * wie es Kategorien gibt. Jede Änderung an den Kategorien zieht die Spalten
 * hier mit — sonst müsste die Oberfläche es tun und könnte es vergessen.
 */

import { Category, ChartSpec, Series } from "../chart-model";

export function addCategory(spec: ChartSpec): ChartSpec {
  return {
    ...spec,
    categories: [...spec.categories, { label: "" }],
    series: spec.series.map((series) => ({ ...series, values: [...series.values, null] })),
  };
}

export function removeCategory(spec: ChartSpec, index: number): ChartSpec {
  return {
    ...spec,
    categories: spec.categories.filter((_, i) => i !== index),
    series: spec.series.map((series) => ({
      ...series,
      values: series.values.filter((_, i) => i !== index),
    })),
  };
}

export function updateCategory(spec: ChartSpec, index: number, patch: Partial<Category>): ChartSpec {
  return {
    ...spec,
    categories: spec.categories.map((category, i) => (i === index ? { ...category, ...patch } : category)),
  };
}

export function addSeries(spec: ChartSpec): ChartSpec {
  return {
    ...spec,
    series: [...spec.series, { name: "", values: spec.categories.map(() => null) }],
  };
}

export function removeSeries(spec: ChartSpec, index: number): ChartSpec {
  return { ...spec, series: spec.series.filter((_, i) => i !== index) };
}

export function updateSeries(spec: ChartSpec, index: number, patch: Partial<Series>): ChartSpec {
  return {
    ...spec,
    series: spec.series.map((series, i) => (i === index ? { ...series, ...patch } : series)),
  };
}

export function setValue(spec: ChartSpec, seriesIndex: number, categoryIndex: number, value: number | null): ChartSpec {
  return {
    ...spec,
    series: spec.series.map((series, i) =>
      i === seriesIndex
        ? { ...series, values: series.values.map((old, j) => (j === categoryIndex ? value : old)) }
        : series,
    ),
  };
}

/**
 * Verschiebt eine Serie.
 *
 * Die Reihenfolge entscheidet über die Farbe aus der Palette und über die
 * Reihenfolge in der Legende — deshalb ist sie dem Redakteur zugänglich.
 */
export function moveSeries(spec: ChartSpec, index: number, delta: number): ChartSpec {
  const target = index + delta;
  if (target < 0 || target >= spec.series.length) return spec;
  const series = [...spec.series];
  [series[index], series[target]] = [series[target], series[index]];
  return { ...spec, series };
}

/**
 * Verschiebt eine Kategorie samt ihrer Werte.
 *
 * Beim Radar legt die Reihenfolge fest, wo eine Achse im Kreis sitzt; beim
 * Balken die Reihenfolge auf der Grundlinie. Anders als bei den Serien muss
 * hier jede Serie mitziehen — ein Tausch nur in `categories` würde alle
 * Werte um eine Achse verschieben, und das fiele erst in der Vorschau auf.
 */
export function moveCategory(spec: ChartSpec, index: number, delta: number): ChartSpec {
  const target = index + delta;
  if (target < 0 || target >= spec.categories.length) return spec;

  const swap = <T>(list: T[]): T[] => {
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  };

  return {
    ...spec,
    categories: swap(spec.categories),
    series: spec.series.map((series) => ({ ...series, values: swap(series.values) })),
  };
}
