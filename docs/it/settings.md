# Impostazioni

Tutte le impostazioni si trovano nell’**Editor di grafici**, che si apre automaticamente a schermo intero all’apertura delle
impostazioni del widget. Nella finestra di dialogo di Staffbase
sottostante è presente solo il campo **Grafico** con la
; non viene mai modificato manualmente.

## L’editor

Nella parte superiore si trova l’intestazione, come in tutti i widget MAN: nome e titolo a sinistra, al
centro la vista **Editor · Desktop · Tablet · Mobile**, a destra
**Annulla**, **Ripeti**, **Aiuto**, **Annulla** e
**Applica**. Accanto ad essi è indicato ciò che è stato modificato – ad esempio «Tipo di diagramma
modificato» o «Dati modificati» – oppure il motivo per cui lo stato non può ancora
essere applicato.

Sotto ci sono due aree:

- **A sinistra la griglia dei dati** con una barra sopra.
- **A destra il pannello «Grafico»** con quattro schede: **Dati**,
  **Aspetto**, **Asse** e **Comportamento**.

Nelle visualizzazioni Desktop, Tablet e Mobile, al posto della griglia
appare l’anteprima a larghezza del dispositivo; il pannello a destra rimane visibile, in modo che ogni
impostazione abbia effetto immediatamente accanto ad esso.

«Applica» trasferisce lo stato nella finestra di dialogo di Staffbase; viene
salvato in modo permanente solo con **Salva** in Studio. Se non vengono apportate modifiche,
«Applica» rimane disattivato.

| Tasto | Effetto |
| --- | --- |
| ⌘/Ctrl S | Applica |
| ⌘/Ctrl ↵ | Applica e chiudi |
| ⌘/Ctrl Z, ⇧⌘/Ctrl Z | Annulla, Ripeti (al di fuori dei campi di testo) |
| F1 | Aiuto |
| Esc | Chiudi, con richiesta di conferma in caso di modifiche aperte |

## Griglia dei dati

Ogni **riga** è un **asse** (un indicatore, nel grafico a torta un segmento),
ogni **colonna** a destra è una **serie** (una variante; nelle versioni precedenti
si parlava di «serie»). Nell’intestazione di ogni colonna della serie sono presenti un punto colorato e un nome.

| Colonna | Descrizione |
| --- | --- |
| N. | Seleziona l’asse. Cliccando in un campo qualsiasi della riga si ottiene lo stesso risultato. |
| Asse | Nome dell’asse, così come appare nel grafico e nella tabella dei dati. Il tasto Invio genera un’interruzione di riga, che compare anche nel grafico. |
| Unità | Viene aggiunta a ogni numero di questo asse (punto dati, tooltip, tabella), ad es. «kWh». Nei grafici a barre e a linee, l’asse dei valori comune riporta l’unità solo se **tutti** gli assi con valori hanno la stessa unità. |
| per riga | I valori, secondo il formato tedesco: virgola prima delle cifre decimali, punto tra le migliaia. |

Nel grafico a torta, la griglia mostra **solo la prima riga** – una nota
sottostante indica che le altre righe rimangono salvate, ma non
vengono tracciate.

**Valori da Excel:** copiare le celle in Excel, selezionare un campo nella griglia,
⌘ V (Ctrl V). Il blocco viene inserito a partire da quel campo; gli assi e le righe mancanti
vengono aggiunti. Nel grafico a torta, il blocco riempie solo l’unica riga visibile.

## Barra sopra la griglia

| Elemento | Descrizione |
| --- | --- |
| Asse 2 di 5 · Nome | L’asse selezionato. |
| ↑ ↓ | Sposta l’asse selezionato insieme ai relativi valori. Nel grafico a radar l’ordine determina la posizione nel cerchio, nel grafico a barre l’ordine sulla linea di base. |
| Duplica | Inserisce una copia dell’asse, compresi valori e impostazioni, direttamente dietro di esso. |
| Elimina | Rimuove l’asse con tutti i suoi valori. Annulla con ⌘/Ctrl Z. |
| + Asse | Aggiunge un asse vuoto e posiziona il cursore nel suo nome. |
| + Riga | Aggiunge una riga vuota. |
| Inserisci da Excel | Apre una barra a destra per importare un'intera tabella (vedi sotto). |
| Carica esempio | Sostituisce i dati con un esempio relativo al tipo selezionato. L'altezza e il download rimangono invariati. Annulla con ⌘/Ctrl Z. |

## Inserisci da Excel

