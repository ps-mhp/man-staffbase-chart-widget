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
 * Der Inhalt des Diagramm-Editors im Konfigurationsdialog.
 *
 * `@shared/config-modal` trägt den Rahmen: Entwurf, Dirty-Erkennung, die
 * Rückfrage beim Verwerfen und das Zurückschreiben ins Feld. Hier steht nur,
 * was die Redaktion sieht und bedient.
 *
 * Diese Komponente hält keinen eigenen Zustand für die Definition — jede
 * Änderung geht sofort über `onChange(next)` nach oben. Ein zweiter Zustand
 * hier liefe der Entwurfsverwaltung des Modals auseinander.
 *
 * Jede Änderung an Kategorien, Serien und Werten läuft über die Funktionen
 * aus `./editor-operations`: Sie halten Kategorien und Serienwerte in
 * derselben Kardinalität. Nur die flachen, von dieser Kopplung unberührten
 * Felder — Titel, Fußnote, Legende, die Radar-Anzeige — werden hier direkt
 * auf der Definition gespiegelt; `editor-operations.ts` kennt bewusst keine
 * Funktionen dafür, weil an ihnen nichts verrutschen kann.
 */

import * as React from "react";
import { useLayoutEffect, useRef, useState } from "react";

import { FieldModalContentProps } from "@shared/config-modal";
import { ensureStyleElement } from "@shared/style-root";

import { Category, ChartSpec, DisplayOptions, RadarDisplay, Series, serializeChartSpec } from "../chart-model";
import { ChartWidget } from "../chart-widget";
import {
  addCategory,
  addSeries,
  moveSeries,
  removeCategory,
  removeSeries,
  setValue,
  updateCategory,
  updateSeries,
} from "./editor-operations";
import { applyGrid, parseGrid, readNumber } from "./grid-import";
import css from "./chart-editor.scss";

export type ChartEditorProps = FieldModalContentProps<ChartSpec>;

/** Kennzeichnet das Stylesheet in seinem Root und verhindert eine zweite Kopie. */
const STYLE_ELEMENT_ID = "man-chart-editor-styles";

/** Höhe der Vorschau — genug, um ein Radar mit sechs Achsen zu lesen. */
const PREVIEW_HEIGHT = 320;

/** Platzhalter, bis die Redaktion eine eigene Vorlage einträgt. */
const PASTE_PLACEHOLDER =
  "Aus Excel oder einer Tabelle kopieren und hier einfügen — erste Zeile die Kategorien, erste Spalte die Serien.";

/** Liest eine von der Redaktion getippte Zahl im deutschen Format. */
function parseEditorNumber(text: string): number | null {
  // Bewusst dieselbe Lesart wie beim Einfuegen einer Tabelle: Was in einem
  // Feld steht, ist dieselbe Art Zahl wie das, was aus Excel kommt. Zwei
  // eigene Parser waeren zwei Gelegenheiten, den Tausenderpunkt zu
  // verwechseln.
  return readNumber(text);
}

/** Zeigt eine Zahl im deutschen Format, ohne den Zahlenwert selbst zu runden. */
function formatEditorNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value).replace(".", ",");
}

/**
 * Ein Zahlenfeld, das seinen Text lokal hält und nur die geparste Zahl nach
 * oben meldet.
 *
 * Ohne eigenen Textzustand würde „1,“ sofort zu „1“ normalisiert und der
 * Cursor spränge ans Ende — die Redaktion könnte eine Nachkommazahl nicht in
 * Ruhe zu Ende tippen. Der Text synchronisiert sich nur dann neu aus `value`,
 * wenn sich die Zahl *von außen* geändert hat (z. B. durch eine eingefügte
 * Tabelle) — nicht nach der eigenen Meldung, sonst würde der gerade
 * getippte Text sofort wieder überschrieben.
 */
