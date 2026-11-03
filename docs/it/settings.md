# Impostazioni

Nella finestra di dialogo di configurazione sono presenti, tecnicamente, solo due campi: **Diagramma** e
**Altezza in pixel**. Il campo “Diagramma” non viene modificato direttamente — al suo posto
si apre automaticamente l’**Editor del diagramma**, in cui si trovano tutte le altre
impostazioni.

## Campi nella finestra di dialogo di configurazione

| Impostazione | Descrizione |
| --- | --- |
| Grafico | Contiene la definizione completa e tecnicamente codificata del grafico. Viene modificata esclusivamente tramite l’editor del grafico, mai manualmente. |
| Altezza in pixel | Altezza del grafico nella pagina. Sono consentiti valori compresi tra 160 e 1200 pixel; il valore predefinito è 420. La larghezza dipende sempre dalla colonna. |
| Consenti download | Visualizza sotto il grafico due pulsanti per il download come immagine. Il file contiene solo il grafico, non la pagina. Impostazione predefinita: disattivata. |

## Tipo di grafico

La selezione nella parte superiore dell’editor determina il tipo di grafico. Attualmente è
disponibile solo **grafico a rete (radar / a ragnatela)**; l’elenco si amplia con ogni nuovo
tipo supportato. Le impostazioni specifiche per tipo — nel caso del radar, ad esempio, le
linee guida — compaiono solo finché è selezionato il tipo corrispondente.

## Importare dati da una tabella

| Impostazione | Descrizione |
| --- | --- |
| Campo di inserimento | Accetta una tabella copiata da Excel, PowerPoint o Word. Riconosce tabulazione, punto e virgola e virgola come separatori di colonna. |
| Come è strutturata la tabella? | Definisce la direzione di lettura. L’impostazione predefinita è «un indicatore per riga, una variante per colonna» — proprio come appare la tabella nella griglia sottostante. Scegliendo l’altra opzione, la tabella viene capovolta durante l’importazione. |
| Importa tabella | Sostituisce assi, serie e valori. Gli assi e le serie con lo stesso nome mantengono unità, direzione dell’asse e colore. |

## Inizio senza dati

Finché non sono stati creati né assi né serie, l’editor spiega i
termini e offre due pulsanti: **«Carica esempio»** inserisce un
confronto completo (MAN eTGX contro Mercedes-Benz eActros 600), che
può essere sovrascritto; **«Crea tabella vuota»** crea tre assi e due
serie da compilare.

## Per ogni asse (una riga nella griglia)

| Impostazione | Descrizione |
| --- | --- |
| Asse | Nome dell’asse, così come appare nel grafico e nella tabella dei dati. Su più righe: il tasto Invio genera un'interruzione di riga, che compare anche nel grafico. |
| Unità | Viene aggiunta a ogni numero di questo asse (punto dati, tooltip, tabella), ad es. «kWh». |
| Direzione («più piccolo è meglio») | Inverte l’asse: il valore più piccolo si trova quindi più all’esterno. Per indicatori in cui un valore minore è preferibile — peso, consumo, tempo di ricarica. |
| Decimali | Solo se sono attivate le **impostazioni avanzate per ciascun asse**: Quante cifre decimali visualizzare. Se non specificato, viene utilizzato il numero di cifre decimali effettivamente inserito. |
| Minimo | Solo se sono attive le impostazioni avanzate: limite inferiore dell’asse. Se non specificato, l’asse parte da zero — in caso di valori negativi, dal valore negativo più piccolo. |
| Massimo | Solo se sono attive le impostazioni di precisione: limite superiore dell’asse. Se non specificato, viene utilizzato il valore più grande presente su quell’asse. |
| ↑ ↓ ✕ | Sposta l’asse in cerchio oppure lo rimuove insieme ai relativi valori. |

## Per ogni serie (una colonna nella griglia)

| Impostazione | Descrizione |
| --- | --- |
| Nome serie | Nome che appare nella legenda, nel tooltip e nella tabella dei dati. |
| Colore | Sovrascrive il colore assegnato automaticamente dalla tavolozza MAN per questa singola serie. |
| ← → ✕ | Sposta la serie — l’ordine determina il colore della tavolozza e l’ordine nella legenda — oppure la rimuove. |

## Titolo, legenda e visualizzazione

| Impostazione | Descrizione |
| --- | --- |
| Titolo | Intestazione sopra il grafico. Se il campo rimane vuoto, non viene visualizzata alcuna intestazione. |
| Nota a piè di pagina | Testo aggiuntivo in caratteri piccoli sotto il titolo, ad esempio per i riferimenti bibliografici. |
| Legenda | «sopra il grafico», «sotto il grafico» o «nascondi». |
| Linee ausiliarie nella griglia | Solo per il grafico radar: numero di anelli ausiliari concentrici. Il valore predefinito è 5. È una impostazione puramente estetica, non modifica i valori. |
| Riempi area | Solo per il grafico radar: riempie l’area dietro ogni linea della serie in modo semitrasparente con il colore della linea stessa. Impostazione predefinita: disattivato. |

## Scalatura automatica

Gli assi non presentano una scala numerica visibile — in presenza di più assi
con unità diverse, non è possibile rappresentarla in modo sensato. Senza indicazioni specifiche,
ogni asse inizia invece da **zero** e arriva fino al suo valore massimo
presente. La lunghezza di un raggio si comporta quindi come il valore
stesso: metà della distanza verso l’esterno corrisponde anche alla metà della quantità.

Se su un asse sono presenti valori negativi, esso parte dal più piccolo di essi —
altrimenti il punto si troverebbe al di fuori della griglia.

Chi desidera evidenziare maggiormente le differenze tra le serie, imposta
manualmente il minimo e il massimo dell’asse in questione — ad es. 400 e 600 invece di
0 e 600. Ciò aumenta le distanze visibili, ma fa anche apparire grandi anche piccole
differenze, insignificanti nella pratica.

Un minimo o un massimo impostato manualmente limita anche il disegno:
un valore al di fuori di questi limiti viene rappresentato esattamente sul bordo, invece di
sporgere oltre la griglia. Il numero sul punto dati e nella tabella rimane
quello inserito: il limite modifica solo l’immagine, mai il valore. Chi
quindi imposta un asse da 0 a 600 e inserisce 700, vedrà il punto all’
estremo e il 700 accanto ad esso.
