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

import { startWidget } from "@shared/dev-mode/start-widget";
import { setPublicPathFromBundle } from "@shared/public-path";

// Must run before any dynamic `import()`, so that lazily loaded chunks come
// from the CDN the bundle was served from and not from the hosting page.
setPublicPathFromBundle("chart-widget.js");
import React from "react";
import ReactDOM from "react-dom/client";

import { BlockAttributes, BlockFactory, BlockDefinition, ExternalBlockDefinition, BaseBlock } from "widget-sdk";
import { getTranslationRegistry } from "@shared/translation/registry";
import {
  CHART_ATTRIBUTE,
  EXPORT_ATTRIBUTE,
  HEIGHT_ATTRIBUTE,
  configurationSchema,
  uiSchema,
} from "./configuration-schema";
import { readChartSettings } from "./chart-settings";
import icon from "../resources/chart-widget.svg";
import pkg from "../package.json";

import { startChartEditorInjector } from "./chart-editor/chart-editor-injector";
import { ChartWidget } from "./chart-widget";
import { chartTranslationProvider } from "./translation-provider";

/**
 * Die Attribute, wie `parseAttributes` sie liefert. Höhe und Download sind
 * die Felder bis 0.3: Seit dem Vollbild-Editor stehen beide im Diagramm, die
 * Attribute gelten nur noch, wo dort nichts steht (`chart-settings.ts`).
 * Die Höhe ist weit getypt, weil das SDK sie je nach Weg als Zeichenkette
 * oder als Zahl übergibt.
 */
export type ChartWidgetProps = BlockAttributes & {
  [CHART_ATTRIBUTE]?: string;
  [HEIGHT_ATTRIBUTE]?: string | number;
  [EXPORT_ATTRIBUTE]?: string | boolean;
};

/** Attribute aus denselben Konstanten wie das Schema, um Abweichungen zu vermeiden. */
const widgetAttributes: string[] = [CHART_ATTRIBUTE, HEIGHT_ATTRIBUTE, EXPORT_ATTRIBUTE];

const factory: BlockFactory = (BaseBlockClass, _widgetApi) => {
  return class ChartWidgetBlock extends BaseBlockClass implements BaseBlock {
    private _root: ReactDOM.Root | null = null;

    private get props(): ChartWidgetProps {
      const attrs = this.parseAttributes<ChartWidgetProps>();
      // Die Sprache steht nicht in den Attributen, sondern am Block selbst.
      // Ohne sie stünden Zahlen immer im deutschen Format.
      return { ...attrs, contentLanguage: this.contentLanguage };
    }

    public renderBlock(container: HTMLElement): void {
      this._root ??= ReactDOM.createRoot(container);
      const props = this.props;
      const settings = readChartSettings(props[CHART_ATTRIBUTE], props);
      this._root.render(
        <ChartWidget
          chart={props[CHART_ATTRIBUTE]}
          height={settings.height}
          contentLanguage={props.contentLanguage}
          allowExport={settings.allowExport}
        />,
      );
    }

    public unmountBlock(_container: HTMLElement): void {
      this._root?.unmount();
      this._root = null;
    }

    public static get observedAttributes(): string[] {
      return widgetAttributes;
    }

    public attributeChangedCallback(...args: [string, string | undefined, string | undefined]): void {
      super.attributeChangedCallback.apply(this, args);
    }
  };
};

const blockDefinition: BlockDefinition = {
  name: "chart-widget",
  factory: factory,
  attributes: widgetAttributes,
  blockLevel: "block",
  configurationSchema: configurationSchema,
  uiSchema: uiSchema,
  label: "Diagramm",
  iconUrl: icon,
};

const externalBlockDefinition: ExternalBlockDefinition = {
  blockDefinition,
  author: pkg.author,
  version: pkg.version,
};

/**
 * Anmelden über `startWidget`: Läuft ein lokaler Entwicklungsserver mit
 * diesem Widget, übernimmt dessen Bundle und meldet an seiner Stelle an;
 * sonst meldet die installierte Fassung sofort an. Editor und Übersetzung
 * hängen am Anmelden, nicht am Laden, sonst belegte der Beobachter der
 * installierten Fassung das Feld, bevor der lokale Server übernimmt (siehe
 * `project-timeline-widget`).
 *
 * Die Abfrage davor lässt das Modul in Jest laden, wo es keine Wirtsseite
 * gibt.
 */
if (typeof window.defineBlock === "function") {
  void startWidget({
    name: "chart-widget",
    version: pkg.version,
    register: () => {
      startChartEditorInjector();
      getTranslationRegistry().register(chartTranslationProvider);
      window.defineBlock(externalBlockDefinition);
    },
  });
}
