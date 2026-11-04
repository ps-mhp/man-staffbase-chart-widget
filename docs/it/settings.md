# Impostazioni

Nella finestra di dialogo di configurazione sono presenti, tecnicamente, solo due campi: **Diagramma** e
**Altezza in pixel**. Il campo “Diagramma” non viene modificato direttamente; al suo posto
si apre automaticamente l’**Editor del diagramma**, in cui si trovano tutte le altre
impostazioni.

## Campi nella finestra di dialogo di configurazione

| Impostazione | Descrizione |
| --- | --- |
| Grafico | Contiene la definizione completa e tecnicamente codificata del grafico. Viene modificata esclusivamente tramite l’editor del grafico, mai manualmente. |
| Altezza in pixel | Altezza del grafico nella pagina. Sono consentiti valori compresi tra 160 e 1200 pixel; il valore predefinito è 420. La larghezza dipende sempre dalla colonna. |
| Consenti download | Visualizza sotto il grafico due pulsanti per il download come immagine. Il file contiene solo il grafico, non la pagina. Impostazione predefinita: disattivato. |

## La finestra di dialogo dell’editor

In alto è presente una barra di controllo con **Salva**, **Aiuto** e **Chiudi**;
rimane fissa durante lo scorrimento, in modo che il salvataggio rimanga accessibile anche in caso di un lungo
griglia di dati. Finché la bozza differisce dallo stato salvato,
accanto ad essa compare la dicitura «Modifiche non salvate». Il pulsante Aiuto apre
un pannello a scorrimento con le stesse spiegazioni presenti in questa pagina, direttamente nella
finestra di dialogo; si chiude tramite il pulsante o il tasto «Esc».

Se la finestra di dialogo è stretta, l’anteprima si sposta sotto la griglia di inserimento e,
al di sotto di una larghezza del contenitore di circa 700 pixel, la griglia diventa un grafico
per ciascun asse. La finestra di dialogo non scorre mai orizzontalmente.

## Tipo di grafico

La selezione nella parte superiore dell’editor determina il tipo di grafico:

| Tipo | Adatto per |
| --- | --- |
| Grafico a rete (radar / a ragnatela) | Confronto di poche varianti su più valori caratteristici con unità potenzialmente diverse. |
| Grafico a barre (colonne) | Confronto di valori su poche categorie con unità comune. |
| Grafico a linee (andamento) | Andamento su una serie ordinata, ad es. anni. |
| Grafico a torta (torta / anello) | Suddivisione di un insieme in segmenti; disegna solo la prima serie. |

Cambiando il tipo non si perdono dati: titolo, nota a piè di pagina, legenda, assi e
serie rimangono invariati. Anche le impostazioni specifiche del tipo salvate (ad es.
minimo/massimo nel grafico a radar) vengono anch’esse mantenute e tornano ad essere attive
non appena viene selezionato nuovamente il tipo corrispondente — non vengono quindi
cancellate, ma solo nascoste.

## Quali campi compaiono in base al tipo

| Campo | Radar | Barra | Linea | Torta |
| --- | :-: | :-: | :-: | :-: |
| Unità, cifre decimali | ✓ | ✓ | ✓ | ✓ |
| Minimo, Massimo | ✓ | – | – | – |
| Direzione («più piccolo è meglio») | ✓ | – | – | – |
| Colore per asse (colore del segmento) | – | – | – | ✓ |
| Colonne della serie nella griglia | tutte | tutte | tutte | solo la prima |

**Perché il minimo, il massimo e «più piccolo è meglio» compaiono solo nel grafico radar
:** sono definiti per ciascun asse e, in presenza di un'asse dei valori comune
asse dei valori — come quelli utilizzati per i grafici a barre e a linee — non sono visualizzabili. Nei grafici a torta
non c’è alcun asse. «Più piccolo è meglio» è inoltre un
concetto proprio del grafico a radar: in presenza di un vero asse dei valori non si inverte l’asse, ma
si ordina o si etichetta.

