# Einstellungen

Alle Einstellungen stecken im **Diagramm-Editor**, der sich beim Öffnen der
Widget-Einstellungen von selbst im Vollbild öffnet. Im Staffbase-Dialog
dahinter steht nur noch das Feld **Diagramm** mit der technisch kodierten
Definition; es wird nie von Hand bearbeitet.

## Der Editor

Oben steht der Kopf, wie bei allen MAN-Widgets: Name und Titel links, in der
Mitte die Ansicht **Editor · Desktop · Tablet · Mobil**, rechts
**Rückgängig**, **Wiederholen**, **Hilfe**, **Abbrechen** und
**Übernehmen**. Daneben steht, was sich geändert hat – etwa „Diagrammtyp
geändert“ oder „Daten geändert“ – oder, warum sich der Stand noch nicht
übernehmen lässt.

Darunter zwei Bereiche:

- **Links das Datenraster** mit einer Leiste darüber.
- **Rechts das Panel „Diagramm“** mit vier Reitern: **Daten**,
  **Gestaltung**, **Achse** und **Verhalten**.

In den Ansichten Desktop, Tablet und Mobil tritt an die Stelle des Rasters
die Vorschau in Gerätebreite; das Panel rechts bleibt stehen, sodass jede
Einstellung gleich daneben wirkt.

„Übernehmen“ überträgt den Stand in den Staffbase-Dialog; dauerhaft
gespeichert wird er erst mit **Speichern** im Studio. Ohne Änderung bleibt
„Übernehmen“ aus.

| Taste | Wirkung |
| --- | --- |
| ⌘/Strg S | Übernehmen |
| ⌘/Strg ↵ | Übernehmen und schließen |
| ⌘/Strg Z, ⇧⌘/Strg Z | Rückgängig, Wiederholen (außerhalb von Textfeldern) |
| F1 | Hilfe |
| Esc | Schließen, mit Rückfrage bei offenen Änderungen |

## Datenraster

Jede **Zeile** ist eine **Achse** (eine Kennzahl, beim Kuchen ein Segment),
jede **Spalte** rechts eine **Reihe** (eine Variante; frühere Fassungen
sagten „Serie“). Im Kopf jeder Reihenspalte stehen Farbpunkt und Name.

| Spalte | Beschreibung |
| --- | --- |
| Nr. | Wählt die Achse. Ein Klick in irgendein Feld der Zeile tut dasselbe. |
| Achse | Name der Achse, wie er am Diagramm und in der Datentabelle erscheint. Die Eingabetaste erzeugt einen Zeilenumbruch, der auch im Diagramm steht. |
| Einheit | Wird an jede Zahl dieser Achse angehängt (Datenpunkt, Tooltip, Tabelle), z. B. „kWh“. Bei Balken und Linie trägt die gemeinsame Werteachse die Einheit nur, wenn **alle** Achsen mit Werten dieselbe Einheit tragen. |
| je Reihe | Die Werte, deutsch geschrieben: Komma vor den Nachkommastellen, Punkt zwischen den Tausendern. |

Beim Kuchendiagramm zeigt das Raster **nur die erste Reihe** – ein Hinweis
darunter sagt, dass weitere Reihen gespeichert bleiben, aber nicht
gezeichnet werden.

**Werte aus Excel:** Zellen in Excel kopieren, im Raster ein Feld wählen,
⌘ V (Strg V). Der Block landet ab diesem Feld; fehlende Achsen und Reihen
kommen dazu. Beim Kuchen füllt er nur die eine sichtbare Reihe.

## Leiste über dem Raster

| Element | Beschreibung |
| --- | --- |
| Achse 2 von 5 · Name | Die gewählte Achse. |
| ↑ ↓ | Verschiebt die gewählte Achse samt ihrer Werte. Beim Radar bestimmt die Reihenfolge den Platz im Kreis, beim Balken die Reihenfolge auf der Grundlinie. |
| Duplizieren | Setzt eine Kopie der Achse samt Werten und Einstellungen direkt dahinter. |
| Löschen | Entfernt die Achse samt ihrer Werte. Rückgängig mit ⌘/Strg Z. |
| + Achse | Hängt eine leere Achse an und setzt den Cursor in ihren Namen. |
| + Reihe | Hängt eine leere Reihe an. |
| Aus Excel einfügen | Öffnet rechts eine Leiste, um eine ganze Tabelle zu übernehmen (siehe unten). |
| Beispiel laden | Ersetzt die Daten durch ein Beispiel zum gewählten Typ. Höhe und Download bleiben. Rückgängig mit ⌘/Strg Z. |

## Aus Excel einfügen

