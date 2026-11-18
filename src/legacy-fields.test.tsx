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

import * as React from "react";
import { render } from "@testing-library/react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";

import { configurationSchema, uiSchema } from "./configuration-schema";
import { readLegacyFromDialog, startHiddenLegacyFields } from "./legacy-fields";

function row(key: string, input = `<input id="root_${key}" value="">`): string {
  return `<div data-row="${key}"><label for="root_${key}">${key}</label>${input}<p id="root_${key}__help">Hilfe</p></div>`;
}

const rowOf = (selector: string): HTMLElement | null => document.querySelector<HTMLElement>(selector);

afterEach(() => {
  document.body.innerHTML = "";
});

describe("startHiddenLegacyFields", () => {
  it("blendet Höhe und Download im eigenen Dialog samt Hilfe aus und lässt `chart` stehen", () => {
    document.body.innerHTML = `<form>${row("chart")}${row("height")}${row("allow-export")}</form>`;

    const stop = startHiddenLegacyFields();

    expect(rowOf('[data-row="height"]')?.style.display).toBe("none");
    expect(rowOf('[data-row="allow-export"]')?.style.display).toBe("none");
    expect(rowOf('[data-row="chart"]')?.style.display).toBe("");
    stop();
    expect(rowOf('[data-row="height"]')?.style.display).toBe("");
  });

  it("erfasst Felder, die erst später erscheinen", async () => {
    document.body.innerHTML = "<form></form>";
    const stop = startHiddenLegacyFields();

    document.querySelector("form")?.insertAdjacentHTML("beforeend", `${row("chart")}${row("height")}`);
    await Promise.resolve();

    expect(rowOf('[data-row="height"]')?.style.display).toBe("none");
    stop();
  });

  // `height` hat auch der Hero-Slider, `allow-export` die Projekt-Zeitleiste.
  it("lässt den Dialog eines anderen Widgets mit gleichen Feldnamen unberührt", () => {
    document.body.innerHTML =
      `<form id="hero"><div data-wrap>${row("slides")}${row("height")}</div></form>` +
      `<form id="timeline">${row("plan")}${row("allow-export")}</form>` +
      `<form id="chart">${row("chart")}${row("height")}</form>`;

    const stop = startHiddenLegacyFields();

    expect(rowOf('#hero [data-row="height"]')?.style.display).toBe("");
    expect(rowOf("#hero [data-wrap]")?.style.display).toBe("");
    expect(rowOf('#timeline [data-row="allow-export"]')?.style.display).toBe("");
    expect(rowOf('#chart [data-row="height"]')?.style.display).toBe("none");
    stop();
  });

  it("verbirgt im echten RJSF-Dialog die ganzen Zeilen von Höhe und Download", () => {
    const { container } = render(<Form schema={configurationSchema} uiSchema={uiSchema} validator={validator} />);
    const stop = startHiddenLegacyFields(container);

    const visible = (id: string): boolean => {
      for (let node = container.querySelector(`#${id}`); node !== null && node !== container; node = node.parentElement) {
        if ((node as HTMLElement).style.display === "none") return false;
      }
      return true;
    };
    expect(visible("root_height")).toBe(false);
    expect(visible("root_allow-export")).toBe(false);
    expect(visible("root_chart")).toBe(true);
    // Die Hilfetexte stehen mit in der verborgenen Zeile.
    expect(container.textContent).toContain("Wie hoch das Diagramm");
    expect(visible("root_height__help")).toBe(false);
    stop();
  });
});

describe("readLegacyFromDialog", () => {
  it("liest Höhe und Haken aus dem echten RJSF-Dialog", () => {
    const { container } = render(
      <Form
        schema={configurationSchema}
        uiSchema={uiSchema}
        validator={validator}
        formData={{ chart: "", height: 560, "allow-export": true }}
      />,
    );

    expect(readLegacyFromDialog(container)).toEqual({ height: 560, allowExport: true });
  });

  it("liest einen Schalter, der nur `aria-checked` trägt", () => {
    document.body.innerHTML = `<form>${row("chart")}${row(
      "allow-export",
      '<button id="root_allow-export" role="switch" aria-checked="false"></button>',
    )}</form>`;

    expect(readLegacyFromDialog()).toEqual({ allowExport: false });
  });

  it("lässt weg, was sich nicht lesen lässt", () => {
    document.body.innerHTML = `<form>${row("chart")}${row("height", '<input id="root_height" value="">')}${row(
      "allow-export",
      '<div id="root_allow-export"></div>',
    )}</form>`;

    expect(readLegacyFromDialog()).toEqual({});
  });

  it("liest nur im eigenen Dialog", () => {
    document.body.innerHTML = `<form>${row("slides")}${row("height", '<input id="root_height" value="300">')}</form>`;

    expect(readLegacyFromDialog()).toEqual({});
  });
});
