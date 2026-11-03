# Diagramm

Das Diagramm-Widget stellt Kennzahlen als **Radar-/Netzdiagramm** dar: mehrere
Achsen strahlen sternförmig aus einem Mittelpunkt, und jede Serie — zum
Beispiel ein Fahrzeug im Vergleich — verbindet ihre Werte auf diesen Achsen zu
einer Fläche. So lassen sich mehrere Kennzahlen mehrerer Serien auf einen
Blick vergleichen, auch wenn sie in ganz unterschiedlichen Einheiten gemessen
werden — Kilometer, Tonnen, Minuten, Kilowatt.

Eingerichtet wird das Diagramm über einen eigenen Editor, der sich direkt in
den Widget-Einstellungen öffnet. Eine aus Excel kopierte Tabelle lässt sich
dort mit einem Klick übernehmen, siehe [Schritt für Schritt](usage.md).

Weitere Diagrammtypen (z. B. Balken- oder Liniendiagramme) sind für künftige
Versionen vorgesehen, aber **noch nicht verfügbar** — aktuell lässt sich nur
das Radar-/Netzdiagramm wählen.

## Was Leser:innen sehen

- Das Diagramm selbst, mit beliebig vielen Achsen und Serien.
- Die Werte stehen direkt an den Datenpunkten, zusätzlich erscheint beim
  Überfahren eines Punkts ein Tooltip mit allen Werten der Serie.
- Eine Legende oberhalb oder unterhalb des Diagramms, je nach Einstellung.
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
doppelter Auflösung erzeugt.

## Übersetzung

Bei der automatischen Seitenübersetzung macht das Diagramm mit. Übersetzt
werden Titel, Fußnote, Achsenbeschriftungen und Seriennamen — genau die
Texte, die redaktionell eingetragen wurden. Zahlen, Einheiten, Achsengrenzen,
Farben und alle übrigen Einstellungen bleiben unverändert, weil sie keine
Sprache haben: Eine übersetzte Einheit wäre falsch („t“ wird nicht zu „ton“),
eine übersetzte Zahl wäre Unsinn.

## Was Sie im CMS-Editor sehen

Beim Einfügen des Bausteins öffnet sich automatisch der **Diagramm-Editor**:
oben die Wahl des Diagrammtyps und ein Feld, in das eine aus Excel kopierte
Tabelle eingefügt wird, darunter ein Raster mit **einer Zeile je Achse** und
**einer Spalte je Serie**, daneben eine Live-Vorschau, die genau zeigt, wie
das Diagramm später auf der Seite erscheint. Solange noch nichts angelegt
ist, erklärt der Editor die Begriffe und bietet „Beispiel laden“ sowie
„Leere Tabelle anlegen“ an. Das Textfeld dahinter zeigt nur die technisch
gespeicherte, kodierte Form der Daten und wird nie von Hand bearbeitet.

Eine wichtige Besonderheit: Die Achsen tragen **keine sichtbare Zahlenskala**.
Mehrere Achsen mit unterschiedlichen Einheiten (z. B. Kilometer und Minuten)
lassen sich nicht sinnvoll auf einer gemeinsamen Skala abbilden. Jede Achse
wird deshalb intern eigenständig gestreckt: von null bis zu ihrem größten
Wert. Die tatsächlichen Zahlen stehen an den Datenpunkten, im Tooltip und
in der Datentabelle. Mehr dazu unter [Einstellungen](settings.md).
