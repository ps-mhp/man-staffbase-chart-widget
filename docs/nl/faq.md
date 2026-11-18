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

**Vraag:** Ik zie de melding „Nog geen gegevens in de grafiek. Maak in
de instellingen assen en reeksen aan.“

Antwoord: Er zijn noch assen, noch reeksen aangemaakt in de diagram-editor. Im
editor via „Uit Excel invoegen“ een tabel overnemen of een van de
twee knoppen „Voorbeeld laden“ of „Lege tabel aanmaken“
gebruiken.

**Vraag:** Na het invoegen staan mijn kengetallen als reeksen en mijn
varianten als assen — alles is omgedraaid.

Antwoord: In de balk „Uit Excel invoegen“ was de verkeerde leesrichting
geselecteerd. Schakel bij „Hoe staat de tabel?“ over naar de andere optie en
klik opnieuw op „Tabel overnemen“.

**Vraag:** Mijn aslabel is zo lang dat het de grafiek
samenperst.

Antwoord: Druk in de naam van de as – in het raster of onder „As“ bij
„Naam“ – op de gewenste plaats op de Enter-toets. De
regeleinde wordt overgenomen in de grafiek.

**Vraag:** Ik krijg de melding „„…“ heeft een negatieve waarde. Een
cirkeldiagram kan geen negatieve aandelen weergeven.“ (of zonder genoemde
categorie: „Een cirkeldiagram kan geen negatieve aandelen weergeven.“)

Antwoord: Een cirkeldiagram toont de verdeling van een geheel; een negatief
aandeel heeft daarin geen tegenhanger. Corrigeer de genoemde categorie in de
diagram-editor naar een waarde vanaf nul — of schakel over naar
**staafdiagram**, dat negatieve waarden kan weergeven. De editor laat
een negatief aandeel in de cirkel helemaal niet toe; de melding
kan alleen voorkomen bij een diagram uit een oudere versie.

De melding blokkeert opzettelijk de hele grafiek, in plaats van alleen het negatieve
segment weg te laten: een cirkeldiagram verdeelt de resterende waarden over de
volledige cirkel, waardoor er een volledig ogende grafiek zou ontstaan met
impliciet verhoogde percentages.

**Vraag:** Ik zie de melding „De grafiek kon niet worden geladen.
Laad de pagina opnieuw.”

Antwoord: De grafiekbibliotheek kon niet opnieuw worden geladen, meestal door
een onderbroken internetverbinding. Laad de pagina opnieuw; als het probleem
blijft bestaan, controleer dan de netwerkverbinding.

**Vraag:** Waarom is mijn grafiek leeg, terwijl er gegevens zijn ingevoerd?

Antwoord: Meestal staat het bouwsteen in een zeer smalle kolom of in een
ingeklapt element, waardoor de container de hoogte 0 heeft. De grafiek
blijft dan permanent leeg, omdat er geen ruimte is om te tekenen. Verplaats het
blok naar een bredere kolom verplaatsen of het element uitklappen.

**Vraag:** Waarom zie ik bij twee bijna gelijke waarden een groot
verschil in de grafiek?

Antwoord: Zonder ingestelde maximumwaarde reikt elke as tot de grootste waarde die
erop voorkomt. Als twee waarden dicht bij elkaar liggen, maar ver van nul
af, beslaat het bovenste deel van de as de gehele afstand — het verschil
lijkt daardoor groter dan het in werkelijkheid is. Oplossing: Selecteer in de diagram-editor de
betrokken as en stel onder „As“ het minimum en maximum handmatig
in.

**Vraag:** Waarom ligt de slechtere waarde verder naar buiten?

Antwoord: Bij deze as ontbreekt de schakelaar „Kleiner is beter“. Deze moet worden
ingeschakeld bij alle kengetallen waarbij een kleinere waarde het betere
resultaat is — bijvoorbeeld gewicht, verbruik of laadtijd. Selecteer in de grafiek-editor de
as en schakel deze in onder „As“.

**Vraag:** Ik zie geen knoppen om te downloaden onder de grafiek.

Antwoord: Ofwel is „Download toestaan“ in de diagram-editor onder
„Gedrag“ niet ingeschakeld, ofwel is het diagram nog niet volledig getekend — de
knoppen verschijnen pas zodra er een afbeelding beschikbaar is om te downloaden.

**Vraag:** Als ik op „Als SVG“ of „Als PNG“ klik, verschijnt de melding „Het exporteren is
mislukt. Probeer het opnieuw.“

Antwoord: Het exporteren kon de getekende grafiek niet vinden — meestal omdat
deze op dat moment opnieuw wordt geladen. Wacht even en klik nogmaals; als het probleem
blijft bestaan, laad de pagina dan opnieuw.

**Vraag:** Kan ik meer dan zes rijen weergeven?

Antwoord: Ja. Het MAN-kleurenpalet heeft zes kleuren; vanaf de zevende rij
herhalen de kleuren zich. De rijen blijven niettemin duidelijk
van elkaar te onderscheiden, omdat elk gegevenspunt zijn waarde als label draagt en
de naam en waarden van elke rij in de tooltip en legenda staan. Onder „Gegevens“
kan aan elke rij ook een eigen kleur worden toegewezen.

**Vraag:** Wat gebeurt er met mijn diagram bij de automatische
vertaling van de pagina?

Antwoord: Titels, voetnoten, aslabels en
reeksnamen worden vertaald. Getallen, eenheden, asgrenzen, kleuren en alle overige
instellingen blijven ongewijzigd.

**Vraag:** Een ingevoerd getal is plotseling een factor 1000 te groot of
te klein.

Antwoord: De grafiekeditor leest getallen op de Duitse manier – bij het typen, bij het
invoegen in het raster en bij „Uit Excel invoegen“: een punt geldt als
scheidingsteken voor duizendtallen, een komma als decimaalteken. Van `1.234` wordt
dus `1234` en niet `1,234`. Wie een tabel met Engelse notatie
invoegt (punt als decimaalteken), moet de betreffende getallen vóór het
invoegen in het Duitse formaat brengen, anders wordt bijvoorbeeld „1.234“ (duizend)
gelezen als „1,234“ (één komma twee drie vier). Als een getal zowel
een punt als een komma bevat, geldt ongeacht de schrijfwijze het laatst
staande teken als decimaalteken — `1.234,5` en `1,234.5` leveren
beide `1234,5` op.

**Vraag:** Waar zijn de velden „Hoogte in pixels“ en „Download toestaan“ in het
Staffbase-dialoogvenster gebleven?

Antwoord: Beide staan nu in de diagram-editor: de hoogte onder
„Ontwerp“, de downloadoptie onder „Gedrag“. De oude velden zijn
verborgen. Oudere diagrammen behouden hun waarden; de editor neemt deze over
bij het openen, en zonder wijzigingen blijft het diagram op de pagina zoals het was.

**Vraag:** „Toepassen“ doet niets, bovenaan staat „As „…“: Maximum te klein’.

Antwoord: In het raster is voor deze as een maximum ingevoerd dat niet
groter is dan het minimum. De as is in het raster gemarkeerd; onder ‘As’
het maximum verhogen of het veld leegmaken – leeg betekent ‘afgeleid uit de waarden
’.
