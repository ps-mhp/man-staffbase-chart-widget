# Stap voor stap

Aan de hand van het voorbeeld van een voertuigvergelijking (MAN eTGX versus een concurrent) op basis van
zes kengetallen met verschillende eenheden in de vorm van een netdiagram; de
stappen gelden mutatis mutandis voor de overige drie typen.

## Diagram instellen

1. Plaats de widget **Diagram** op de pagina. De widgetinstellingen
   worden geopend en daarin verschijnt onmiddellijk de **diagram-editor** boven het
   eigenlijke veld. Bovenaan bevindt zich een bedieningsbalk met **Opslaan**,
   **Help** (opent een schuifbalk met dezelfde uitleg als in deze
   documentatie) en **Sluiten**; deze blijft staan tijdens het scrollen, ook
   bij een lange gegevenstabel.
2. Bovenaan in de editor staat het **diagramtype**: **netdiagram (radar /
   spin)**, **staafdiagram (kolommen)**, **lijndiagram (verloop)** of
   **cirkeldiagram (taart / ring)**; de tekst eronder geeft aan waarvoor het
   geselecteerde type bedoeld is. Bij een latere wijziging van het type gaan er geen
   gegevens — assen, reeksen, titel en legenda blijven behouden, alleen de
   typespecifieke velden (bijv. minimum/maximum bij de radar) worden
   verborgen totdat het type opnieuw wordt geselecteerd.
3. Zolang er nog geen gegevens zijn, biedt het gedeelte **„Assen en
   reeksen“** twee opties: **„Voorbeeld laden“** vult een voorbeeld in dat
   bij het gekozen type past, dat je eenvoudig kunt overschrijven, en
   **„Lege tabel aanmaken“** maakt assen en reeksen aan om in te vullen.
4. De aanbevolen methode is echter **„Gegevens uit een tabel overnemen“** helemaal
   bovenaan: selecteer de vergelijkingstabel in Excel, PowerPoint of Word,
   kopieer deze en plak deze in het veld. Geef daaronder aan **hoe de tabel
   is opgebouwd** — de standaardinstelling is „per rij één kengetal, per kolom één
   variant”, dus precies zoals de tabel ook in de editor eronder verschijnt.
   Klik vervolgens op **„Tabel overnemen”**. Deze stap is bij alle
   vier de typen hetzelfde.
5. In het raster is **elke rij een as** en **elke kolom rechts een
   reeks** — bij het cirkeldiagram toont het raster **alleen de eerste
   reeks-kolom**; een opmerking eronder maakt duidelijk dat er nog meer reeksen
   opgeslagen blijven, maar niet worden weergegeven, zodat het niet lijkt alsof
   er gegevens verloren zijn gegaan. Bovenaan elke reekskolom staan de naam, de kleur en
   de pijltjes om de volgorde te wijzigen; aan het einde van elke asregel staan de pijltjes en het
   kruisje voor deze as.
6. Voer per as de **eenheid** in (bijv. „kWh“). Een **regeleinde in de
   asnaam** — met de Enter-toets — wordt in de grafiek overgenomen en
   zorgt ervoor dat lange labels leesbaar blijven. Bij het cirkeldiagram kun je
   bovendien per as een eigen **segmentkleur** instellen.
7. Alleen bij het netwerkdiagram: bij assen waarbij een **lagere waarde
   beter** is — gewicht, verbruik, oplaadtijd —, schakel in de kolom **Richting**
   de schakelaar **„lager is beter“** in. Zonder deze instelling zou de
   slechtere (grotere) waarde verder naar buiten liggen, en zou de afbeelding precies het
   tegenovergestelde aangeven van wat bedoeld is.
8. **Decimalen** per as worden ingesteld via de schakelaar
   **„Fijnafstelling per as“**; **Minimum** en **Maximum** verschijnen daar
   alleen bij het netwerkdiagram, omdat balken en lijnen een gemeenschappelijke,
   door ECharts berekende waardeas weergeven. In het normale geval zijn deze
   niet nodig; leeg betekent „afgeleid uit de waarden“.
