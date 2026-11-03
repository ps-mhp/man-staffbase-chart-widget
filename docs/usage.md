# Schritt für Schritt

Am Beispiel eines Fahrzeugvergleichs (MAN eTGX gegen einen Wettbewerber) über
sechs Kennzahlen mit unterschiedlichen Einheiten.

## Diagramm einrichten

1. Das Widget **Diagramm** auf der Seite platzieren. Die Widget-Einstellungen
   öffnen sich, und darin erscheint sofort der **Diagramm-Editor** über dem
   eigentlichen Feld.
2. Oben steht der **Diagrammtyp**. Zurzeit gibt es dort nur „Netzdiagramm
   (Radar / Spinne)“; der Text darunter sagt, wofür der Typ gedacht ist.
3. Solange noch keine Daten da sind, bietet der Abschnitt **„Achsen und
   Serien“** zwei Einstiege an: **„Beispiel laden“** füllt den fertigen
   Vergleich MAN eTGX gegen Mercedes-Benz eActros 600 ein, den man einfach
   überschreibt, und **„Leere Tabelle anlegen“** legt drei Achsen und zwei
   Serien zum Ausfüllen an.
4. Der empfohlene Weg ist jedoch **„Daten aus einer Tabelle übernehmen“** ganz
   oben: Die Vergleichstabelle in Excel, PowerPoint oder Word markieren,
   kopieren und in das Feld einfügen. Darunter angeben, **wie die Tabelle
   steht** — voreingestellt ist „je Zeile eine Kennzahl, je Spalte eine
   Variante“, also so, wie die Tabelle auch im Editor darunter erscheint.
   Dann auf **„Tabelle übernehmen“** klicken.
5. Im Raster ist **jede Zeile eine Achse** und **jede Spalte rechts eine
   Serie**. Oben in jeder Serienspalte stehen Name, Farbe und die Pfeile zum
   Umsortieren; am Ende jeder Achsenzeile die Pfeile und das Kreuz für diese
   Achse.
6. Je Achse die **Einheit** eintragen (z. B. „kWh“). Ein **Zeilenumbruch im
   Achsennamen** — mit der Eingabetaste — wird im Diagramm übernommen und
   hält lange Beschriftungen lesbar.
7. Bei Achsen, bei denen ein **kleinerer Wert besser** ist — Gewicht,
   Verbrauch, Ladezeit —, in der Spalte **Richtung** den Schalter
   **„kleiner ist besser“** einschalten. Ohne ihn läge der schlechtere
   (größere) Wert weiter außen, und das Bild sagte genau das Gegenteil von
   dem, was gemeint ist: Bei einem Vergleich soll immer „weiter außen =
   besser“ gelten.
8. **Nachkommastellen**, **Minimum** und **Maximum** je Achse stehen hinter
   dem Schalter **„Feineinstellungen je Achse“**. Der Normalfall braucht sie
   nicht; leer heißt „aus den Werten abgeleitet“.
9. Unter **„Titel, Legende und Darstellung“** Titel und Fußnote eintragen,
   die **Legende** platzieren oder ausblenden und beim Netzdiagramm die
   **Hilfslinien im Netz** sowie **Flächen füllen** einstellen.
10. Die **Vorschau** rechts zeigt durchgehend, wie das Diagramm auf der Seite
    aussieht, und bleibt beim Scrollen stehen.
11. Die **Höhe** des Diagramms einstellen (siehe [Einstellungen](settings.md)).
12. Soll sich das Diagramm als Bild herunterladen lassen, den Schalter
    **„Download erlauben“** einschalten (siehe [Einstellungen](settings.md)).
    Unterhalb des Diagramms erscheinen dann zwei Knöpfe, „Als SVG“ und
    „Als PNG“.
13. Auf **Speichern** klicken, dann **Schließen**. Erst „Speichern“ überträgt
    die Daten ins Widget; solange neben den Buttons „Ungespeicherte
    Änderungen“ steht, ist noch nichts übernommen.

## Nachträglich ändern

1. Die Widget-Einstellungen erneut öffnen — der Diagramm-Editor erscheint
   wieder mit dem zuletzt gespeicherten Stand.
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
