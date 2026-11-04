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

## Der Editor-Dialog

Oben steht eine Steuerleiste mit **Speichern**, **Hilfe** und **Schließen**;
sie bleibt beim Scrollen stehen, damit Speichern auch bei einem langen
Datenraster erreichbar bleibt. Solange der Entwurf vom gespeicherten Stand
abweicht, steht daneben „Ungespeicherte Änderungen“. Der Hilfe-Knopf öffnet
einen Schieber mit denselben Erklärungen wie auf dieser Seite, direkt im
Dialog; er schließt über den Knopf oder die Taste „Escape“.

Ist der Dialog schmal, wandert die Vorschau unter das Eingaberaster, und
unterhalb von rund 700 Pixeln Containerbreite wird aus dem Raster eine Karte
je Achse. Der Dialog scrollt dabei nie waagerecht.

## Diagrammtyp

Die Auswahl ganz oben im Editor bestimmt die Art des Diagramms:

| Typ | Taugt für |
| --- | --- |
| Netzdiagramm (Radar / Spinne) | Vergleich weniger Varianten über mehrere Kennwerte mit möglicherweise unterschiedlichen Einheiten. |
| Balkendiagramm (Säulen) | Vergleich von Werten über wenige Kategorien mit gemeinsamer Einheit. |
| Liniendiagramm (Verlauf) | Entwicklung über eine geordnete Reihe, z. B. Jahre. |
| Kuchendiagramm (Torte / Ring) | Aufteilung eines Ganzen in Segmente; zeichnet nur die erste Serie. |

Ein Typwechsel verliert keine **Daten**: Titel, Fußnote, Legende, Achsen und
Serien bleiben erhalten. Das gilt auch für die Angaben, die an einer Achse
hängen — Minimum, Maximum, „kleiner ist besser" und die Segmentfarbe. Sie
werden beim fremden Typ nur ausgeblendet und wirken wieder, sobald der
zugehörige Typ erneut gewählt wird.

Die **Anzeigeeinstellungen** eines Typs überleben einen Wechsel dagegen
nicht. Wer beim Netzdiagramm „Hilfslinien im Netz" und „Flächen füllen"
eingestellt hat, auf Balken umstellt und speichert, findet beim nächsten
Wechsel zurück wieder die Voreinstellungen vor. Dasselbe gilt für Stapeln
und Richtung beim Balken, für Glätten, Fläche und Punkte bei der Linie
sowie für Innenradius und Segmentbeschriftung beim Kuchen. Ein Diagramm
führt immer nur einen Satz Anzeigeeinstellungen mit sich, nämlich den des
gerade eingestellten Typs.

## Welche Felder bei welchem Typ erscheinen

| Feld | Radar | Balken | Linie | Kuchen |
| --- | :-: | :-: | :-: | :-: |
| Einheit, Nachkommastellen | ✓ | ✓ | ✓ | ✓ |
| Minimum, Maximum | ✓ | – | – | – |
| Richtung („kleiner ist besser“) | ✓ | – | – | – |
| Farbe je Achse (Segmentfarbe) | – | – | – | ✓ |
| Serienspalten im Raster | alle | alle | alle | nur die erste |

**Warum Minimum, Maximum und „kleiner ist besser“ nur beim Radar
erscheinen:** Sie sind je Achse definiert und bei einer gemeinsamen
Werteachse — wie sie Balken und Linie zeichnen — nicht abbildbar. Bei Kuchen
gibt es überhaupt keine Achse. „Kleiner ist besser“ ist außerdem eine
Radar-Idee: Bei einer echten Werteachse dreht man keine Achse um, sondern
sortiert oder beschriftet.

## Daten aus einer Tabelle übernehmen

| Einstellung | Beschreibung |
| --- | --- |
| Einfügefeld | Nimmt eine aus Excel, PowerPoint oder Word kopierte Tabelle auf. Erkennt Tabulator, Semikolon und Komma als Spaltentrenner. |
| Wie steht Ihre Tabelle? | Legt die Leserichtung fest. Voreingestellt „je Zeile eine Kennzahl, je Spalte eine Variante“ — so, wie die Tabelle auch im Raster darunter steht. Die andere Wahl kippt sie beim Übernehmen. |
| Tabelle übernehmen | Ersetzt Achsen, Serien und Werte. Gleichnamige Achsen und Serien behalten Einheit, Achsenrichtung und Farbe. |

Das Einfügen aus Excel ist typneutral und funktioniert bei allen vier Typen
gleich.

## Einstieg ohne Daten

Solange weder Achsen noch Serien angelegt sind, erklärt der Editor die
Begriffe und bietet zwei Knöpfe an: **„Beispiel laden“** füllt ein zum
gewählten Typ passendes Beispiel ein (z. B. beim Radar den Vergleich MAN
eTGX gegen Mercedes-Benz eActros 600, beim Kuchen eine Flottenkosten-
Aufteilung), den man überschreibt; **„Leere Tabelle anlegen“** legt Achsen
und Serien zum Ausfüllen an.

## Je Achse (eine Zeile im Raster)

