# Diagramm

Das Diagramm-Widget stellt Kennzahlen in vier Typen dar — **Netzdiagramm
(Radar), Balken, Linie und Kuchen**. Eingerichtet wird jeder Typ über
denselben Editor, der sich direkt in den Widget-Einstellungen öffnet; eine
aus Excel kopierte Tabelle lässt sich dort mit einem Klick übernehmen, siehe
[Schritt für Schritt](usage.md).

## Die vier Typen

**Netzdiagramm (Radar / Spinne).** Mehrere Achsen strahlen sternförmig aus
einem Mittelpunkt, und jede Serie — zum Beispiel ein Fahrzeug im Vergleich —
verbindet ihre Werte auf diesen Achsen zu einer Fläche. So lassen sich
mehrere Kennzahlen mehrerer Serien auf einen Blick vergleichen, auch wenn sie
in ganz unterschiedlichen Einheiten gemessen werden — Kilometer, Tonnen,
Minuten, Kilowatt. Nur beim Radar gibt es Minimum, Maximum und den Schalter
„kleiner ist besser“ je Achse, dazu die Anzeigeoptionen Hilfslinien im Netz
und Flächen füllen.

**Balkendiagramm (Säulen).** Vergleicht Werte über wenige Kategorien hinweg.
Alle Balken teilen sich eine gemeinsame Werteachse, die ECharts selbst
berechnet und beschriftet — anders als beim Radar ist diese Achse deshalb
nur sinnvoll, wenn alle Kategorien dieselbe Einheit tragen. Als
Anzeigeoptionen stehen Stapeln (Serien übereinander statt nebeneinander) und
die Richtung (stehend oder liegend) zur Verfügung.

**Liniendiagramm (Verlauf).** Zeigt eine Entwicklung über eine geordnete
Reihe hinweg, etwa über Baujahre. Die Reihenfolge der Achsen im Raster ist
die Reihenfolge auf der Linie. Anzeigeoptionen: Linien glätten, Fläche unter
der Linie füllen, Punkte an den Stützstellen zeigen.

**Kuchendiagramm (Torte / Ring).** Zeigt die Aufteilung eines Ganzen:
Segmente sind die Achsen (Kategorien), ihre Werte ergeben die Segmentgrößen.
**Es wird ausschließlich die erste Serie gezeichnet** — weitere Serien
bleiben gespeichert und erscheinen wieder, sobald zu einem anderen Typ
gewechselt wird; der Editor weist darauf eigens hin. Jede Kategorie kann eine
eigene Segmentfarbe erhalten. Anzeigeoptionen: Innenradius (0 ergibt den
Vollkreis, ein größerer Wert einen Ring/Donut) und die Segmentbeschriftung
(Anteil in Prozent, Absolutwert, beides oder ausgeblendet). Negative Werte
sind bei `pie` kein Darstellungsproblem, sondern ein Datenfehler — das
Diagramm zeigt dann einen Hinweis statt eines verfälschten Kuchens.

Ein Wechsel des Diagrammtyps im Editor verliert keine Daten: Titel, Fußnote,
Legende, Achsen und Serien bleiben erhalten, auch die Werte typspezifischer
Felder — sie wirken nur nicht, solange ein anderer Typ gewählt ist.

## Was Leser:innen sehen

- Das Diagramm selbst, mit beliebig vielen Achsen und Serien.
- Die Werte stehen direkt am Diagramm (bei `pie` je nach Einstellung als
  Anteil, Absolutwert oder beides), zusätzlich erscheint beim Überfahren
  eines Punkts oder Segments ein Tooltip mit den zugehörigen Werten.
- Eine Legende oberhalb oder unterhalb des Diagramms, je nach Einstellung.
  Bei `pie` listet die Legende die Kategorien (Segmente), bei den übrigen
  Typen die Serien.
