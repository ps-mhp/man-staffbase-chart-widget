# Instellingen

Alle instellingen bevinden zich in de **Diagram-editor**, die bij het openen van de
widget-instellingen automatisch in volledig scherm wordt geopend. In het Staffbase-venster
daarachter staat alleen nog het veld **Diagram** met de technisch gecodeerde
definitie; dit wordt nooit handmatig bewerkt.

## De editor

Bovenaan staat de koptekst, zoals bij alle MAN-widgets: naam en titel links, in het
midden de weergave **Editor · Desktop · Tablet · Mobiel**, rechts
**Ongedaan maken**, **Opnieuw**, **Help**, **Annuleren** en
**Toepassen**. Daarnaast staat wat er is gewijzigd – bijvoorbeeld „Diagramtype
gewijzigd“ of „Gegevens gewijzigd“ – of waarom de status nog niet
kan worden toegepast.

Daaronder twee delen:

- **Links het gegevensraster** met een balk erboven.
- **Rechts het paneel „Diagram“** met vier tabbladen: **Gegevens**,
  **Ontwerp**, **As** en **Gedrag**.

In de weergaven Desktop, Tablet en Mobiel wordt het raster vervangen door
het voorbeeld op apparaatbreedte; het paneel aan de rechterkant blijft staan, zodat elke
instelling direct daarnaast zichtbaar is.

Met „Toepassen“ wordt de status overgebracht naar het Staffbase-dialoogvenster; deze wordt pas definitief
opgeslagen met **Opslaan** in Studio. Zonder wijzigingen blijft
„Toepassen“ uitgeschakeld.

| Toets | Effect |
| --- | --- |
| ⌘/Ctrl S | Toepassen |
| ⌘/Ctrl ↵ | Toepassen en sluiten |
| ⌘/Ctrl Z, ⇧⌘/Ctrl Z | Ongedaan maken, herhalen (buiten tekstvelden) |
| F1 | Help |
| Esc | Sluiten, met bevestigingsvraag bij openstaande wijzigingen |

## Gegevensraster

Elke **rij** is een **as** (een kengetal, bij een cirkeldiagram een segment),
elke **kolom** rechts een **rij** (een variant; in eerdere versies
werd dit „serie“ genoemd). Bovenaan elke rijkolom staan een kleurpunt en een naam.

| Kolom | Beschrijving |
| --- | --- |
| Nr. | Selecteert de as. Een klik in een willekeurig veld van de rij heeft hetzelfde effect. |
| As | Naam van de as, zoals deze in de grafiek en in de gegevenstabel verschijnt. De Enter-toets zorgt voor een regeleinde, dat ook in de grafiek wordt weergegeven. |
| Eenheid | Wordt aan elk getal van deze as toegevoegd (gegevenspunt, tooltip, tabel), bijv. „kWh“. Bij staaf- en lijngrafieken bevat de gemeenschappelijke waardeas de eenheid alleen als **alle** assen met waarden dezelfde eenheid hebben. |
| per rij | De waarden, volgens de Duitse notatie: komma voor de decimalen, punt tussen de duizendtallen. |

Bij het cirkeldiagram toont het raster **alleen de eerste rij** – een opmerking
daaronder geeft aan dat er nog meer rijen zijn opgeslagen, maar niet
worden weergegeven.

**Waarden uit Excel:** kopieer cellen in Excel, selecteer een veld in het raster,
⌘ V (Ctrl V). Het blok wordt vanaf dit veld geplaatst; ontbrekende assen en rijen
worden toegevoegd. Bij een cirkeldiagram vult het alleen de ene zichtbare rij.

## Balk boven het raster

| Element | Beschrijving |
| --- | --- |
| As 2 van 5 · Naam | De geselecteerde as. |
| ↑ ↓ | Verplaatst de geselecteerde as inclusief de waarden. Bij de radargrafiek bepaalt de volgorde de plaats in de cirkel, bij de staafgrafiek de volgorde op de basislijn. |
| Dupliceren | Plaatst een kopie van de as inclusief waarden en instellingen direct erachter. |
| Verwijderen | Verwijdert de as inclusief de waarden. Ongedaan maken met ⌘/Ctrl Z. |
| + As | Voegt een lege as toe en plaatst de cursor in de naam ervan. |
| + Rij | Voegt een lege rij toe. |
| Uit Excel invoegen | Opent rechts een balk om een volledige tabel over te nemen (zie hieronder). |
| Voorbeeld laden | Vervangt de gegevens door een voorbeeld van het geselecteerde type. Hoogte en download blijven behouden. Ongedaan maken met ⌘/Ctrl Z. |

## Uit Excel invoegen