| Impostazione | Descrizione |
| --- | --- |
| Tabella | Importa una tabella copiata da Excel, PowerPoint o Word. La prima riga e la prima colonna sono le intestazioni. Riconosce il tabulatore, il punto e virgola e la virgola come separatori di colonna. |
| Come è orientata la tabella? | **Assi nelle righe** (impostazione predefinita): un indicatore per riga, una variante per colonna – come nella griglia. **Assi nelle colonne**: al contrario; la tabella viene ruotata durante l’importazione. |
| Importa tabella | Sostituisce assi, righe e valori. Gli assi e le righe con lo stesso nome mantengono unità, limiti, direzione e colore. |

## Introduzione senza dati

Finché non sono stati creati né assi né righe, la griglia spiega i
i concetti e offre due pulsanti: **«Carica esempio»** inserisce un
esempio adatto al tipo selezionato (ad es. per il radar il confronto MAN
eTGX contro Mercedes-Benz eActros 600, per il grafico a torta una
), **«Crea tabella vuota»** crea assi e serie da
compilare.

## Scheda «Dati»

Le serie come elenco; un clic ne espande una.

| Impostazione | Descrizione |
| --- | --- |
| ← → | Sposta la riga. L’ordine determina il colore della tavolozza e la legenda; nel grafico a torta viene disegnata la riga più in primo piano. |
| Elimina | Rimuove la riga insieme ai suoi valori. |
| Nome | Come appare nella legenda (tranne che nel grafico a torta), nel tooltip e nella tabella dei dati. |
| Colore | Sovrascrive il colore della tavolozza per questa riga; «Tavolozza» ripristina il colore predefinito. Non disponibile nel grafico a torta: in quel caso, il colore dei segmenti varia a seconda dell’asse. |
| + Aggiungi riga | Aggiunge una riga vuota e la espande. |

## Scheda «Formattazione»

| Impostazione | Descrizione |
| --- | --- |
| Tipo | **Rete**, **Barra**, **Linea** o **Circolare**. La frase sottostante spiega a cosa serve il tipo. |
| Titolo | Intestazione sopra il grafico. Vuoto: nessuna intestazione. |
| Nota a piè di pagina | Testo aggiuntivo in caratteri piccoli, ad es. per le fonti. |
| Legenda | **Sopra**, **Sotto** o **Nascondi**. Nel grafico a torta la legenda elenca gli assi (segmenti), altrimenti le serie. |
| Sezione del tipo | Elementi specifici del tipo selezionato, vedi sotto. |
| Altezza in px | Altezza del grafico sulla pagina, da 160 a 1200 pixel, impostazione predefinita 420. La larghezza segue sempre quella della colonna. Non è possibile applicare un’altezza al di fuori di questi limiti. |

| Tipo | Impostazione | Descrizione |
| --- | --- | --- |
| Griglia | Linee ausiliarie | Numero di anelli concentrici. Impostazione predefinita: 5. Solo a scopo estetico. |
| Griglia | Riempi aree | Riempie l’area dietro ogni linea con il colore della linea stessa in modo semitrasparente. Impostazione predefinita: disattivata. |
| Barra | Direzione | **Verticale** (categorie in basso) o **Orizzontale** (categorie a sinistra). Impostazione predefinita: verticale. |
| Barra | Impilata | File una sopra l’altra anziché una accanto all’altra. Impostazione predefinita: disattivata. |
| Linea | Smussata | Arrotonda il tracciato, invece di disegnare una linea retta tra i valori. Impostazione predefinita: disattivata. |
| Linea | Riempi area | Riempie l’area sotto ogni linea. Impostazione predefinita: disattivata. |
| Linea | Mostra punti | Evidenzia ogni valore. Impostazione predefinita: attivata. |
| Grafico a torta | Raggio interno in % | 0 produce un cerchio completo, un valore maggiore (ad es. 45) un anello. Impostazione predefinita: 0. |
| Grafico a torta | Etichetta dei segmenti | **Percentuale**, **valore**, **entrambi** o **nessuno**. Impostazione predefinita: percentuale. |

Cambiando il tipo non si perdono i **dati**: titolo, nota a piè di pagina, legenda, assi e
serie rimangono, così come le indicazioni sugli assi. Le **impostazioni del
tipo** valgono invece solo per esso: un grafico ne porta sempre con sé solo un insieme,
quello del tipo attualmente selezionato. Chi imposta le linee ausiliarie nella griglia,
passa al grafico a barre, apporta qualche modifica e poi torna indietro, ritroverà
nella griglia le impostazioni predefinite.

## Scheda «Asse»

Le impostazioni di precisione dell’asse selezionato nella griglia.

