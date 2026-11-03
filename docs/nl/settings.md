# Instellingen

In het configuratievenster zijn er technisch gezien slechts twee velden: **Diagram** en
**Hoogte in pixels**. „Diagram“ kan niet rechtstreeks worden bewerkt — in plaats daarvan
wordt automatisch de **diagram-editor** geopend, waarin alle overige
instellingen te vinden zijn.

## Veld in het configuratievenster

| Instelling | Beschrijving |
| --- | --- |
| Diagram | Bevat de volledige, technisch gecodeerde diagramdefinitie. Wordt uitsluitend via de diagram-editor bewerkt, nooit handmatig. |
| Hoogte in pixels | Hoogte van de grafiek op de pagina. Toegestane waarden zijn 160 tot 1200 pixels, de standaardinstelling is 420. De breedte wordt altijd bepaald door de kolom. |
| Downloaden toestaan | Toont onder de grafiek twee knoppen om de grafiek als afbeelding te downloaden. Het bestand bevat alleen de grafiek, niet de pagina. Standaard uitgeschakeld. |

## Koptekst van de grafiek-editor

| Instelling | Beschrijving |
| --- | --- |
| Titel | Koptekst boven de grafiek. Als het veld leeg blijft, verschijnt er geen koptekst. |
| Voetnoot | Aanvullende tekst in kleine letters onder de titel, bijvoorbeeld voor bronvermeldingen. |
| Legenda weergeven | Schakelt de legenda met de reeksnamen in of uit. |
| Positie legenda | „boven“ of „onder“ — waar de legenda ten opzichte van het diagram staat. |
| Aantal ringen | Alleen bij radar: aantal concentrische hulpringen in het raster. Standaard is dit 5. Puur visueel, verandert geen waarden. |
| Vlak vullen | Alleen bij radardiagrammen: vult het vlak achter elke reekslijn halfdoorzichtig in de kleur van die reeks. Standaard uitgeschakeld. |

## Per categorie (as)

| Instelling | Beschrijving |
| --- | --- |
| Label | Naam van de as, zoals deze in de grafiek en in de gegevenstabel wordt weergegeven. |
| Eenheid | Wordt aan elk getal van deze as toegevoegd (gegevenspunt, tooltip, tabel), bijv. „kWh“. |
| Decimalen | Hoeveel decimalen worden weergegeven. Indien niet opgegeven, wordt het aantal daadwerkelijk ingevoerde decimalen overgenomen. |
| Minimum | Ondergrens van de as. Indien niet opgegeven, wordt de kleinste voorkomende waarde van deze as gebruikt. |
| Maximum | Bovengrens van de as. Indien niet opgegeven, wordt de grootste waarde van deze as gebruikt. |
| Kleiner is beter | Keert de as om: de kleinere waarde ligt dan verder naar buiten. Voor kengetallen waarbij minder beter is — gewicht, verbruik, laadtijd. |

## Per serie

| Instelling | Beschrijving |
| --- | --- |
| Serienaam | Naam zoals deze verschijnt in de legenda, tooltip en gegevenstabel. |
| Kleur | Overschrijft de automatisch toegewezen kleur uit het MAN-palet voor deze ene serie. |

## Automatische schaalverdeling

De assen hebben geen zichtbare getallenschaal — deze is bij meerdere assen
met verschillende eenheden niet zinvol weer te geven. Zonder ingestelde minimum-
en maximumwaarden strekt elke as zich in plaats daarvan automatisch uit tussen de
kleinste en grootste waarde die erop voorkomt. Dit maakt verschillen
tussen de series duidelijk zichtbaar, maar kan ook kleine, in de praktijk
onbelangrijke verschillen optisch groot doen lijken. Wie dat niet wil,
stelt het minimum en maximum van de betreffende as handmatig in — bijv. 0 en 600
voor een bereik, in plaats van deze te laten lopen tussen de kleinste en grootste
voorkomende waarde.

Een handmatig ingesteld minimum of maximum beperkt ook de weergave:
een waarde buiten deze grenzen wordt precies op de rand weergegeven, in plaats van
buiten het raster uit te steken. Het getal bij het gegevenspunt en in de tabel blijft
daarbij het ingevoerde getal — de grens verandert alleen de weergave, nooit de waarde. Wie
dus een as instelt op 0 tot 600 en 700 invoert, ziet het punt helemaal
aan de buitenkant staan en de 700 ernaast.
