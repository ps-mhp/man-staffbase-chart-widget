# Stap voor stap

Aan de hand van het voorbeeld van een voertuigvergelijking (MAN eTGX versus een concurrent) op basis van
zes kengetallen met verschillende eenheden, weergegeven als een netdiagram; de
stappen gelden mutatis mutandis voor de overige drie typen.

## Diagram instellen

1. Plaats de widget **Diagram** op de pagina. De widgetinstellingen
   worden geopend en daarin verschijnt direct de **diagram-editor** in volledig scherm. Links
   staat het gegevensraster, rechts het paneel **„Diagram“** met de tabbladen
   Gegevens, Ontwerp, As en Gedrag. **Help** bovenaan opent dezelfde
   uitleg als deze documentatie.
2. Kies in het paneel onder **Ontwerp** het **type**: **Net**, **staaf**,
   **lijn** of **cirkeldiagram**; de tekst eronder geeft aan waarvoor het type bedoeld
   is. Bij een latere wijziging gaan er geen gegevens verloren – assen, rijen, titel
   en legenda blijven behouden; de gegevens op de assen (bijv. minimum en maximum
   bij het raster) worden alleen verborgen. De **instellingen van het type** gelden
   echter alleen voor dat type, zie [Instellingen](settings.md).
3. Zolang er nog geen gegevens zijn, biedt het raster twee mogelijkheden:
   **„Voorbeeld laden“** vult een voorbeeld in dat bij het type past en dat je
   kunt overschrijven, **„Lege tabel aanmaken“** maakt assen en rijen aan om
   in te vullen.
4. De aanbevolen methode is echter **„Uit Excel invoegen“** rechtsboven boven
   het raster: selecteer de vergelijkingstabel in Excel, PowerPoint of Word,
   kopieer deze en plak deze in het veld van de balk. Geef daaronder
   aan **hoe de tabel is opgebouwd** – standaard **assen in rijen**,
   dus precies zoals de tabel ook in het raster verschijnt. Klik vervolgens op **„Tabel
   overnemen“**. Deze stap is voor alle vier de typen hetzelfde.
5. In het raster is **elke rij een as** en **elke kolom rechts een
   rij**. Bij het cirkeldiagram toont het raster **alleen de eerste rij**;
   een opmerking eronder geeft aan dat verdere rijen opgeslagen blijven, maar
   niet worden weergegeven.
6. Overschrijf afzonderlijke waarden direct in het raster. Ook blokken uit Excel
   zijn mogelijk: kopieer cellen, selecteer een veld in het raster, ⌘ V (Ctrl V).
7. Voer per as de **eenheid** in (bijv. „kWh“). Een **regeleinde in de
   asnaam** – met de Enter-toets – wordt overgenomen in de grafiek en
   zorgt ervoor dat lange labels leesbaar blijven.
8. Door op een rij te klikken, selecteer je de as. De balk erboven geeft de naam weer
   („As 2 van 6 · Batterijgewicht“) en biedt de opties **naar boven**, **naar
   beneden**, **dupliceren** en **verwijderen**. In het paneel onder **As**
   staan de fijnafstellingen: naam, eenheid, decimalen,
   voor het net **Minimum**, **Maximum** en **„Kleiner is beter“**, voor de
   cirkeldiagram de **segmentkleur**.
9. Alleen bij het elektriciteitsnet: bij assen waarbij een **lagere waarde beter** is –
   gewicht, verbruik, laadtijd –, schakel **„Kleiner is beter“** in.
   Zonder deze instelling zou de slechtere (grotere) waarde verder naar buiten liggen, en zou de afbeelding
   het tegenovergestelde aangeven van wat bedoeld is.
10. Geef onder **Gegevens** de rijen een naam, stel indien nodig een eigen **kleur**
    in en wijzig hun volgorde – deze bepaalt de paletkleur en
    de legenda.
11. Voer onder **Opmaak** de titel en voetnoot in, plaats de **legenda** boven
    of onder de grafiek plaatsen of verbergen en de instellingen van het
    type selecteren: bij het raster **Hulplijnen** en **Vlakken vullen**, bij de
    balk **Richting** en **Gestapeld**, bij de lijn **Afgevlakt**,
    **Vlak vullen** en **Punten weergeven**, bij de cirkeldiagram **Binnenstraal** en
    **Label van de segmenten**. Helemaal onderaan de **Hoogte in px** (160 tot
    1200).
12. Als de grafiek als afbeelding moet kunnen worden gedownload, schakel dan onder
    **Gedrag** **„Download toestaan“** in. Onder de grafiek
    verschijnen dan twee knoppen: „Als SVG“ en „Als PNG“.
13. Schakel in de koptekst over naar **Desktop**, **Tablet** of **Mobiel**: het
    voorbeeld toont de grafiek zoals deze op de pagina staat, het paneel
    rechts blijft ernaast staan.
14. **Toepassen** – of ⌘/Ctrl ↵ om toe te passen en te sluiten. Daarna in
    Studio **Opslaan**; alleen dan wordt de pagina opgeslagen.

## Achteraf wijzigen

1. Open de widgetinstellingen opnieuw – de editor verschijnt met de
   laatst opgeslagen stand, inclusief het type.
2. Overschrijf waarden direct in het raster of neem een bijgewerkte tabel opnieuw over via
   „Uit Excel invoegen“. Assen en rijen met dezelfde naam
   behouden daarbij eenheden, grenzen, richting en kleuren – alleen de waarden
   worden vervangen.
3. Elke stap kan worden ongedaan gemaakt met ⌘/Ctrl Z; **Annuleren** verwijdert
   alles sinds de laatste keer dat je op Toepassen hebt geklikt.
4. Toepassen en opslaan in Studio zoals hierboven beschreven.

## Als iets niet werkt

1. Als er op de pagina een melding verschijnt in plaats van de grafiek, staat daarin
   al de oorzaak vermeld – zie [FAQ](faq.md) voor alle mogelijke formuleringen.
2. Als „Toepassen“ niet kan worden uitgevoerd, wordt de reden in de koptekst vermeld en krijgt het
   betreffende tabblad een rode markering – bijvoorbeeld „As „…“: maximum te
   klein“. Zie „Controle“ onder [Instellingen](settings.md).
3. Als de ingevoegde tabel niet kan worden overgenomen, controleer dan of deze
   kopteksten in de eerste rij en in de eerste kolom heeft. Als
   assen en rijen in het raster omgedraaid staan, was de leesrichting verkeerd
   gekozen – draai deze om en voer de wijzigingen opnieuw uit.
4. Als de grafiek na het invoegen verkeerde getallen weergeeft (bijv. met een factor
   1000 verschoven), gaat het meestal om het duizendtekentje bij
   getallen uit een niet-Duitse bron – zie [FAQ](faq.md).
5. Bij het cirkeldiagram blijft het vlak leeg, hoewel er waarden zijn ingevoerd
: dan hebben alle waarden van de eerste rij de waarde nul of ontbreken ze.