| Instelling | Beschrijving |
| --- | --- |
| Tabel | Neemt een uit Excel, PowerPoint of Word gekopieerde tabel op. De eerste rij en eerste kolom zijn kopteksten. Herkent tab, puntkomma en komma als kolomscheidingstekens. |
| Hoe staat de tabel? | **Assen in rijen** (standaard): per rij één kenmerk, per kolom één variant – zoals in het raster. **Assen in kolommen**: omgekeerd; de tabel wordt bij het overnemen gedraaid. |
| Tabel overnemen | Vervangt assen, rijen en waarden. Assen en rijen met dezelfde naam behouden hun eenheid, grenzen, richting en kleur. |

## Aan de slag zonder gegevens

Zolang er noch assen noch rijen zijn aangemaakt, legt het raster de
begrippen uit en biedt twee knoppen: **„Voorbeeld laden“** vult een
bij het gekozen type passend voorbeeld in (bijv. bij de radar de vergelijking MAN
eTGX versus Mercedes-Benz eActros 600, bij de taart een
verdeling), **„Lege tabel aanmaken“** maakt assen en rijen aan om
in te vullen.

## Tabblad „Gegevens“

De rijen als lijst; met één klik klap je er een open.

| Instelling | Beschrijving |
| --- | --- |
| ← → | Verplaatst de rij. De volgorde bepaalt de paletkleur en de legenda; bij de cirkeldiagrammen wordt de voorste rij weergegeven. |
| Verwijderen | Verwijdert de rij inclusief de waarden. |
| Naam | Zoals deze wordt weergegeven in de legenda (behalve bij de cirkeldiagram), de tooltip en de gegevenstabel. |
| Kleur | Overschrijft de paletkleur voor deze rij; „Palet“ herstelt de oorspronkelijke kleur. Niet beschikbaar bij het cirkeldiagram – daar bepaalt de segmentkleur per as de kleur. |
| + Rij toevoegen | Voegt een lege rij toe en vouwt deze uit. |

## Tabblad „Ontwerp“

| Instelling | Beschrijving |
| --- | --- |
| Type | **Raster**, **Balk**, **Lijn** of **Cirkeldiagram**. De zin eronder geeft aan waarvoor het type geschikt is. |
| Titel | Koptekst boven de grafiek. Leeg: geen koptekst. |
| Voetnoot | Aanvullende tekst in kleine letters, bijv. voor bronvermeldingen. |
| Legenda | **Boven**, **Onder** of **Verbergen**. Bij een cirkeldiagram geeft de legenda de assen (segmenten) weer, bij andere diagrammen de rijen. |
| Sectie van het type | Wat alleen het geselecteerde type kent, zie hieronder. |
| Hoogte in px | Hoogte van de grafiek op de pagina, 160 tot 1200 pixels, standaard 420. De breedte volgt altijd de kolom. Een hoogte buiten deze grenzen kan niet worden overgenomen. |

| Type | Instelling | Beschrijving |
| --- | --- | --- |
| Raster | Hulp lijnen | Aantal concentrische ringen. Standaard 5. Puur visueel. |
| Raster | Vlakken vullen | Vult het vlak achter elke lijn halfdoorzichtig in de kleur van de lijn. Standaard uitgeschakeld. |
| Balk | Richting | **Verticaal** (categorieën onder) of **Horizontaal** (categorieën links). Standaardinstelling: verticaal. |
| Balk | Gestapeld | Rijen boven elkaar in plaats van naast elkaar. Standaardinstelling: uitgeschakeld. |
| Lijn | Afgevlakt | Maakt de lijn vloeiend in plaats van recht tussen de waarden door te trekken. Standaard uitgeschakeld. |
| Lijn | Vlak vullen | Vult het vlak onder elke lijn. Standaard uitgeschakeld. |
| Lijn | Punten weergeven | Markeert elke waarde. Standaard ingeschakeld. |
| Cirkeldiagram | Binnenstraal in % | 0 geeft een volledige cirkel, een grotere waarde (bijv. 45) een ring. Standaard 0. |
| Cirkeldiagram | Labeling van de segmenten | **Procent**, **waarde**, **beide** of **geen**. Standaard ingesteld op procent. |

Bij het wijzigen van het type gaan er geen **gegevens** verloren: titel, voetnoot, legenda, assen en
reeksen blijven behouden, evenals de aanduidingen op de assen. De **instellingen van het
type** gelden daarentegen alleen voor dat type: een diagram bevat altijd slechts één set
daarvan, namelijk die van het momenteel geselecteerde type. Wie bij het net hulplijnen
instelt, overschakelt naar balken, daar iets wijzigt en weer terugschakelt, vindt
bij het net weer de standaardinstellingen.

## Tabblad „As“

De fijnafstellingen van de in het raster geselecteerde as.

