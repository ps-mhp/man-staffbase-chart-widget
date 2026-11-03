# chart-widget

Staffbase-Custom-Widget für ein konfigurierbares **Radar-/Netzdiagramm**.
Entwickelt, gebaut und released wird es aus dem Meta-Repo
[`ps-mhp/man-staffbase-cms-extensions`](https://github.com/ps-mhp/man-staffbase-cms-extensions);
dieses Repo enthält nur Quellcode und das ausgelieferte Bundle unter `dist/`.

Redaktionsdokumentation (Übersicht, Schritt für Schritt, Einstellungen, FAQ)
liegt unter [`docs/`](docs/) und erscheint im Staffbase-Hilfebereich. Die
fachliche Spezifikation liegt im Meta-Repo unter
[`docs/superpowers/specs/2026-11-02-chart-widget-design.md`](https://github.com/ps-mhp/man-staffbase-cms-extensions/blob/main/docs/superpowers/specs/2026-11-02-chart-widget-design.md).

## Einbindung

Das Widget registriert den Web-Component-Tag `chart-widget` (siehe
`package.json#staffbase.element`) mit drei Attributen:

| Attribut | Typ | Beschreibung |
| --- | --- | --- |
| `chart` | `string` | Die komplette Diagrammdefinition, kodiert. Wird ausschließlich über den Diagramm-Editor im Konfigurationsdialog geschrieben (siehe `src/chart-model.ts`, `src/chart-editor/`). |
| `height` | `string \| number` | Höhe des Diagramms in Pixeln, 160–1200, Vorgabe 420 (`src/configuration-schema.ts`). |
| `allow-export` | `boolean` | Zeigt unter dem Diagramm zwei Knöpfe zum Herunterladen als SVG oder PNG. Vorgabe aus (`src/chart-export.ts`). |

Das Datenformat hinter `chart` ist `ChartSpec` aus `src/chart-model.ts` —
die einzige Schnittstelle, über die Daten ins Widget gelangen. Gelesen wird
es über `parseChartSpec`, das nie wirft und bei unlesbaren oder leeren Daten
auf eine leere, aber gültige Definition zurückfällt.

## Bild-Export (`src/chart-export.ts`)

Mit `allow-export` erscheinen zwei Knöpfe, „Als SVG“ und „Als PNG“. Der
Export läuft bewusst über **DOM-Serialisierung**
(`container.querySelector("svg")` + `XMLSerializer`), nicht über ECharts'
`renderToSVGString` — exportiert wird exakt das, was im Dokument steht,
inklusive allem selbst beigesteuerten Styling. Das Widget rendert deshalb
mit dem SVG-Renderer (siehe `use-echarts.ts`), genau damit dieser Weg
offensteht. `standaloneSvg` arbeitet auf einer Kopie (`cloneNode`) und
ergänzt, was beim Herauslösen sonst fehlt: Namensraum (`xmlns`, bei Bedarf
`xmlns:xlink`), Schriftfamilie an der Wurzel und eine deckende
Hintergrundfläche. Der PNG-Pfad (`svgToPngBlob`) geht über Canvas und lässt
sich nicht in jsdom testen — dafür prüft `scripts/smoke-chart.mjs` ihn in
einem echten Browser.

## Architektur: einen weiteren Diagrammtyp ergänzen

Das Widget ist für weitere Diagrammtypen vorbereitet, auch wenn aktuell nur
`"radar"` existiert (`CHART_TYPES` in `src/chart-model.ts`). Ein neuer Typ
braucht:

1. **Datenmodell** (`src/chart-model.ts`): `ChartType` um den Wert erweitern,
   `CHART_TYPES` ergänzen, bei Bedarf eine eigene `DisplayOptions`-Variante
   (wie `RadarDisplay`) für typspezifische Anzeigeeinstellungen anlegen.
2. **Lazy-Loading** (`src/echarts-modules.ts`): einen Eintrag in
   `TYPE_LOADERS`, der die benötigten ECharts-Module per `import()` mit
   `webpackExports`-Kommentar nachlädt und per `core.use([...])`
   registriert. Nur so bleibt das typweise Nachladen wirksam — ein
   gemeinsames `import("echarts/charts")` ohne Export-Liste würde sonst alle
   Diagrammtypen in denselben Chunk ziehen.

   Damit das wirklich etwas spart, muss webpack die ECharts-Grundlagen in
   einen gemeinsamen Chunk legen dürfen, statt sie jedem Typ beizulegen.
   `webpack.prod.ts` erlaubt das über `WIDGETS_WITH_LAZY_CHUNKS` gezielt für
   dieses Widget; repo-weit bleibt `splitChunks` aus. Ohne diese Ausnahme
   trägt jeder Typ rund 500 KiB Duplikat mit sich. Zur Einordnung: Mit
   gemeinsamem Chunk kostet der Radar-Typ selbst nur noch etwa 9 KiB.
3. **Options-Übersetzer** (`src/echarts-option/`): eine neue Datei analog zu
   `radar.ts`, die eine `NormalizedSpec` in eine ECharts-Option übersetzt, und
   ein Eintrag in `OPTION_BUILDERS` (`src/echarts-option/index.ts`) — dieses
   Record ist vollständig über `ChartType` getypt, ein vergessener Eintrag
   wird vom Compiler gemeldet. Alles typübergreifende Styling (Schrift,
   Farben, Legende, Tooltip) kommt aus `echartsTheme()`
   (`src/man-chart-theme.ts`) und wird im Übersetzer nicht wiederholt.
4. **Editor-UI** (`src/chart-editor/chart-editor.tsx`): bei Bedarf
   typspezifische Felder ergänzen, analog zu „Ringzahl“ und „Fläche füllen“
   beim Radar.

Die Normalisierung (`src/chart-normalize.ts`) rechnet alle Achsenwerte
unabhängig von ihrer Einheit auf eine gemeinsame Skala 0–100 und löst dabei
auch invertierte Achsen auf („kleiner ist besser“) — ECharts selbst kann keine
Achse umdrehen. Ein neuer Diagrammtyp, der dieselbe Achsenlogik braucht, kann
`normalizeSpec` direkt wiederverwenden.

## Entwicklung

```bash
git clone https://github.com/ps-mhp/man-staffbase-cms-extensions.git
cd man-staffbase-cms-extensions
npm install
scripts/sync.sh chart-widget
```

Der Quellcode liegt danach unter `src/widgets/chart-widget/`.

```bash
npm run build -- --env widget=chart-widget
npm test -- src/widgets/chart-widget
scripts/release.sh chart-widget
```

## Auslieferung

Das Bundle wird pro Versionstag über jsDelivr ausgeliefert:

```
https://cdn.jsdelivr.net/gh/ps-mhp/man-staffbase-chart-widget@<version>/dist/chart-widget.js
```