9. Voer onder **„Titel, legenda en weergave“** de titel en voetnoot in,
   plaats of verberg de **legenda** (bij cirkeldiagrammen somt deze de
   assen op, anders de reeksen) en stel de bij het type passende weergaveopties
   instellen: bij de radargrafiek **Hulplijnen in het raster** en **Vlakken vullen**,
   bij de staafgrafiek **Stapelen** en **Richting** (staand/liggend), bij de lijngrafiek
   **Lijnen afvlakken**, **Vlak vullen** en **Punten weergeven**, bij cirkeldiagrammen
   **Binnenstraal** (0 = volledige cirkel, groter = ring) en
   **Segmentlabel** (percentage, absolute waarde, beide of uit).
10. Het **voorbeeld** laat continu zien hoe de grafiek er op de pagina
    uitziet en blijft staan tijdens het scrollen. Als het dialoogvenster breed genoeg is
    (vanaf ongeveer 900 pixels), staat het naast het invoerveld; daaronder verschuift het
    onder het raster, en bij minder dan ongeveer 700 pixels verandert het raster
    in een reeks kaarten, één per as. Het dialoogvenster scrolt daarbij
    nooit horizontaal.
11. Stel de **hoogte** van de grafiek in (zie [Instellingen](settings.md)).
12. Als je de grafiek als afbeelding wilt kunnen downloaden, schakel dan de schakelaar
    **„Download toestaan“** in (zie [Instellingen](settings.md)).
    Onder de grafiek verschijnen dan twee knoppen, „Als SVG“ en
    „Als PNG“ — dit werkt bij alle vier de typen op dezelfde manier.
13. Klik op **Opslaan** en vervolgens op **Sluiten**. Pas als je op „Opslaan“ klikt, worden
    de gegevens naar de widget overgebracht; zolang er naast de knoppen „Niet-opgeslagen
    wijzigingen“ staat, is er nog niets opgeslagen.

## Achteraf wijzigen

1. Open de widgetinstellingen opnieuw — de grafiekeditor verschijnt
   weer met de laatst opgeslagen stand, inclusief het grafiektype.
2. Overschrijf waarden direct in het raster of voeg opnieuw een bijgewerkte tabel
   in. Assen en reeksen met dezelfde naam behouden daarbij hun reeds
   ingestelde eenheden, asrichtingen en kleuren — alleen de waarden worden
   vervangen.
3. Opslaan en sluiten zoals hierboven beschreven.

## Als iets niet werkt

1. Als er in plaats van de grafiek een foutmelding verschijnt, staat daarin al de
   oorzaak — zie [FAQ](faq.md) voor alle mogelijke formuleringen.
2. Als de ingevoegde tabel niet kan worden overgenomen, controleer dan of deze
   kopteksten in de eerste rij en in de eerste kolom heeft. Als
   assen en reeksen in het raster omgedraaid staan, was de leesrichting onder het
   invoegveld verkeerd gekozen — wijzig deze en probeer het opnieuw.
3. Als de grafiek na het invoegen verkeerde getallen weergeeft (bijv. met een factor
   1000 verschoven), gaat het meestal om het duizendtekentje bij
   getallen uit een niet-Duitse bron — zie de opmerkingen over getallen in
   [Instellingen](settings.md) en [FAQ](faq.md).
4. Bij het cirkeldiagram blijft het vlak leeg, hoewel er waarden zijn ingevoerd
   : ofwel hebben alle waarden van de eerste reeks de waarde nul of
   ontbreken ze (`null`), ofwel is ten minste één waarde negatief — in dat geval
   toont de grafiek een eigen melding met de naam van de betreffende
   as in plaats van een vertekende cirkeldiagram.
