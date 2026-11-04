# Passo dopo passo

Prendendo come esempio un confronto tra veicoli (MAN eTGX rispetto a un concorrente) basato su
sei indicatori con unità diverse, rappresentato sotto forma di diagramma a rete; i
passaggi si applicano, mutatis mutandis, anche agli altri tre tipi.

## Configurazione del diagramma

1. Posizionare il widget **Diagramma** sulla pagina. Si aprono le impostazioni del widget
   e al loro interno compare immediatamente l’**editor del diagramma** sopra il
   campo vero e proprio. In alto è presente una barra di controllo con **Salva**,
   **Aiuto** (apre un pannello a scorrimento con le stesse spiegazioni presenti in questa
   documentazione) e **Chiudi**; rimane fissa durante lo scorrimento, anche
   in presenza di una griglia di dati estesa.
2. Nella parte superiore dell’editor è indicato il **tipo di grafico**: **grafico a rete (radar /
   a ragnatela)**, **grafico a barre (colonne)**, **grafico a linee (andamento)** o
   **grafico a torta (torta / anello)**; il testo sottostante indica a cosa serve il
   tipo selezionato. Se si cambia tipo in un secondo momento, non si perdono
   dati: assi, serie, titolo e legenda vengono mantenuti, solo i
   campi specifici del tipo (ad es. minimo/massimo nel grafico radar) vengono
   nascosti, finché il tipo non viene selezionato nuovamente.
3. Finché non ci sono ancora dati, la sezione **«Assi e
   serie»** offre due opzioni: **«Carica esempio»** inserisce un esempio adatto al
   tipo selezionato, che si può semplicemente sovrascrivere, mentre
   **«Crea tabella vuota»** crea assi e serie da compilare.
4. Il metodo consigliato è tuttavia **«Importa dati da una tabella»** in
   alto: selezionare la tabella di confronto in Excel, PowerPoint o Word,
   copiarla e incollarla nel campo. Sotto, specificare **come è strutturata la tabella
   deve essere disposta** — l’impostazione predefinita è «un indicatore per riga, una
   variante per colonna», ovvero proprio come appare la tabella nell’editor sottostante.
   Quindi fare clic su **«Importa tabella»**. Questo passaggio è uguale per tutti e
   quattro i tipi.
5. Nella griglia **ogni riga è un asse** e **ogni colonna a destra è una
   serie** — nel grafico a torta la griglia mostra **solo la prima
   colonna della serie**; una nota sottostante chiarisce che altre serie
   rimangono salvate, ma non vengono tracciate, in modo che ciò non sembri una
   perdita di dati. In alto in ogni colonna della serie si trovano il nome, il colore e
   le frecce per riordinare; alla fine di ogni riga dell’asse le frecce e la
   croce relative a quell’asse.
6. Inserire l’**unità** per ciascun asse (ad es. «kWh»). Un **interruzione di riga nel
   nome dell’asse** — con il tasto Invio — viene riportata nel grafico e
   mantiene leggibili le etichette lunghe. Nel grafico a torta è possibile
   inoltre impostare un proprio **colore del segmento** per ciascun asse.
7. Solo nel grafico a rete: per gli assi in cui un **valore più piccolo
   è migliore** — peso, consumo, tempo di ricarica —, nella colonna **Direzione**
   attivare l’opzione **«più piccolo è meglio»**. Senza di esso, il
   valore peggiore (più grande) si troverebbe più all’esterno e il grafico indicherebbe esattamente il
   contrario di ciò che si intende.
8. Le **cifre decimali** per ciascun asse si impostano tramite l’opzione
   **«Regolazioni di precisione per asse»**; **Minimo** e **Massimo** lì
   compaiono solo nel grafico a rete, poiché le barre e la linea tracciano un unico
   asse dei valori calcolato da ECharts. Nel caso normale non sono necessari
  ; se sono vuoti significa «derivati dai valori».
9. In **«Titolo, legenda e rappresentazione»** inserire titolo e nota a piè di pagina,
   posizionare o nascondere la **legenda** (nei grafici a torta elenca gli
   assi, altrimenti le serie) e impostare le opzioni di visualizzazione adeguate al tipo di grafico
   : per il grafico a radar **Linee ausiliarie nella griglia** e **Riempi area**,
   per il grafico a barre **Impila** e **Direzione** (verticale/orizzontale), per il grafico a linea
   **Smussa linee**, **riempire l’area** e **mostrare i punti**; per il grafico a torta
   **raggio interno** (0 = cerchio completo, valore maggiore = anello) e
   **etichetta segmento** (percentuale, valore assoluto, entrambi o disattivata).
10. L’**anteprima** mostra costantemente come apparirà il grafico sulla pagina
    e rimane fissa durante lo scorrimento. Se la finestra di dialogo è abbastanza larga
    (a partire da circa 900 pixel), rimane accanto al campo di immissione; al di sotto di tale larghezza si sposta
    sotto la griglia, e al di sotto di circa 700 pixel la griglia si trasforma
    in una sequenza di schede, una per ogni asse. La finestra di dialogo non scorre mai
    in orizzontale.
11. Impostare l’**altezza** del grafico (vedi [Impostazioni](settings.md)).
12. Se si desidera che il grafico possa essere scaricato come immagine, attivare l’opzione
    **«Consenti download»** (vedi [Impostazioni](settings.md)).
    Sotto il grafico compaiono quindi due pulsanti, «Come SVG» e
    «Come PNG» — il funzionamento è lo stesso per tutti e quattro i tipi.
13. Fare clic su **Salva**, poi su **Chiudi**. Solo cliccando su «Salva»
    i dati vengono trasferiti nel widget; finché accanto ai pulsanti compare la scritta «Modifiche non salvate»,
    non è stato applicato nulla.

## Modifiche successive

1. Riaprire le impostazioni del widget: l’editor del grafico riappare
   con lo stato salvato per ultimo, compreso il tipo di grafico.
2. Sovrascrivere i valori direttamente nella griglia o inserire nuovamente una tabella
   aggiornata. Gli assi e le serie con lo stesso nome mantengono le unità,
   le direzioni degli assi e i colori già impostati — vengono sostituiti solo i valori.
3. Salvare e chiudere come sopra.

## Se qualcosa non funziona

1. Se al posto del grafico compare un messaggio di avviso, la causa è già indicata
   al suo interno — consultare le [FAQ](faq.md) per ogni possibile formulazione.
2. Se la tabella inserita non viene applicata, verificare che abbia
   intestazioni nella prima riga e nella prima colonna. Se
   gli assi e le serie sono invertiti nella griglia, la direzione di lettura sotto il
   campo di inserimento è stata selezionata in modo errato — invertirla e applicare nuovamente.
3. Se dopo l’inserimento il grafico mostra valori errati (ad es. spostati di un fattore
   1000), nella maggior parte dei casi si tratta del separatore delle migliaia nei
   i numeri provenienti da una fonte non tedesca — consultare le note sui numeri in
   [Impostazioni](settings.md) e [FAQ](faq.md).
4. Nel grafico a torta l’area rimane vuota, sebbene siano stati inseriti dei valori
   : o tutti i valori della prima serie hanno valore zero o
   mancano (`null`), oppure almeno un valore è negativo — in questo caso
   il grafico mostra un messaggio di avviso con il nome dell’asse interessato
   invece di un grafico a torta errato.