| Einstellung | Beschreibung |
| --- | --- |
| Tabelle | Nimmt eine aus Excel, PowerPoint oder Word kopierte Tabelle auf. Erste Zeile und erste Spalte sind Überschriften. Erkennt Tabulator, Semikolon und Komma als Spaltentrenner. |
| Wie steht die Tabelle? | **Achsen in Zeilen** (voreingestellt): je Zeile eine Kennzahl, je Spalte eine Variante – wie im Raster. **Achsen in Spalten**: umgekehrt; die Tabelle wird beim Übernehmen gekippt. |
| Tabelle übernehmen | Ersetzt Achsen, Reihen und Werte. Gleichnamige Achsen und Reihen behalten Einheit, Grenzen, Richtung und Farbe. |

## Einstieg ohne Daten

Solange weder Achsen noch Reihen angelegt sind, erklärt das Raster die
Begriffe und bietet zwei Knöpfe an: **„Beispiel laden“** füllt ein zum
gewählten Typ passendes Beispiel ein (z. B. beim Radar den Vergleich MAN
eTGX gegen Mercedes-Benz eActros 600, beim Kuchen eine Flottenkosten-
Aufteilung), **„Leere Tabelle anlegen“** legt Achsen und Reihen zum
Ausfüllen an.

## Reiter „Daten“

Die Reihen als Liste; ein Klick klappt eine auf.

| Einstellung | Beschreibung |
| --- | --- |
| ← → | Verschiebt die Reihe. Die Reihenfolge bestimmt Palettenfarbe und Legende; beim Kuchen wird die vorderste gezeichnet. |
| Löschen | Entfernt die Reihe samt ihrer Werte. |
| Name | Wie er in Legende (außer beim Kuchen), Tooltip und Datentabelle erscheint. |
| Farbe | Überschreibt die Palettenfarbe für diese Reihe; „Palette“ nimmt die eigene Farbe zurück. Beim Kuchen nicht angeboten – dort färbt die Segmentfarbe je Achse. |
| + Reihe hinzufügen | Hängt eine leere Reihe an und klappt sie auf. |

## Reiter „Gestaltung“

| Einstellung | Beschreibung |
| --- | --- |
| Typ | **Netz**, **Balken**, **Linie** oder **Kuchen**. Der Satz darunter sagt, wofür der Typ taugt. |
| Titel | Überschrift über dem Diagramm. Leer: keine Überschrift. |
| Fußnote | Kleingedruckter Zusatztext, z. B. für Quellenangaben. |
| Legende | **Über**, **Unter** oder **Ausblenden**. Beim Kuchen listet die Legende die Achsen (Segmente), sonst die Reihen. |
| Abschnitt des Typs | Was nur der gewählte Typ kennt, siehe unten. |
| Höhe in px | Höhe des Diagramms auf der Seite, 160 bis 1200 Pixel, voreingestellt 420. Die Breite folgt immer der Spalte. Eine Höhe außerhalb dieser Grenzen lässt sich nicht übernehmen. |

| Typ | Einstellung | Beschreibung |
| --- | --- | --- |
| Netz | Hilfslinien | Anzahl der konzentrischen Ringe. Voreingestellt 5. Rein optisch. |
| Netz | Flächen füllen | Füllt die Fläche hinter jeder Linie halbtransparent in ihrer Farbe. Voreingestellt aus. |
| Balken | Richtung | **Senkrecht** (Kategorien unten) oder **Waagerecht** (Kategorien links). Voreingestellt senkrecht. |
| Balken | Gestapelt | Reihen übereinander statt nebeneinander. Voreingestellt aus. |
| Linie | Geglättet | Rundet den Verlauf, statt gerade zwischen den Werten zu ziehen. Voreingestellt aus. |
| Linie | Fläche füllen | Füllt die Fläche unter jeder Linie. Voreingestellt aus. |
| Linie | Punkte zeigen | Markiert jeden Wert. Voreingestellt an. |
| Kuchen | Innenradius in % | 0 ergibt einen Vollkreis, ein größerer Wert (z. B. 45) einen Ring. Voreingestellt 0. |
| Kuchen | Beschriftung der Segmente | **Prozent**, **Wert**, **Beides** oder **Keine**. Voreingestellt Prozent. |

Ein Typwechsel verliert keine **Daten**: Titel, Fußnote, Legende, Achsen und
Reihen bleiben, ebenso die Angaben an den Achsen. Die **Einstellungen des
Typs** gelten dagegen nur für ihn: Ein Diagramm führt immer nur einen Satz
davon mit, den des gerade gewählten Typs. Wer beim Netz Hilfslinien
einstellt, auf Balken umstellt, dort etwas ändert und zurückwechselt, findet
beim Netz wieder die Voreinstellungen.

## Reiter „Achse“

Die Feineinstellungen der im Raster gewählten Achse.

