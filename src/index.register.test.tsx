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

import { ExternalBlockDefinition } from "widget-sdk";

const mockStartWidget = jest.fn().mockResolvedValue(false);

jest.mock("@shared/dev-mode/start-widget", () => ({ startWidget: mockStartWidget }));

describe("Registrierung", () => {
  // Ohne startWidget schaltete das Diagramm nie auf einen lokalen
  // Entwicklungsserver um: Im Studio lief immer die installierte Fassung.
  it("meldet sich über startWidget an, damit der Entwicklungsmodus greift", async () => {
    const defineBlock = jest.fn();
    (window as unknown as { defineBlock: unknown }).defineBlock = defineBlock;

    jest.resetModules();
    mockStartWidget.mockClear();
    await import("./index");

    expect(mockStartWidget).toHaveBeenCalledTimes(1);
    const options = mockStartWidget.mock.calls[0][0] as { name: string; register: () => void };
    expect(options.name).toBe("chart-widget");
    expect(defineBlock).not.toHaveBeenCalled();

    options.register();
    expect(defineBlock).toHaveBeenCalledTimes(1);
  });

  it("meldet den Baustein mit genau den Attributen des Schemas an", async () => {
    const defineBlock = jest.fn();
    (window as unknown as { defineBlock: unknown }).defineBlock = defineBlock;

    jest.resetModules();
    mockStartWidget.mockClear();
    await import("./index");
    (mockStartWidget.mock.calls[0][0] as { register: () => void }).register();

    expect(defineBlock).toHaveBeenCalledTimes(1);
    const external = defineBlock.mock.calls[0][0] as ExternalBlockDefinition;
    const { blockDefinition } = external;

    expect(blockDefinition.name).toBe("chart-widget");
    expect(blockDefinition.label).toBe("Diagramm");
    expect(blockDefinition.attributes).toEqual(["chart", "height", "allow-export"]);

    // Jedes gemeldete Attribut muss im Schema stehen — sonst bliebe es im
    // Dialog unerreichbar und zur Laufzeit stumm leer.
    const properties = Object.keys(blockDefinition.configurationSchema?.properties ?? {});
    expect(properties.sort()).toEqual(["allow-export", "chart", "height"]);
  });
});
