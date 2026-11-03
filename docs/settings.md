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

## Kopf des Diagramm-Editors

| Einstellung | Beschreibung |
| --- | --- |
| Titel | Überschrift über dem Diagramm. Bleibt das Feld leer, erscheint keine Überschrift. |
| Fußnote | Kleingedruckter Zusatztext unter dem Titel, z. B. für Quellenangaben. |
| Legende anzeigen | Blendet die Legende mit den Seriennamen ein oder aus. |
| Legendenposition | „oben“ oder „unten“ — wo die Legende relativ zum Diagramm steht. |
| Ringzahl | Nur beim Radar: Anzahl der konzentrischen Hilfsringe im Netz. Voreingestellt sind 5. Rein optisch, ändert keine Werte. |
| Fläche füllen | Nur beim Radar: Füllt die Fläche hinter jeder Serienlinie halbtransparent in deren Farbe. Voreingestellt aus. |

## Je Kategorie (Achse)

| Einstellung | Beschreibung |
| --- | --- |
| Beschriftung | Name der Achse, wie er am Diagramm und in der Datentabelle erscheint. |
| Einheit | Wird an jede Zahl dieser Achse angehängt (Datenpunkt, Tooltip, Tabelle), z. B. „kWh“. |
| Nachkommastellen | Wie viele Nachkommastellen angezeigt werden. Ohne Angabe wird die Zahl der tatsächlich eingegebenen Nachkommastellen übernommen. |
| Minimum | Untere Grenze der Achse. Ohne Angabe wird der kleinste vorkommende Wert dieser Achse verwendet. |
| Maximum | Obere Grenze der Achse. Ohne Angabe wird der größte vorkommende Wert dieser Achse verwendet. |
| Kleiner ist besser | Kehrt die Achse um: Der kleinere Wert liegt dann weiter außen. Für Kennzahlen, bei denen weniger besser ist — Gewicht, Verbrauch, Ladezeit. |

## Je Serie

| Einstellung | Beschreibung |
| --- | --- |
| Serienname | Name, wie er in Legende, Tooltip und Datentabelle erscheint. |
| Farbe | Überschreibt die automatisch zugewiesene Farbe aus der MAN-Palette für diese eine Serie. |

## Automatische Skalierung

Die Achsen tragen keine sichtbare Zahlenskala — sie ist bei mehreren Achsen
unterschiedlicher Einheit nicht sinnvoll darstellbar. Ohne gesetztes Minimum
und Maximum spannt sich jede Achse stattdessen automatisch zwischen dem
kleinsten und größten Wert, der auf ihr vorkommt. Das macht Unterschiede
zwischen den Serien deutlich sichtbar, kann aber auch kleine, in der Praxis
unbedeutende Unterschiede optisch groß wirken lassen. Wer das nicht möchte,
setzt Minimum und Maximum der betroffenen Achse von Hand — z. B. 0 und 600
für eine Reichweite, statt sie zwischen den kleinsten und größten
vorkommenden Wert zu spannen.

Ein von Hand gesetztes Minimum oder Maximum begrenzt auch die Zeichnung:
Ein Wert außerhalb dieser Grenzen wird genau auf dem Rand dargestellt, statt
über das Netz hinauszuragen. Die Zahl am Datenpunkt und in der Tabelle bleibt
dabei die eingegebene — die Grenze verändert nur das Bild, nie den Wert. Wer
also eine Achse auf 0 bis 600 festlegt und 700 einträgt, sieht den Punkt ganz
außen und die 700 daneben stehen.
