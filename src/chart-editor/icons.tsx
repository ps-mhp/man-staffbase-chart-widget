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
 * Icons der Steuerleiste.
 *
 * Nach dem Muster von `src/widgets/table-widget/src/toolbar/icons.tsx`
 * nachgebaut, nicht importiert — das table-widget ist ein eigenes Repo.
 * Die Pfade sind wörtlich übernommen, sie sind MIT-frei im Repo und
 * stilistisch bereits auf die Editor-Oberfläche abgestimmt.
 *
 * `aria-hidden="true"` ist Absicht: Der Name des Knopfes kommt aus `title`
 * auf dem `<button>`; ein zusätzlich vorgelesenes SVG würde ihn verdoppeln.
 */

import * as React from "react";

export function IconSave(): React.JSX.Element {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M8 3v5h6V3" />
      <path d="M8 21v-6h8v6" />
    </svg>
  );
}

export function IconHelp(): React.JSX.Element {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.3" />
      <path d="M6 6.2c.2-1 1-1.6 2-1.6 1.1 0 2 .7 2 1.7 0 .9-.6 1.3-1.4 1.8-.6.4-.9.7-.9 1.4" />
      <circle cx="7.8" cy="11.4" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconClose(): React.JSX.Element {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}
