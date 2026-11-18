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
 * Der Diagramm-Editor im gemeinsamen Rahmen, eingehängt in einen echten
 * RJSF-Dialog: Nachladen, Ausblenden der alten Felder, Übernahme ihrer Werte
 * und dass Öffnen und Übernehmen einen alten Block nicht verändert.
 */

import * as React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";

import { modalRoot, settleModal } from "@shared/ui/config-modal.testing";
import { ChartSpec, parseChartSpec, serializeChartSpec } from "../chart-model";
import { readChartSettings } from "../chart-settings";
import { configurationSchema, uiSchema } from "../configuration-schema";
import { chartEditorShell, startChartEditorInjector } from "./chart-editor-injector";

const mockEditorLoaded = jest.fn();
jest.mock("./chart-editor", () => {
  mockEditorLoaded();
  return jest.requireActual("./chart-editor");
});
jest.mock("../echarts-modules");

class StubResizeObserver {
  observe(): void {}
  disconnect(): void {}
}

beforeEach(() => {
  (global as unknown as { ResizeObserver: unknown }).ResizeObserver = StubResizeObserver;
});

/** Ein Block der Fassung 0.3: Höhe und Download nur als eigene Felder. */
const legacySpec: ChartSpec = {
  version: 1,
  type: "bar",
  legend: { show: true, position: "top" },
  categories: [{ label: "Prozesse" }, { label: "Werkzeuge" }],
  series: [{ name: "Ist", values: [3, 2] }],
};

const inModal = (selector: string): HTMLElement | null => modalRoot()?.querySelector<HTMLElement>(selector) ?? null;

const buttonNamed = (name: string): HTMLElement | null =>
  Array.from(modalRoot()?.querySelectorAll<HTMLElement>("button") ?? []).find(
    (button) => button.getAttribute("aria-label") === name || button.textContent?.trim() === name,
  ) ?? null;

async function click(element: Element | null): Promise<void> {
  if (element === null) throw new Error("Nichts zum Klicken gefunden");
  await act(async () => {
    (element as HTMLElement).click();
  });
}

/** Das Modal lädt nach, der Editor darin noch einmal: so oft warten, bis er da ist. */
async function settleEditor(): Promise<void> {
  for (let round = 0; round < 8 && inModal('[data-testid="chart-editor"]') === null; round += 1) {
    await settleModal();
  }
}

async function open(formData: Record<string, unknown>): Promise<{ container: HTMLElement; stop: () => void }> {
  const { container } = render(
    <Form schema={configurationSchema} uiSchema={uiSchema} validator={validator} formData={formData} />,
  );
  let stop = (): void => {};
  await act(async () => {
    stop = startChartEditorInjector(container);
  });
  await settleEditor();
  return { container, stop };
}

const chartField = (container: HTMLElement): HTMLTextAreaElement | HTMLInputElement =>
  container.querySelector<HTMLTextAreaElement>("#root_chart")!;

const hidden = (element: Element | null): boolean => element?.closest('[style*="display: none"]') != null;

describe("Nachladen", () => {
  // Muss zuerst laufen: einmal geladen, bleibt das Modul im Speicher.
  it("lädt den Editor erst, wenn der Dialog erscheint", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const stop = startChartEditorInjector(container);
    await settleModal();
    expect(mockEditorLoaded).not.toHaveBeenCalled();
    await act(async () => stop());
    container.remove();

    const opened = await open({ chart: "" });
    expect(mockEditorLoaded).toHaveBeenCalledTimes(1);
    await act(async () => opened.stop());
  });
});

describe("startChartEditorInjector", () => {
  it("öffnet den Editor im Rahmen mit Kopf, Vorschau-Umschalter und Panel „Diagramm“", async () => {
    const { container, stop } = await open({ chart: serializeChartSpec(legacySpec) });

    expect(modalRoot()!.textContent).toContain("Diagramm");
    expect(modalRoot()!.querySelector("h1")).toHaveTextContent("Diagramm bearbeiten");
    expect(inModal('[aria-label="Ansicht"]')).not.toBeNull();
    expect(inModal('[aria-label="Diagramm"]')).not.toBeNull();
    expect(inModal('[aria-label="Name der Achse 2"]')).toHaveValue("Werkzeuge");
    expect(hidden(chartField(container))).toBe(true);

    await act(async () => stop());
  });

  it("blendet Höhe und Download im Dialog aus, samt Hilfe", async () => {
    const { container, stop } = await open({ chart: "" });
    expect(hidden(container.querySelector("#root_height"))).toBe(true);
    expect(hidden(container.querySelector('[id="root_allow-export"]'))).toBe(true);

    await act(async () => stop());
    expect(hidden(container.querySelector("#root_height"))).toBe(false);
  });

  it("übernimmt Höhe und Download der alten Felder – Öffnen ändert nichts am Block", async () => {
    const raw = serializeChartSpec(legacySpec);
    const formData = { chart: raw, height: 560, "allow-export": true };
    const before = readChartSettings(raw, formData);
    const { container, stop } = await open(formData);

    // Die alten Werte stehen im Editor …
    await click(Array.from(modalRoot()!.querySelectorAll('[role="tab"]')).find((tab) => tab.textContent === "Verhalten") ?? null);
    expect(inModal('[data-testid="chart-allow-export"]')).toHaveAttribute("aria-checked", "true");
    // … sind aber keine Änderung: Übernehmen bleibt aus, das Feld unberührt.
    expect(inModal('[data-testid="config-shell-apply"]')).toBeDisabled();
    expect(chartField(container).value).toBe(raw);
    expect(readChartSettings(chartField(container).value, formData)).toEqual(before);

    await act(async () => stop());
  });

  it("schreibt beim Übernehmen Daten samt übernommener Höhe ins Diagramm", async () => {
    const formData = { chart: serializeChartSpec(legacySpec), height: 560, "allow-export": true };
    const { container, stop } = await open(formData);

    await act(async () => {
      fireEvent.change(inModal('[aria-label="Ist, Werkzeuge"]')!, { target: { value: "4" } });
    });
    await click(inModal('[data-testid="config-shell-apply"]'));

    const written = parseChartSpec(chartField(container).value).spec;
    expect(written.series[0].values).toEqual([3, 4]);
    expect(written).toMatchObject({ height: 560, allowExport: true });

    await act(async () => stop());
  });

  it("öffnet „Aus Excel einfügen“ als Leiste über dem Panel", async () => {
    const { stop } = await open({ chart: serializeChartSpec(legacySpec) });

    await click(buttonNamed("Aus Excel einfügen"));
    await settleModal();
    expect(inModal('[data-testid="chart-paste-panel"]')).not.toBeNull();

    await act(async () => stop());
  });
});

describe("chartEditorShell", () => {
  it("nennt Widget, Titel und Vorschau, prüft und zählt Änderungen", () => {
    expect(chartEditorShell).toMatchObject({ widgetName: "Diagramm", title: "Diagramm bearbeiten", preview: true });
    const faulty = { ...legacySpec, type: "radar" as const, categories: [{ label: "A", min: 2, max: 1 }] };
    expect(chartEditorShell.validate?.(faulty)).toEqual([{ id: "axis-0-bounds", message: "Achse „A“: Maximum zu klein" }]);
    expect(chartEditorShell.statusText?.({ ...legacySpec, type: "line" }, legacySpec)).toBe("Diagrammtyp geändert");
  });
});
