# Diagram

De diagramwidget geeft kengetallen weer als een **radar-/netdiagram**: meerdere
assen lopen stervormig uit vanuit een middelpunt, en elke reeks — bijvoorbeeld
een voertuig in vergelijking — verbindt zijn waarden op deze assen tot
een vlak. Zo kunnen meerdere kengetallen van verschillende reeksen in één
oogopslag worden vergeleken, ook al worden ze in heel verschillende eenheden gemeten
— kilometers, tonnen, minuten, kilowatt.

Het diagram wordt ingesteld via een eigen editor, die direct in
de widgetinstellingen wordt geopend. Een uit Excel gekopieerde tabel kan
daar met één klik worden overgenomen, zie [Stap voor stap](usage.md).

Andere diagramtypes (bijv. staaf- of lijndiagrammen) zijn gepland voor toekomstige
versies, maar **nog niet beschikbaar** — momenteel kan alleen
het radar-/netdiagram worden geselecteerd.

## Wat lezers zien

- De grafiek zelf, met een willekeurig aantal assen en reeksen.
- De waarden staan direct bij de gegevenspunten; bovendien verschijnt er bij
  het aanwijzen van een punt een tooltip met alle waarden van de reeks.
- Een legenda boven of onder de grafiek, afhankelijk van de instelling.
- Optioneel een titel en een voetnoot.
- Als het downloaden is toegestaan (zie [Instellingen](settings.md)), twee knoppen
  onder de grafiek om als afbeelding te downloaden.
- Voor schermlezers bovendien een volledige gegevenstabel onder de
  grafiek. Deze is visueel verborgen, maar wel aanwezig — de grafiek is
  daardoor ook zonder visuele waarneming bruikbaar.

## Afbeelding exporteren

Als downloaden is ingeschakeld, verschijnen er onder de grafiek twee knoppen:
„Als SVG“ en „Als PNG“. Het gedownloade bestand bevat **alleen de
grafiek**, niet de rest van de pagina — titel, legenda, assen en waarden
precies zoals ze op dat moment worden weergegeven, met een witte achtergrond (ook als
de pagina zelf een transparante of donkere achtergrond heeft). Het SVG-bestand kan
zonder kwaliteitsverlies worden vergroot; de PNG is geschikt voor situaties waarin geen SVG
kan worden ingesloten (bijv. de meeste presentatieprogramma’s) en wordt gegenereerd in
dubbele resolutie.

## Vertaling

Bij de automatische paginavertaling wordt de grafiek meegenomen. Vertaald
worden titels, voetnoten, aslabels en reeksnamen — precies de
teksten die redactioneel zijn ingevoerd. Getallen, eenheden, asgrenzen,
kleuren en alle overige instellingen blijven ongewijzigd, omdat ze geen
taal hebben: een vertaalde eenheid zou onjuist zijn („t“ wordt geen „ton“),
een vertaald getal zou onzin zijn.

## Wat u in de CMS-editor ziet

Bij het invoegen van het bouwsteen wordt automatisch de **diagram-editor** geopend:
bovenaan de keuze van het diagramtype en een veld waarin een uit Excel gekopieerde
kan worden ingevoegd, daaronder een raster met **één rij per as** en
**één kolom per reeks**, daarnaast een live-voorbeeld dat precies laat zien hoe
de grafiek later op de pagina zal verschijnen. Zolang er nog niets is aangemaakt,
legt de editor de begrippen uit en biedt hij de opties „Voorbeeld laden“ en
„Lege tabel aanmaken“ aan. Het tekstveld daarachter toont alleen de technisch
opgeslagen, gecodeerde vorm van de gegevens en wordt nooit handmatig bewerkt.

Een belangrijk bijzonderheid: de assen hebben **geen zichtbare getallenschaal**.
Meerdere assen met verschillende eenheden (bijv. kilometer en minuten)
kunnen niet op een zinvolle manier op één gemeenschappelijke schaal worden weergegeven. Elke as
wordt daarom intern zelfstandig uitgerekt tussen de kleinste en grootste waarde;
de daadwerkelijke getallen staan bij de gegevenspunten, in de tooltip en
in de gegevenstabel. Meer hierover onder [Instellingen](settings.md).
