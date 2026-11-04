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
 * Der Hilfe-Schieber des Diagramm-Editors.
 *
 * Nach dem Muster von `src/widgets/table-widget/src/toolbar/help-drawer.tsx`
 * nachgebaut, nicht importiert — das table-widget ist ein eigenes Repo.
 *
 * Bleibt auch im geschlossenen Zustand montiert: Nur so laesst sich das
 * Zuschieben ueber `transform` animieren, und der Inhalt muss nicht bei
 * jedem Oeffnen neu aufgebaut werden.
 */

import * as React from "react";
import { useEffect } from "react";

import { CHART_TYPE_INFO } from "./chart-type-info";
import { IconClose } from "./icons";

export interface HelpDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function HelpDrawer({ open, onClose }: HelpDrawerProps): React.JSX.Element {
  // Der Escape-Listener haengt nur am Dokument, solange der Schieber offen
  // ist — sonst wuerde ein Escape anderswo im Dialog (etwa im Raster) den
  // Schieber unbemerkt wieder zumachen.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`chart-editor__help${open ? " chart-editor__help--open" : ""}`}
      data-testid="chart-editor-help"
      role="complementary"
      aria-label="Hilfe"
      aria-hidden={!open}
    >
      <div className="chart-editor__help-header">
        <h2 className="chart-editor__help-title">Hilfe</h2>
        <button type="button" className="chart-editor__ctl" aria-label="Hilfe schließen" onClick={onClose}>
          <IconClose />
        </button>
      </div>

      <section className="chart-editor__help-section">
        <h3>Das Datenraster</h3>
        <p>Eine Zeile je Achse, eine Spalte je Serie.</p>
      </section>

      <section className="chart-editor__help-section">
        <h3>Aus Excel einfügen</h3>
        <p>
          Eine aus Excel kopierte Tabelle lässt sich direkt in das Einfügefeld einfügen. Je nachdem, ob die Achsen in
          der Tabelle als Zeilen oder als Spalten stehen, muss die passende Ausrichtung gewählt werden.
        </p>
      </section>

      <section className="chart-editor__help-section">
        <h3>Die vier Typen</h3>
        {(["radar", "bar", "line", "pie"] as const).map((type) => (
          <p key={type}>{`${CHART_TYPE_INFO[type].label}: ${CHART_TYPE_INFO[type].hint}`}</p>
        ))}
      </section>

      <section className="chart-editor__help-section">
        <h3>Welche Felder wann erscheinen</h3>
        <p>
          Minimum, Maximum und „kleiner ist besser" erscheinen nur beim Typ Netz. Die Segmentfarbe erscheint nur
          beim Typ Kuchen; dort wird zudem nur die erste Serie gezeichnet.
        </p>
        <p>Ausgeblendete Felder sind nicht gelöscht — die dahinterliegenden Werte bleiben erhalten.</p>
      </section>
    </div>
  );
}