function NumberField({
  id,
  label,
  value,
  onCommit,
  className,
}: {
  id: string;
  label: string;
  value: number | null | undefined;
  onCommit: (next: number | null) => void;
  className?: string;
}): React.JSX.Element {
  const [text, setText] = useState(() => formatEditorNumber(value));
  const lastCommitted = useRef<number | null>(value ?? null);

  // Keine Effekt-Rücksynchronisierung, sondern die direkte Anpassung während
  // des Renderns (siehe React-Dokumentation "Adjusting state when a prop
  // changes"): Der Vergleich mit `lastCommitted` verhindert, dass dies bei
  // jedem Tastendruck erneut auslöst — nur eine *externe* Änderung der Zahl
  // (z. B. durch eine eingefügte Tabelle) tut das.
  if ((value ?? null) !== lastCommitted.current) {
    lastCommitted.current = value ?? null;
    setText(formatEditorNumber(value));
  }

  return (
    <input
      id={id}
      aria-label={label}
      className={className ?? "chart-editor__input"}
      type="text"
      inputMode="decimal"
      value={text}
      onChange={(event) => {
        setText(event.target.value);
        const parsed = parseEditorNumber(event.target.value);
        lastCommitted.current = parsed;
        onCommit(parsed);
      }}
    />
  );
}

function radarDisplay(spec: ChartSpec): RadarDisplay {
  return spec.display?.type === "radar" ? spec.display : { type: "radar", gridLevels: 5, filled: false };
}

