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

import { act, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";

import { readChartTheme } from "./man-chart-theme";
import { useECharts } from "./use-echarts";

jest.mock("./echarts-modules");

import { loadECharts } from "./echarts-modules";

const mockedLoad = loadECharts as jest.MockedFunction<typeof loadECharts>;

const instance = { setOption: jest.fn(), resize: jest.fn(), dispose: jest.fn() };
const init = jest.fn((_el?: unknown, _theme?: unknown, _opts?: unknown) => instance);

/**
 * jsdom kennt keinen ResizeObserver. Der Hook wartet auf eine echte Größe,
 * also muss der Test eine melden können.
 */
let notify: (() => void) | null = null;

class StubResizeObserver {
  constructor(private readonly callback: () => void) {
    notify = () => this.callback();
  }
  observe(): void {
    this.callback();
  }
  disconnect(): void {
    notify = null;
  }
}

function Probe({
  option,
  size,
  theme,
}: {
  option: Record<string, unknown>;
  size: number;
  theme?: ReturnType<typeof readChartTheme>;
}): React.JSX.Element {
  const { containerRef, status } = useECharts({
    type: "radar",
    option,
    theme: theme ?? readChartTheme(null),
  });
  return (
    <div>
      <span data-testid="status">{status}</span>
      <div
        ref={(node) => {
          if (node) Object.defineProperty(node, "clientWidth", { value: size, configurable: true });
          if (node) Object.defineProperty(node, "clientHeight", { value: size, configurable: true });
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        data-testid="container"
      />
    </div>
  );
}

describe("useECharts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    notify = null;
    (window as unknown as { ResizeObserver: unknown }).ResizeObserver = StubResizeObserver;
    (global as unknown as { ResizeObserver: unknown }).ResizeObserver = StubResizeObserver;
    mockedLoad.mockResolvedValue({ init } as unknown as Awaited<ReturnType<typeof loadECharts>>);
  });

  const option = { series: [] };

  it("legt die Instanz an und setzt die Option", async () => {
    render(<Probe option={option} size={400} />);
    await waitFor(() => expect(screen.getByTestId("status")).toHaveTextContent("ready"));
    expect(init).toHaveBeenCalledTimes(1);
    expect(init.mock.calls[0][2]).toEqual({ renderer: "svg" });
    expect(instance.setOption).toHaveBeenCalledWith(option, true);
  });

  it("wartet mit dem Laden, bis der Container eine Größe hat", async () => {
    render(<Probe option={option} size={0} />);
    // Ein Container der Höhe 0 ließe ECharts dauerhaft leer zeichnen, weil
    // die Instanz ihre Maße nur beim init übernimmt.
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(mockedLoad).not.toHaveBeenCalled();
    expect(screen.getByTestId("status")).toHaveTextContent("loading");
  });

  it("meldet 'failed', wenn das Modul nicht lädt", async () => {
    mockedLoad.mockRejectedValue(new Error("offline"));
    render(<Probe option={option} size={400} />);
    await waitFor(() => expect(screen.getByTestId("status")).toHaveTextContent("failed"));
  });

  it("aktualisiert eine neue Option ohne neue Instanz", async () => {
    const { rerender } = render(<Probe option={option} size={400} />);
    await waitFor(() => expect(screen.getByTestId("status")).toHaveTextContent("ready"));

    rerender(<Probe option={{ series: [1] }} size={400} />);
    await waitFor(() => expect(instance.setOption).toHaveBeenCalledTimes(2));
    expect(init).toHaveBeenCalledTimes(1);
  });

  it("gibt die Instanz beim Abbau frei", async () => {
    const { unmount } = render(<Probe option={option} size={400} />);
    await waitFor(() => expect(screen.getByTestId("status")).toHaveTextContent("ready"));
    unmount();
    expect(instance.dispose).toHaveBeenCalled();
  });

  it("zeichnet bei Größenänderung neu", async () => {
    render(<Probe option={option} size={400} />);
    await waitFor(() => expect(screen.getByTestId("status")).toHaveTextContent("ready"));
    act(() => notify?.());
    await waitFor(() => expect(instance.resize).toHaveBeenCalled());
  });

  it("legt bei geändertem Theme neu an, denn ECharts nimmt es nur beim init", async () => {
    const theme = readChartTheme(null);
    const { rerender } = render(<Probe option={option} size={400} theme={theme} />);
    await waitFor(() => expect(screen.getByTestId("status")).toHaveTextContent("ready"));
    expect(init).toHaveBeenCalledTimes(1);

    rerender(<Probe option={option} size={400} theme={{ ...theme, text: "#123456" }} />);
    await waitFor(() => expect(init).toHaveBeenCalledTimes(2));
    expect(instance.dispose).toHaveBeenCalledTimes(1);
  });

  it("legt nicht neu an, wenn dasselbe Theme nur neu verpackt hereinkommt", async () => {
    const theme = readChartTheme(null);
    const { rerender } = render(<Probe option={option} size={400} theme={theme} />);
    await waitFor(() => expect(screen.getByTestId("status")).toHaveTextContent("ready"));

    // Gleicher Inhalt, andere Referenz: Ein Aufrufer ohne Memoisierung darf
    // das Diagramm nicht bei jedem Rendern wegwerfen und neu aufbauen.
    rerender(<Probe option={option} size={400} theme={{ ...theme }} />);
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(init).toHaveBeenCalledTimes(1);
    expect(instance.dispose).not.toHaveBeenCalled();
  });
});
