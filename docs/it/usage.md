# Passo dopo passo

Prendiamo come esempio un confronto tra veicoli (MAN eTGX rispetto a un concorrente) basato su
sei indicatori con unità di misura diverse.

## Configurazione del grafico

1. Posizionare il widget **Grafico** sulla pagina. Si aprono le impostazioni del widget
   e al loro interno compare immediatamente l’**editor del grafico** sopra il
   campo vero e proprio.
2. In alto è indicato il **tipo di grafico**. Al momento è disponibile solo «Grafico a rete
   (Radar / Ragno)»; il testo sottostante spiega a cosa serve questo tipo di grafico.
3. Finché non ci sono ancora dati, la sezione **«Assi e
   serie»** offre due opzioni: **«Carica esempio»** inserisce il confronto già pronto
   tra MAN eTGX e Mercedes-Benz eActros 600, che si può semplicemente
   sovrascrivere, mentre **«Crea tabella vuota»** propone tre assi e due
   serie da compilare.
4. Il metodo consigliato è tuttavia **«Importa dati da una tabella»** in
   alto: selezionare la tabella di confronto in Excel, PowerPoint o Word,
   copiarla e incollarla nel campo. Sotto, specificare **come è strutturata la tabella
  ** — l’impostazione predefinita è «un indicatore per riga, una
  variante per colonna», ovvero proprio come appare la tabella nell’editor sottostante.
  Quindi fare clic su **«Importa tabella»**.
5. Nella griglia **ogni riga è un asse** e **ogni colonna a destra è una
   serie**. In alto in ogni colonna della serie si trovano il nome, il colore e le frecce per
   riordinare; alla fine di ogni riga dell’asse si trovano le frecce e la croce relative a quell’
   asse.
6. Inserire l’**unità** per ciascun asse (ad es. «kWh»). Un **cambio di riga nel
   nome dell’asse** — con il tasto Invio — viene riportato nel grafico e
   mantiene leggibili le etichette lunghe.
7. Per gli assi in cui un **valore più piccolo è migliore** — peso,
   consumo, tempo di ricarica —, nella colonna **Direzione** attivare l’opzione
   **«più piccolo è meglio»**. Senza di esso, il valore peggiore
   (più grande) risulterebbe più esterno, e il grafico indicherebbe esattamente il contrario di
   ciò che si intende: in un confronto deve sempre valere «più esterno =
   migliore».
8. **Cifre decimali**, **minimo** e **massimo** per ciascun asse si trovano dietro
   l’interruttore **«Regolazioni di precisione per ciascun asse»**. Normalmente non sono necessari;
   se lasciati vuoti, significa «derivati dai valori».
9. In **«Titolo, legenda e rappresentazione»** inserire titolo e nota a piè di pagina,
   posizionare o nascondere la **legenda** e, nel diagramma a rete, impostare le
   **linee guida nella rete** e il **riempimento delle aree**.
10. L’**anteprima** a destra mostra in ogni momento come apparirà il grafico sulla pagina
    e rimane fissa durante lo scorrimento.
11. Impostare l’**altezza** del grafico (vedi [Impostazioni](settings.md)).
12. Se si desidera che il diagramma possa essere scaricato come immagine, attivare l’interruttore
    **«Consenti download»** (vedi [Impostazioni](settings.md)).
    Sotto il diagramma appariranno quindi due pulsanti, «Come SVG» e
    «Come PNG».
13. Fare clic su **Salva**, poi su **Chiudi**. Solo cliccando su «Salva» i
    dati vengono trasferiti nel widget; finché accanto ai pulsanti compare la scritta «Modifiche non salvate»,
    non è stato applicato nulla.

## Modificare in un secondo momento

1. Riaprire le impostazioni del widget: l’editor del grafico apparirà
   nuovamente con lo stato salvato per ultimo.
2. Sovrascrivere i valori direttamente nella griglia o inserire nuovamente una tabella
   aggiornata. Gli assi e le serie con lo stesso nome mantengono le
   unità, le direzioni degli assi e i colori già impostati — vengono
   sostituiti solo i valori.
3. Salvare e chiudere come sopra.

## Se qualcosa non funziona

1. Se al posto del grafico compare un messaggio di avviso, in esso è già indicata la
   causa — consultare le [FAQ](faq.md) per ogni possibile formulazione.
2. Se la tabella inserita non viene applicata, verificare che abbia
   intestazioni nella prima riga e nella prima colonna. Se
   gli assi e le serie sono invertiti nella griglia, la direzione di lettura sotto il
   campo di inserimento è stata selezionata in modo errato — modificarla e applicare nuovamente.
3. Se dopo l’inserimento il grafico mostra numeri errati (ad es. spostati di un fattore
   1000), si tratta solitamente del separatore delle migliaia nei
   numeri provenienti da una fonte non tedesca — consultare le indicazioni sui numeri in
   [Impostazioni](settings.md) e [FAQ](faq.md).
