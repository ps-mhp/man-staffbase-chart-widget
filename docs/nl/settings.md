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

## Het bewerkingsvenster

Bovenaan bevindt zich een werkbalk met **Opslaan**, **Help** en **Sluiten**;
deze blijft op zijn plaats tijdens het scrollen, zodat opslaan ook bij een lange
gegevensraster toegankelijk blijft. Zolang het ontwerp afwijkt van de opgeslagen stand,
staat ernaast „Niet-opgeslagen wijzigingen“. De Help-knop opent
een schuifbalk met dezelfde uitleg als op deze pagina, direct in
het dialoogvenster; het wordt gesloten via de knop of de toets „Escape“.

Als het dialoogvenster smal is, verschuift het voorbeeld onder het invoerraster, en
bij een containerbreedte van minder dan ongeveer 700 pixels wordt het raster omgezet in een kaart
per as. Het dialoogvenster scrolt daarbij nooit horizontaal.

## Diagramtype

De selectie helemaal bovenaan in de editor bepaalt het type diagram:

| Type | Geschikt voor |
| --- | --- |
| Netwerkdiagram (radar / spin) | Vergelijking van enkele varianten op basis van meerdere kenmerken met mogelijk verschillende eenheden. |
| Staafdiagram (kolommen) | Vergelijking van waarden over enkele categorieën met een gemeenschappelijke eenheid. |
| Lijndiagram (verloop) | Ontwikkeling over een geordende reeks, bijv. jaren. |
| Cirkeldiagram (taart / ring) | Verdeling van een geheel in segmenten; geeft alleen de eerste reeks weer. |

Bij een typewijziging gaan geen **gegevens** verloren: titel, voetnoot, legenda, assen en
reeksen blijven behouden. Dit geldt ook voor de gegevens die aan een as
zijn gekoppeld — minimum, maximum, „kleiner is beter“ en de segmentkleur. Deze
worden bij het andere type alleen verborgen en werken weer zodra het
bijbehorende type opnieuw wordt geselecteerd.

De **weergave-instellingen** van een type blijven daarentegen niet behouden bij een wijziging.
Wie bij het netdiagram „Hulplijnen in het net“ en „Vlakken vullen“
heeft ingesteld, overschakelt naar staafdiagrammen en opslaat, treft bij de volgende
wijziging weer de standaardinstellingen aan. Hetzelfde geldt voor stapelen
en richting bij balkdiagrammen, voor afvlakken, vlak en punten bij lijndiagrammen
en voor binnenradius en segmentlabels bij cirkeldiagrammen. Een diagram
heeft altijd slechts één set weergave-instellingen, namelijk die van het
huidige type.

## Welke velden verschijnen bij welk type

| Veld | Radar | Staaf | Lijn | Cirkeldiagram |
| --- | :-: | :-: | :-: | :-: |
| Eenheid, decimalen | ✓ | ✓ | ✓ | ✓ |
| Minimum, maximum | ✓ | – | – | – |
| Richting („kleiner is beter“) | ✓ | – | – | – |
| Kleur per as (segmentkleur) | – | – | – | ✓ |
| Rijkolommen in het raster | alle | alle | alle | alleen de eerste |

**Waarom minimum, maximum en „kleiner is beter“ alleen bij de radar
verschijnen:** Ze worden per as gedefinieerd en bij een gemeenschappelijke
waarde-as — zoals bij staaf- en lijngrafieken — niet weer te geven. Bij cirkeldiagrammen
is er helemaal geen as. „Kleiner is beter“ is bovendien een
radarconcept: bij een echte waarde-as draai je geen as om, maar
sorteer of label je.

## Gegevens uit een tabel overnemen

