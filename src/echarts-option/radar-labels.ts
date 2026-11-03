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
 * Setzt Wertelabels und Achsennamen eines Radars selbst.
 *
 * Zwei Dinge kann ECharts am Radar nicht, und beide sind hier der Grund:
 *
 * 1. **Richtung der Wertelabels.** ECharts kennt nur feste Lagen — `top`,
 *    `bottom`, `left`, `right`. Am Radar ist keine davon richtig: Die einzig
 *    sinnvolle Richtung ist „vom Mittelpunkt weg“, und die ist für jede
 *    Achse eine andere. Mit `top` schreiben die Zahlen der unteren Achsen in
 *    ihren Achsennamen hinein, mit `bottom` die der oberen.
 *
 * 2. **Abstand der Achsennamen.** `axisNameGap` gilt für alle Achsen gleich.
 *    Zwischen Netzrand und Namen stehen aber die Zahlen, und die brauchen
 *    seitlich ihre Textbreite („1.000 kW“ misst gut 50 Pixel), oben und
 *    unten nur ihre Zeilenhöhe. Ein für alle Achsen gleicher, also am
 *    breitesten Fall bemessener Abstand schrumpft das Netz in der Höhe auf
 *    einen Bruchteil — und die Höhe ist beim Radar ohnehin das knappe Maß.
 *
 * Zwei Serien stehen außerdem auf derselben Achse oft dicht beieinander —
 * bei einem Vergleich ist das der Normalfall. ECharts' eigene Entzerrung
 * (`labelLayout.moveOverlap`) greift beim Radar nicht. Die Serien werden
 * hier deshalb senkrecht aufgefächert: Eine Textzeile ist nur rund 16 Pixel
 * hoch, aber leicht 60 breit — senkrecht auseinanderzurücken kostet am
 * wenigsten Platz und wirkt unabhängig von der Richtung der Achse.
 *
 * Ausgegeben wird alles als `graphic`-Elemente in Containerkoordinaten, also
 * in demselben Bezugssystem, in dem die Flächenaufteilung ohnehin rechnet.
 */

import { NORMALIZED_MAX } from "../chart-normalize";
import { textWidth } from "./text-layout";

/** Wo ECharts die erste Achse eines Radars ansetzt: senkrecht nach oben. */
const START_ANGLE_DEG = 90;

/** Abstand des Wertelabels vom zugehörigen Punkt, nach außen gemessen. */
export const LABEL_GAP = 12;

/** Senkrechter Abstand zweier Serien an derselben Stelle. */
export const SERIES_SPREAD = 17;

/** Luft zwischen dem äußersten Wertelabel und dem Achsennamen. */
export const NAME_PAD = 8;

/**
 * Ab welcher Richtungskomponente eine Achse als „seitlich“ bzw. „oben oder
 * unten“ gilt. Dazwischen wird mittig ausgerichtet, damit ein Label am
 * 12-Uhr-Strahl nicht nach links oder rechts verrutscht.
 */
const DIRECTION_THRESHOLD = 0.3;

export type TextAlign = "left" | "center" | "right";
export type TextVerticalAlign = "top" | "middle" | "bottom";

export interface Direction {
  x: number;
  y: number;
}

export interface TextAnchor {
  align: TextAlign;
  verticalAlign: TextVerticalAlign;
}

export interface PlacedText extends TextAnchor {
  x: number;
  y: number;
  text: string;
  color: string;
}

/** Richtung der Achse `index` als Einheitsvektor in Bildschirmkoordinaten. */
export function axisDirection(index: number, axisCount: number): Direction {
  // ECharts verteilt die Achsen vom Startwinkel aus gegen den Uhrzeigersinn.
  const angle = ((START_ANGLE_DEG + (index * 360) / axisCount) * Math.PI) / 180;
  // Minus beim y: Der Bildschirm zählt nach unten, der Winkel nach oben.
  return { x: Math.cos(angle), y: -Math.sin(angle) };
}

/**
 * Ausrichtung, mit der ein Text vom Mittelpunkt weg wächst.
 *
 * Der Ankerpunkt liegt außen am Punkt; die Ausrichtung entscheidet, in
 * welche Richtung der Text von dort aus läuft — nie zum Mittelpunkt hin.
 */
export function anchorFor(direction: Direction): TextAnchor {
  return {
    align:
      direction.x > DIRECTION_THRESHOLD
        ? "left"
        : direction.x < -DIRECTION_THRESHOLD
          ? "right"
          : "center",
    verticalAlign:
      direction.y > DIRECTION_THRESHOLD
        ? "top"
        : direction.y < -DIRECTION_THRESHOLD
          ? "bottom"
          : "middle",
  };
}

interface GapArgs {
  axisCount: number;
  seriesCount: number;
  /** Breite der breitesten vorkommenden Zahl. */
  valueWidth: number;
  /** Zeilenhöhe einer Zahl. */
  valueLine: number;
}

/**
 * Abstand zwischen Netzrand und Achsenname, je Achse.
 *
 * Gerechnet wird mit dem Platz, den die Wertelabels in genau dieser Richtung
 * belegen: seitlich ihre Breite, oben und unten ihre Zeilenhöhe samt der
 * Auffächerung der Serien. Eine Achse schräg dazwischen bekommt den jeweils
 * größeren der beiden anteiligen Werte.
 */
export function axisNameGaps({ axisCount, seriesCount, valueWidth, valueLine }: GapArgs): number[] {
  const fan = ((seriesCount - 1) * SERIES_SPREAD) / 2;
  return Array.from({ length: axisCount }, (_unused, index) => {
    const direction = axisDirection(index, axisCount);
    const sideways = Math.abs(direction.x) * valueWidth;
    const upright = Math.abs(direction.y) * (valueLine + fan);
    return LABEL_GAP + Math.max(sideways, upright) + NAME_PAD;
  });
}

