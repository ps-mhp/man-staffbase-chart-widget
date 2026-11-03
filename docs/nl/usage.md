# Stap voor stap

Aan de hand van een voorbeeld van een voertuigvergelijking (MAN eTGX versus een concurrent) op basis van
zes kengetallen met verschillende eenheden.

## Grafiek instellen

1. Plaats de widget **Grafiek** op de pagina. De widgetinstellingen
   worden geopend en daarin verschijnt onmiddellijk de **grafiek-editor** boven het
   eigenlijke veld.
2. Selecteer de vergelijkingsgegevens uit Excel en kopieer ze: **eerste rij** de
   categorieën (assen, bijv. „Actieradius [km]“, „Laadtijd [min]“), **eerste
   kolom** de series (bijv. de voertuignamen). Plak deze in de editor in het veld
   **„Tabel invoegen“** en klik op **„Tabel overnemen“**.
   De waarden verschijnen vervolgens in het raster erboven en in het voorbeeld.
3. Stel voor elke categorie (kolom met assen in het raster) de **eenheid** en
   **aantal decimalen** in — dit bepaalt hoe het getal bij de
   gegevenspunten, in de tooltip en in de tabel wordt weergegeven, bijv. „125,5 kWh“.
4. Bij categorieën waarbij een **lagere waarde beter is** — gewicht,
   verbruik, oplaadtijd — schakel je de schakelaar **„Lager is beter“** van de as
   in. Zonder deze schakelaar zou de slechtere (grotere) waarde
   verder naar buiten op de as liggen, en zou de afbeelding precies het tegenovergestelde aangeven van
   wat bedoeld is: bij een vergelijking moet altijd „verder naar buiten = beter“
   gelden.
5. Voer de **titel** en **voetnoot** in, schakel de legenda in/uit en kies de
   positie (boven/onder).
6. Stel de **hoogte** van de grafiek in (zie [Instellingen](settings.md)).
7. Als je de grafiek als afbeelding wilt kunnen downloaden, zet dan de schakelaar
   **„Download toestaan“** aan (zie [Instellingen](settings.md)).
   Onder de grafiek verschijnen dan twee knoppen: „Als SVG“ en
   „Als PNG“.
8. Klik op **Opslaan** en vervolgens op **Sluiten**. Pas als je op „Opslaan“ klikt, worden
   de gegevens naar de widget overgebracht; zolang er naast de knoppen „Niet-opgeslagen
   wijzigingen” staat, is er nog niets overgenomen.

## Achteraf wijzigen

1. Open de widgetinstellingen opnieuw — de grafiek-editor verschijnt
   weer met de laatst opgeslagen stand.
2. Overschrijf waarden direct in het raster of voeg opnieuw een bijgewerkte tabel
   in. Categorieën en reeksen met dezelfde naam behouden daarbij hun reeds
   ingestelde eenheden, asrichtingen en kleuren — alleen de waarden worden
   vervangen.
3. Opslaan en sluiten zoals hierboven beschreven.

## Als iets niet werkt

1. Als er in plaats van de grafiek een melding verschijnt, staat daarin al de
   oorzaak — zie [FAQ](faq.md) voor alle mogelijke formuleringen.
2. Als de ingevoegde tabel niet wordt overgenomen, controleer dan of de eerste
   rij de categorieën en de eerste kolom de reeksnamen bevat.
3. Als de grafiek na het invoegen verkeerde getallen weergeeft (bijv. met een factor
   1000 verschoven), dan gaat het meestal om het duizendtekentje bij
   getallen uit een niet-Duitse bron — zie de opmerkingen over getallen in
   [Instellingen](settings.md) en [FAQ](faq.md).