| Instelling | Beschrijving |
| --- | --- |
| Invoerveld | Neemt een uit Excel, PowerPoint of Word gekopieerde tabel op. Herkent tab, puntkomma en komma als kolomscheidingstekens. |
| Hoe staat uw tabel? | Bepaalt de leesrichting. Standaard ingesteld op „één kengetal per rij, één variant per kolom“ — precies zoals de tabel ook in het raster eronder staat. De andere keuze draait de tabel om bij het overnemen. |
| Tabel overnemen | Vervangt assen, reeksen en waarden. Assen en reeksen met dezelfde naam behouden hun eenheid, asrichting en kleur. |

Het invoegen vanuit Excel is typeneutraal en werkt bij alle vier de typen
op dezelfde manier.

## Aan de slag zonder gegevens

Zolang er noch assen noch reeksen zijn aangemaakt, legt de editor de
begrippen uit en biedt twee knoppen aan: **„Voorbeeld laden“** vult een
bij het geselecteerde type passend voorbeeld in (bijv. bij de radar de vergelijking tussen de MAN
eTGX met de Mercedes-Benz eActros 600, bij de cirkeldiagram een verdeling van de
vlootkosten), die je kunt overschrijven; **„Lege tabel aanmaken“** maakt assen
en reeksen aan om in te vullen.

## Per as (één rij in het raster)

| Instelling | Beschrijving |
| --- | --- |
| As | Naam van de as, zoals deze in de grafiek en in de gegevenstabel verschijnt. Meerdere regels: de Enter-toets zorgt voor een regeleinde, dat ook in de grafiek wordt weergegeven. |
| Eenheid | Wordt aan elk getal van deze as toegevoegd (gegevenspunt, tooltip, tabel), bijv. „kWh“. Bij staaf- en lijngrafieken bevat de gemeenschappelijke waardeas de eenheid alleen als **alle** assen met waarden dezelfde eenheid hebben. |
| Richting („minder is beter“) | Alleen bij radardiagrammen. Keert de as om: de kleinere waarde ligt dan verder naar buiten. Voor kengetallen waarbij minder beter is — gewicht, verbruik, laadtijd. |
| Kleur | Alleen bij cirkeldiagrammen. Bepaalt de kleur van het bijbehorende segment en overschrijft daarvoor de automatisch toegewezen paletkleur. |
| Decimalen | Alleen wanneer **Fijnafstellingen per as** zijn ingeschakeld: hoeveel decimalen worden weergegeven. Zonder opgave wordt het aantal daadwerkelijk ingevoerde cijfers achter de komma overgenomen. |
| Minimum | Alleen bij de radar, wanneer fijnafstellingen zijn ingeschakeld: ondergrens van de as. Zonder opgave begint de as bij nul — bij negatieve waarden bij de kleinste daarvan. |
| Maximum | Alleen bij de radar, wanneer **fijnafstellingen per as** zijn ingeschakeld: de bovengrens van de as. Zonder opgave wordt de grootste voorkomende waarde van deze as gebruikt. |
| ↑ ↓ ✕ | Verschuift de as of verwijdert deze samen met de waarden. |

## Per reeks (een kolom in het raster)

Bij het cirkeldiagram toont het raster **alleen de eerste reeks-kolom** — een
opmerking eronder maakt duidelijk dat er nog meer reeksen zijn opgeslagen en
niet worden weergegeven.

| Instelling | Beschrijving |
| --- | --- |
| Reeksnaam | Naam zoals deze verschijnt in de legenda (behalve bij cirkeldiagrammen, zie hieronder), tooltip en gegevenstabel. |
| Kleur | Overschrijft de automatisch toegewezen kleur uit het MAN-palet voor deze ene reeks. Heeft geen effect bij cirkeldiagrammen — daar wordt de kleur per as bepaald (zie hierboven). |
| ← → ✕ | Verplaatst de reeks — de volgorde bepaalt de paletkleur en de volgorde in de legenda — of verwijdert deze. |

## Titel, legenda en weergave

