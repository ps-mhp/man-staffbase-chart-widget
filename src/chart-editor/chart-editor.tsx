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
 * Aufbau der Oberfläche — und warum er so ist:
 *
 * - **Eine Zeile je Achse.** Ein Netzdiagramm hat typischerweise sechs
 *   Achsen und zwei Serien. Stünden die Achsen als Spalten, wüchse die
 *   Tabelle aus dem Dialog heraus und jede Achse hätte nur ein schmales
 *   Feld für Name, Einheit und Grenzen. Als Zeilen wächst sie nach unten,
 *   wo Platz ist, und jede Achse bekommt eine lesbare Zeile.
 * - **Serien sind Wertespalten** mit einem eigenen Kopf, in dem Name,
 *   Farbe und Reihenfolge stehen. So liegt jeder Wert sichtbar unter dem
 *   Namen, zu dem er gehört.
 * - **Das Einfügefeld steht oben.** Abtippen ist die wahrscheinlichste
 *   Fehlerquelle; der empfohlene Weg gehört deshalb an den Anfang, nicht
 *   unter die Tabelle.
 * - **Die Vorschau steht daneben, nicht darunter.** Was eine Einstellung
 *   bewirkt, ist nur zu verstehen, wenn man die Wirkung sieht, ohne zu
 *   scrollen.
 * - **Feineinstellungen sind ausgeblendet.** Nachkommastellen, Minimum und
 *   Maximum braucht der Normalfall nicht; dauerhaft sichtbar wären sie drei
 *   unbeschriftete Kästchen je Zeile.
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

import {
  BarDisplay,
  Category,
  ChartSpec,
  ChartType,
  CHART_TYPES,
  DisplayOptions,
  LineDisplay,
  RadarDisplay,
  Series,
  serializeChartSpec,
} from "../chart-model";
import { ChartWidget } from "../chart-widget";
import {
  addCategory,
  addSeries,
  moveCategory,
  moveSeries,
  removeCategory,
  removeSeries,
  setValue,
  updateCategory,
  updateSeries,
} from "./editor-operations";
import { exampleSpec, starterSpec } from "./example-spec";
import { applyGrid, parseGrid, readNumber, transposeGrid } from "./grid-import";
import css from "./chart-editor.scss";

export type ChartEditorProps = FieldModalContentProps<ChartSpec>;

/** Kennzeichnet das Stylesheet in seinem Root und verhindert eine zweite Kopie. */
const STYLE_ELEMENT_ID = "man-chart-editor-styles";

/** Höhe der Vorschau — genug, um ein Radar mit sechs Achsen zu lesen. */
const PREVIEW_HEIGHT = 320;

/**
 * Was in der Typ-Auswahl steht.
 *
 * Der Klammerzusatz nennt den Fachbegriff, unter dem die Redaktion die
 * Vorlage aus der Präsentation kennt; der Satz dahinter sagt, wofür der Typ
 * taugt. Beides fehlte, und deshalb war am Dialog nicht zu erkennen, welche
 * Art Diagramm man überhaupt gerade baut.
 */
const CHART_TYPE_INFO: Record<ChartType, { label: string; hint: string }> = {
  radar: {
    label: "Netzdiagramm (Radar / Spinne)",
    hint: "Vergleicht wenige Varianten über mehrere Kennwerte hinweg. Jede Achse darf eine eigene Einheit haben.",
  },
  bar: {
    label: "Balkendiagramm (Säulen)",
    hint: "Vergleicht Werte über wenige Kategorien. Alle Balken teilen sich eine Werteachse — nur bei gleicher Einheit sinnvoll.",
  },
  line: {
    label: "Liniendiagramm (Verlauf)",
    hint: "Zeigt eine Entwicklung über eine geordnete Reihe hinweg — etwa über Jahre. Die Reihenfolge der Achsen ist die Reihenfolge im Raster.",
  },
};

