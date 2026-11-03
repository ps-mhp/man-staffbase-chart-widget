# Domande frequenti

Ogni messaggio che il diagramma può visualizzare al posto del grafico, sotto forma di domanda —
con il testo esatto, in modo che sia reperibile tramite la ricerca.

**Domanda:** Vedo il messaggio «Grafico non ancora configurato. Aprire
le impostazioni del widget.»

Risposta: Per questo widget non è stata ancora salvata alcuna configurazione.
Aprire le impostazioni del widget, compilare l’editor del grafico e salvare.

**Domanda:** Vedo il messaggio «Impossibile leggere il grafico.
Si prega di configurarlo nuovamente nelle impostazioni.»

Risposta: I dati salvati sono danneggiati o sono stati modificati manualmente
. Aprire le impostazioni del widget e riconfigurare il grafico nell’editor
— se necessario, tramite una tabella appena inserita.

**Domanda:** Vedo il messaggio «Il tipo di grafico «…» non è riconosciuto da questa versione del
modulo. Si prega di aggiornare il modulo.» (oppure, senza
il nome del tipo specificato: «Il tipo di grafico configurato non è riconosciuto da questa versione del
modulo. Si prega di aggiornare il modulo.”)

Risposta: Il grafico è stato configurato con una versione più recente del modulo
che riconosce un tipo di grafico non ancora
supportato da questa versione. Aggiornare il modulo all’ultima versione.

**Domanda:** Vedo il messaggio «Ancora nessun dato nel grafico. Creare
assi e serie nelle impostazioni.»

Risposta: Non sono stati creati né assi né serie nell’editor dei grafici. Nell’
inserire una tabella nell’editor oppure utilizzare uno dei due pulsanti «Carica esempio»
o «Crea tabella vuota».

**Domanda:** Dopo l’inserimento, i miei indicatori risultano come serie e le mie
varianti come assi — tutto invertito.

Risposta: Sotto il campo di inserimento era stata selezionata la direzione di lettura errata. Passare all’
altra opzione in «Come è orientata la tua tabella?» e cliccare nuovamente su
«Applica tabella».

**Domanda:** L’etichetta del mio asse è così lunga che comprime il grafico
.

Risposta: Nel campo dell’asse, premere il tasto Invio nel punto desiderato
. L’interruzione di riga verrà applicata al grafico.

**Domanda:** Vedo il messaggio «Impossibile caricare il grafico.
Si prega di ricaricare la pagina.»

Risposta: Non è stato possibile ricaricare la libreria dei grafici, solitamente a causa di
una connessione Internet interrotta. Ricaricare la pagina; se il problema
persiste, controllare la connessione di rete.

**Domanda:** Perché il mio grafico è vuoto, nonostante siano stati inseriti dei dati?

Risposta: Spesso il blocco si trova in una colonna molto stretta o in un
elemento compresso, per cui il contenitore ha altezza 0. Il grafico
rimane quindi permanentemente vuoto perché non ha spazio per essere disegnato. Spostare il
componente in una colonna più ampia oppure espandere l’elemento.

**Domanda:** Perché vedo una grande
differenza nel grafico tra due valori quasi identici?

Risposta: Senza un valore massimo impostato, ogni asse si estende fino al valore più grande che
vi compare. Se due valori sono vicini tra loro, ma lontani da zero,
la parte superiore dell’asse occupa l’intero intervallo — la differenza
sembra quindi maggiore di quanto non sia in realtà. Soluzione: nell’editor del grafico,
impostare manualmente il minimo e il massimo per l’asse in questione.

**Domanda:** Perché il valore peggiore si trova più all’esterno?

Risposta: su questo asse manca l’opzione «Più piccolo è meglio». Deve essere attivato per
tutti gli indicatori in cui un valore più basso rappresenta il risultato migliore
— ad esempio peso, consumo o tempo di ricarica. Attivarlo nell’editor dei grafici per
l’asse corrispondente.

**Domanda:** Non vedo i pulsanti per il download sotto il grafico.

Risposta: O l’opzione «Consenti download» nelle impostazioni non è
attivata, oppure il grafico non è ancora stato completato — i
pulsanti compaiono solo quando è disponibile un grafico da scaricare.

**Domanda:** Cliccando su «Come SVG» o «Come PNG» compare il messaggio «L’esportazione è
fallita. Si prega di riprovare.»

Risposta: L’esportazione non è riuscita a trovare il grafico disegnato — solitamente perché
si sta ricaricando. Attendere qualche istante e cliccare di nuovo; se il problema
persiste, ricaricare la pagina.

**Domanda:** Posso visualizzare più di sei serie?

Risposta: Sì. La tavolozza dei colori MAN ha sei colori; a partire dalla settima serie
i colori si ripetono. Le serie rimangono comunque chiaramente
distinguibili, poiché ogni punto dati riporta il proprio valore come etichetta e
il nome e i valori di ogni serie sono indicati nel tooltip e nella legenda.

**Domanda:** Cosa succede al mio grafico durante la traduzione automatica
della pagina?

Risposta: Vengono tradotti il titolo, la nota a piè di pagina, le etichette degli assi e
i nomi delle serie. Numeri, unità di misura, limiti degli assi, colori e tutte le altre
impostazioni rimangono invariati.

**Domanda:** Un numero inserito risulta improvvisamente troppo grande o
troppo piccolo di un fattore 1000.

Risposta: L’editor dei grafici interpreta i numeri secondo le convenzioni tedesche: il punto è considerato
il separatore delle migliaia, mentre la virgola è il separatore decimale. Quindi `1.234` diventa
`1234` e non `1,234`. Chi inserisce una tabella con la notazione inglese
(punto come separatore decimale) deve convertire i numeri interessati nel
convertirli nel formato tedesco; altrimenti, ad esempio, «1.234» (mille)
verrà letto come «1,234» (uno virgola due tre quattro). Se in un numero sono presenti sia
il punto che la virgola, indipendentemente dal formato, l’ultimo
carattere viene considerato come separatore decimale — `1.234,5` e `1,234.5` danno
entrambi `1234,5`.
