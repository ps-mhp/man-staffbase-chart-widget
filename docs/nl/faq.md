# Veelgestelde vragen

Elke melding die het diagram in plaats van de grafiek kan weergeven, als vraag —
met de exacte bewoording, zodat deze via de zoekfunctie te vinden is.

**Vraag:** Ik zie de melding „Nog geen diagram ingesteld. Open
de instellingen van het blok.“

Antwoord: Voor dit blok is nog geen configuratie opgeslagen.
Open de widgetinstellingen, vul de diagram-editor in en sla deze op.

**Vraag:** Ik zie de melding „Het diagram kon niet worden gelezen.
Stel het opnieuw in via de instellingen.“

Antwoord: De opgeslagen gegevens zijn beschadigd of handmatig gewijzigd
. Open de widgetinstellingen en stel het diagram opnieuw in
in de editor — indien nodig via een nieuw ingevoegde tabel.

**Vraag:** Ik zie de melding „Het diagramtype „…“ is niet bekend bij deze versie van de
module. Werk de module bij.“ (of zonder
vermelde typenaam: „Het ingestelde diagramtype is niet bekend bij deze versie van de
module niet bekend. Werk de module bij.”)

Antwoord: De grafiek is ingesteld met een nieuwere versie van de module
die een grafiektype kent dat deze versie nog niet
ondersteunt. Werk de module bij naar de nieuwste versie.

**Vraag:** Ik zie de melding „Nog geen gegevens in de grafiek. Voeg
categorieën en reeksen toe in de instellingen.“

Antwoord: Er zijn noch categorieën (assen) noch reeksen aangemaakt in de diagram-editor.
Voeg ten minste één categorie en één reeks toe of voeg een
tabel in.

**Vraag:** Ik zie de melding „Het diagram kon niet worden geladen.
Laad de pagina opnieuw.”

Antwoord: De grafiekbibliotheek kon niet opnieuw worden geladen, meestal als gevolg van
een onderbroken internetverbinding. Laad de pagina opnieuw; als het probleem
blijft bestaan, controleer dan de netwerkverbinding.

**Vraag:** Waarom is mijn diagram leeg, terwijl er gegevens zijn ingevoerd?

Antwoord: Meestal staat het bouwsteen in een zeer smalle kolom of in een
ingeklapt element, waardoor de container een hoogte van 0 heeft. De grafiek
blijft dan permanent leeg, omdat er geen ruimte is om te tekenen. Verplaats het
bouwsteen naar een bredere kolom of vouw het element uit.

**Vraag:** Waarom zie ik bij twee bijna gelijke waarden een groot
verschil in de grafiek?

Antwoord: Zonder ingestelde minimum- en maximumwaarden strekt elke as zich automatisch uit
tussen de kleinste en grootste voorkomende waarde — daardoor lijken ook
kleine verschillen visueel groot. Oplossing: Stel in de diagram-editor voor de
betrokken as handmatig minimum- en maximumwaarden in.

**Vraag:** Waarom ligt de slechtere waarde verder naar buiten?

Antwoord: Bij deze as ontbreekt de schakelaar „Kleiner is beter“. Deze moet worden
ingeschakeld bij alle kengetallen waarbij een kleinere waarde het betere
resultaat is — bijvoorbeeld gewicht, verbruik of laadtijd. Schakel deze in de grafiek-editor in bij
de betreffende as.

**Vraag:** Ik zie geen knoppen om te downloaden onder de grafiek.

Antwoord: Ofwel is „Download toestaan“ in de instellingen niet
ingeschakeld, ofwel is de grafiek nog niet helemaal getekend — de
knoppen verschijnen pas zodra er een afbeelding beschikbaar is om te downloaden.

**Vraag:** Als ik op „Als SVG“ of „Als PNG“ klik, verschijnt de melding „Het exporteren is
mislukt. Probeer het opnieuw.“

Antwoord: De export kon de getekende grafiek niet vinden — meestal omdat
deze op dat moment opnieuw wordt geladen. Wacht even en klik nogmaals; als het probleem
blijft bestaan, laad de pagina dan opnieuw.

**Vraag:** Kan ik meer dan zes reeksen weergeven?

Antwoord: Ja. Het MAN-kleurenpalet heeft zes kleuren; vanaf de zevende reeks
herhalen de kleuren zich. De reeksen blijven niettemin duidelijk
van elkaar te onderscheiden, omdat elk gegevenspunt zijn waarde als label draagt en
de naam en waarden van elke reeks in de tooltip en legenda staan.

**Vraag:** Wat gebeurt er met mijn diagram bij de automatische
vertaling van de pagina?

Antwoord: Titels, voetnoten, aslabels en
reeksnamen worden vertaald. Getallen, eenheden, asgrenzen, kleuren en alle overige
instellingen blijven ongewijzigd.

**Vraag:** Een ingevoerd getal is plotseling een factor 1000 te groot of
te klein.

Antwoord: De grafiek-editor interpreteert getallen volgens de Duitse notatie: een punt geldt als
duizendseparator, een komma als decimaalteken. Van `1.234` wordt
dus `1234` en niet `1,234`. Wie een tabel met Engelse notatie
invoegt (punt als decimaalteken), moet de betreffende getallen vóór het
invoegen in het Duitse formaat brengen, anders wordt bijvoorbeeld „1.234“ (duizend)
gelezen als „1,234“ (één komma twee drie vier). Als een getal zowel
een punt als een komma bevat, geldt ongeacht de schrijfwijze het laatst
staande teken als decimaalteken — `1.234,5` en `1,234.5` leveren
beide `1234,5` op.