## Importare dati da una tabella

| Impostazione | Descrizione |
| --- | --- |
| Campo di inserimento | Accetta una tabella copiata da Excel, PowerPoint o Word. Riconosce tabulazione, punto e virgola e virgola come separatori di colonna. |
| Come è strutturata la tabella? | Definisce la direzione di lettura. L’impostazione predefinita è «un indicatore per riga, una variante per colonna» — proprio come appare la tabella nella griglia sottostante. Scegliendo l’altra opzione, la tabella viene capovolta durante l’importazione. |
| Importa tabella | Sostituisce assi, serie e valori. Gli assi e le serie con lo stesso nome mantengono unità, direzione dell’asse e colore. |

L’inserimento da Excel è indipendente dal tipo e funziona allo stesso modo per tutti e quattro i tipi
.

## Inizio senza dati

Finché non sono stati creati né assi né serie, l’editor spiega i
concetti e offre due pulsanti: **«Carica esempio»** inserisce un esempio adatto al
tipo selezionato (ad es. per il grafico radar il confronto tra MAN
eTGX e Mercedes-Benz eActros 600; nel grafico a torta, una ripartizione dei costi della flotta
), che è possibile sovrascrivere; **"Crea tabella vuota"** crea assi
e serie da compilare.

## Per ogni asse (una riga nella griglia)

| Impostazione | Descrizione |
| --- | --- |
| Asse | Nome dell’asse, così come appare nel grafico e nella tabella dei dati. Se il testo è su più righe: il tasto Invio crea un’interruzione di riga che compare anche nel grafico. |
| Unità | Viene aggiunta a ogni numero di questo asse (punto dati, tooltip, tabella), ad es. «kWh». Nei grafici a barre e a linee, l’asse dei valori comune riporta l’unità solo se **tutti** gli assi con valori hanno la stessa unità. |
| Direzione («più piccolo è meglio») | Solo per i grafici a radar. Inverte l’asse: il valore più piccolo si trova quindi più all’esterno. Per indicatori in cui un valore inferiore è preferibile — peso, consumo, tempo di ricarica. |
| Colore | Solo nel grafico a torta. Definisce il colore del segmento corrispondente, sovrascrivendo il colore della tavolozza assegnato automaticamente. |
| Decimali | Solo se sono attivate le **impostazioni avanzate per ciascun asse**: il numero di cifre decimali da visualizzare. Se non specificato, viene utilizzato il numero di cifre decimali effettivamente inserite. |
| Minimo | Solo nel grafico a radar, con le impostazioni di precisione attivate: limite inferiore dell’asse. Se non specificato, l’asse parte da zero — in caso di valori negativi, dal valore negativo più piccolo. |
| Massimo | Solo nel Radar, con le **impostazioni di precisione per asse** attivate: limite superiore dell’asse. Se non specificato, viene utilizzato il valore più grande presente su quell’asse. |
| ↑ ↓ ✕ | Sposta l’asse o lo rimuove insieme ai relativi valori. |

## Per serie (una colonna nella griglia)

Nel grafico a torta, la griglia mostra **solo la prima colonna della serie** — una
nota sottostante chiarisce che le altre serie rimangono memorizzate e
non vengono visualizzate.

| Impostazione | Descrizione |
| --- | --- |
| Nome serie | Nome che appare nella legenda (tranne che nei grafici a torta, vedi sotto), nel tooltip e nella tabella dei dati. |
| Colore | Sovrascrive il colore assegnato automaticamente dalla tavolozza MAN per questa singola serie. Non ha effetto sui grafici a torta — in quel caso il colore varia a seconda dell’asse (vedi sopra). |
| ← → ✕ | Sposta la serie — l’ordine determina il colore della tavolozza e l’ordine nella legenda — oppure la rimuove. |

## Titolo, legenda e visualizzazione

