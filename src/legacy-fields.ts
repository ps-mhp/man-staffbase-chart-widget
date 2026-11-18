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
 * Die Felder `height` und `allow-export` im Staffbase-Dialog: lesen und
 * ausblenden.
 *
 * Bis 0.3 waren Höhe und Download eigene Felder. Seither stehen beide im
 * Diagramm und werden im Vollbild-Editor eingestellt. Die Felder bleiben im
 * Schema, damit der Dialog ihre Werte weiter führt – der Editor übernimmt
 * sie beim Öffnen, sofern sie lesbar sind. Zu sehen sollen sie nicht mehr
 * sein: zwei Wege zum selben Wert laden zu Widersprüchen ein.
 *
 * Gefunden wird jedes Feld über das, was RJSF und der Content Designer gleich
 * vergeben: `id="root_<key>"` am Eingabeelement oder `for="root_<key>"` an
 * seiner Beschriftung. Ausgeblendet wird die ganze Zeile: der größte
 * Vorfahre, der kein anderes Feld enthält. Hilfe und Fehler eines Feldes
 * (`root_<key>__help` …) zählen zu ihm.
 *
 * Nur im eigenen Dialog – dem Formular, das `chart` führt. Studio lädt alle
 * Widget-Bündel in dasselbe Dokument, und `root_<key>` ist
 * widgetübergreifend: `height` hat auch der Hero-Slider, `allow-export` die
 * Projekt-Zeitleiste. Dokumentweit ausgeblendet, verlören deren Dialoge ihre
 * Felder.
 *
 * Nach dem Muster von `podcast-display-widget/src/legacy-fields.ts`
 * nachgebaut, nicht importiert – das ist ein eigenes Repo.
 */

import { CHART_ATTRIBUTE, EXPORT_ATTRIBUTE, HEIGHT_ATTRIBUTE } from "./configuration-schema";

/** Die alten Felder, die der Editor ersetzt. */
export const LEGACY_FIELD_KEYS: readonly string[] = [HEIGHT_ATTRIBUTE, EXPORT_ATTRIBUTE];

/** Was sich aus den alten Feldern lesen ließ; ein fehlender Schlüssel war nicht lesbar. */
export interface LegacyDialogValues {
  height?: number;
  allowExport?: boolean;
}

const FIELD_MARK = '[id^="root_"], label[for^="root_"]';

/** `root_height__help` gehört zu `root_height`: RJSF hängt Teile mit `__` an. */
const fieldKeyOf = (element: Element): string =>
  (element instanceof HTMLLabelElement ? element.htmlFor : element.id).split("__")[0];

function rowOf(anchor: Element): HTMLElement {
  const key = fieldKeyOf(anchor);
  let row = anchor as HTMLElement;
  while (row.parentElement !== null && row.parentElement.tagName !== "FORM") {
    const parent = row.parentElement;
    const foreign = Array.from(parent.querySelectorAll(FIELD_MARK)).some((node) => fieldKeyOf(node) !== key);
    if (foreign) break;
    row = parent;
  }
  return row;
}

function anchorOf(root: ParentNode, key: string): Element | null {
  const id = `root_${key}`;
  return root.querySelector(`[id="${id}"]`) ?? root.querySelector(`label[for="${id}"]`);
}

/** Die Formulare, die `chart` führen – nur dort wird gelesen und ausgeblendet. */
function ownForms(root: ParentNode): HTMLFormElement[] {
  const forms = Array.from(root.querySelectorAll(`[id="root_${CHART_ATTRIBUTE}"]`)).map((field) => field.closest("form"));
  return Array.from(new Set(forms.filter((form): form is HTMLFormElement => form !== null)));
}

/**
 * Hält die Zeilen der alten Felder verborgen, solange der eigene Dialog sie
 * zeigt.
 * @param root der zu beobachtende Teilbaum; offengelegt für Tests.
 * @returns eine Funktion, die aufhört und die Zeilen wieder zeigt.
 */
export function startHiddenLegacyFields(root: ParentNode = document): () => void {
  const hidden = new Set<HTMLElement>();

  const apply = (): void => {
    for (const form of ownForms(root)) {
      for (const key of LEGACY_FIELD_KEYS) {
        const anchor = anchorOf(form, key);
        if (anchor === null) continue;
        const row = rowOf(anchor);
        if (row.style.display !== "none") row.style.display = "none";
        hidden.add(row);
      }
    }
  };

  apply();
  const observer = new MutationObserver(apply);
  const target = root === document ? document.body : (root as Node);
  observer.observe(target, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    hidden.forEach((row) => {
      row.style.display = "";
    });
    hidden.clear();
  };
}

/** Die Höhe aus dem Zahlenfeld; `undefined`, wenn dort keine Zahl steht. */
function readHeight(form: ParentNode): number | undefined {
  const element = form.querySelector(`[id="root_${HEIGHT_ATTRIBUTE}"]`);
  if (!(element instanceof HTMLInputElement)) return undefined;
  const value = Number.parseFloat(element.value);
  return Number.isFinite(value) ? value : undefined;
}

/**
 * Der Haken „Download erlauben“. RJSF zeichnet ihn als echtes
 * `<input type="checkbox">`; ein Schalter des Content Designers trägt
 * womöglich nur `aria-checked`. Alles andere gilt als nicht lesbar – dann
 * bleibt der Schlüssel offen, und das Attribut gilt weiter.
 */
function readAllowExport(form: ParentNode): boolean | undefined {
  const element = form.querySelector(`[id="root_${EXPORT_ATTRIBUTE}"]`);
  if (element instanceof HTMLInputElement && element.type === "checkbox") return element.checked;
  const aria = element?.getAttribute("aria-checked");
  if (aria === "true" || aria === "false") return aria === "true";
  if (element instanceof HTMLInputElement && (element.value === "true" || element.value === "false")) {
    return element.value === "true";
  }
  return undefined;
}

/** Die alten Felder, wie der eigene Dialog sie gerade führt; leer ohne eigenen Dialog. */
export function readLegacyFromDialog(root: ParentNode = document): LegacyDialogValues {
  const [form] = ownForms(root);
  if (form === undefined) return {};
  const height = readHeight(form);
  const allowExport = readAllowExport(form);
  return {
    ...(height === undefined ? {} : { height }),
    ...(allowExport === undefined ? {} : { allowExport }),
  };
}