| Instelling | Beschrijving |
| --- | --- |
| Titel | Koptekst boven de grafiek. Als het veld leeg blijft, verschijnt er geen koptekst. |
| Voetnoot | Aanvullende tekst in kleine letters onder de titel, bijvoorbeeld voor bronvermeldingen. |
| Legenda | „boven de grafiek“, „onder de grafiek“ of „verbergen“. Bij cirkeldiagrammen geeft de legenda de assen (segmenten) weer, bij de overige typen de reeksen. |

### Weergaveopties per type

| Type | Velden | Beschrijving |
| --- | --- | --- |
| Radar | Hulp lijnen in het raster | Aantal concentrische hulpringen. Standaard ingesteld op 5. Puur visueel, verandert geen waarden. |
| Radar | Vlakken vullen | Vult het vlak achter elke reekslijn halfdoorzichtig in de kleur van die reeks. Standaard uitgeschakeld. |
| Staafdiagram | Stapelen | Tekent reeksen boven elkaar in plaats van naast elkaar. Standaard uitgeschakeld. |
| Staafdiagram | Richting | „staand“ (categorieën onderaan) of „liggend“ (categorieën links). Standaard staand. |
| Lijn | Lijnen afvlakken | Rondt het verloop van de lijn af in plaats van deze recht tussen de steunpunten te trekken. Standaard uitgeschakeld. |
| Lijn | Vlak opvullen | Vult het vlak onder de lijn op in de kleur van de lijn. Standaard uitgeschakeld. |
| Lijn | Punten weergeven | Geeft een punt weer bij elk steunpunt. Standaard ingeschakeld. |
| Cirkeldiagram | Binnenstraal | Percentage van het gat in het cirkeldiagram. 0 resulteert in een volledige cirkel, een grotere waarde (bijv. 45) in een ring/donut. Standaard 0. |
| Cirkeldiagram | Segmentlabel | „Percentage“, „Absolute waarde“, „Beide“ of „Verbergen“. Standaard ingesteld op „Percentage“. |

## Automatische schaalverdeling

**Bij de radargrafiek** hebben de assen geen zichtbare getallenschaal — deze is bij
meerdere assen met verschillende eenheden niet zinvol weer te geven. Zonder
eigen instelling begint elke as in plaats daarvan bij **nul** en loopt door tot
de grootste waarde die voorkomt. De lengte van een straal gedraagt zich dus
net als de waarde zelf: de helft van de afstand naar buiten is ook de helft van de hoeveelheid.

Als er op een as negatieve waarden voorkomen, begint deze bij de kleinste daarvan —
anders zou het punt buiten het raster liggen.

Wie de verschillen tussen de reeksen sterker wil benadrukken, stelt
het minimum en maximum van de betreffende as handmatig in — bijvoorbeeld 400 en 600 in plaats van
0 en 600. Dit vergroot de zichtbare afstanden, maar laat ook kleine,
in de praktijk onbeduidende verschillen groot lijken.

Een handmatig ingesteld minimum of maximum beperkt ook de weergave:
een waarde buiten deze grenzen wordt precies op de rand weergegeven, in plaats van
buiten het raster uit te steken. Het getal bij het gegevenspunt en in de tabel blijft
daarbij hetzelfde als het ingevoerde — de grens verandert alleen de weergave, nooit de waarde. Wie
dus een as instelt op 0 tot 600 en 700 invoert, ziet het punt helemaal
aan de buitenkant staan en de 700 ernaast.

**Bij staaf- en lijngrafieken** tekent ECharts zelf een waardeas met
een zichtbare schaal; het is vastgezet op nul en kan niet handmatig
worden beperkt. **Bij de cirkeldiagrammen** is er geen waarde-as — elk segment geeft
zijn aandeel in het geheel weer. Een negatieve waarde is daar geen
weergaveprobleem, maar een gegevensfout: het diagram geeft dan een
vermelding van de betreffende as weer, in plaats van een vertekend cirkeldiagram te
tekenen.
