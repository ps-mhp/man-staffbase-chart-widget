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
 * Die Steuerleiste über dem Editor.
 *
 * Speichern stand früher in einer Fußzeile unter dem Datenraster und war bei
 * zehn Achsen nur nach langem Scrollen erreichbar. Die Leiste bleibt deshalb
 * oben stehen (`position: sticky`).
 *
 * Nachgebaut nach dem table-widget, nicht importiert: Das ist ein eigenes
 * Repo. **Ohne Reiter** — dieser Editor hat vier Abschnitte untereinander,
 * keine zwanzig Werkzeuge.
 *
 * Nichts hier schreibt in die Konfiguration: „Speichern" reicht den Entwurf
 * weiter, „Schließen" lässt ihn liegen. Der Hinweis daneben ist der einzige
 * Anhaltspunkt, dass die beiden auseinanderliegen — er bleibt sichtbar,
 * solange das so ist.
 */

import * as React from "react";

import { IconClose, IconHelp, IconSave } from "./icons";

export interface EditorBarProps {
  onSave: () => void;
  onClose: () => void;
  onOpenHelp: () => void;
  dirty: boolean;
}

export function EditorBar({ onSave, onClose, onOpenHelp, dirty }: EditorBarProps): React.JSX.Element {
  return (
    <div className="chart-editor__bar" data-testid="chart-editor-bar">
      <button
        type="button"
        className="chart-editor__ctl chart-editor__ctl--primary"
        title="Speichern"
        onClick={onSave}
      >
        <IconSave />
      </button>
      <div className="chart-editor__bar-title">MAN Chart Editor</div>
      <button type="button" className="chart-editor__ctl" title="Hilfe" onClick={onOpenHelp}>
        <IconHelp />
      </button>
      <button type="button" className="chart-editor__ctl" title="Schließen" onClick={onClose}>
        <IconClose />
      </button>
      {dirty ? <span className="chart-editor__dirty">Ungespeicherte Änderungen</span> : null}
    </div>
  );
}
