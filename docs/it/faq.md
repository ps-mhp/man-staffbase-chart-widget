# Domande frequenti

Ogni messaggio che il diagramma può visualizzare al posto del grafico, sotto forma di domanda —
con il testo esatto, in modo che sia reperibile tramite la ricerca.

**Domanda:** Vedo il messaggio «Diagramma non ancora configurato. Aprire
le impostazioni del widget.»

Risposta: Per questo widget non è stata ancora salvata alcuna configurazione.
Aprire le impostazioni del widget, compilare l’editor del diagramma e salvare.

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

**Domanda:** Viene visualizzato il messaggio «Nessun dato nel grafico. Creare
assi e serie nelle impostazioni.»

Risposta: Nell’editor del grafico non sono stati creati né assi né serie. Nell’
editor, importare una tabella tramite «Inserisci da Excel» oppure utilizzare uno dei
due pulsanti «Carica esempio» o «Crea tabella vuota»
.

**Domanda:** Dopo l’inserimento, i miei indicatori risultano come serie e le mie
varianti come assi — tutto invertito.

Risposta: Nella barra «Inserisci da Excel» era stata selezionata la direzione di lettura errata
. In «Come è orientata la tabella?» selezionare l’altra opzione e
fare nuovamente clic su «Importa tabella».

**Domanda:** L’etichetta del mio asse è così lunga che comprime il grafico
.

Risposta: Nel nome dell’asse – nella griglia o alla voce «Asse» in
«Etichetta» – premere il tasto Invio nel punto desiderato. L’
interruzione di riga verrà riportata nel grafico.

**Domanda:** Vedo il messaggio «“...” ha un valore negativo. Un
grafico a torta non può rappresentare quote negative.» (oppure, senza la categoria specificata:
«Un grafico a torta non può rappresentare quote negative.»)

Risposta: Un grafico a torta mostra la suddivisione di un tutto; una quota negativa
non ha alcun corrispondente al suo interno. Correggere la categoria indicata nell’
editor del grafico impostando un valore diverso da zero — oppure passare a un
**grafico a barre**, che può rappresentare valori negativi. L’editor non
consente affatto l’inserimento di una quota negativa nel grafico a torta; il messaggio
può essere visualizzato solo in un grafico di una versione precedente.

Il messaggio blocca intenzionalmente l’intero grafico, invece di omettere solo il
segmento negativo: un grafico a torta distribuisce i valori rimanenti sul
cerchio completo, quindi si otterrebbe un grafico che appare completo con
percentuali implicitamente aumentate.

**Domanda:** Vedo il messaggio «Impossibile caricare il grafico.
Si prega di ricaricare la pagina.»

Risposta: Non è stato possibile ricaricare la libreria dei grafici, solitamente a causa di
una connessione Internet interrotta. Ricaricare la pagina; se il problema
persiste, controllare la connessione di rete.

**Domanda:** Perché il mio grafico è vuoto, nonostante siano stati inseriti dei dati?

Risposta: Di solito il modulo si trova in una colonna molto stretta o in un
elemento compresso, per cui il contenitore ha altezza 0. Il grafico
rimane quindi permanentemente vuoto, poiché non ha spazio per essere disegnato. Spostare il
spostare il blocco in una colonna più ampia oppure espandere l’elemento.

**Domanda:** Perché vedo una grande
differenza nel grafico tra due valori quasi identici?

Risposta: Se non è impostato un valore massimo, ogni asse si estende fino al valore più grande che
vi compare. Se due valori sono vicini tra loro, ma lontani da zero,
la parte superiore dell’asse occupa l’intero intervallo — la differenza
sembra quindi maggiore di quanto non sia in realtà. Soluzione: nell’editor del grafico selezionare l’
asse in questione e impostare manualmente il minimo e il massimo nella sezione «Asse»
.

**Domanda:** Perché il valore peggiore si trova più all’esterno?

Risposta: Su questo asse manca l’opzione «Più piccolo è meglio». Deve essere attivata per
tutti gli indicatori in cui un valore più piccolo rappresenta il risultato migliore
— ad esempio peso, consumo o tempo di ricarica. Nell’editor dei grafici,
selezionare l’asse e attivare l’opzione nella sezione «Asse».

**Domanda:** Non vedo i pulsanti per il download sotto il grafico.

Risposta: O l’opzione «Consenti download» nell’editor dei grafici alla voce
«Comportamento» non è attivata, oppure il grafico non è ancora stato completato — i
pulsanti compaiono solo quando è disponibile un grafico da scaricare.

**Domanda:** Cliccando su «Come SVG» o «Come PNG» compare il messaggio «L’esportazione è
fallita. Si prega di riprovare.»

Risposta: L’esportazione non è riuscita a trovare il grafico disegnato — solitamente perché
è in fase di ricaricamento. Attendere qualche istante e cliccare nuovamente; se il problema
persiste, ricaricare la pagina.

**Domanda:** Posso visualizzare più di sei serie?

Risposta: Sì. La tavolozza dei colori MAN ha sei colori; a partire dalla settima serie
i colori si ripetono. Le righe rimangono comunque chiaramente
distinguibili, poiché ogni punto dati riporta il proprio valore come etichetta e
il nome e i valori di ogni riga sono indicati nel tooltip e nella legenda. Alla voce «Dati»
è possibile assegnare un colore specifico a ciascuna riga.

**Domanda:** Cosa succede al mio grafico durante la traduzione automatica
della pagina?

Risposta: Vengono tradotti il titolo, la nota a piè di pagina, le etichette degli assi e
i nomi delle serie. Numeri, unità di misura, limiti degli assi, colori e tutte le altre
impostazioni rimangono invariati.

**Domanda:** Un numero inserito risulta improvvisamente troppo grande o
troppo piccolo di un fattore 1000.

Risposta: L’editor dei grafici interpreta i numeri secondo le regole tedesche – durante la digitazione, l’
inserimento nella griglia e con l’opzione «Inserisci da Excel»: un punto è considerato
separatore delle migliaia, una virgola come separatore decimale. `1.234` diventa
quindi `1234` e non `1,234`. Chi inserisce una tabella con la notazione inglese
(punto come separatore decimale) deve convertire i numeri interessati nel
formato tedesco prima di inserirli, altrimenti, ad esempio, «1.234» (mille)
verrà letto come «1,234» (uno virgola due tre quattro). Se in un numero sono presenti sia
il punto che la virgola, indipendentemente dal formato, l’ultimo
carattere viene considerato come separatore decimale — `1.234,5` e `1,234.5` danno
entrambi `1234,5`.

**Domanda:** Dove sono finiti i campi «Altezza in pixel» e «Consenti download» nella
finestra di dialogo di Staffbase?

Risposta: Entrambi si trovano ora nell’editor dei grafici: l’altezza sotto
«Aspetto», il download sotto «Comportamento». I vecchi campi sono
nascosti. I grafici più vecchi mantengono i propri valori; l’editor li riprende
all’apertura e, se non si apportano modifiche, il grafico rimane sulla pagina così com’era.

**Domanda:** «Applica» non fa nulla, in alto c’è scritto «Asse „…“: «Massimo troppo piccolo».

Risposta: Nella griglia è stato inserito per questo asse un valore massimo che non è
superiore al minimo. L’asse è evidenziato nella griglia; in «Asse»
aumentare il valore massimo o svuotare il campo – se vuoto significa «derivato dai valori
».