/** Beschreibt, wie eine eingefügte Tabelle herum steht. */
type PasteOrientation = "axes-in-rows" | "axes-in-columns";

const PASTE_PLACEHOLDER = `Beispiel:

\tMAN eTGX\tMB eActros 600
Ladeleistung MCS [kW]\t750\t1.000
Nutzbare Energie [kWh]\t480\t600`;

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
  placeholder,
  className,
}: {
  id?: string;
  label: string;
  value: number | null | undefined;
  onCommit: (next: number | null) => void;
  placeholder?: string;
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
      placeholder={placeholder}
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

function barDisplay(spec: ChartSpec): BarDisplay {
  return spec.display?.type === "bar" ? spec.display : { type: "bar", stacked: false, orientation: "vertical" };
}

function lineDisplay(spec: ChartSpec): LineDisplay {
  return spec.display?.type === "line"
    ? spec.display
    : { type: "line", smooth: false, area: false, showPoints: true };
}

/** Benennt eine Achse für Hilfstexte, auch solange sie noch keinen Namen hat. */
const categoryName = (category: Category, index: number): string =>
  category.label.replace(/\n/g, " ") || `Achse ${index + 1}`;

/** Benennt eine Serie für Hilfstexte, auch solange sie noch keinen Namen hat. */
const seriesName = (series: Series, index: number): string => series.name || `Serie ${index + 1}`;

export function ChartEditor({ value, onChange, onSave, onClose, dirty }: ChartEditorProps): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [pasteError, setPasteError] = useState(false);
  const [pasteOrientation, setPasteOrientation] = useState<PasteOrientation>("axes-in-rows");
  const [showAdvanced, setShowAdvanced] = useState(false);

  useLayoutEffect(() => {
    ensureStyleElement(rootRef.current, STYLE_ELEMENT_ID, css);
  }, []);

  const updateCategoryAt = (index: number, patch: Partial<Category>): void =>
    onChange(updateCategory(value, index, patch));
  const updateSeriesAt = (index: number, patch: Partial<Series>): void => onChange(updateSeries(value, index, patch));

  // Die Anzeigeoptionen sind über `type` diskriminiert, und ein Teilstück
  // davon lässt sich nicht typsicher zusammensetzen, ohne die Vorgabe des
  // *aktuellen* Typs zu kennen. Deshalb die Vorgabe hier, nicht beim Aufruf.
  const displayDefaults = (type: ChartType): DisplayOptions | undefined => {
    if (type === "radar") return radarDisplay(value);
    if (type === "bar") return barDisplay(value);
    if (type === "line") return lineDisplay(value);
    return undefined;
  };

  const setDisplay = (patch: Record<string, unknown>): void => {
    const base = displayDefaults(value.type);
    if (base === undefined) return;
    onChange({ ...value, display: { ...base, ...patch } as DisplayOptions });
  };

  const applyPaste = (): void => {
    const parsed = parseGrid(pasteText);
    if (parsed === null) {
      setPasteError(true);
      return;
    }
    setPasteError(false);
    // `parseGrid` liest immer "erste Zeile = Spaltenköpfe". Steht die Tabelle
    // so herum wie das Raster darunter — eine Zeile je Achse —, muss sie
    // einmal gekippt werden.
    onChange(applyGrid(value, pasteOrientation === "axes-in-rows" ? transposeGrid(parsed) : parsed));
  };

  const isEmpty = value.categories.length === 0 && value.series.length === 0;
  const typeInfo = CHART_TYPE_INFO[value.type];

  const showBounds = showAdvanced && value.type === "radar";
  const showInverted = value.type === "radar";

  const columnTemplate = [
    "minmax(150px, 1.6fr)",
    "minmax(74px, 92px)",
    ...(showAdvanced ? ["minmax(70px, 88px)"] : []),
    ...(showBounds ? ["minmax(70px, 88px)", "minmax(70px, 88px)"] : []),
    ...(showInverted ? ["minmax(120px, 150px)"] : []),
    `repeat(${Math.max(value.series.length, 1)}, minmax(96px, 1fr))`,
    "minmax(84px, 96px)",
  ].join(" ");

  return (
    <div className="chart-editor" ref={rootRef}>
      <div className="chart-editor__columns">
        <div className="chart-editor__main">
          {/* --- Diagrammtyp: beantwortet "Was baue ich hier gerade?" --- */}
          <section className="chart-editor__section">
            <h3 className="chart-editor__section-title">Diagrammtyp</h3>
            <div className="chart-editor__field chart-editor__field--narrow">
              <select
                id="chart-editor-type"
                aria-label="Diagrammtyp"
                className="chart-editor__input"
                value={value.type}
                onChange={(event) => onChange({ ...value, type: event.target.value as ChartType })}
              >
                {CHART_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {CHART_TYPE_INFO[type].label}
                  </option>
                ))}
              </select>
            </div>
            <p className="chart-editor__hint">{typeInfo.hint}</p>
          </section>

          {/* --- Daten: der empfohlene Weg steht vor der Handarbeit --- */}
          <section className="chart-editor__section">
            <h3 className="chart-editor__section-title">Daten aus einer Tabelle übernehmen</h3>
            <p className="chart-editor__hint">
              Markieren Sie Ihre Tabelle in Excel, PowerPoint oder Word, kopieren Sie sie und fügen Sie sie hier ein.
              Das ist der schnellste und sicherste Weg — abgetippte Zahlen sind die häufigste Fehlerquelle.
            </p>
            <textarea
              id="chart-editor-paste-area"
              aria-label="Tabelle einfügen"
              className="chart-editor__textarea"
              placeholder={PASTE_PLACEHOLDER}
              value={pasteText}
              onChange={(event) => {
                setPasteText(event.target.value);
                setPasteError(false);
              }}
            />
            <fieldset className="chart-editor__orientation">
              <legend className="chart-editor__label">Wie steht Ihre Tabelle?</legend>
              <label className="chart-editor__check">
                <input
                  type="radio"
                  name="chart-editor-orientation"
                  checked={pasteOrientation === "axes-in-rows"}
                  onChange={() => setPasteOrientation("axes-in-rows")}
                />
                Je Zeile eine Kennzahl, je Spalte eine Variante
              </label>
              <label className="chart-editor__check">
                <input
                  type="radio"
                  name="chart-editor-orientation"
                  checked={pasteOrientation === "axes-in-columns"}
                  onChange={() => setPasteOrientation("axes-in-columns")}
                />
                Je Zeile eine Variante, je Spalte eine Kennzahl
              </label>
            </fieldset>
            <div className="chart-editor__actions">
              <button type="button" className="chart-editor__button chart-editor__button--primary" onClick={applyPaste}>
                Tabelle übernehmen
              </button>
              <span className="chart-editor__hint">
                Ersetzt die Tabelle unten. Einheiten und Farben bleiben erhalten.
              </span>
            </div>
            {pasteError ? (
              <p className="chart-editor__hint chart-editor__hint--error">
                Die eingefügte Tabelle konnte nicht gelesen werden. Erwartet werden mindestens zwei Zeilen mit
                Überschriften in der ersten Zeile und in der ersten Spalte.
              </p>
            ) : null}
          </section>

          {/* --- Das Raster: eine Zeile je Achse, eine Wertespalte je Serie --- */}
          <section className="chart-editor__section">
            <h3 className="chart-editor__section-title">Achsen und Serien</h3>

            {isEmpty ? (
              <div className="chart-editor__empty">
                <p className="chart-editor__empty-title">Noch keine Achsen und Serien angelegt.</p>
                <p className="chart-editor__hint">
                  Ein Netzdiagramm besteht aus <strong>Achsen</strong> — den verglichenen Kennzahlen wie „Ladeleistung
                  MCS [kW]“ — und <strong>Serien</strong>, den verglichenen Varianten wie „MAN eTGX“. Jede Serie trägt
                  auf jeder Achse einen Wert.
                </p>
                <p className="chart-editor__hint">Fügen Sie oben eine Tabelle ein, oder beginnen Sie hier:</p>
                <div className="chart-editor__actions">
                  <button
                    type="button"
                    className="chart-editor__button chart-editor__button--primary"
                    onClick={() => onChange(exampleSpec())}
                  >
                    Beispiel laden
                  </button>
                  <button type="button" className="chart-editor__button" onClick={() => onChange(starterSpec())}>
                    Leere Tabelle anlegen
                  </button>
                </div>
                <p className="chart-editor__hint">
                  „Beispiel laden“ füllt den Vergleich MAN eTGX gegen Mercedes-Benz eActros 600 ein. Überschreiben Sie
                  ihn einfach mit Ihren eigenen Zahlen.
                </p>
              </div>
            ) : (
              <>
                <p className="chart-editor__hint">
                  Jede <strong>Zeile</strong> ist eine Achse des Diagramms, jede <strong>Spalte rechts</strong> eine
                  Serie. „Kleiner ist besser“ dreht eine Achse um, sodass der niedrigere Wert weiter außen liegt. Im
                  Achsennamen erzeugt die Eingabetaste einen Zeilenumbruch — lange Beschriftungen bleiben so lesbar.
                </p>

                <div className="chart-editor__grid" style={{ gridTemplateColumns: columnTemplate }}>
                  {/* Kopfzeile: Achsenspalten links, danach je Serie ein Kopf */}
                  <div className="chart-editor__row">
                    <div className="chart-editor__cell chart-editor__head">
                      <span className="chart-editor__col-head">Achse</span>
                    </div>
                    <div className="chart-editor__cell chart-editor__head">
                      <span className="chart-editor__col-head">Einheit</span>
                    </div>
                    {showAdvanced ? (
                      <div className="chart-editor__cell chart-editor__head">
                        <span className="chart-editor__col-head">Nachkomma</span>
                      </div>
                    ) : null}
                    {showBounds ? (
                      <>
                        <div className="chart-editor__cell chart-editor__head">
                          <span className="chart-editor__col-head">Minimum</span>
                        </div>
                        <div className="chart-editor__cell chart-editor__head">
                          <span className="chart-editor__col-head">Maximum</span>
                        </div>
                      </>
                    ) : null}
                    {showInverted ? (
                      <div className="chart-editor__cell chart-editor__head">
                        <span className="chart-editor__col-head">Richtung</span>
                      </div>
                    ) : null}
                    {value.series.map((series, seriesIndex) => (
                      <div className="chart-editor__cell chart-editor__head" key={seriesIndex}>
                        <span className="chart-editor__col-head">Serie {seriesIndex + 1}</span>
                        <input
                          className="chart-editor__input"
                          type="text"
                          aria-label={`Name der Serie ${seriesIndex + 1}`}
                          placeholder="z. B. MAN eTGX"
                          value={series.name}
                          onChange={(event) => updateSeriesAt(seriesIndex, { name: event.target.value })}
                        />
                        <div className="chart-editor__row-actions">
                          <input
                            className="chart-editor__color"
                            type="color"
                            aria-label={`Farbe: ${seriesName(series, seriesIndex)}`}
                            title={`Farbe: ${seriesName(series, seriesIndex)}`}
                            value={series.color ?? "#000000"}
                            onChange={(event) => updateSeriesAt(seriesIndex, { color: event.target.value })}
                          />
                          <button
                            type="button"
                            className="chart-editor__button chart-editor__button--icon"
                            aria-label={`Serie nach links: ${seriesName(series, seriesIndex)}`}
                            title="Nach links"
                            disabled={seriesIndex === 0}
                            onClick={() => onChange(moveSeries(value, seriesIndex, -1))}
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            className="chart-editor__button chart-editor__button--icon"
                            aria-label={`Serie nach rechts: ${seriesName(series, seriesIndex)}`}
                            title="Nach rechts"
                            disabled={seriesIndex === value.series.length - 1}
                            onClick={() => onChange(moveSeries(value, seriesIndex, 1))}
                          >
                            →
                          </button>
                          <button
                            type="button"
                            className="chart-editor__button chart-editor__button--icon"
                            aria-label={`Serie entfernen: ${seriesName(series, seriesIndex)}`}
                            title="Serie entfernen"
                            onClick={() => onChange(removeSeries(value, seriesIndex))}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="chart-editor__cell chart-editor__head" />
                  </div>

                  {/* Je Achse eine Zeile */}
                  {value.categories.map((category, index) => (
                    <div className="chart-editor__row" key={index}>
                      <div className="chart-editor__cell">
                        <textarea
                          className="chart-editor__input chart-editor__input--multiline"
                          // Wächst mit den Zeilen des Namens, damit ein Umbruch
                          // nicht hinter dem Feldrand verschwindet.
                          rows={Math.max(1, category.label.split("\n").length)}
                          aria-label={`Name der Achse ${index + 1}`}
                          placeholder="z. B. Ladeleistung MCS"
                          value={category.label}
                          onChange={(event) => updateCategoryAt(index, { label: event.target.value })}
                        />
                      </div>
                      <div className="chart-editor__cell">
                        <input
                          className="chart-editor__input"
                          type="text"
                          aria-label={`Einheit: ${categoryName(category, index)}`}
                          placeholder="z. B. kW"
                          value={category.unit ?? ""}
                          onChange={(event) => updateCategoryAt(index, { unit: event.target.value || undefined })}
                        />
                      </div>
                      {showAdvanced ? (
                        <div className="chart-editor__cell">
                          <NumberField
                            id={`chart-editor-decimals-${index}`}
                            label={`Nachkommastellen: ${categoryName(category, index)}`}
                            placeholder="auto"
                            value={category.decimals}
                            onCommit={(next) => updateCategoryAt(index, { decimals: next ?? undefined })}
                          />
                        </div>
                      ) : null}
                      {showBounds ? (
                        <>
                          <div className="chart-editor__cell">
                            <NumberField
                              id={`chart-editor-min-${index}`}
                              label={`Minimum: ${categoryName(category, index)}`}
                              placeholder="auto"
                              value={category.min}
                              onCommit={(next) => updateCategoryAt(index, { min: next ?? undefined })}
                            />
                          </div>
                          <div className="chart-editor__cell">
                            <NumberField
                              id={`chart-editor-max-${index}`}
                              label={`Maximum: ${categoryName(category, index)}`}
                              placeholder="auto"
                              value={category.max}
                              onCommit={(next) => updateCategoryAt(index, { max: next ?? undefined })}
                            />
                          </div>
                        </>
                      ) : null}
                      {showInverted ? (
                        <div className="chart-editor__cell">
                          <label className="chart-editor__check">
                            <input
                              type="checkbox"
                              aria-label={`Kleiner ist besser: ${categoryName(category, index)}`}
                              checked={category.inverted === true}
                              onChange={(event) =>
                                updateCategoryAt(index, { inverted: event.target.checked || undefined })
                              }
                            />
                            <span>kleiner ist besser</span>
                          </label>
                        </div>
                      ) : null}
                      {value.series.map((series, seriesIndex) => (
                        <div className="chart-editor__cell" key={seriesIndex}>
                          <NumberField
                            id={`chart-editor-value-${seriesIndex}-${index}`}
                            label={`${seriesName(series, seriesIndex)}, ${categoryName(category, index)}`}
                            placeholder="Wert"
                            value={series.values[index]}
                            onCommit={(next) => onChange(setValue(value, seriesIndex, index, next))}
                          />
                        </div>
                      ))}
                      <div className="chart-editor__cell">
                        <div className="chart-editor__row-actions">
                          <button
                            type="button"
                            className="chart-editor__button chart-editor__button--icon"
                            aria-label={`Achse nach oben: ${categoryName(category, index)}`}
                            title="Nach oben"
                            disabled={index === 0}
                            onClick={() => onChange(moveCategory(value, index, -1))}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            className="chart-editor__button chart-editor__button--icon"
                            aria-label={`Achse nach unten: ${categoryName(category, index)}`}
                            title="Nach unten"
                            disabled={index === value.categories.length - 1}
                            onClick={() => onChange(moveCategory(value, index, 1))}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            className="chart-editor__button chart-editor__button--icon"
                            aria-label={`Achse entfernen: ${categoryName(category, index)}`}
                            title="Achse entfernen"
                            onClick={() => onChange(removeCategory(value, index))}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="chart-editor__actions">
                  <button type="button" className="chart-editor__button" onClick={() => onChange(addCategory(value))}>
                    Achse hinzufügen
                  </button>
                  <button type="button" className="chart-editor__button" onClick={() => onChange(addSeries(value))}>
                    Serie hinzufügen
                  </button>
                  <label className="chart-editor__check chart-editor__check--push">
                    <input
                      type="checkbox"
                      checked={showAdvanced}
                      onChange={(event) => setShowAdvanced(event.target.checked)}
                    />
                    Feineinstellungen je Achse
                  </label>
                </div>
                {showAdvanced ? (
                  <p className="chart-editor__hint">
                    <strong>Nachkomma</strong> legt die angezeigten Nachkommastellen fest. <strong>Minimum</strong> und{" "}
                    <strong>Maximum</strong> begrenzen die Zeichnung der Achse: Werte außerhalb werden auf den Rand
                    gezeichnet, aber weiterhin mit ihrer echten Zahl beschriftet. Leer heißt: aus den Werten abgeleitet.
                  </p>
                ) : null}
              </>
            )}
          </section>

          {/* --- Beschriftung und Darstellung --- */}
          <section className="chart-editor__section">
            <h3 className="chart-editor__section-title">Titel, Legende und Darstellung</h3>
            <div className="chart-editor__head-row">
              <div className="chart-editor__field">
                <label className="chart-editor__label" htmlFor="chart-editor-title">
                  Titel
                </label>
                <input
                  id="chart-editor-title"
                  className="chart-editor__input"
                  type="text"
                  placeholder="z. B. MAN eTGX vs. MB eActros 600"
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
                  placeholder="z. B. Je 4x2 Sattelzugmaschine"
                  value={value.footnote ?? ""}
                  onChange={(event) => onChange({ ...value, footnote: event.target.value || undefined })}
                />
              </div>
              <div className="chart-editor__field">
                <label className="chart-editor__label" htmlFor="chart-editor-legend-position">
                  Legende
                </label>
                <select
                  id="chart-editor-legend-position"
                  className="chart-editor__input"
                  value={value.legend.show ? value.legend.position : "none"}
                  onChange={(event) => {
                    const choice = event.target.value;
                    onChange({
                      ...value,
                      legend:
                        choice === "none"
                          ? { ...value.legend, show: false }
                          : { show: true, position: choice === "bottom" ? "bottom" : "top" },
                    });
                  }}
                >
                  <option value="top">über dem Diagramm</option>
                  <option value="bottom">unter dem Diagramm</option>
                  <option value="none">ausblenden</option>
                </select>
              </div>
              {value.type === "radar" ? (
                <>
                  <div className="chart-editor__field">
                    <label className="chart-editor__label" htmlFor="chart-editor-grid-levels">
                      Hilfslinien im Netz
                    </label>
                    <NumberField
                      id="chart-editor-grid-levels"
                      label="Hilfslinien im Netz"
                      placeholder="5"
                      value={radarDisplay(value).gridLevels}
                      onCommit={(next) => setDisplay({ gridLevels: next ?? 5 })}
                    />
                    <span className="chart-editor__hint">Zahl der Ringe, 5 ist üblich.</span>
                  </div>
                  <div className="chart-editor__field">
                    <span className="chart-editor__label">Flächen</span>
                    <label className="chart-editor__check" htmlFor="chart-editor-filled">
                      <input
                        id="chart-editor-filled"
                        type="checkbox"
                        checked={radarDisplay(value).filled}
                        onChange={(event) => setDisplay({ filled: event.target.checked })}
                      />
                      hinter den Linien füllen
                    </label>
                  </div>
                </>
              ) : null}
              {value.type === "bar" ? (
                <>
                  <div className="chart-editor__field">
                    <span className="chart-editor__label">Stapeln</span>
                    <label className="chart-editor__check" htmlFor="chart-editor-stacked">
                      <input
                        id="chart-editor-stacked"
                        type="checkbox"
                        aria-label="Balken stapeln"
                        checked={barDisplay(value).stacked}
                        onChange={(event) => setDisplay({ stacked: event.target.checked })}
                      />
                      Serien übereinander
                    </label>
                  </div>
                  <div className="chart-editor__field">
                    <label className="chart-editor__label" htmlFor="chart-editor-orientation">
                      Richtung
                    </label>
                    <select
                      id="chart-editor-orientation"
                      aria-label="Richtung"
                      className="chart-editor__input"
                      value={barDisplay(value).orientation}
                      onChange={(event) => setDisplay({ orientation: event.target.value })}
                    >
                      <option value="vertical">stehend</option>
                      <option value="horizontal">liegend</option>
                    </select>
                  </div>
                </>
              ) : null}
              {value.type === "line" ? (
                <>
                  <div className="chart-editor__field">
                    <span className="chart-editor__label">Verlauf</span>
                    <label className="chart-editor__check" htmlFor="chart-editor-smooth">
                      <input
                        id="chart-editor-smooth"
                        type="checkbox"
                        aria-label="Linien glätten"
                        checked={lineDisplay(value).smooth}
                        onChange={(event) => setDisplay({ smooth: event.target.checked })}
                      />
                      Linien glätten
                    </label>
                  </div>
                  <div className="chart-editor__field">
                    <span className="chart-editor__label">Fläche</span>
                    <label className="chart-editor__check" htmlFor="chart-editor-area">
                      <input
                        id="chart-editor-area"
                        type="checkbox"
                        aria-label="Fläche füllen"
                        checked={lineDisplay(value).area}
                        onChange={(event) => setDisplay({ area: event.target.checked })}
                      />
                      Fläche füllen
                    </label>
                  </div>
                  <div className="chart-editor__field">
                    <span className="chart-editor__label">Stützstellen</span>
                    <label className="chart-editor__check" htmlFor="chart-editor-show-points">
                      <input
                        id="chart-editor-show-points"
                        type="checkbox"
                        aria-label="Punkte zeigen"
                        checked={lineDisplay(value).showPoints}
                        onChange={(event) => setDisplay({ showPoints: event.target.checked })}
                      />
                      Punkte zeigen
                    </label>
                  </div>
                </>
              ) : null}
            </div>
          </section>
        </div>

        {/* --- Vorschau: daneben, damit jede Änderung sofort sichtbar ist --- */}
        <aside className="chart-editor__side">
          <div className="chart-editor__side-inner">
            <h3 className="chart-editor__section-title">Vorschau</h3>
            <p className="chart-editor__hint">So erscheint das Diagramm auf der Seite.</p>
            <div className="chart-editor__preview" data-testid="chart-editor-preview">
              <ChartWidget chart={serializeChartSpec(value)} height={PREVIEW_HEIGHT} />
            </div>
          </div>
        </aside>
      </div>

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
