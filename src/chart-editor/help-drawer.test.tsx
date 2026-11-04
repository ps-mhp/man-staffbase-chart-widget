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

import { HelpDrawer } from "./help-drawer";

describe("HelpDrawer", () => {
  it("zeigt nichts, solange er zu ist", () => {
    render(<HelpDrawer open={false} onClose={jest.fn()} />);
    expect(screen.getByTestId("chart-editor-help")).not.toHaveClass("chart-editor__help--open");
  });

  it("zeigt die Hilfe, wenn er offen ist", () => {
    render(<HelpDrawer open onClose={jest.fn()} />);
    expect(screen.getByRole("heading", { name: /Hilfe/ })).toBeInTheDocument();
  });

  it("schliesst ueber den Knopf", () => {
    const onClose = jest.fn();
    render(<HelpDrawer open onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Hilfe schließen" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("schliesst ueber Escape", () => {
    const onClose = jest.fn();
    render(<HelpDrawer open onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("reagiert nicht auf Escape, solange er zu ist", () => {
    const onClose = jest.fn();
    render(<HelpDrawer open={false} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("erklaert alle vier Diagrammtypen", () => {
    render(<HelpDrawer open onClose={jest.fn()} />);
    for (const word of ["Netzdiagramm", "Balkendiagramm", "Liniendiagramm", "Kuchendiagramm"]) {
      expect(screen.getByText(new RegExp(word))).toBeInTheDocument();
    }
  });
});