- Optional ein Titel und eine Fußnote.
- Ist der Download erlaubt (siehe [Einstellungen](settings.md)), zwei Knöpfe
  unterhalb des Diagramms zum Herunterladen als Bild.
- Für Screenreader zusätzlich eine vollständige Datentabelle unterhalb des
  Diagramms. Sie ist optisch verborgen, aber vorhanden — das Diagramm ist
  damit auch ohne visuelle Wahrnehmung nutzbar.

## Bild-Export

Mit eingeschaltetem Download erscheinen unterhalb des Diagramms zwei Knöpfe,
„Als SVG“ und „Als PNG“. Die heruntergeladene Datei enthält **nur das
Diagramm**, nicht die übrige Seite — Titel, Legende, Achsen und Werte
genauso, wie sie gerade angezeigt werden, mit weißem Hintergrund (auch wenn
die Seite selbst durchsichtig oder dunkel hinterlegt ist). Das SVG lässt sich
verlustfrei vergrößern, das PNG eignet sich für Stellen, die kein SVG
einbinden können (z. B. die meisten Präsentationsprogramme) und wird in
doppelter Auflösung erzeugt. Der Export funktioniert bei allen vier Typen
gleich — er arbeitet am gezeichneten Bild und kennt den Diagrammtyp nicht.

## Übersetzung

Bei der automatischen Seitenübersetzung macht das Diagramm mit. Übersetzt
werden Titel, Fußnote, Achsenbeschriftungen und Seriennamen — genau die
Texte, die redaktionell eingetragen wurden. Zahlen, Einheiten, Achsengrenzen,
Farben und alle übrigen Einstellungen bleiben unverändert, weil sie keine
Sprache haben: Eine übersetzte Einheit wäre falsch („t“ wird nicht zu „ton“),
eine übersetzte Zahl wäre Unsinn.

## Was Sie im CMS-Editor sehen

Beim Einfügen des Bausteins öffnet sich automatisch der **Diagramm-Editor**
mit einer Steuerleiste oben (Speichern, Hilfe, Schließen) statt einer
Fußzeile — so bleibt Speichern auch bei einem langen Datenraster erreichbar,
weil die Leiste beim Scrollen stehen bleibt. Oben die Wahl des Diagrammtyps
und ein Feld, in das eine aus Excel kopierte Tabelle eingefügt wird, darunter
ein Raster mit **einer Zeile je Achse** und **einer Spalte je Serie**
(bei `pie` nur eine Serienspalte), daneben eine Live-Vorschau, die genau
zeigt, wie das Diagramm später auf der Seite erscheint. Solange noch nichts
angelegt ist, erklärt der Editor die Begriffe und bietet „Beispiel laden“
sowie „Leere Tabelle anlegen“ an — je nach gewähltem Typ mit einem anderen,
dazu passenden Beispiel. Das Textfeld dahinter zeigt nur die technisch
gespeicherte, kodierte Form der Daten und wird nie von Hand bearbeitet.

Ist der Dialog schmal (z. B. auf kleinen Bildschirmen), wandert die
Vorschau unter das Raster und — unterhalb von rund 700 Pixeln Breite — wird
aus dem Raster eine Abfolge von Karten, eine je Achse. Der Dialog scrollt
dabei nie waagerecht.

Eine wichtige Besonderheit beim Radar: Seine Achsen tragen **keine sichtbare
Zahlenskala**. Mehrere Achsen mit unterschiedlichen Einheiten (z. B.
Kilometer und Minuten) lassen sich nicht sinnvoll auf einer gemeinsamen Skala
abbilden. Jede Achse wird deshalb intern eigenständig gestreckt: von null bis
zu ihrem größten Wert. Die tatsächlichen Zahlen stehen an den Datenpunkten,
im Tooltip und in der Datentabelle. Balken- und Liniendiagramme zeigen
dagegen eine echte, von ECharts berechnete und beschriftete Werteachse.
Mehr dazu unter [Einstellungen](settings.md).