| Impostazione | Tipo | Descrizione |
| --- | --- | --- |
| Denominazione | tutti | Il nome dell’asse, su più righe. |
| Unità | tutti | Come nella griglia. |
| Cifre decimali | tutti | Quante cifre decimali visualizzare. Vuoto: tante quante ne sono state inserite. |
| Minimo, Massimo | Griglia | Limiti dell’asse. Vuoto: derivati dai valori (da zero al valore massimo). Il valore massimo deve essere maggiore di quello minimo, altrimenti l’impostazione non può essere applicata. |
| Più piccolo è meglio | Griglia | Inverte l’asse: il valore più piccolo si trova all’esterno. Per peso, consumo, tempo di caricamento. |
| Colore segmento | Grafico a torta | Colore del segmento di questo asse; «Tavolozza» lo ripristina. |

**Perché minimo, massimo e «Più piccolo è meglio» compaiono solo nella rete
:** sono definiti per ciascun asse e, in presenza di un
asse dei valori comune – come quello utilizzato per tracciare barre e linee – non sono visualizzabili. Nel
grafico a torta non c’è alcun asse. I valori nascosti rimangono
salvati e tornano attivi non appena si seleziona nuovamente il tipo.

## Scheda «Comportamento»

| Impostazione | Descrizione |
| --- | --- |
| Consenti download | Mostra sotto il grafico due pulsanti, «Come SVG» e «Come PNG». Il file contiene solo il grafico, non la pagina. Disattivato per impostazione predefinita. |

In basso è indicata la versione del widget: chi segnala un errore la troverà
qui.

## Verifica

«Applica» rifiuta uno stato che la pagina non potrebbe visualizzare correttamente.
L’intestazione indica il motivo, la scheda presenta un contrassegno rosso, l’asse interessato
è evidenziato nella griglia e il campo indica cosa fare.

| Messaggio | Causa |
| --- | --- |
| Asse «…»: massimo troppo piccolo | Nella rete il massimo non è maggiore del minimo. |
| «…»: quota negativa nel grafico a torta | Un valore della prima riga è negativo; un grafico a torta mostra solo quote a partire da zero. |
| Altezza: sono consentiti da 160 a 1200 pixel | L’altezza è fuori dai limiti. |

## Grafici esistenti

Fino alla versione 0.3, **Altezza** e **Consenti download** erano campi separati
nella finestra di dialogo di Staffbase. Questi campi sono ora nascosti; i loro valori rimangono
validi finché non viene impostato diversamente nell’editor. All’apertura,
l’editor li adotta come impostazioni iniziali: un grafico esistente, dopo l’
apertura e l’applicazione delle impostazioni, appare esattamente come prima. Se la vecchia spunta non era
leggibile, la scheda «Comportamento» lo indica sotto il pulsante.

## Ridimensionamento automatico

**Nel grafico radar** gli assi non presentano una scala numerica visibile ��� non è rappresentabile in modo sensato in presenza di
più assi con unità diverse. In assenza di
indicazioni specifiche, ogni asse parte invece da **zero** e arriva fino al
suo valore massimo. La lunghezza di un raggio si comporta quindi
come il valore stesso: metà della distanza verso l’esterno corrisponde anche alla metà della quantità.

Se su un asse sono presenti valori negativi, esso inizia dal più piccolo di essi –
altrimenti il punto si troverebbe al di fuori della griglia.

Chi desidera evidenziare maggiormente le differenze tra le serie, imposta
manualmente il minimo e il massimo dell’asse in questione – ad es. 400 e 600 invece di
0 e 600. Ciò aumenta le distanze visibili, ma fa anche apparire grandi differenze che in
pratica sono insignificanti.

Un minimo o un massimo impostato manualmente limita anche la rappresentazione:
un valore al di fuori di questi limiti viene visualizzato esattamente sul bordo, invece di
sporgere oltre la griglia. Il numero sul punto dati e nella tabella rimane
quello inserito: il limite modifica solo la visualizzazione, mai il valore. Chi
quindi imposta un asse da 0 a 600 e inserisce 700, vedrà il punto all’estremo
periferico e il 700 accanto ad esso.

**Nel caso dei grafici a barre e a linee**, ECharts disegna automaticamente un asse dei valori con
scala visibile; esso è ancorato a zero e non può essere limitato manualmente
. **Nel grafico a torta** non esiste un asse dei valori: ogni segmento mostra
la propria percentuale rispetto al totale. Un valore negativo non rappresenta in questo caso un
problema di visualizzazione, bensì un errore nei dati: l’editor non ne consente l’
inserimento e un grafico precedente mostra sulla pagina un’indicazione relativa
all’asse interessato, invece di disegnare un grafico a torta errato.