interface ValueLabelArgs {
  centerX: number;
  centerY: number;
  radius: number;
  axisCount: number;
  series: { color: string; normalized: (number | null)[] }[];
  /** Liefert den fertig formatierten Text — oder nichts, wenn keiner angezeigt wird. */
  text: (seriesIndex: number, axisIndex: number) => string;
}

export function valueLabels({
  centerX,
  centerY,
  radius,
  axisCount,
  series,
  text,
}: ValueLabelArgs): PlacedText[] {
  const labels: PlacedText[] = [];
  // Mittig um den Punkt auffächern, damit die Gruppe als Ganzes dort bleibt,
  // wo die Werte auch wirklich liegen.
  const fan = ((series.length - 1) * SERIES_SPREAD) / 2;

  for (let axis = 0; axis < axisCount; axis++) {
    const direction = axisDirection(axis, axisCount);
    const anchor = anchorFor(direction);

    /*
     * Die Fächerung folgt dem Wert, nicht der Reihenfolge der Serien. Auf
     * einer schrägen Achse liegt der größere Wert ohnehin schon weiter oben
     * (oder weiter unten); schöbe ihn die Fächerung dann in die Gegenrichtung,
     * höbe sie den Abstand genau auf — und beide Zahlen lägen übereinander.
     */
    const order = series
      .map((entry, index) => ({ index, value: entry.normalized[axis] ?? 0 }))
      .sort((a, b) => a.value - b.value)
      .map((entry) => entry.index);
    const outwardIsUp = direction.y <= 0;

    series.forEach((entry, index) => {
      const value = entry.normalized[axis];
      if (value === null || value === undefined) return;
      const content = text(index, axis);
      if (content === "") return;

      const pointRadius = (value / NORMALIZED_MAX) * radius;
      const rank = order.indexOf(index);
      const shift = (outwardIsUp ? -1 : 1) * (rank * SERIES_SPREAD - fan);
      const distance = pointRadius + LABEL_GAP;
      labels.push({
        x: centerX + direction.x * distance,
        y: centerY + direction.y * distance + shift,
        text: content,
        color: entry.color,
        ...anchor,
      });
    });
  }

  return labels;
}

interface AxisNameArgs {
  centerX: number;
  centerY: number;
  radius: number;
  names: string[];
  /** Je Achse, aus `axisNameGaps`. */
  gaps: number[];
  color: string;
}

export function axisNameLabels({
  centerX,
  centerY,
  radius,
  names,
  gaps,
  color,
}: AxisNameArgs): PlacedText[] {
  return names.map((name, index) => {
    const direction = axisDirection(index, names.length);
    const distance = radius + (gaps[index] ?? LABEL_GAP);
    return {
      x: centerX + direction.x * distance,
      y: centerY + direction.y * distance,
      text: name,
      color,
      ...anchorFor(direction),
    };
  });
}

/** Wie weit ein Label höchstens aus seiner Lage gerückt wird. */
const MAX_NUDGE = 14;
/** Wie oft die Entzerrung über alle Paare läuft. */
const NUDGE_PASSES = 4;

interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function boxOf(label: PlacedText, width: number, height: number): Box {
  const left =
    label.align === "left" ? label.x : label.align === "right" ? label.x - width : label.x - width / 2;
  const top =
    label.verticalAlign === "top"
      ? label.y
      : label.verticalAlign === "bottom"
        ? label.y - height
        : label.y - height / 2;
  return { left, right: left + width, top, bottom: top + height };
}

/**
 * Rückt übereinanderliegende Labels auseinander.
 *
 * Nahe dem Mittelpunkt laufen alle Achsen zusammen; dort treffen sich Zahlen
 * verschiedener Achsen, die die Auffächerung innerhalb einer Achse nicht
 * erreicht. Verschoben wird nur senkrecht und nur um wenige Pixel — weiter
 * entfernt stünde die Zahl nicht mehr erkennbar an ihrem Punkt.
 */
export function separateLabels(labels: PlacedText[], fontSize: number, lineHeight: number): PlacedText[] {
  const moved = labels.map((label) => ({ ...label }));
  const widths = moved.map((label) => textWidth(label.text, fontSize));
  const offsets = moved.map(() => 0);

  for (let pass = 0; pass < NUDGE_PASSES; pass++) {
    let touched = false;
    for (let a = 0; a < moved.length; a++) {
      for (let b = a + 1; b < moved.length; b++) {
        const first = boxOf(moved[a], widths[a], lineHeight);
        const second = boxOf(moved[b], widths[b], lineHeight);
        if (first.right <= second.left || second.right <= first.left) continue;
        if (first.bottom <= second.top || second.bottom <= first.top) continue;

        const overlap = Math.min(first.bottom - second.top, second.bottom - first.top) / 2 + 1;
        // Das obere Label wandert nach oben, das untere nach unten.
        const upper = first.top <= second.top ? a : b;
        const lower = upper === a ? b : a;
        const up = Math.min(overlap, MAX_NUDGE + offsets[upper]);
        const down = Math.min(overlap, MAX_NUDGE - offsets[lower]);
        if (up <= 0 && down <= 0) continue;

        moved[upper].y -= up;
        offsets[upper] -= up;
        moved[lower].y += down;
        offsets[lower] += down;
        touched = true;
      }
    }
    if (!touched) break;
  }

  return moved;
}
