# Schritt für Schritt

Am Beispiel eines Fahrzeugvergleichs (MAN eTGX gegen einen Wettbewerber) über
sechs Kennzahlen mit unterschiedlichen Einheiten als Netzdiagramm; die
Schritte gelten für die übrigen drei Typen sinngemäß.

## Diagramm einrichten

1. Das Widget **Diagramm** auf der Seite platzieren. Die Widget-Einstellungen
   öffnen sich, und darin sofort der **Diagramm-Editor** im Vollbild. Links
   steht das Datenraster, rechts das Panel **„Diagramm“** mit den Reitern
   Daten, Gestaltung, Achse und Verhalten. **Hilfe** im Kopf öffnet dieselben
   Erklärungen wie diese Dokumentation.
2. Im Panel unter **Gestaltung** den **Typ** wählen: **Netz**, **Balken**,
   **Linie** oder **Kuchen**; der Satz darunter sagt, wofür der Typ gedacht
   ist. Ein späterer Wechsel verliert keine Daten – Achsen, Reihen, Titel
   und Legende bleiben, die Angaben an den Achsen (z. B. Minimum und Maximum
   beim Netz) werden nur ausgeblendet. Die **Einstellungen des Typs** gelten
   aber nur für ihn, siehe [Einstellungen](settings.md).
3. Solange noch keine Daten da sind, bietet das Raster zwei Einstiege an:
   **„Beispiel laden“** füllt ein zum Typ passendes Beispiel ein, das man
   überschreibt, **„Leere Tabelle anlegen“** legt Achsen und Reihen zum
   Ausfüllen an.
4. Der empfohlene Weg ist jedoch **„Aus Excel einfügen“** oben rechts über
   dem Raster: Die Vergleichstabelle in Excel, PowerPoint oder Word
   markieren, kopieren und in das Feld der Leiste einfügen. Darunter
   angeben, **wie die Tabelle steht** – voreingestellt **Achsen in Zeilen**,
   also so, wie die Tabelle auch im Raster erscheint. Dann **„Tabelle
   übernehmen“**. Dieser Schritt ist bei allen vier Typen gleich.
5. Im Raster ist **jede Zeile eine Achse** und **jede Spalte rechts eine
   Reihe**. Beim Kuchendiagramm zeigt das Raster **nur die erste Reihe**;
   ein Hinweis darunter sagt, dass weitere Reihen gespeichert bleiben, aber
   nicht gezeichnet werden.
6. Einzelne Werte direkt im Raster überschreiben. Auch Blöcke aus Excel
   gehen: Zellen kopieren, ein Feld im Raster wählen, ⌘ V (Strg V).
7. Je Achse die **Einheit** eintragen (z. B. „kWh“). Ein **Zeilenumbruch im
   Achsennamen** – mit der Eingabetaste – wird im Diagramm übernommen und
   hält lange Beschriftungen lesbar.
8. Eine Zeile anklicken wählt die Achse. Die Leiste darüber nennt sie
   („Achse 2 von 6 · Batteriegewicht“) und bietet **nach oben**, **nach
   unten**, **duplizieren** und **löschen** an. Im Panel unter **Achse**
   stehen ihre Feineinstellungen: Bezeichnung, Einheit, Nachkommastellen,
   beim Netz **Minimum**, **Maximum** und **„Kleiner ist besser“**, beim
   Kuchen die **Segmentfarbe**.
9. Nur beim Netz: Bei Achsen, bei denen ein **kleinerer Wert besser** ist –
   Gewicht, Verbrauch, Ladezeit –, **„Kleiner ist besser“** einschalten.
   Ohne ihn läge der schlechtere (größere) Wert weiter außen, und das Bild
   sagte das Gegenteil von dem, was gemeint ist.
10. Unter **Daten** die Reihen benennen, bei Bedarf eine eigene **Farbe**
    setzen und ihre Reihenfolge ändern – sie bestimmt Palettenfarbe und
    Legende.
11. Unter **Gestaltung** Titel und Fußnote eintragen, die **Legende** über
    oder unter das Diagramm setzen oder ausblenden und die Einstellungen des
    Typs wählen: beim Netz **Hilfslinien** und **Flächen füllen**, beim
    Balken **Richtung** und **Gestapelt**, bei der Linie **Geglättet**,
    **Fläche füllen** und **Punkte zeigen**, beim Kuchen **Innenradius** und
    **Beschriftung der Segmente**. Ganz unten die **Höhe in px** (160 bis
    1200).
12. Soll sich das Diagramm als Bild herunterladen lassen, unter
    **Verhalten** **„Download erlauben“** einschalten. Unter dem Diagramm
    erscheinen dann zwei Knöpfe, „Als SVG“ und „Als PNG“.
13. Im Kopf auf **Desktop**, **Tablet** oder **Mobil** schalten: Die
    Vorschau zeigt das Diagramm, wie es auf der Seite steht, das Panel
    rechts bleibt daneben stehen.
14. **Übernehmen** – oder ⌘/Strg ↵ für Übernehmen und Schließen. Danach im
    Studio **Speichern**; erst das sichert die Seite.

## Nachträglich ändern

1. Die Widget-Einstellungen erneut öffnen – der Editor erscheint mit dem
   zuletzt übernommenen Stand, einschließlich Typ.
2. Werte direkt im Raster überschreiben oder eine aktualisierte Tabelle über
   „Aus Excel einfügen“ erneut übernehmen. Gleichnamige Achsen und Reihen
   behalten dabei Einheiten, Grenzen, Richtung und Farben – nur die Werte
   werden ersetzt.
3. Jeder Schritt lässt sich mit ⌘/Strg Z zurücknehmen; **Abbrechen** verwirft
   alles seit dem letzten Übernehmen.
4. Übernehmen und im Studio speichern wie oben.

## Wenn etwas nicht funktioniert

1. Erscheint auf der Seite statt des Diagramms ein Hinweistext, steht darin
   bereits die Ursache – siehe [FAQ](faq.md) für jeden möglichen Wortlaut.
2. Lässt sich „Übernehmen“ nicht ausführen, nennt der Kopf den Grund, und der
   betroffene Reiter trägt eine rote Marke – etwa „Achse „…“: Maximum zu
   klein“. Siehe „Prüfung“ unter [Einstellungen](settings.md).
3. Lässt sich die eingefügte Tabelle nicht übernehmen, prüfen, ob sie
   Überschriften in der ersten Zeile und in der ersten Spalte hat. Stehen
   Achsen und Reihen vertauscht im Raster, war die Leserichtung falsch
   gewählt – umstellen und erneut übernehmen.
4. Zeigt das Diagramm nach dem Einfügen falsche Zahlen (z. B. um den Faktor
   1000 verschoben), handelt es sich meist um das Tausenderzeichen bei
   Zahlen aus einer nicht-deutschen Quelle – siehe [FAQ](faq.md).
5. Beim Kuchendiagramm bleibt die Fläche leer, obwohl Werte eingetragen
   sind: Dann haben alle Werte der ersten Reihe den Wert null oder fehlen.
