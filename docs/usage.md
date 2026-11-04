# Schritt für Schritt

Am Beispiel eines Fahrzeugvergleichs (MAN eTGX gegen einen Wettbewerber) über
sechs Kennzahlen mit unterschiedlichen Einheiten als Netzdiagramm; die
Schritte gelten für die übrigen drei Typen sinngemäß.

## Diagramm einrichten

1. Das Widget **Diagramm** auf der Seite platzieren. Die Widget-Einstellungen
   öffnen sich, und darin erscheint sofort der **Diagramm-Editor** über dem
   eigentlichen Feld. Oben steht eine Steuerleiste mit **Speichern**,
   **Hilfe** (öffnet einen Schieber mit denselben Erklärungen wie in dieser
   Dokumentation) und **Schließen**; sie bleibt beim Scrollen stehen, auch
   bei einem langen Datenraster.
2. Oben im Editor steht der **Diagrammtyp**: **Netzdiagramm (Radar /
   Spinne)**, **Balkendiagramm (Säulen)**, **Liniendiagramm (Verlauf)** oder
   **Kuchendiagramm (Torte / Ring)**; der Text darunter sagt, wofür der
   gewählte Typ gedacht ist. Ein späterer Wechsel des Typs verliert keine
   Daten — Achsen, Serien, Titel und Legende bleiben erhalten, nur die
   typspezifischen Felder (z. B. Minimum/Maximum beim Radar) werden
   ausgeblendet, bis der Typ wieder gewählt wird.
3. Solange noch keine Daten da sind, bietet der Abschnitt **„Achsen und
   Serien“** zwei Einstiege an: **„Beispiel laden“** füllt ein zum
   gewählten Typ passendes Beispiel ein, den man einfach überschreibt, und
   **„Leere Tabelle anlegen“** legt Achsen und Serien zum Ausfüllen an.
4. Der empfohlene Weg ist jedoch **„Daten aus einer Tabelle übernehmen“** ganz
   oben: Die Vergleichstabelle in Excel, PowerPoint oder Word markieren,
   kopieren und in das Feld einfügen. Darunter angeben, **wie die Tabelle
   steht** — voreingestellt ist „je Zeile eine Kennzahl, je Spalte eine
   Variante“, also so, wie die Tabelle auch im Editor darunter erscheint.
   Dann auf **„Tabelle übernehmen“** klicken. Dieser Schritt ist bei allen
   vier Typen gleich.
5. Im Raster ist **jede Zeile eine Achse** und **jede Spalte rechts eine
   Serie** — beim Kuchendiagramm zeigt das Raster **nur die erste
   Serienspalte**; ein Hinweis darunter macht deutlich, dass weitere Serien
   gespeichert bleiben, aber nicht gezeichnet werden, damit das nicht wie
   Datenverlust aussieht. Oben in jeder Serienspalte stehen Name, Farbe und
   die Pfeile zum Umsortieren; am Ende jeder Achsenzeile die Pfeile und das
   Kreuz für diese Achse.
6. Je Achse die **Einheit** eintragen (z. B. „kWh“). Ein **Zeilenumbruch im
   Achsennamen** — mit der Eingabetaste — wird im Diagramm übernommen und
   hält lange Beschriftungen lesbar. Beim Kuchendiagramm lässt sich
   zusätzlich je Achse eine eigene **Segmentfarbe** setzen.
7. Nur beim Netzdiagramm: Bei Achsen, bei denen ein **kleinerer Wert
   besser** ist — Gewicht, Verbrauch, Ladezeit —, in der Spalte **Richtung**
   den Schalter **„kleiner ist besser“** einschalten. Ohne ihn läge der
   schlechtere (größere) Wert weiter außen, und das Bild sagte genau das
   Gegenteil von dem, was gemeint ist.
