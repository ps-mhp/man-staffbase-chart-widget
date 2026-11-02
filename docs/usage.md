# Schritt für Schritt

Am Beispiel eines Fahrzeugvergleichs (MAN eTGX gegen einen Wettbewerber) über
sechs Kennzahlen mit unterschiedlichen Einheiten.

## Diagramm einrichten

1. Das Widget **Diagramm** auf der Seite platzieren. Die Widget-Einstellungen
   öffnen sich, und darin erscheint sofort der **Diagramm-Editor** über dem
   eigentlichen Feld.
2. Die Vergleichsdaten aus Excel markieren und kopieren: **erste Zeile** die
   Kategorien (Achsen, z. B. „Reichweite [km]“, „Ladezeit [min]“), **erste
   Spalte** die Serien (z. B. die Fahrzeugnamen). Im Editor in das Feld
   **„Tabelle einfügen“** einfügen und auf **„Tabelle übernehmen“** klicken.
   Die Werte erscheinen daraufhin im Raster darüber und in der Vorschau.
3. Für jede Kategorie (Achsen-Spalte im Raster) **Einheit** und
   **Nachkommastellen** setzen — das bestimmt, wie die Zahl an den
   Datenpunkten, im Tooltip und in der Tabelle erscheint, z. B. „125,5 kWh“.
4. Bei Kategorien, bei denen ein **kleinerer Wert besser** ist — Gewicht,
   Verbrauch, Ladezeit —, den Schalter **„Kleiner ist besser“** der Achse
   einschalten. Ohne diesen Schalter läge der schlechtere (größere) Wert
   weiter außen auf der Achse, und das Bild sagte genau das Gegenteil von
   dem, was gemeint ist: Bei einem Vergleich soll immer „weiter außen = besser“
   gelten.
5. **Titel** und **Fußnote** eintragen, Legende ein-/ausschalten und ihre
   Position (oben/unten) wählen.
6. Die **Höhe** des Diagramms einstellen (siehe [Einstellungen](settings.md)).
7. Auf **Speichern** klicken, dann **Schließen**. Erst „Speichern“ überträgt
   die Daten ins Widget; solange neben den Buttons „Ungespeicherte
   Änderungen“ steht, ist noch nichts übernommen.

## Nachträglich ändern

1. Die Widget-Einstellungen erneut öffnen — der Diagramm-Editor erscheint
   wieder mit dem zuletzt gespeicherten Stand.
2. Werte direkt im Raster überschreiben oder eine aktualisierte Tabelle erneut
   einfügen. Gleichnamige Kategorien und Serien behalten dabei ihre bereits
   gesetzten Einheiten, Achsenrichtungen und Farben — nur die Werte werden
   ersetzt.
3. Speichern und schließen wie oben.

## Wenn etwas nicht funktioniert

1. Erscheint statt des Diagramms ein Hinweistext, steht darin bereits die
   Ursache — siehe [FAQ](faq.md) für jeden möglichen Wortlaut.
2. Lässt sich die eingefügte Tabelle nicht übernehmen, prüfen, ob die erste
   Zeile die Kategorien und die erste Spalte die Seriennamen enthält.
3. Zeigt das Diagramm nach dem Einfügen falsche Zahlen (z. B. um den Faktor
   1000 verschoben), handelt es sich meist um das Tausenderzeichen bei
   Zahlen aus einer nicht-deutschen Quelle — siehe die Hinweise zu Zahlen in
   [Einstellungen](settings.md) und [FAQ](faq.md).
