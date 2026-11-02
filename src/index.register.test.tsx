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

describe("Registrierung", () => {
  it("meldet den Baustein mit genau den Attributen des Schemas an", async () => {
    const defineBlock = jest.fn();
    (window as unknown as { defineBlock: unknown }).defineBlock = defineBlock;

    await import("./index");

    expect(defineBlock).toHaveBeenCalledTimes(1);
    const external = defineBlock.mock.calls[0][0] as ExternalBlockDefinition;
    const { blockDefinition } = external;

    expect(blockDefinition.name).toBe("chart-widget");
    expect(blockDefinition.label).toBe("Diagramm");
    expect(blockDefinition.attributes).toEqual(["chart", "height"]);

    // Jedes gemeldete Attribut muss im Schema stehen — sonst bliebe es im
    // Dialog unerreichbar und zur Laufzeit stumm leer.
    const properties = Object.keys(blockDefinition.configurationSchema?.properties ?? {});
    expect(properties.sort()).toEqual(["chart", "height"]);
  });
});
