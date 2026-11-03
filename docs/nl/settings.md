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

## Grafiektype

De selectie helemaal bovenaan in de editor bepaalt het type grafiek. Momenteel is
er alleen **netwerkdiagram (radar / spin)**; de lijst groeit met elk nieuw
ondersteund type. De typeafhankelijke instellingen — bij radar bijvoorbeeld de
hulplijnen — verschijnen alleen zolang het bijbehorende type is geselecteerd.

## Gegevens uit een tabel overnemen

| Instelling | Beschrijving |
| --- | --- |
| Invoervak | Neemt een uit Excel, PowerPoint of Word gekopieerde tabel op. Herkent tab, puntkomma en komma als kolomscheidingstekens. |
| Hoe is uw tabel opgebouwd? | Bepaalt de leesrichting. Standaard ingesteld op „één kengetal per rij, één variant per kolom“ — net zoals de tabel ook in het raster eronder staat. De andere keuze draait dit om bij het overnemen. |
| Tabel overnemen | Vervangt assen, reeksen en waarden. Assen en reeksen met dezelfde naam behouden hun eenheid, asrichting en kleur. |

## Aan de slag zonder gegevens

Zolang er nog geen assen of reeksen zijn aangemaakt, legt de editor de
begrippen uit en biedt twee knoppen aan: **„Voorbeeld laden“** vult een
volledige vergelijking (MAN eTGX versus Mercedes-Benz eActros 600) in, die
je kunt overschrijven; **„Lege tabel aanmaken“** stelt drie assen en twee
reeksen aan om in te vullen.

## Per as (één rij in het raster)

| Instelling | Beschrijving |
| --- | --- |
| As | Naam van de as, zoals deze in het diagram en in de gegevenstabel verschijnt. Meerdere regels: de Enter-toets zorgt voor een regeleinde, dat ook in de grafiek wordt weergegeven. |
| Eenheid | Wordt aan elk getal van deze as toegevoegd (gegevenspunt, tooltip, tabel), bijv. „kWh“. |
| Richting („minder is beter“) | Keert de as om: de kleinere waarde ligt dan verder naar buiten. Voor kengetallen waarbij minder beter is — gewicht, verbruik, laadtijd. |
| Decimalen | Alleen als **Fijnafstellingen per as** zijn ingeschakeld: Hoeveel cijfers achter de komma worden weergegeven. Zonder opgave wordt het aantal daadwerkelijk ingevoerde cijfers achter de komma overgenomen. |
| Minimum | Alleen als de fijnafstellingen zijn ingeschakeld: ondergrens van de as. Zonder opgave begint de as bij nul — bij negatieve waarden bij de kleinste daarvan. |
| Maximum | Alleen wanneer **fijnafstellingen per as** zijn ingeschakeld: bovengrens van de as. Zonder specificatie wordt de grootste voorkomende waarde van deze as gebruikt. |
| ↑ ↓ ✕ | Verschuift de as in een cirkel of verwijdert deze samen met de waarden. |

## Per reeks (een kolom in het raster)

| Instelling | Beschrijving |
| --- | --- |
| Naam reeks | Naam zoals deze verschijnt in de legenda, tooltip en gegevenstabel. |
| Kleur | Overschrijft de automatisch toegewezen kleur uit het MAN-palet voor deze ene reeks. |
| ← → ✕ | Verplaatst de reeks — de volgorde bepaalt de paletkleur en de volgorde in de legenda — of verwijdert deze. |

## Titel, legenda en weergave

| Instelling | Beschrijving |
| --- | --- |
| Titel | Koptekst boven de grafiek. Als het veld leeg blijft, verschijnt er geen koptekst. |
| Voetnoot | Aanvullende tekst in kleine letters onder de titel, bijvoorbeeld voor bronvermeldingen. |
| Legenda | „boven de grafiek“, „onder de grafiek“ of „verbergen“. |
| Hulp lijnen in het raster | Alleen bij de radargrafiek: aantal concentrische hulpringen. Standaard is dit 5. Puur visueel, verandert geen waarden. |
| Vlakken vullen | Alleen bij de radar: vult het vlak achter elke reekslijn halfdoorzichtig in de kleur van die reekslijn. Standaard uitgeschakeld. |

## Automatische schaalverdeling

De assen hebben geen zichtbare getallenschaal — bij meerdere assen
met verschillende eenheden is het niet zinvol om deze weer te geven. Zonder eigen instelling
begint elke as in plaats daarvan bij **nul** en loopt door tot de grootste
voorkomende waarde. De lengte van een straal gedraagt zich daarmee net als de waarde
zelf: de halve weg naar buiten is ook de halve hoeveelheid.

Als er op een as negatieve waarden voorkomen, begint deze bij de kleinste daarvan —
anders zou het punt buiten het raster liggen.

Wie de verschillen tussen de reeksen sterker wil benadrukken, stelt
het minimum en maximum van de betreffende as handmatig in — bijvoorbeeld 400 en 600 in plaats van
0 en 600. Dit vergroot de zichtbare afstanden, maar laat ook kleine,
in de praktijk onbeduidende verschillen groot lijken.

Een handmatig ingesteld minimum of maximum beperkt ook de weergave:
een waarde buiten deze grenzen wordt precies op de rand weergegeven, in plaats van
buiten het raster uit te steken. Het getal bij het gegevenspunt en in de tabel blijft
daarbij het ingevoerde getal — de grens verandert alleen de weergave, nooit de waarde. Wie
dus een as instelt op 0 tot 600 en 700 invoert, ziet het punt helemaal
aan de buitenkant staan en de 700 ernaast.
