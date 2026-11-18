# Passo dopo passo

Prendendo come esempio un confronto tra veicoli (MAN eTGX rispetto a un concorrente) basato su
sei indicatori con unità diverse, rappresentato come diagramma a rete; i
passaggi si applicano, mutatis mutandis, anche agli altri tre tipi.

## Configurazione del diagramma

1. Posizionare il widget **Diagramma** sulla pagina. Si aprono le impostazioni del widget
   e, al loro interno, immediatamente l’**Editor di diagrammi** a schermo intero. A sinistra
   si trova la griglia dei dati, a destra il pannello **“Diagramma”** con le schede
   Dati, Aspetto, Asse e Comportamento. **Aiuto** nell’intestazione apre le stesse
   spiegazioni presenti in questa documentazione.
2. Nel pannello sotto **Aspetto** selezionare il **Tipo**: **Matrice**, **Barra**,
   **Linea** o **Torta**; la frase sottostante indica a cosa serve il tipo
  . Una modifica successiva non comporta la perdita di dati: assi, serie, titolo
   e la legenda rimangono, mentre le indicazioni sugli assi (ad es. minimo e massimo
   nel grafico a rete) vengono semplicemente nascoste. Le **impostazioni del tipo** valgono
   però solo per quello specifico tipo, vedi [Impostazioni](settings.md).
3. Finché non ci sono ancora dati, la griglia offre due opzioni:
   **«Carica esempio»** inserisce un esempio adatto al tipo, che è possibile
   sovrascrivere, **«Crea tabella vuota»** crea assi e righe da
   compilare.
4. Il metodo consigliato è tuttavia **«Inserisci da Excel»** in alto a destra sopra
   la griglia: selezionare la tabella di confronto in Excel, PowerPoint o Word,
   copiarla e incollarla nel campo della barra. Sotto
   specificare **come è strutturata la tabella** – l’impostazione predefinita è **assi nelle righe**,
   ovvero proprio come appare la tabella nella griglia. Quindi **“Applica tabella”**.
   Questo passaggio è uguale per tutti e quattro i tipi.
5. Nella griglia **ogni riga è un asse** e **ogni colonna a destra è una
   serie**. Nel grafico a torta, la griglia mostra **solo la prima serie**;
   una nota sottostante indica che le altre serie rimangono salvate, ma
   non vengono visualizzate.
6. Sovrascrivere i singoli valori direttamente nella griglia. È possibile anche incollare blocchi da Excel
: copiare le celle, selezionare un campo nella griglia, ⌘ V (Ctrl V).
7. Inserire l’**unità** per ciascun asse (ad es. «kWh»). Un **cambio di riga nel
   nome dell’asse** – con il tasto Invio – viene riportato nel grafico e
   mantiene leggibili le etichette lunghe.
8. Cliccando su una riga si seleziona l’asse. La barra sopra lo identifica
   («Asse 2 di 6 · Peso della batteria») e offre le opzioni **su**, **giù**,
   **duplica** e **elimina**. Nel pannello sotto **Asse**
   si trovano le impostazioni avanzate: denominazione, unità, cifre decimali,
   per la rete **Minimo**, **Massimo** e **«Più piccolo è meglio»**, per il
   grafico a torta il **colore del segmento**.
9. Solo per la rete: per gli assi in cui un **valore più basso è migliore** –
   peso, consumo, tempo di ricarica –, attivare **«Più piccolo è meglio»**.
   Senza questa opzione, il valore peggiore (più grande) risulterebbe più esterno e il grafico
   comunicerebbe il contrario di ciò che si intende.
10. In **Dati** assegnare un nome alle serie, se necessario impostare un proprio **colore**
    e modificarne l’ordine – questo determina il colore della tavolozza e
    la legenda.
11. In **Formato** inserire titolo e nota a piè di pagina, posizionare la **legenda** sopra
    o sotto il grafico oppure nasconderla e selezionare le impostazioni del
    tipo: per la griglia **Linee guida** e **Riempi area**, per le
    barre **Direzione** e **Impilate**, per la linea **Smussata**,
    **Riempimento area** e **Mostra punti**; per il grafico a torta **Raggio interno** e
    **Etichette dei segmenti**. In fondo alla pagina, impostare l’**Altezza in px** (da 160 a
    1200).
12. Se si desidera che il grafico possa essere scaricato come immagine, in
    **Comportamento** attivare **«Consenti download»**. Sotto il grafico
    compaiono quindi due pulsanti, «Come SVG» e «Come PNG».
13. Nell’intestazione, selezionare **Desktop**, **Tablet** o **Mobile**: l’
    anteprima mostra il grafico così come appare sulla pagina, mentre il pannello
    a destra rimane accanto ad esso.
14. **Applica** – oppure ⌘/Ctrl ↵ per applicare e chiudere. Successivamente, in
    Studio, clicca su **Salva**; solo così la pagina verrà salvata.

## Modifiche successive

1. Riaprire le impostazioni del widget: l’editor appare con l’
  ultimo stato salvato, compreso il tipo.
2. Sovrascrivere i valori direttamente nella griglia o importare nuovamente una tabella aggiornata tramite
  «Inserisci da Excel». Gli assi e le serie con lo stesso nome
   mantengono unità, limiti, direzione e colori – vengono sostituiti solo i valori
  .
3. Ogni operazione può essere annullata con ⌘/Ctrl Z; **Annulla** cancella
   tutto ciò che è stato fatto dall’ultima conferma.
4. Applicare e salvare in Studio come sopra.

## Se qualcosa non funziona

1. Se sulla pagina compare un messaggio di avviso al posto del grafico, in esso è
   già indicata la causa – consultare le [FAQ](faq.md) per ogni possibile formulazione.
2. Se non è possibile eseguire «Applica», l’intestazione ne indica il motivo e la
   scheda interessata presenta un contrassegno rosso – ad esempio «Asse „…“: Massimo troppo
   piccolo». Vedi «Verifica» in [Impostazioni](settings.md).
3. Se non è possibile applicare la tabella inserita, verificare che
   presenti intestazioni nella prima riga e nella prima colonna. Se
   gli assi e le serie sono invertiti nella griglia, la direzione di lettura è stata
   selezionata in modo errato: invertire l’ordine e applicare nuovamente.
4. Se dopo l’inserimento il grafico mostra valori errati (ad es. spostati di un fattore
   1000), si tratta solitamente del separatore delle migliaia nei
   numeri provenienti da una fonte non tedesca – vedi [FAQ](faq.md).
5. Nel grafico a torta l’area rimane vuota, sebbene siano stati inseriti dei valori
: in questo caso, tutti i valori della prima riga hanno valore zero o sono mancanti.
