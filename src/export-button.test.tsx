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
import { useLayoutEffect, useRef } from "react";

import { ExportButtons } from "./export-button";
import { readChartTheme } from "./man-chart-theme";

/**
 * Baut den Container, wie ihn `ChartWidget` an `useECharts` übergibt —
 * mit oder ohne ein bereits gezeichnetes `<svg>` darin.
 */
function Harness({ withSvg, title }: { withSvg: boolean; title?: string }): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // `useLayoutEffect`, damit das SVG vor dem Klick im Container steht.
  useLayoutEffect(() => {
    if (withSvg && containerRef.current) {
      containerRef.current.innerHTML = '<svg width="10" height="10"></svg>';
    }
  }, [withSvg]);

  return (
    <div>
      <div ref={containerRef} />
      <ExportButtons containerRef={containerRef} theme={readChartTheme(null)} title={title} />
    </div>
  );
}

describe("ExportButtons", () => {
  it("zeigt beide Knöpfe mit echtem Text, nicht nur einem Symbol", () => {
    render(<Harness withSvg />);
    expect(screen.getByRole("button", { name: "Als SVG" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Als PNG" })).toBeInTheDocument();
  });

  it("zeigt einen Hinweis statt stiller Nichtreaktion, wenn noch kein SVG im Container steht", () => {
    render(<Harness withSvg={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Als SVG" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/fehlgeschlagen/);
  });

  describe("Klick auf „Als SVG“", () => {
    // jsdom kennt `URL.createObjectURL` nicht (siehe `chart-export.test.ts`)
    // — hier lokal gestubbt, statt `test/jest-setup.ts` global anzufassen.
    let createObjectURL: jest.Mock;
    let revokeObjectURL: jest.Mock;
    let clickSpy: jest.SpyInstance;

    beforeEach(() => {
      createObjectURL = jest.fn(() => "blob:mock-url");
      revokeObjectURL = jest.fn();
      (URL as unknown as { createObjectURL: typeof createObjectURL }).createObjectURL = createObjectURL;
      (URL as unknown as { revokeObjectURL: typeof revokeObjectURL }).revokeObjectURL = revokeObjectURL;
      clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);
    });

    afterEach(() => {
      clickSpy.mockRestore();
    });

    it("löst einen Download aus und zeigt keinen Fehlerhinweis", () => {
      render(<Harness withSvg title="Testtitel" />);
      fireEvent.click(screen.getByRole("button", { name: "Als SVG" }));

      expect(createObjectURL).toHaveBeenCalledTimes(1);
      expect(clickSpy).toHaveBeenCalledTimes(1);
      const anchor = clickSpy.mock.contexts[0] as HTMLAnchorElement;
      expect(anchor.download).toBe("testtitel.svg");
      expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("verändert das im Container stehende SVG nicht", () => {
      render(<Harness withSvg title="Testtitel" />);
      const before = document.querySelector(".man-chart__export")?.previousElementSibling?.innerHTML;
      fireEvent.click(screen.getByRole("button", { name: "Als SVG" }));
      const after = document.querySelector(".man-chart__export")?.previousElementSibling?.innerHTML;
      expect(after).toBe(before);
    });
  });
});
