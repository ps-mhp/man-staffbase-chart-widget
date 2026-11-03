# Stap voor stap

Aan de hand van een voorbeeld van een voertuigvergelijking (MAN eTGX versus een concurrent) op basis van
zes kengetallen met verschillende eenheden.

## Diagram instellen

1. Plaats de widget **Diagram** op de pagina. De widgetinstellingen
   worden geopend en daarin verschijnt onmiddellijk de **diagram-editor** boven het
   eigenlijke veld.
2. Bovenaan staat het **diagramtype**. Momenteel is daar alleen „Netdiagram
   (Radar / Spin)“ beschikbaar; de tekst eronder geeft aan waarvoor het type bedoeld is.
3. Zolang er nog geen gegevens zijn, biedt het gedeelte **„Assen en
   reeksen”** twee opties: **„Voorbeeld laden”** vult de kant-en-klare
   vergelijking tussen de MAN eTGX en de Mercedes-Benz eActros 600 in, die je eenvoudig
   kunt overschrijven, en **„Lege tabel aanmaken”** stelt drie assen en twee
   reeksen aan om in te vullen.
4. De aanbevolen manier is echter **„Gegevens uit een tabel overnemen“** helemaal
   bovenaan: de vergelijkingstabel in Excel, PowerPoint of Word selecteren,
   kopiëren en in het veld plakken. Geef daaronder aan **hoe de tabel
   is opgebouwd** — de standaardinstelling is „per rij één kengetal, per kolom één
   variant“, dus precies zoals de tabel ook in de editor eronder verschijnt.
   Klik vervolgens op **„Tabel overnemen“**.
5. In het raster is **elke rij een as** en **elke kolom rechts een
   reeks**. Bovenaan elke reeks kolom staan de naam, de kleur en de pijltjes om
   te herschikken; aan het einde van elke asrij staan de pijltjes en het kruisje voor deze
   as.
6. Voer per as de **eenheid** in (bijv. „kWh“). Een **regeleinde in de
   asnaam** — met de Enter-toets — wordt overgenomen in de grafiek en
   zorgt ervoor dat lange labels leesbaar blijven.
7. Bij assen waarbij een **lagere waarde beter** is — gewicht,
   verbruik, oplaadtijd — schakel je in de kolom **Richting** de schakelaar
   **„lager is beter“** in. Zonder deze instelling zou de slechtere
   (grotere) waarde verder naar buiten liggen, en zou de afbeelding precies het tegenovergestelde aangeven van
   wat bedoeld is: bij een vergelijking moet altijd „verder naar buiten =
   beter“ gelden.
8. **Decimalen**, **minimum** en **maximum** per as staan achter
   de schakelaar **„Fijnafstellingen per as“**. In het normale geval zijn deze
   niet nodig; leeg betekent „afgeleid uit de waarden“.
9. Voer onder **„Titel, legenda en weergave“** de titel en voetnoot in,
   plaats of verberg de **legenda** en stel bij het rasterdiagram de
   **hulplijnen in het raster** en **vlakvulling** in.
10. Het **voorbeeld** aan de rechterkant laat continu zien hoe het diagram er op de pagina
    uitziet en blijft staan tijdens het scrollen.
11. Stel de **hoogte** van het diagram in (zie [Instellingen](settings.md)).
12. Als je het diagram als afbeelding wilt kunnen downloaden, zet dan de schakelaar
    **„Download toestaan“** aan (zie [Instellingen](settings.md)).
    Onder het diagram verschijnen dan twee knoppen: „Als SVG“ en
    „Als PNG“.
13. Klik op **Opslaan** en vervolgens op **Sluiten**. Pas als je op „Opslaan“ klikt, worden
    de gegevens naar de widget overgebracht; zolang er naast de knoppen „Niet-opgeslagen
    wijzigingen“ staat, is er nog niets opgeslagen.

## Achteraf wijzigen

1. Open de widgetinstellingen opnieuw — de diagram-editor verschijnt
   weer met de laatst opgeslagen stand.
2. Overschrijf waarden direct in het raster of voeg opnieuw een bijgewerkte tabel
   in. Assen en reeksen met dezelfde naam behouden daarbij hun reeds
   ingestelde eenheden, asrichtingen en kleuren — alleen de waarden worden
   vervangen.
3. Opslaan en sluiten zoals hierboven beschreven.

## Als iets niet werkt

1. Als er in plaats van de grafiek een melding verschijnt, staat daarin al de
   oorzaak — zie [FAQ](faq.md) voor elke mogelijke tekst.
2. Als de ingevoegde tabel niet kan worden overgenomen, controleer dan of deze
   kopteksten in de eerste rij en in de eerste kolom heeft. Als
   assen en reeksen in het raster omgedraaid staan, was de leesrichting onder het
   invoegveld verkeerd gekozen — wijzig deze en pas de tabel opnieuw toe.
3. Als de grafiek na het invoegen verkeerde getallen weergeeft (bijv. met een factor
   1000 verschoven), dan gaat het meestal om het duizendteken bij
   getallen uit een niet-Duitse bron — zie de opmerkingen over getallen in
   [Instellingen](settings.md) en [FAQ](faq.md).
