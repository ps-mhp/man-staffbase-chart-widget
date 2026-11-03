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
  HEIGHT_ATTRIBUTE,
  configurationSchema,
  readHeightAttribute,
  uiSchema,
} from "./configuration-schema";
import icon from "../resources/chart-widget.svg";
import pkg from "../package.json";

import { startChartEditorInjector } from "./chart-editor/chart-editor-injector";
import { ChartWidget } from "./chart-widget";
import { chartTranslationProvider } from "./translation-provider";

/**
 * Die Attribute, wie `parseAttributes` sie liefert. Die Höhe ist weit
 * getypt, weil das SDK sie je nach Weg als Zeichenkette oder als Zahl
 * übergibt — gelesen wird deshalb über `readHeightAttribute`, nie direkt.
 */
export type ChartWidgetProps = BlockAttributes & {
  [CHART_ATTRIBUTE]?: string;
  [HEIGHT_ATTRIBUTE]?: string | number;
};

/** Attribute aus denselben Konstanten wie das Schema, um Abweichungen zu vermeiden. */
const widgetAttributes: string[] = [CHART_ATTRIBUTE, HEIGHT_ATTRIBUTE];

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
      this._root.render(
        <ChartWidget
          chart={props[CHART_ATTRIBUTE]}
          height={readHeightAttribute(props[HEIGHT_ATTRIBUTE])}
          contentLanguage={props.contentLanguage}
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

// Nach dem Muster von `project-timeline-widget`: Der Editor hängt am Laden
// des Bausteins im Content-Designer, nicht am bloßen Import dieser Datei.
startChartEditorInjector();
window.defineBlock(externalBlockDefinition);

export const stopTranslationProvider = getTranslationRegistry().register(chartTranslationProvider);