| Instelling | Type | Beschrijving |
| --- | --- | --- |
| Benaming | alle | De naam van de as, op meerdere regels. |
| Eenheid | alle | Zoals in het raster. |
| Decimalen | alle | Hoeveel decimalen worden weergegeven. Leeg: zoveel als is ingevoerd. |
| Minimum, Maximum | Raster | Grenzen van de as. Leeg: afgeleid van de waarden (van nul tot de grootste waarde). Het maximum moet groter zijn dan het minimum, anders kan de instelling niet worden overgenomen. |
| Kleiner is beter | Net | Keert de as om: de kleinere waarde staat aan de buitenkant. Voor gewicht, verbruik, laadtijd. |
| Segmentkleur | Taart | Kleur van het segment van deze as; „Palet“ maakt deze ongedaan. |

**Waarom minimum, maximum en „Kleiner is beter“ alleen bij het net
verschijnen:** Ze worden per as gedefinieerd en zijn bij een gemeenschappelijke
waardeas – zoals bij staaf- en lijngrafieken – niet weer te geven. Bij de
cirkeldiagram is er helemaal geen as. Verborgen waarden blijven
opgeslagen en worden weer van kracht zodra het type opnieuw wordt geselecteerd.

## Tabblad „Gedrag“

| Instelling | Beschrijving |
| --- | --- |
| Download toestaan | Toont onder de grafiek twee knoppen: „Als SVG“ en „Als PNG“. Het bestand bevat alleen de grafiek, niet de pagina. Standaard uitgeschakeld. |

Onderaan staat de versie van de widget – wie een fout meldt, vindt deze
hier.

## Controle

„Toepassen“ weigert een instelling die de pagina niet op die manier zou kunnen weergeven.
De kop vermeldt de reden, het tabblad is voorzien van een rood vinkje, de betreffende
as is in het raster gemarkeerd en het veld geeft aan wat er moet gebeuren.

| Melding | Oorzaak |
| --- | --- |
| As „…“: maximum te klein | Bij het netwerk is het maximum niet groter dan het minimum. |
| „…“: negatief aandeel in de cirkeldiagram | Een waarde in de eerste rij is negatief; een cirkeldiagram toont alleen aandelen vanaf nul. |
| Hoogte: toegestaan zijn 160 tot 1200 pixels | De hoogte ligt buiten de grenzen. |

## Bestaande diagrammen

Tot versie 0.3 stonden **Hoogte** en **Download toestaan** als aparte velden
in het Staffbase-dialoogvenster. Deze velden zijn nu verborgen; hun waarden blijven
van kracht totdat in de editor iets anders wordt ingesteld. Bij het openen neemt
de editor ze over als uitgangssituatie – een bestaande grafiek ziet er na het
openen en overnemen precies hetzelfde uit als voorheen. Als het oude vinkje niet
leesbaar was, staat dit vermeld op het tabblad „Gedrag” onder de schakelaar.

## Automatische schaalverdeling

**Bij de radar** hebben de assen geen zichtbare getallenschaal ��� deze kan niet op zinvolle wijze worden weergegeven bij
meerdere assen met verschillende eenheden. Zonder
specifieke opgave begint elke as in plaats daarvan bij **nul** en loopt door tot
de grootste waarde die voorkomt. De lengte van een lijn gedraagt zich dus
net als de waarde zelf: de helft van de afstand naar buiten is ook de helft van de hoeveelheid.

Als er op een as negatieve waarden voorkomen, begint deze bij de kleinste daarvan –
anders zou het punt buiten het raster liggen.

Wie de verschillen tussen de rijen sterker wil benadrukken, stelt
het minimum en maximum van de betreffende as handmatig in – bijvoorbeeld 400 en 600 in plaats van
0 en 600. Dit vergroot de zichtbare afstanden, maar laat ook kleine,
in de praktijk onbeduidende verschillen groot lijken.

Een handmatig ingesteld minimum of maximum beperkt ook de weergave:
een waarde buiten deze grenzen wordt precies op de rand weergegeven, in plaats van
buiten het raster uit te steken. Het getal bij het gegevenspunt en in de tabel blijft
daarbij het ingevoerde getal – de grens verandert alleen de weergave, nooit de waarde. Wie
dus een as instelt op 0 tot 600 en 700 invoert, ziet het punt helemaal
aan de buitenkant staan en de 700 ernaast.

**Bij staaf- en lijngrafieken** tekent ECharts zelf een waardeas met
een zichtbare schaal; deze begint bij nul en kan niet handmatig
worden beperkt. **Bij cirkeldiagrammen** is er geen waardeas – elk segment geeft
zijn aandeel in het geheel weer. Een negatieve waarde is daar geen
weergaveprobleem, maar een gegevensfout: de editor laat deze niet
toepassen, en een ouder diagram toont op de pagina een verwijzing naar
de betreffende as, in plaats van een vertekende cirkeldiagram te tekenen.
