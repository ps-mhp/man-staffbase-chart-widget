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
 * Zwei Eingaben, die `@man/config-ui` nicht mitbringt: eine Zahl im
 * deutschen Format und eine Farbe mit Rückweg zur Palette.
 */

import * as React from "react";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@man/config-ui/primitives/button";
import { Input } from "@man/config-ui/primitives/input";
import { cn } from "@man/config-ui/primitives/utils";

import { readNumber } from "./grid-import";

/** Zeigt eine Zahl im deutschen Format, ohne den Zahlenwert selbst zu runden. */
export function formatEditorNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value).replace(".", ",");
}

export interface NumberInputProps extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> {
  value: number | null | undefined;
  /** Bekommt die gelesene Zahl, `null` für ein leeres oder unlesbares Feld. */
  onCommit: (next: number | null) => void;
}

/**
 * Ein Zahlenfeld, das seinen Text selbst hält und nur die gelesene Zahl
 * meldet.
 *
 * Ohne eigenen Text würde „1,“ sofort zu „1“ und der Cursor spränge ans Ende
 * – eine Nachkommazahl ließe sich nicht in Ruhe tippen. Neu aus `value`
 * gesetzt wird der Text nur, wenn sich die Zahl *von außen* ändert (Einfügen,
 * Rückgängig), nicht nach der eigenen Meldung. Gelesen wird wie beim
 * Einfügen aus Excel (`readNumber`): dieselbe Art Zahl, ein Parser.
 */
export function NumberInput({ value, onCommit, className, ...props }: NumberInputProps): React.ReactElement {
  const [text, setText] = useState(() => formatEditorNumber(value));
  const [committed, setCommitted] = useState<number | null>(value ?? null);

  // Anpassen während des Renderns statt im Effekt („Adjusting state when a
  // prop changes“): nur eine Änderung von außen setzt den Text neu.
  if ((value ?? null) !== committed) {
    setCommitted(value ?? null);
    setText(formatEditorNumber(value));
  }

  return (
    <Input
      {...props}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      className={className}
      value={text}
      onChange={(event) => {
        const parsed = readNumber(event.target.value);
        setText(event.target.value);
        setCommitted(parsed);
        onCommit(parsed);
      }}
    />
  );
}

export interface ColorInputProps {
  /** Name für Screenreader, etwa „Farbe: Ist“. */
  label: string;
  /** Die gesetzte Farbe; ohne sie gilt `fallback` aus der Palette. */
  value: string | undefined;
  fallback: string;
  onChange: (color: string | undefined) => void;
  id?: string;
  "aria-describedby"?: string;
}

/**
 * Das native Farbfeld als Farbfeld-Knopf, daneben der Weg zurück zur
 * Palette. Ohne gesetzte Farbe zeigt es die Farbe, die das Diagramm
 * tatsächlich nimmt – nicht Schwarz.
 */
export function ColorInput({ label, value, fallback, onChange, id, ...aria }: ColorInputProps): React.ReactElement {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="color"
        aria-label={label}
        title={label}
        aria-describedby={aria["aria-describedby"]}
        value={value ?? fallback}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-10 w-14 shrink-0 cursor-pointer rounded-md border border-input bg-background p-1 outline-none",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        )}
      />
      <span className="min-w-0 flex-1 text-[13px] text-muted-foreground">{value === undefined ? "aus der Palette" : value}</span>
      {value !== undefined && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-10 px-3 text-[13px] font-semibold"
          aria-label={`${label}: Palette verwenden`}
          onClick={() => onChange(undefined)}
        >
          <RotateCcw aria-hidden />
          Palette
        </Button>
      )}
    </div>
  );
}
