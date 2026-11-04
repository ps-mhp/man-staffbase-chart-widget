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

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";

import { EditorBar } from "./editor-bar";

const setup = (props: Partial<React.ComponentProps<typeof EditorBar>> = {}) => {
  const onSave = jest.fn();
  const onClose = jest.fn();
  const onOpenHelp = jest.fn();
  render(<EditorBar onSave={onSave} onClose={onClose} onOpenHelp={onOpenHelp} dirty={false} {...props} />);
  return { onSave, onClose, onOpenHelp };
};

describe("EditorBar", () => {
  it("speichert", () => {
    const { onSave } = setup();
    fireEvent.click(screen.getByRole("button", { name: "Speichern" }));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it("schliesst", () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByRole("button", { name: "Schließen" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("oeffnet die Hilfe", () => {
    const { onOpenHelp } = setup();
    fireEvent.click(screen.getByRole("button", { name: "Hilfe" }));
    expect(onOpenHelp).toHaveBeenCalledTimes(1);
  });

  it("zeigt den Hinweis auf ungespeicherte Aenderungen nur wenn noetig", () => {
    setup({ dirty: true });
    expect(screen.getByText("Ungespeicherte Änderungen")).toBeInTheDocument();
  });

  it("zeigt ihn nicht ohne Aenderungen", () => {
    setup();
    expect(screen.queryByText("Ungespeicherte Änderungen")).not.toBeInTheDocument();
  });

  it("benennt die Knoepfe auch ohne sichtbaren Text", () => {
    setup();
    // Icons statt Beschriftung: Der Name muss aus `title` kommen, sonst ist
    // die Leiste für Screenreader eine Reihe namenloser Knöpfe.
    expect(screen.getByRole("button", { name: "Speichern" })).toHaveAttribute("title", "Speichern");
  });
});