| Einstellung | Typ | Beschreibung |
| --- | --- | --- |
| Bezeichnung | alle | Der Name der Achse, mehrzeilig. |
| Einheit | alle | Wie im Raster. |
| Nachkommastellen | alle | Wie viele Nachkommastellen angezeigt werden. Leer: so viele, wie eingegeben wurden. |
| Minimum, Maximum | Netz | Grenzen der Achse. Leer: aus den Werten abgeleitet (ab null bis zum größten Wert). Das Maximum muss größer als das Minimum sein, sonst lässt sich der Stand nicht übernehmen. |
| Kleiner ist besser | Netz | Kehrt die Achse um: Der kleinere Wert liegt außen. Für Gewicht, Verbrauch, Ladezeit. |
| Segmentfarbe | Kuchen | Farbe des Segments dieser Achse; „Palette“ nimmt sie zurück. |

**Warum Minimum, Maximum und „Kleiner ist besser“ nur beim Netz
erscheinen:** Sie sind je Achse definiert und bei einer gemeinsamen
Werteachse – wie sie Balken und Linie zeichnen – nicht abbildbar. Beim
Kuchen gibt es überhaupt keine Achse. Ausgeblendete Werte bleiben
gespeichert und wirken wieder, sobald der Typ wieder gewählt wird.

## Reiter „Verhalten“

| Einstellung | Beschreibung |
| --- | --- |
| Download erlauben | Zeigt unter dem Diagramm zwei Knöpfe, „Als SVG“ und „Als PNG“. Die Datei enthält nur das Diagramm, nicht die Seite. Voreingestellt aus. |

Unten steht die Version des Widgets – wer einen Fehler meldet, findet sie
hier.

## Prüfung

„Übernehmen“ verweigert einen Stand, den die Seite nicht so zeigen könnte.
Der Kopf nennt den Grund, der Reiter trägt eine rote Marke, die betroffene
Achse ist im Raster markiert, und das Feld sagt, was zu tun ist.

| Meldung | Ursache |
| --- | --- |
| Achse „…“: Maximum zu klein | Beim Netz ist das Maximum nicht größer als das Minimum. |
| „…“: negativer Anteil im Kuchen | Ein Wert der ersten Reihe ist negativ; ein Kuchen zeigt nur Anteile ab null. |
| Höhe: erlaubt sind 160 bis 1200 Pixel | Die Höhe liegt außerhalb der Grenzen. |

## Bestehende Diagramme

Bis Version 0.3 standen **Höhe** und **Download erlauben** als eigene Felder
im Staffbase-Dialog. Diese Felder sind jetzt ausgeblendet; ihre Werte gelten
weiter, bis im Editor etwas anderes eingestellt wird. Beim Öffnen übernimmt
der Editor sie als Ausgangsstand – ein bestehendes Diagramm sieht nach dem
Öffnen und Übernehmen genauso aus wie vorher. Ließ sich der alte Haken nicht
lesen, sagt der Reiter „Verhalten“ das unter dem Schalter.

## Automatische Skalierung

**Beim Radar** tragen die Achsen keine sichtbare Zahlenskala – sie ist bei
mehreren Achsen unterschiedlicher Einheit nicht sinnvoll darstellbar. Ohne
eigene Angabe beginnt jede Achse stattdessen bei **null** und reicht bis zu
ihrem größten vorkommenden Wert. Die Länge eines Strahls verhält sich damit
wie der Wert selbst: Der halbe Weg nach außen ist auch die halbe Menge.

Kommen auf einer Achse negative Werte vor, beginnt sie beim kleinsten davon –
sonst läge der Punkt außerhalb des Netzes.

Wer die Unterschiede zwischen den Reihen stärker herausstellen möchte, setzt
Minimum und Maximum der betroffenen Achse von Hand – z. B. 400 und 600 statt
0 und 600. Das vergrößert die sichtbaren Abstände, lässt aber auch kleine,
in der Praxis unbedeutende Unterschiede groß wirken.

Ein von Hand gesetztes Minimum oder Maximum begrenzt auch die Zeichnung:
Ein Wert außerhalb dieser Grenzen wird genau auf dem Rand dargestellt, statt
über das Netz hinauszuragen. Die Zahl am Datenpunkt und in der Tabelle bleibt
dabei die eingegebene – die Grenze verändert nur das Bild, nie den Wert. Wer
also eine Achse auf 0 bis 600 festlegt und 700 einträgt, sieht den Punkt ganz
außen und die 700 daneben stehen.

**Bei Balken und Linie** zeichnet ECharts selbst eine Werteachse mit
sichtbarer Skala; sie verankert bei null und lässt sich nicht von Hand
begrenzen. **Beim Kuchen** gibt es keine Werteachse – jedes Segment zeigt
seinen Anteil am Ganzen. Ein negativer Wert ist dort kein
Darstellungsproblem, sondern ein Datenfehler: Der Editor lässt ihn nicht
übernehmen, und ein älteres Diagramm zeigt auf der Seite einen Hinweis auf
die betroffene Achse, statt einen verfälschten Kuchen zu zeichnen.