| Einstellung | Beschreibung |
| --- | --- |
| Achse | Name der Achse, wie er am Diagramm und in der Datentabelle erscheint. Mehrzeilig: Die Eingabetaste erzeugt einen Zeilenumbruch, der auch im Diagramm steht. |
| Einheit | Wird an jede Zahl dieser Achse angehängt (Datenpunkt, Tooltip, Tabelle), z. B. „kWh“. Bei Balken und Linie trägt die gemeinsame Werteachse die Einheit nur, wenn **alle** Achsen mit Werten dieselbe Einheit tragen. |
| Richtung („kleiner ist besser“) | Nur beim Radar. Kehrt die Achse um: Der kleinere Wert liegt dann weiter außen. Für Kennzahlen, bei denen weniger besser ist — Gewicht, Verbrauch, Ladezeit. |
| Farbe | Nur beim Kuchen. Legt die Farbe des zugehörigen Segments fest und überschreibt dafür die automatisch zugewiesene Palettenfarbe. |
| Nachkomma | Nur bei eingeschalteten **Feineinstellungen je Achse**: Wie viele Nachkommastellen angezeigt werden. Ohne Angabe wird die Zahl der tatsächlich eingegebenen Nachkommastellen übernommen. |
| Minimum | Nur beim Radar, bei eingeschalteten Feineinstellungen: Untere Grenze der Achse. Ohne Angabe beginnt die Achse bei null — bei negativen Werten beim kleinsten davon. |
| Maximum | Nur beim Radar, bei eingeschalteten Feineinstellungen: Obere Grenze der Achse. Ohne Angabe wird der größte vorkommende Wert dieser Achse verwendet. |
| ↑ ↓ ✕ | Verschiebt die Achse beziehungsweise entfernt sie samt ihrer Werte. |

## Je Serie (eine Spalte im Raster)

Beim Kuchendiagramm zeigt das Raster **nur die erste Serienspalte** — ein
Hinweis darunter macht deutlich, dass weitere Serien gespeichert bleiben und
nicht gezeichnet werden.

| Einstellung | Beschreibung |
| --- | --- |
| Serienname | Name, wie er in Legende (außer bei Kuchen, siehe unten), Tooltip und Datentabelle erscheint. |
| Farbe | Überschreibt die automatisch zugewiesene Farbe aus der MAN-Palette für diese eine Serie. Bei Kuchen ohne Wirkung — dort färbt die Farbe je Achse (siehe oben). |
| ← → ✕ | Verschiebt die Serie — die Reihenfolge bestimmt Palettenfarbe und Legendenreihenfolge — beziehungsweise entfernt sie. |

## Titel, Legende und Darstellung

| Einstellung | Beschreibung |
| --- | --- |
| Titel | Überschrift über dem Diagramm. Bleibt das Feld leer, erscheint keine Überschrift. |
| Fußnote | Kleingedruckter Zusatztext unter dem Titel, z. B. für Quellenangaben. |
| Legende | „über dem Diagramm“, „unter dem Diagramm“ oder „ausblenden“. Bei Kuchen listet die Legende die Achsen (Segmente), bei den übrigen Typen die Serien. |

### Anzeigeoptionen je Typ

| Typ | Felder | Beschreibung |
| --- | --- | --- |
| Radar | Hilfslinien im Netz | Anzahl der konzentrischen Hilfsringe. Voreingestellt 5. Rein optisch, ändert keine Werte. |
| Radar | Flächen füllen | Füllt die Fläche hinter jeder Serienlinie halbtransparent in deren Farbe. Voreingestellt aus. |
| Balken | Stapeln | Zeichnet Serien übereinander statt nebeneinander. Voreingestellt aus. |
| Balken | Richtung | „stehend“ (Kategorien unten) oder „liegend“ (Kategorien links). Voreingestellt stehend. |
| Linie | Linien glätten | Rundet den Linienverlauf statt ihn gerade zwischen den Stützstellen zu ziehen. Voreingestellt aus. |
| Linie | Fläche füllen | Füllt die Fläche unter der Linie in ihrer Farbe. Voreingestellt aus. |
| Linie | Punkte zeigen | Zeigt einen Punkt an jeder Stützstelle. Voreingestellt an. |
| Kuchen | Innenradius | Anteil des Lochs am Kuchen in Prozent. 0 ergibt einen Vollkreis, ein größerer Wert (z. B. 45) einen Ring/Donut. Voreingestellt 0. |
| Kuchen | Segmentbeschriftung | „Anteil in Prozent“, „Absolutwert“, „beides“ oder „ausblenden“. Voreingestellt „Anteil in Prozent“. |

## Automatische Skalierung

**Beim Radar** tragen die Achsen keine sichtbare Zahlenskala — sie ist bei
mehreren Achsen unterschiedlicher Einheit nicht sinnvoll darstellbar. Ohne
eigene Angabe beginnt jede Achse stattdessen bei **null** und reicht bis zu
ihrem größten vorkommenden Wert. Die Länge eines Strahls verhält sich damit
wie der Wert selbst: Der halbe Weg nach außen ist auch die halbe Menge.

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

**Bei Balken und Linie** zeichnet ECharts selbst eine Werteachse mit
sichtbarer Skala; sie verankert bei null und lässt sich nicht von Hand
begrenzen. **Beim Kuchen** gibt es keine Werteachse — jedes Segment zeigt
seinen Anteil am Ganzen. Ein negativer Wert ist dort kein
Darstellungsproblem, sondern ein Datenfehler: Das Diagramm zeigt dann einen
Hinweis auf die betroffene Achse, statt einen verfälschten Kuchen zu
zeichnen.