| Impostazione | Descrizione |
| --- | --- |
| Titolo | Intestazione sopra il grafico. Se il campo rimane vuoto, non viene visualizzata alcuna intestazione. |
| Nota a piè di pagina | Testo aggiuntivo in caratteri piccoli sotto il titolo, ad es. per i riferimenti bibliografici. |
| Legenda | «sopra il grafico», «sotto il grafico» o «nascondi». Nei grafici a torta la legenda elenca gli assi (segmenti), negli altri tipi le serie. |

### Opzioni di visualizzazione per tipo

| Tipo | Campi | Descrizione |
| --- | --- | --- |
| Radar | Linee ausiliarie nella griglia | Numero di anelli ausiliari concentrici. Impostazione predefinita: 5. Solo a scopo visivo, non modifica i valori. |
| Radar | Riempi aree | Riempie l’area dietro ogni linea della serie in modo semitrasparente con il colore della stessa. Impostazione predefinita: disattivato. |
| Barre | Impila | Disegna le serie una sopra l’altra anziché affiancate. Impostazione predefinita: disattivato. |
| Barra | Direzione | «verticale» (categorie in basso) o «orizzontale» (categorie a sinistra). Impostazione predefinita: verticale. |
| Linea | Smussare le linee | Arrotonda il tracciato delle linee invece di tracciarle dritte tra i punti di supporto. Impostazione predefinita: disattivato. |
| Linea | Riempi area | Riempie l’area sotto la linea con il suo colore. Impostazione predefinita: disattivato. |
| Linea | Mostra punti | Mostra un punto in corrispondenza di ogni punto di controllo. Impostazione predefinita: attivato. |
| Grafico a torta | Raggio interno | Percentuale del foro nella torta. 0 corrisponde a un cerchio completo, un valore maggiore (ad es. 45) a un anello/ciambella. Impostazione predefinita: 0. |
| Grafico a torta | Etichetta segmento | «Percentuale», «Valore assoluto», «Entrambi» o «Nascondi». Impostazione predefinita: «Percentuale». |

## Scalatura automatica

**Nel grafico a radar** gli assi non presentano una scala numerica visibile — non è infatti possibile rappresentarla in modo sensato in presenza di
più assi con unità diverse. In assenza di
specifiche, ogni asse parte invece da **zero** e arriva fino al
suo valore massimo presente. La lunghezza di un raggio si comporta quindi
come il valore stesso: metà della distanza verso l’esterno corrisponde anche alla metà della quantità.

Se su un asse sono presenti valori negativi, esso parte dal più piccolo di essi —
altrimenti il punto si troverebbe al di fuori della griglia.

Chi desidera evidenziare maggiormente le differenze tra le serie, imposta
manualmente il minimo e il massimo dell’asse in questione — ad es. 400 e 600 invece di
0 e 600. Ciò aumenta le distanze visibili, ma fa anche apparire grandi anche piccole
differenze, insignificanti nella pratica.

Un minimo o un massimo impostato manualmente limita anche la rappresentazione:
un valore al di fuori di questi limiti viene visualizzato esattamente sul bordo, invece di
sporgere oltre la griglia. Il numero sul punto dati e nella tabella rimane
quello inserito: il limite modifica solo la visualizzazione, mai il valore. Chi
quindi imposta un asse da 0 a 600 e inserisce 700, vedrà il punto all’estremo
periferico e il 700 accanto ad esso.

**Nei grafici a barre e a linee**, ECharts disegna automaticamente un asse dei valori con
scala visibile; esso è ancorato a zero e non può essere limitato manualmente
. **Nel grafico a torta** non c’è un asse dei valori: ogni segmento mostra
la propria quota rispetto al totale. Un valore negativo non rappresenta un
problema di visualizzazione, ma un errore nei dati: il grafico mostra quindi un
avviso sull’asse interessato, invece di disegnare una torta
errata.
