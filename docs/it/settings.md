# Impostazioni

Nella finestra di dialogo di configurazione sono presenti, tecnicamente, solo due campi: **Diagramma** e
**Altezza in pixel**. Il campo “Diagramma” non viene modificato direttamente — al suo posto
si apre automaticamente l’**Editor del diagramma**, in cui si trovano tutte le altre
impostazioni.

## Campi nella finestra di dialogo di configurazione

| Impostazione | Descrizione |
| --- | --- |
| Grafico | Contiene la definizione completa e tecnicamente codificata del grafico. Viene modificata esclusivamente tramite l’editor del grafico, mai manualmente. |
| Altezza in pixel | Altezza del diagramma sulla pagina. Sono consentiti valori compresi tra 160 e 1200 pixel; il valore predefinito è 420. La larghezza dipende sempre dalla colonna. |
| Consenti download | Visualizza sotto il grafico due pulsanti per il download come immagine. Il file contiene solo il grafico, non la pagina. Impostazione predefinita: disattivata. |

## Intestazione dell’editor di grafici

| Impostazione | Descrizione |
| --- | --- |
| Titolo | Intestazione sopra il grafico. Se il campo rimane vuoto, non viene visualizzata alcuna intestazione. |
| Nota a piè di pagina | Testo aggiuntivo in caratteri piccoli sotto il titolo, ad es. per le fonti. |
| Mostra legenda | Mostra o nasconde la legenda con i nomi delle serie. |
| Posizione legenda | «in alto» o «in basso» — dove si trova la legenda rispetto al grafico. |
| Numero anelli | Solo per il grafico radar: numero di anelli concentrici ausiliari nella griglia. Il valore predefinito è 5. È solo una questione estetica, non modifica i valori. |
| Riempi area | Solo per il grafico radar: riempie l’area dietro ogni linea della serie in modo semitrasparente con il colore della linea stessa. Impostazione predefinita: disattivata. |

## Per categoria (asse)

| Impostazione | Descrizione |
| --- | --- |
| Etichetta | Nome dell’asse, così come appare nel grafico e nella tabella dei dati. |
| Unità | Viene aggiunta a ogni numero di questo asse (punto dati, tooltip, tabella), ad es. «kWh». |
| Decimali | Numero di cifre decimali da visualizzare. Se non specificato, viene utilizzato il numero di cifre decimali effettivamente inserito. |
| Minimo | Limite inferiore dell’asse. Se non specificato, viene utilizzato il valore più piccolo presente su quell’asse. |
| Massimo | Limite superiore dell’asse. Se non specificato, viene utilizzato il valore più grande presente su questo asse. |
| Più piccolo è meglio | Inverte l’asse: il valore più piccolo si trova quindi più all’esterno. Per indicatori in cui un valore inferiore è preferibile — peso, consumo, tempo di ricarica. |

## Per serie

| Impostazione | Descrizione |
| --- | --- |
| Nome serie | Nome che appare nella legenda, nel tooltip e nella tabella dei dati. |
| Colore | Sovrascrive il colore assegnato automaticamente dalla tavolozza MAN per questa singola serie. |

## Scalatura automatica

Gli assi non presentano una scala numerica visibile — non è infatti possibile rappresentarla in modo sensato in presenza di più assi
con unità diverse. Senza valori minimi
e massimi impostati, ogni asse si estende invece automaticamente tra il
valore più piccolo e quello più grande presenti su di esso. Ciò rende chiaramente visibili le differenze
tra le serie, ma può anche far apparire visivamente grandi differenze che in pratica
sono insignificanti. Chi non desidera questo effetto,
imposta manualmente il minimo e il massimo dell’asse in questione — ad es. 0 e 600
per un intervallo, invece di estenderlo tra il valore minimo e quello massimo
presenti.

Un minimo o un massimo impostato manualmente limita anche il grafico:
un valore al di fuori di questi limiti viene visualizzato esattamente sul bordo, invece di
sporgere oltre la griglia. Il numero sul punto dati e nella tabella rimane
quello inserito: il limite modifica solo l’immagine, mai il valore. Chi
quindi imposta un asse da 0 a 600 e inserisce 700, vedrà il punto all’estremo
periferico e il 700 accanto ad esso.
