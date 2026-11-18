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

Antwort: Es wurden weder Achsen noch Reihen im Diagramm-Editor angelegt. Im
Editor über „Aus Excel einfügen“ eine Tabelle übernehmen oder einen der
beiden Knöpfe „Beispiel laden“ beziehungsweise „Leere Tabelle anlegen“
verwenden.

**Frage:** Nach dem Einfügen stehen meine Kennzahlen als Reihen und meine
Varianten als Achsen — alles vertauscht.

Antwort: In der Leiste „Aus Excel einfügen“ war die falsche Leserichtung
gewählt. Bei „Wie steht die Tabelle?“ auf die andere Wahl umstellen und
erneut auf „Tabelle übernehmen“ klicken.

**Frage:** Meine Achsenbeschriftung ist so lang, dass sie das Diagramm
zusammendrückt.

Antwort: Im Namen der Achse – im Raster oder unter „Achse“ bei
„Bezeichnung“ – an der gewünschten Stelle die Eingabetaste drücken. Der
Zeilenumbruch wird ins Diagramm übernommen.

**Frage:** Ich sehe die Meldung „„…“ hat einen negativen Wert. Ein
Kuchendiagramm kann keine negativen Anteile darstellen.“ (bzw. ohne genannte
Kategorie: „Ein Kuchendiagramm kann keine negativen Anteile darstellen.“)

Antwort: Ein Kuchendiagramm zeigt die Aufteilung eines Ganzen; ein negativer
Anteil hat darin keine Entsprechung. Die genannte Kategorie im
Diagramm-Editor auf einen Wert ab null korrigieren — oder auf
**Balken** umstellen, das negative Werte darstellen kann. Der Editor lässt
einen negativen Anteil im Kuchen gar nicht erst übernehmen; die Meldung
kann nur ein Diagramm aus einer älteren Fassung zeigen.

Der Hinweis blockiert absichtlich die ganze Grafik, statt nur das negative
Segment wegzulassen: Ein Kuchen verteilt die verbleibenden Werte auf den
vollen Kreis, es stünde also ein vollständig wirkendes Diagramm mit
stillschweigend erhöhten Prozentwerten da.

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

Antwort: Ohne gesetztes Maximum reicht jede Achse bis zum größten Wert, der
auf ihr vorkommt. Liegen zwei Werte dicht beieinander, aber weit von null
entfernt, nutzt der obere Teil der Achse die ganze Strecke — der Unterschied
wirkt dadurch größer, als er ist. Abhilfe: Im Diagramm-Editor die
betroffene Achse wählen und unter „Achse“ Minimum und Maximum von Hand
setzen.

**Frage:** Warum liegt der schlechtere Wert weiter außen?

Antwort: Bei dieser Achse fehlt der Schalter „Kleiner ist besser“. Er muss bei
allen Kennzahlen gesetzt werden, bei denen ein kleinerer Wert das bessere
Ergebnis ist — etwa Gewicht, Verbrauch oder Ladezeit. Im Diagramm-Editor die
Achse wählen und unter „Achse“ einschalten.

**Frage:** Ich sehe keine Knöpfe zum Herunterladen unterhalb des Diagramms.

Antwort: Entweder ist „Download erlauben“ im Diagramm-Editor unter
„Verhalten“ nicht eingeschaltet, oder das Diagramm ist noch nicht fertig gezeichnet — die
Knöpfe erscheinen erst, sobald eine Grafik zum Herunterladen vorhanden ist.

**Frage:** Beim Klick auf „Als SVG“ oder „Als PNG“ erscheint „Der Export ist
fehlgeschlagen. Bitte versuchen Sie es erneut.“

Antwort: Der Export konnte das gezeichnete Diagramm nicht finden — meist, weil
es gerade neu lädt. Kurz warten und erneut klicken; besteht das Problem
weiter, die Seite neu laden.

**Frage:** Kann ich mehr als sechs Reihen zeigen?

Antwort: Ja. Die MAN-Farbpalette hat sechs Farben; ab der siebten Reihe
wiederholen sich die Farben. Die Reihen bleiben trotzdem eindeutig
unterscheidbar, weil jeder Datenpunkt seinen Wert als Beschriftung trägt und
Name sowie Werte jeder Reihe in Tooltip und Legende stehen. Unter „Daten“
lässt sich jeder Reihe auch eine eigene Farbe geben.

**Frage:** Was passiert mit meinem Diagramm bei der automatischen
Übersetzung der Seite?

Antwort: Übersetzt werden Titel, Fußnote, Achsenbeschriftungen und
Seriennamen. Zahlen, Einheiten, Achsengrenzen, Farben und alle übrigen
Einstellungen bleiben unverändert erhalten.

**Frage:** Eine eingefügte Zahl ist plötzlich um den Faktor 1000 zu groß oder
zu klein.

Antwort: Der Diagramm-Editor liest Zahlen deutsch – beim Tippen, beim
Einfügen ins Raster und bei „Aus Excel einfügen“: Ein Punkt gilt als
Tausendertrennzeichen, ein Komma als Dezimaltrennzeichen. Aus `1.234` wird
also `1234` und nicht `1,234`. Wer eine Tabelle mit englischer Schreibweise
einfügt (Punkt als Dezimaltrennzeichen), muss die betroffenen Zahlen vor dem
Einfügen ins deutsche Format bringen, sonst wird z. B. „1.234“ (eintausend)
als „1,234“ (eins Komma zwei drei vier) gelesen. Stehen in einer Zahl sowohl
Punkt als auch Komma, gilt unabhängig von der Schreibweise das zuletzt
stehende Zeichen als Dezimaltrennzeichen — `1.234,5` und `1,234.5` ergeben
beide `1234,5`.

**Frage:** Wo sind die Felder „Höhe in Pixeln“ und „Download erlauben“ im
Staffbase-Dialog geblieben?

Antwort: Beide stehen jetzt im Diagramm-Editor: die Höhe unter
„Gestaltung“, der Download unter „Verhalten“. Die alten Felder sind
ausgeblendet. Ältere Diagramme behalten ihre Werte; der Editor übernimmt sie
beim Öffnen, und ohne Änderung bleibt das Diagramm auf der Seite, wie es war.

**Frage:** „Übernehmen“ tut nichts, oben steht „Achse „…“: Maximum zu klein“.

Antwort: Beim Netz ist für diese Achse ein Maximum eingetragen, das nicht
größer als das Minimum ist. Die Achse ist im Raster markiert; unter „Achse“
das Maximum erhöhen oder das Feld leeren – leer heißt „aus den Werten
abgeleitet“.