export function ChartEditor({ value, onChange, onSave, onClose, dirty }: ChartEditorProps): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [pasteError, setPasteError] = useState(false);

  useLayoutEffect(() => {
    ensureStyleElement(rootRef.current, STYLE_ELEMENT_ID, css);
  }, []);

  const updateCategoryAt = (index: number, patch: Partial<Category>): void =>
    onChange(updateCategory(value, index, patch));
  const updateSeriesAt = (index: number, patch: Partial<Series>): void => onChange(updateSeries(value, index, patch));

  const setDisplay = (patch: Partial<RadarDisplay>): void => {
    const next: DisplayOptions = { ...radarDisplay(value), ...patch };
    onChange({ ...value, display: next });
  };

  const applyPaste = (): void => {
    const grid = parseGrid(pasteText);
    if (grid === null) {
      setPasteError(true);
      return;
    }
    setPasteError(false);
    onChange(applyGrid(value, grid));
  };

  const columnTemplate = `minmax(170px, 220px) repeat(${Math.max(value.categories.length, 1)}, minmax(130px, 1fr))`;

  return (
    <div className="chart-editor" ref={rootRef}>
      {/* --- Kopf: Titel, Fußnote, Legende, typspezifisches --- */}
      <section className="chart-editor__section">
        <h3 className="chart-editor__section-title">Titel und Legende</h3>
        <div className="chart-editor__head-row">
          <div className="chart-editor__field">
            <label className="chart-editor__label" htmlFor="chart-editor-title">
              Titel
            </label>
            <input
              id="chart-editor-title"
              className="chart-editor__input"
              type="text"
              value={value.title ?? ""}
              onChange={(event) => onChange({ ...value, title: event.target.value || undefined })}
            />
          </div>
          <div className="chart-editor__field">
            <label className="chart-editor__label" htmlFor="chart-editor-footnote">
              Fußnote
            </label>
            <input
              id="chart-editor-footnote"
              className="chart-editor__input"
              type="text"
              value={value.footnote ?? ""}
              onChange={(event) => onChange({ ...value, footnote: event.target.value || undefined })}
            />
          </div>
          <div className="chart-editor__field">
            <label className="chart-editor__check" htmlFor="chart-editor-legend-show">
              <input
                id="chart-editor-legend-show"
                type="checkbox"
                checked={value.legend.show}
                onChange={(event) => onChange({ ...value, legend: { ...value.legend, show: event.target.checked } })}
              />
              Legende anzeigen
            </label>
          </div>
          <div className="chart-editor__field">
            <label className="chart-editor__label" htmlFor="chart-editor-legend-position">
              Legendenposition
            </label>
            <select
              id="chart-editor-legend-position"
              className="chart-editor__input"
              value={value.legend.position}
              onChange={(event) =>
                onChange({
                  ...value,
                  legend: { ...value.legend, position: event.target.value === "bottom" ? "bottom" : "top" },
                })
              }
            >
              <option value="top">oben</option>
              <option value="bottom">unten</option>
            </select>
          </div>
          {value.type === "radar" ? (
            <>
              <div className="chart-editor__field">
                <label className="chart-editor__label" htmlFor="chart-editor-grid-levels">
                  Ringzahl
                </label>
                <NumberField
                  id="chart-editor-grid-levels"
                  label="Ringzahl"
                  value={radarDisplay(value).gridLevels}
                  onCommit={(next) => setDisplay({ gridLevels: next ?? 5 })}
                />
              </div>
              <div className="chart-editor__field">
                <label className="chart-editor__check" htmlFor="chart-editor-filled">
                  <input
                    id="chart-editor-filled"
                    type="checkbox"
                    checked={radarDisplay(value).filled}
                    onChange={(event) => setDisplay({ filled: event.target.checked })}
                  />
                  Fläche füllen
                </label>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* --- Raster: Kategorien, Achsen, Serien --- */}
      <section className="chart-editor__section">
        <h3 className="chart-editor__section-title">Kategorien und Serien</h3>
        <div className="chart-editor__grid" style={{ gridTemplateColumns: columnTemplate }}>
          <div className="chart-editor__row">
            <div className="chart-editor__cell chart-editor__head">
              <span className="chart-editor__row-head">Serie</span>
            </div>
            {value.categories.map((category, index) => (
              <div className="chart-editor__cell chart-editor__head" key={index}>
                <input
                  className="chart-editor__input"
                  type="text"
                  aria-label={`Kategorie ${index + 1}`}
                  value={category.label}
                  onChange={(event) => updateCategoryAt(index, { label: event.target.value })}
                />
                <button
                  type="button"
                  className="chart-editor__button chart-editor__button--icon"
                  aria-label={`Kategorie entfernen: ${category.label || `Kategorie ${index + 1}`}`}
                  onClick={() => onChange(removeCategory(value, index))}
                >
                  Entfernen
                </button>
              </div>
            ))}
          </div>

          <div className="chart-editor__row">
            <div className="chart-editor__cell chart-editor__head">
              <span className="chart-editor__row-head">Achse</span>
            </div>
            {value.categories.map((category, index) => (
              <div className="chart-editor__cell" key={index}>
                <div className="chart-editor__axis">
                  <div className="chart-editor__axis-row">
                    <input
                      className="chart-editor__input"
                      type="text"
                      aria-label={`Einheit: ${category.label || `Kategorie ${index + 1}`}`}
                      placeholder="Einheit"
                      value={category.unit ?? ""}
                      onChange={(event) => updateCategoryAt(index, { unit: event.target.value || undefined })}
                    />
                    <NumberField
                      id={`chart-editor-decimals-${index}`}
                      label={`Nachkommastellen: ${category.label || `Kategorie ${index + 1}`}`}
                      value={category.decimals}
                      onCommit={(next) => updateCategoryAt(index, { decimals: next ?? undefined })}
                    />
                  </div>
                  <div className="chart-editor__axis-row">
                    <NumberField
                      id={`chart-editor-min-${index}`}
                      label={`Minimum: ${category.label || `Kategorie ${index + 1}`}`}
                      value={category.min}
                      onCommit={(next) => updateCategoryAt(index, { min: next ?? undefined })}
                    />
                    <NumberField
                      id={`chart-editor-max-${index}`}
                      label={`Maximum: ${category.label || `Kategorie ${index + 1}`}`}
                      value={category.max}
                      onCommit={(next) => updateCategoryAt(index, { max: next ?? undefined })}
                    />
                  </div>
                  <label className="chart-editor__check">
                    <input
                      type="checkbox"
                      aria-label="Kleiner ist besser"
                      checked={category.inverted === true}
                      onChange={(event) => updateCategoryAt(index, { inverted: event.target.checked || undefined })}
                    />
                    Kleiner ist besser
                  </label>
                </div>
              </div>
            ))}
          </div>

          {value.series.map((series, seriesIndex) => (
            <div className="chart-editor__row" key={seriesIndex}>
              <div className="chart-editor__cell">
                <input
                  className="chart-editor__input"
                  type="text"
                  aria-label={`Serienname ${seriesIndex + 1}`}
                  value={series.name}
                  onChange={(event) => updateSeriesAt(seriesIndex, { name: event.target.value })}
                />
                <input
                  className="chart-editor__color"
                  type="color"
                  aria-label={`Farbe: ${series.name || `Serie ${seriesIndex + 1}`}`}
                  value={series.color ?? "#000000"}
                  onChange={(event) => updateSeriesAt(seriesIndex, { color: event.target.value })}
                />
                <div className="chart-editor__row-actions">
                  <button
                    type="button"
                    className="chart-editor__button chart-editor__button--icon"
                    aria-label={`Serie nach oben: ${series.name || `Serie ${seriesIndex + 1}`}`}
                    disabled={seriesIndex === 0}
                    onClick={() => onChange(moveSeries(value, seriesIndex, -1))}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="chart-editor__button chart-editor__button--icon"
                    aria-label={`Serie nach unten: ${series.name || `Serie ${seriesIndex + 1}`}`}
                    disabled={seriesIndex === value.series.length - 1}
                    onClick={() => onChange(moveSeries(value, seriesIndex, 1))}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="chart-editor__button chart-editor__button--icon"
                    aria-label={`Serie entfernen: ${series.name || `Serie ${seriesIndex + 1}`}`}
                    onClick={() => onChange(removeSeries(value, seriesIndex))}
                  >
                    Entfernen
                  </button>
                </div>
              </div>
              {value.categories.map((category, categoryIndex) => (
                <div className="chart-editor__cell" key={categoryIndex}>
                  <NumberField
                    id={`chart-editor-value-${seriesIndex}-${categoryIndex}`}
                    label={`${series.name || `Serie ${seriesIndex + 1}`}, ${category.label || `Kategorie ${categoryIndex + 1}`}`}
                    value={series.values[categoryIndex]}
                    onCommit={(next) => onChange(setValue(value, seriesIndex, categoryIndex, next))}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="chart-editor__actions">
          <button type="button" className="chart-editor__button" onClick={() => onChange(addCategory(value))}>
            Kategorie hinzufügen
          </button>
          <button type="button" className="chart-editor__button" onClick={() => onChange(addSeries(value))}>
            Serie hinzufügen
          </button>
        </div>
      </section>

      {/* --- Einfügefeld: Tabelle aus der Zwischenablage übernehmen --- */}
      <section className="chart-editor__section chart-editor__paste">
        <h3 className="chart-editor__section-title">Tabelle einfügen</h3>
        <label className="chart-editor__label" htmlFor="chart-editor-paste-area">
          Tabelle einfügen
        </label>
        <textarea
          id="chart-editor-paste-area"
          className="chart-editor__textarea"
          placeholder={PASTE_PLACEHOLDER}
          value={pasteText}
          onChange={(event) => {
            setPasteText(event.target.value);
            setPasteError(false);
          }}
        />
        <div className="chart-editor__actions">
          <button type="button" className="chart-editor__button" onClick={applyPaste}>
            Übernehmen
          </button>
        </div>
        {pasteError ? (
          <p className="chart-editor__hint chart-editor__hint--error">
            Die eingefügte Tabelle konnte nicht gelesen werden. Erwartet wird eine erste Zeile mit den
            Kategorien und eine erste Spalte mit den Serien.
          </p>
        ) : null}
      </section>

      {/* --- Vorschau: dieselbe Darstellung wie auf der Seite --- */}
      <section className="chart-editor__section">
        <h3 className="chart-editor__section-title">Vorschau</h3>
        <div className="chart-editor__preview" data-testid="chart-editor-preview">
          <ChartWidget chart={serializeChartSpec(value)} height={PREVIEW_HEIGHT} />
        </div>
      </section>

      <div className="chart-editor__footer">
        {dirty ? <p className="chart-editor__hint">Ungespeicherte Änderungen</p> : null}
        <button type="button" className="chart-editor__button" onClick={onClose}>
          Schließen
        </button>
        <button type="button" className="chart-editor__button chart-editor__button--primary" onClick={onSave}>
          Speichern
        </button>
      </div>
    </div>
  );
}