8. **Nachkommastellen** je Achse stehen hinter dem Schalter
   **„Feineinstellungen je Achse“**; **Minimum** und **Maximum** dort
   erscheinen nur beim Netzdiagramm, weil Balken und Linie eine gemeinsame,
   von ECharts berechnete Werteachse zeichnen. Der Normalfall braucht sie
   nicht; leer heißt „aus den Werten abgeleitet“.
9. Unter **„Titel, Legende und Darstellung“** Titel und Fußnote eintragen,
   die **Legende** platzieren oder ausblenden (bei Kuchen listet sie die
   Achsen, sonst die Serien) und die zum Typ passenden Anzeigeoptionen
   einstellen: beim Radar **Hilfslinien im Netz** und **Flächen füllen**,
   beim Balken **Stapeln** und **Richtung** (stehend/liegend), bei der Linie
   **Linien glätten**, **Fläche füllen** und **Punkte zeigen**, beim Kuchen
   **Innenradius** (0 = Vollkreis, größer = Ring) und
   **Segmentbeschriftung** (Anteil, Absolutwert, beides oder aus).
10. Die **Vorschau** zeigt durchgehend, wie das Diagramm auf der Seite
    aussieht, und bleibt beim Scrollen stehen. Ist der Dialog breit genug
    (ab etwa 900 Pixel), steht sie neben der Eingabe; darunter wandert sie
    unter das Raster, und unterhalb von rund 700 Pixeln wird aus dem Raster
    eine Abfolge von Karten, eine je Achse. Waagerecht scrollt der Dialog
    dabei nie.
11. Die **Höhe** des Diagramms einstellen (siehe [Einstellungen](settings.md)).
12. Soll sich das Diagramm als Bild herunterladen lassen, den Schalter
    **„Download erlauben“** einschalten (siehe [Einstellungen](settings.md)).
    Unterhalb des Diagramms erscheinen dann zwei Knöpfe, „Als SVG“ und
    „Als PNG“ — das funktioniert bei allen vier Typen gleich.
13. Auf **Speichern** klicken, dann **Schließen**. Erst „Speichern“ überträgt
    die Daten ins Widget; solange neben den Buttons „Ungespeicherte
    Änderungen“ steht, ist noch nichts übernommen.

## Nachträglich ändern

1. Die Widget-Einstellungen erneut öffnen — der Diagramm-Editor erscheint
   wieder mit dem zuletzt gespeicherten Stand, einschließlich Diagrammtyp.
2. Werte direkt im Raster überschreiben oder eine aktualisierte Tabelle erneut
   einfügen. Gleichnamige Achsen und Serien behalten dabei ihre bereits
   gesetzten Einheiten, Achsenrichtungen und Farben — nur die Werte werden
   ersetzt.
3. Speichern und schließen wie oben.

## Wenn etwas nicht funktioniert

1. Erscheint statt des Diagramms ein Hinweistext, steht darin bereits die
   Ursache — siehe [FAQ](faq.md) für jeden möglichen Wortlaut.
2. Lässt sich die eingefügte Tabelle nicht übernehmen, prüfen, ob sie
   Überschriften in der ersten Zeile und in der ersten Spalte hat. Stehen
   Achsen und Serien vertauscht im Raster, war die Leserichtung unter dem
   Einfügefeld falsch gewählt — umstellen und erneut übernehmen.
3. Zeigt das Diagramm nach dem Einfügen falsche Zahlen (z. B. um den Faktor
   1000 verschoben), handelt es sich meist um das Tausenderzeichen bei
   Zahlen aus einer nicht-deutschen Quelle — siehe die Hinweise zu Zahlen in
   [Einstellungen](settings.md) und [FAQ](faq.md).
4. Beim Kuchendiagramm bleibt die Fläche leer, obwohl Werte eingetragen
   sind: Entweder haben alle Werte der ersten Serie den Wert null oder
   fehlen (`null`), oder mindestens ein Wert ist negativ — in diesem Fall
   zeigt das Diagramm einen eigenen Hinweis mit dem Namen der betroffenen
   Achse statt eines verfälschten Kuchens.
