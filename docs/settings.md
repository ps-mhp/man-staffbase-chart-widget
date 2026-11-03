# Einstellungen

Im Konfigurationsdialog gibt es technisch nur zwei Felder: **Diagramm** und
**Höhe in Pixeln**. „Diagramm“ wird nicht direkt bearbeitet — stattdessen
öffnet sich automatisch der **Diagramm-Editor**, in dem alle übrigen
Einstellungen stecken.

## Feld im Konfigurationsdialog

| Einstellung | Beschreibung |
| --- | --- |
| Diagramm | Enthält die komplette, technisch kodierte Diagrammdefinition. Wird ausschließlich über den Diagramm-Editor bearbeitet, nie von Hand. |
| Höhe in Pixeln | Höhe des Diagramms auf der Seite. Erlaubt sind 160 bis 1200 Pixel, voreingestellt sind 420. Die Breite richtet sich immer nach der Spalte. |
| Download erlauben | Zeigt unter dem Diagramm zwei Knöpfe zum Herunterladen als Bild. Die Datei enthält nur das Diagramm, nicht die Seite. Voreingestellt aus. |

## Diagrammtyp

Die Auswahl ganz oben im Editor bestimmt die Art des Diagramms. Zurzeit gibt
es nur **Netzdiagramm (Radar / Spinne)**; die Liste wächst mit jedem weiteren
unterstützten Typ. Die typabhängigen Einstellungen — bei Radar etwa die
Hilfslinien — erscheinen nur, solange der zugehörige Typ gewählt ist.

## Daten aus einer Tabelle übernehmen

| Einstellung | Beschreibung |
| --- | --- |
| Einfügefeld | Nimmt eine aus Excel, PowerPoint oder Word kopierte Tabelle auf. Erkennt Tabulator, Semikolon und Komma als Spaltentrenner. |
| Wie steht Ihre Tabelle? | Legt die Leserichtung fest. Voreingestellt „je Zeile eine Kennzahl, je Spalte eine Variante“ — so, wie die Tabelle auch im Raster darunter steht. Die andere Wahl kippt sie beim Übernehmen. |
| Tabelle übernehmen | Ersetzt Achsen, Serien und Werte. Gleichnamige Achsen und Serien behalten Einheit, Achsenrichtung und Farbe. |

## Einstieg ohne Daten

Solange weder Achsen noch Serien angelegt sind, erklärt der Editor die
Begriffe und bietet zwei Knöpfe an: **„Beispiel laden“** füllt einen
vollständigen Vergleich (MAN eTGX gegen Mercedes-Benz eActros 600) ein, den
man überschreibt; **„Leere Tabelle anlegen“** legt drei Achsen und zwei
Serien zum Ausfüllen an.

## Je Achse (eine Zeile im Raster)

| Einstellung | Beschreibung |
| --- | --- |
| Achse | Name der Achse, wie er am Diagramm und in der Datentabelle erscheint. Mehrzeilig: Die Eingabetaste erzeugt einen Zeilenumbruch, der auch im Diagramm steht. |
| Einheit | Wird an jede Zahl dieser Achse angehängt (Datenpunkt, Tooltip, Tabelle), z. B. „kWh“. |
| Richtung („kleiner ist besser“) | Kehrt die Achse um: Der kleinere Wert liegt dann weiter außen. Für Kennzahlen, bei denen weniger besser ist — Gewicht, Verbrauch, Ladezeit. |
| Nachkomma | Nur bei eingeschalteten **Feineinstellungen je Achse**: Wie viele Nachkommastellen angezeigt werden. Ohne Angabe wird die Zahl der tatsächlich eingegebenen Nachkommastellen übernommen. |
| Minimum | Nur bei eingeschalteten Feineinstellungen: Untere Grenze der Achse. Ohne Angabe beginnt die Achse bei null — bei negativen Werten beim kleinsten davon. |
| Maximum | Nur bei eingeschalteten Feineinstellungen: Obere Grenze der Achse. Ohne Angabe wird der größte vorkommende Wert dieser Achse verwendet. |
| ↑ ↓ ✕ | Verschiebt die Achse im Kreis beziehungsweise entfernt sie samt ihrer Werte. |

## Je Serie (eine Spalte im Raster)

| Einstellung | Beschreibung |
| --- | --- |
| Serienname | Name, wie er in Legende, Tooltip und Datentabelle erscheint. |
| Farbe | Überschreibt die automatisch zugewiesene Farbe aus der MAN-Palette für diese eine Serie. |
| ← → ✕ | Verschiebt die Serie — die Reihenfolge bestimmt Palettenfarbe und Legendenreihenfolge — beziehungsweise entfernt sie. |

## Titel, Legende und Darstellung

| Einstellung | Beschreibung |
| --- | --- |
| Titel | Überschrift über dem Diagramm. Bleibt das Feld leer, erscheint keine Überschrift. |
| Fußnote | Kleingedruckter Zusatztext unter dem Titel, z. B. für Quellenangaben. |
| Legende | „über dem Diagramm“, „unter dem Diagramm“ oder „ausblenden“. |
| Hilfslinien im Netz | Nur beim Radar: Anzahl der konzentrischen Hilfsringe. Voreingestellt sind 5. Rein optisch, ändert keine Werte. |
| Flächen füllen | Nur beim Radar: Füllt die Fläche hinter jeder Serienlinie halbtransparent in deren Farbe. Voreingestellt aus. |

## Automatische Skalierung

Die Achsen tragen keine sichtbare Zahlenskala — sie ist bei mehreren Achsen
unterschiedlicher Einheit nicht sinnvoll darstellbar. Ohne eigene Angabe
beginnt jede Achse stattdessen bei **null** und reicht bis zu ihrem größten
vorkommenden Wert. Die Länge eines Strahls verhält sich damit wie der Wert
selbst: Der halbe Weg nach außen ist auch die halbe Menge.

Kommen auf einer Achse negative Werte vor, beginnt sie beim kleinsten davon —
sonst läge der Punkt außerhalb des Netzes.

Wer die Unterschiede zwischen den Serien stärker herausstellen möchte, setzt
Minimum und Maximum der betroffenen Achse von Hand — z. B. 400 und 600 statt
0 und 600. Das vergrößert die sichtbaren Abstände, lässt aber auch kleine,
in der Praxis unbedeutende Unterschiede groß wirken.

Ein von Hand gesetztes Minimum oder Maximum begrenzt auch die Zeichnung:
Ein Wert außerhalb dieser Grenzen wird genau auf dem Rand dargestellt, statt
über das Netz hinauszuragen. Die Zahl am Datenpunkt und in der Tabelle bleibt
dabei die eingegebene — die Grenze verändert nur das Bild, nie den Wert. Wer
also eine Achse auf 0 bis 600 festlegt und 700 einträgt, sieht den Punkt ganz
außen und die 700 daneben stehen.
