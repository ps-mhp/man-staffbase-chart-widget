# Passo dopo passo

Prendiamo come esempio un confronto tra veicoli (MAN eTGX rispetto a un concorrente) basato su
sei indicatori con unità di misura diverse.

## Configurazione del grafico

1. Inserire il widget **Grafico** nella pagina. Si aprono le impostazioni del widget
   e al loro interno compare immediatamente l’**editor del grafico** sopra il
   campo vero e proprio.
2. Selezionare e copiare i dati di confronto da Excel: nella **prima riga** le
   categorie (assi, ad es. «Autonomia [km]», «Tempo di ricarica [min]»), nella **prima
   colonna** le serie (ad es. i nomi dei veicoli). Nell’editor, incollare nel campo
   **«Inserisci tabella»** e cliccare su **«Applica tabella»**.
   I valori appariranno quindi nella griglia sopra e nell’anteprima.
3. Per ogni categoria (colonna dell’asse nella griglia) impostare **l’unità** e
   **i decimali**: ciò determina come il numero apparirà nei
   punti dati, nel tooltip e nella tabella, ad es. «125,5 kWh».
4. Per le categorie in cui un **valore più basso è migliore** — peso,
   consumo, tempo di ricarica —, attivare l’opzione **“Più basso è meglio”** dell’asse
  . Senza questo pulsante, il valore peggiore (più grande) si troverebbe
   più all’esterno sull’asse e il grafico indicherebbe esattamente il contrario di
   ciò che si intende: in un confronto deve sempre valere “più all’esterno = migliore”
  .
5. Inserire **titolo** e **nota a piè di pagina**, attivare/disattivare la legenda e scegliere la sua
   posizione (in alto/in basso).
6. Impostare l’**altezza** del grafico (vedi [Impostazioni](settings.md)).
7. Se si desidera che il grafico possa essere scaricato come immagine, attivare l’interruttore
   **«Consenti download»** (vedi [Impostazioni](settings.md)).
   Sotto il grafico appariranno quindi due pulsanti: «Come SVG» e
   «Come PNG».
8. Fare clic su **Salva**, poi su **Chiudi**. Solo dopo aver cliccato su «Salva»
   i dati vengono trasferiti nel widget; finché accanto ai pulsanti «Modifiche non salvate»
   non è stato applicato nulla.

## Modificare in un secondo momento

1. Riaprire le impostazioni del widget: l’editor del grafico riappare
   con lo stato salvato per ultimo.
2. Sovrascrivere i valori direttamente nella griglia o inserire nuovamente una tabella
   aggiornata. Le categorie e le serie con lo stesso nome mantengono le unità,
   le direzioni degli assi e i colori già impostati — vengono sostituiti solo i valori.
3. Salvare e chiudere come sopra.

## Se qualcosa non funziona

1. Se al posto del grafico compare un messaggio di avviso, la causa è già indicata
   al suo interno — consultare le [FAQ](faq.md) per ogni possibile formulazione.
2. Se la tabella inserita non viene applicata, verificare che la prima
   riga contenga le categorie e la prima colonna i nomi delle serie.
3. Se dopo l’inserimento il grafico mostra numeri errati (ad es. spostati di un fattore
   1000), si tratta solitamente del separatore delle migliaia nei
   numeri provenienti da una fonte non tedesca — consultare le indicazioni sui numeri in
   [Impostazioni](settings.md) e [FAQ](faq.md).
