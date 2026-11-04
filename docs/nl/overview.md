# Diagram

De diagramwidget geeft kengetallen weer in vier soorten: **netdiagram
(radar), staafdiagram, lijndiagram en cirkeldiagram**. Elk type wordt ingesteld via
dezelfde editor, die direct in de widgetinstellingen wordt geopend; een
uit Excel gekopieerde tabel kan daar met één klik worden overgenomen, zie
[Stap voor stap](usage.md).

## De vier typen

**Radardiagram (radar / spin).** Meerdere assen lopen stervormig uit
vanuit een middelpunt, en elke reeks — bijvoorbeeld een voertuig in vergelijking —
verbindt haar waarden op deze assen tot een vlak. Zo kunnen
meerdere kengetallen van meerdere reeksen in één oogopslag worden vergeleken, ook al worden ze
in heel verschillende eenheden gemeten — kilometers, tonnen,
minuten, kilowatt. Alleen bij de radar zijn er minimum, maximum en de schakelaar
„kleiner is beter“ per as, plus de weergaveopties hulplijnen in het raster
en vlakken vullen.

**Staafdiagram (kolommen).** Vergelijkt waarden over enkele categorieën heen.
Alle balken delen een gemeenschappelijke waarde-as, die ECharts zelf
berekent en van labels voorziet — in tegenstelling tot bij de radar is deze as daarom
alleen zinvol als alle categorieën dezelfde eenheid hebben. Als
weergaveopties zijn stapelen (reeksen boven elkaar in plaats van naast elkaar) en
de richting (staand of liggend) beschikbaar.

**Lijngrafiek (verloop).** Toont een ontwikkeling over een geordende
reeks, bijvoorbeeld over bouwjaren. De volgorde van de assen in het raster is
de volgorde op de lijn. Weergaveopties: lijnen afvlakken, oppervlak onder
de lijn vullen, punten op de steunpunten weergeven.

**Cirkeldiagram (taart / ring).** Toont de verdeling van een geheel:
segmenten zijn de assen (categorieën), hun waarden bepalen de grootte van de segmenten.
**Alleen de eerste reeks wordt getekend** — verdere reeksen
blijven opgeslagen en verschijnen weer zodra er naar een ander type
wordt overgeschakeld; de editor wijst hier specifiek op. Elke categorie kan een
eigen segmentkleur krijgen. Weergaveopties: binnenradius (0 geeft de
volledige cirkel, een grotere waarde een ring/donut) en de segmentlabel
(percentage, absolute waarde, beide of verborgen). Negatieve waarden
vormen bij `pie` geen weergaveprobleem, maar een gegevensfout — het
diagram toont dan een melding in plaats van een vertekende cirkeldiagram.

Bij het wijzigen van het diagramtype in de editor gaan geen gegevens verloren: titel, voetnoot,
legenda, assen en reeksen blijven behouden, evenals de waarden van typespecifieke
velden — ze zijn alleen niet actief zolang een ander type is geselecteerd.

## Wat lezers zien

- De grafiek zelf, met een willekeurig aantal assen en reeksen.
- De waarden staan direct bij de grafiek (bij `pie`, afhankelijk van de instelling, als
  percentage, absolute waarde of beide); bovendien verschijnt er bij het aanwijzen
  van een punt of segment een tooltip met de bijbehorende waarden.
- Een legenda boven of onder de grafiek, afhankelijk van de instellingen.
  Bij `pie` geeft de legenda de categorieën (segmenten) weer, bij de overige
  typen de reeksen.
- Optioneel een titel en een voetnoot.
- Als het downloaden is toegestaan (zie [Instellingen](settings.md)), twee knoppen
  onder de grafiek om als afbeelding te downloaden.
- Voor schermlezers bovendien een volledige gegevenstabel onder de
  diagram. Deze is visueel verborgen, maar wel aanwezig — het diagram is
  daardoor ook zonder visuele waarneming bruikbaar.

## Afbeelding exporteren

Als downloaden is ingeschakeld, verschijnen er onder het diagram twee knoppen:
„Als SVG“ en „Als PNG“. Het gedownloade bestand bevat **alleen de
grafiek**, niet de rest van de pagina — titel, legenda, assen en waarden
precies zoals ze op dat moment worden weergegeven, met een witte achtergrond (ook als
de pagina zelf een transparante of donkere achtergrond heeft). Het SVG-bestand kan
zonder kwaliteitsverlies worden vergroot; de PNG is geschikt voor situaties waarin geen SVG
kan worden ingesloten (bijv. de meeste presentatieprogramma’s) en wordt gegenereerd in
dubbele resolutie. De export werkt bij alle vier de typen
hetzelfde — het werkt op de getekende afbeelding en houdt geen rekening met het diagramtype.

## Vertaling

Bij de automatische paginavertaling wordt het diagram meegenomen. Er worden
titels, voetnoten, aslabels en reeksnamen vertaald — precies de
teksten die redactioneel zijn ingevoerd. Getallen, eenheden, asgrenzen,
kleuren en alle overige instellingen blijven ongewijzigd, omdat ze geen
taal hebben: een vertaalde eenheid zou onjuist zijn („t“ wordt geen „ton“),
een vertaald getal zou onzin zijn.

## Wat u in de CMS-editor ziet

Bij het invoegen van het bouwsteen wordt automatisch de **diagram-editor** geopend
met een bedieningsbalk bovenaan (Opslaan, Help, Sluiten) in plaats van een
voettekst — zo blijft Opslaan ook bij een lange gegevensmatrix bereikbaar,
omdat de balk tijdens het scrollen op zijn plaats blijft. Bovenaan de keuze van het diagramtype
en een veld waarin een uit Excel gekopieerde tabel wordt ingevoegd, daaronder
een raster met **één rij per as** en **één kolom per reeks**
(bij `pie` slechts één reekskolom), daarnaast een live-voorbeeld dat precies
laat zien hoe de grafiek later op de pagina zal verschijnen. Zolang er nog niets
is aangemaakt, legt de editor de begrippen uit en biedt hij „Voorbeeld laden“
en „Lege tabel aanmaken“ aan — afhankelijk van het gekozen type met een ander,
bijpassend voorbeeld. Het tekstveld erachter toont alleen de technisch
opgeslagen, gecodeerde vorm van de gegevens en wordt nooit handmatig bewerkt.

Als het dialoogvenster smal is (bijv. op kleine schermen), verschuift het
voorvertoning onder het raster en — bij een breedte van minder dan ongeveer 700 pixels — wordt
het raster een reeks grafieken, één per as. Het dialoogvenster scrolt
daarbij nooit horizontaal.

Een belangrijk bijzonderheid bij de radar: de assen hebben **geen zichtbare
cijferlijke schaal**. Meerdere assen met verschillende eenheden (bijv.
kilometers en minuten) kunnen niet op een zinvolle manier op één gemeenschappelijke schaal
worden weergegeven. Elke as wordt daarom intern afzonderlijk uitgerekt: van nul tot
de grootste waarde. De daadwerkelijke getallen staan bij de gegevenspunten,
in de tooltip en in de gegevenstabel. Staaf- en lijngrafieken tonen
daarentegen een echte, door ECharts berekende en gelabelde waardeas.
Meer hierover onder [Instellingen](settings.md).
