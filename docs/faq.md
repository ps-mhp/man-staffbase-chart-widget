# FAQ

Jede Meldung, die das Diagramm anstelle der Grafik anzeigen kann, als Frage —
mit dem genauen Wortlaut, damit sie über die Suche auffindbar ist.

**Frage:** Ich sehe die Meldung „Noch kein Diagramm eingerichtet. Öffnen Sie
die Einstellungen des Bausteins.“

Antwort: Für diesen Baustein wurde noch keine Konfiguration gespeichert.
Widget-Einstellungen öffnen, den Diagramm-Editor ausfüllen und speichern.

**Frage:** Ich sehe die Meldung „Das Diagramm konnte nicht gelesen werden.
Bitte richten Sie es in den Einstellungen neu ein.“

Antwort: Die gespeicherten Daten sind beschädigt oder von Hand verändert
worden. Widget-Einstellungen öffnen und das Diagramm im Editor neu
einrichten — notfalls über eine neu eingefügte Tabelle.

**Frage:** Ich sehe die Meldung „Der Diagrammtyp „…“ ist dieser Version des
Bausteins nicht bekannt. Bitte aktualisieren Sie den Baustein.“ (bzw. ohne
genannten Typnamen: „Der eingerichtete Diagrammtyp ist dieser Version des
Bausteins nicht bekannt. Bitte aktualisieren Sie den Baustein.“)

Antwort: Das Diagramm wurde mit einer neueren Fassung des Bausteins
eingerichtet, die einen Diagrammtyp kennt, den diese Version noch nicht
unterstützt. Den Baustein auf die neueste Version aktualisieren.

**Frage:** Ich sehe die Meldung „Noch keine Daten im Diagramm. Legen Sie in
den Einstellungen Achsen und Serien an.“

Antwort: Es wurden weder Achsen noch Serien im Diagramm-Editor angelegt. Im
Editor eine Tabelle einfügen oder einen der beiden Knöpfe „Beispiel laden“
beziehungsweise „Leere Tabelle anlegen“ verwenden.

**Frage:** Nach dem Einfügen stehen meine Kennzahlen als Serien und meine
Varianten als Achsen — alles vertauscht.

Antwort: Unter dem Einfügefeld war die falsche Leserichtung gewählt. Auf die
andere Antwort bei „Wie steht Ihre Tabelle?“ umstellen und erneut auf
„Tabelle übernehmen“ klicken.

**Frage:** Meine Achsenbeschriftung ist so lang, dass sie das Diagramm
zusammendrückt.

Antwort: Im Feld der Achse an der gewünschten Stelle die Eingabetaste
drücken. Der Zeilenumbruch wird ins Diagramm übernommen.

**Frage:** Ich sehe die Meldung „Das Diagramm konnte nicht geladen werden.
Bitte laden Sie die Seite neu.“

Antwort: Die Diagrammbibliothek konnte nicht nachgeladen werden, meist durch
eine unterbrochene Internetverbindung. Seite neu laden; besteht das Problem
weiter, die Netzwerkverbindung prüfen.

**Frage:** Warum ist mein Diagramm leer, obwohl Daten eingetragen sind?

Antwort: Meist steht der Baustein in einer sehr schmalen Spalte oder in einem
eingeklappten Element, sodass der Container die Höhe 0 hat. Das Diagramm
bleibt dann dauerhaft leer, weil es keine Fläche zum Zeichnen hat. Den
Baustein in eine breitere Spalte verschieben bzw. das Element ausklappen.

**Frage:** Warum sehe ich bei zwei fast gleichen Werten einen großen
Unterschied im Diagramm?

Antwort: Ohne gesetztes Minimum und Maximum spannt sich jede Achse automatisch
zwischen dem kleinsten und größten vorkommenden Wert — dadurch wirken auch
kleine Unterschiede optisch groß. Abhilfe: Im Diagramm-Editor für die
betroffene Achse Minimum und Maximum von Hand setzen.

**Frage:** Warum liegt der schlechtere Wert weiter außen?

Antwort: Bei dieser Achse fehlt der Schalter „Kleiner ist besser“. Er muss bei
allen Kennzahlen gesetzt werden, bei denen ein kleinerer Wert das bessere
Ergebnis ist — etwa Gewicht, Verbrauch oder Ladezeit. Im Diagramm-Editor bei
der jeweiligen Achse einschalten.

**Frage:** Ich sehe keine Knöpfe zum Herunterladen unterhalb des Diagramms.

Antwort: Entweder ist „Download erlauben“ in den Einstellungen nicht
eingeschaltet, oder das Diagramm ist noch nicht fertig gezeichnet — die
Knöpfe erscheinen erst, sobald eine Grafik zum Herunterladen vorhanden ist.

**Frage:** Beim Klick auf „Als SVG“ oder „Als PNG“ erscheint „Der Export ist
fehlgeschlagen. Bitte versuchen Sie es erneut.“

Antwort: Der Export konnte das gezeichnete Diagramm nicht finden — meist, weil
es gerade neu lädt. Kurz warten und erneut klicken; besteht das Problem
weiter, die Seite neu laden.

**Frage:** Kann ich mehr als sechs Serien zeigen?

Antwort: Ja. Die MAN-Farbpalette hat sechs Farben; ab der siebten Serie
wiederholen sich die Farben. Die Serien bleiben trotzdem eindeutig
unterscheidbar, weil jeder Datenpunkt seinen Wert als Beschriftung trägt und
Name sowie Werte jeder Serie in Tooltip und Legende stehen.

**Frage:** Was passiert mit meinem Diagramm bei der automatischen
Übersetzung der Seite?

Antwort: Übersetzt werden Titel, Fußnote, Achsenbeschriftungen und
Seriennamen. Zahlen, Einheiten, Achsengrenzen, Farben und alle übrigen
Einstellungen bleiben unverändert erhalten.

**Frage:** Eine eingefügte Zahl ist plötzlich um den Faktor 1000 zu groß oder
zu klein.

Antwort: Der Diagramm-Editor liest Zahlen deutsch: Ein Punkt gilt als
Tausendertrennzeichen, ein Komma als Dezimaltrennzeichen. Aus `1.234` wird
also `1234` und nicht `1,234`. Wer eine Tabelle mit englischer Schreibweise
einfügt (Punkt als Dezimaltrennzeichen), muss die betroffenen Zahlen vor dem
Einfügen ins deutsche Format bringen, sonst wird z. B. „1.234“ (eintausend)
als „1,234“ (eins Komma zwei drei vier) gelesen. Stehen in einer Zahl sowohl
Punkt als auch Komma, gilt unabhängig von der Schreibweise das zuletzt
stehende Zeichen als Dezimaltrennzeichen — `1.234,5` und `1,234.5` ergeben
beide `1234,5`.
