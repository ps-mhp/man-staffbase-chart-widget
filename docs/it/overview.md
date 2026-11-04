# Grafico

Il widget Grafico rappresenta gli indicatori in quattro tipologie: **grafico a ragnatela
(radar), a barre, a linee e a torta**. Ogni tipo viene configurato tramite
lo stesso editor, che si apre direttamente nelle impostazioni del widget; una
tabella copiata da Excel può essere importata con un clic, vedi
[Passo dopo passo](usage.md).

## I quattro tipi

**Diagramma a ragnatela (Radar / Ragnatela).** Diversi assi si irradiano a forma di stella
da un punto centrale e ogni serie — ad esempio un veicolo a confronto —
collega i propri valori su questi assi formando un’area. In questo modo è possibile
confrontare a colpo d’occhio diversi indicatori di più serie, anche se
misurati in unità completamente diverse — chilometri, tonnellate,
minuti, kilowatt. Solo nel grafico radar sono disponibili i valori minimo e massimo e l’opzione
«più piccolo è meglio» per ciascun asse, oltre alle opzioni di visualizzazione «linee guida nella rete»
e «riempimento delle aree».

**Grafico a barre (colonne).** Confronta i valori tra poche categorie.
Tutte le barre condividono un asse dei valori comune, che ECharts stesso
calcola ed etichetta — a differenza del grafico a radar, questo asse è quindi
significativo solo se tutte le categorie utilizzano la stessa unità di misura. Come
opzioni di visualizzazione sono disponibili l’impilamento (serie una sopra l’altra anziché affiancate) e
la direzione (verticale o orizzontale).

**Grafico a linee (andamento).** Mostra un andamento nel corso di una
serie ordinata, ad esempio per anno di costruzione. L’ordine degli assi nella griglia corrisponde
all’ordine sulla linea. Opzioni di visualizzazione: smussare le linee, riempire l’area sotto
la linea, mostrare i punti nei punti di supporto.

**Grafico a torta (circolare / ad anello).** Mostra la suddivisione di un insieme:
i segmenti corrispondono agli assi (categorie), i cui valori determinano le dimensioni dei segmenti.
**Viene tracciata esclusivamente la prima serie** — le altre serie
rimangono salvate e ricompaiono non appena si passa a un altro tipo
di grafico; l’editor lo segnala espressamente. A ogni categoria può essere assegnato un
colore specifico per i segmenti. Opzioni di visualizzazione: raggio interno (0 corrisponde al
cerchio completo, un valore maggiore a un anello/ciambella) e l’etichetta dei segmenti
(percentuale, valore assoluto, entrambi o nascosta). I valori negativi
non rappresentano un problema di visualizzazione con `pie`, ma un errore nei dati — il
grafico mostra quindi un avviso invece di un grafico a torta errato.

Cambiando il tipo di grafico nell’editor non si perdono dati: titolo, nota a piè di pagina,
legenda, assi e serie vengono mantenuti, così come i valori dei campi specifici
del tipo — semplicemente non vengono visualizzati finché è selezionato un altro tipo.

## Cosa vedono i lettori

- Il grafico stesso, con un numero illimitato di assi e serie.
- I valori sono riportati direttamente sul grafico (nel caso di `pie`, a seconda delle impostazioni, come
  percentuale, valore assoluto o entrambi); inoltre, passando il mouse
  su un punto o un segmento, appare un tooltip con i valori corrispondenti.
- Una legenda sopra o sotto il grafico, a seconda delle impostazioni.
  Nel caso di `pie`, la legenda elenca le categorie (segmenti), mentre per gli altri
  tipi elenca le serie.
- Facoltativamente, un titolo e una nota a piè di pagina.
- Se il download è consentito (vedi [Impostazioni](settings.md)), due pulsanti
  sotto il grafico per scaricare l’immagine.
- Per gli screen reader, inoltre, una tabella completa dei dati sotto il
  grafico. È nascosta alla vista, ma presente — il grafico è
  quindi utilizzabile anche senza percezione visiva.

## Esportazione immagine

Se il download è abilitato, sotto il grafico compaiono due pulsanti,
«Come SVG» e «Come PNG». Il file scaricato contiene **solo il
grafico**, non il resto della pagina — titolo, legenda, assi e valori
esattamente come vengono visualizzati in quel momento, con sfondo bianco (anche se
la pagina stessa ha uno sfondo trasparente o scuro). Il file SVG può essere
ingrandito senza perdita di qualità, mentre il PNG è adatto per contesti che non supportano l’integrazione di file SVG
(ad es. la maggior parte dei programmi di presentazione) e viene generato a
doppia risoluzione. L’esportazione funziona allo stesso modo per tutti e quattro i tipi
— opera sull’immagine disegnata e non riconosce il tipo di grafico.

## Traduzione

Il grafico viene incluso nella traduzione automatica della pagina. Vengono tradotti
titolo, nota a piè di pagina, etichette degli assi e nomi delle serie — esattamente i
testi che sono stati inseriti manualmente. Numeri, unità di misura, limiti degli assi,
colori e tutte le altre impostazioni rimangono invariati, poiché non hanno
una lingua: un’unità di misura tradotta sarebbe errata («t» non diventa «ton»),
un numero tradotto non avrebbe senso.

## Cosa vedete nell’editor CMS

Quando si inserisce il modulo, si apre automaticamente l’**editor del grafico**
con una barra di controllo in alto (Salva, Aiuto, Chiudi) al posto di un
piè di pagina — in questo modo il comando Salva rimane accessibile anche con una griglia di dati lunga,
poiché la barra rimane fissa durante lo scorrimento. In alto la selezione del tipo di grafico
e un campo in cui inserire una tabella copiata da Excel; sotto,
una griglia con **una riga per ogni asse** e **una colonna per ogni serie**
(nel caso di `pie` solo una colonna per serie), accanto un’anteprima in tempo reale che mostra esattamente
come apparirà il grafico in seguito sulla pagina. Finché non è stato creato nulla,
l’editor spiega i termini e offre le opzioni «Carica esempio»
e «Crea tabella vuota» — a seconda del tipo selezionato, con un esempio diverso
e adeguato. Il campo di testo sottostante mostra solo la forma tecnicamente
memorizzata e codificata dei dati e non viene mai modificato manualmente.

Se la finestra di dialogo è stretta (ad es. su schermi di piccole dimensioni), l’
anteprima si sposta sotto la griglia e — al di sotto di circa 700 pixel di larghezza —
la griglia si trasforma in una sequenza di grafici, uno per ogni asse. La finestra di dialogo
non scorre mai orizzontalmente.

Una caratteristica importante del radar: i suoi assi **non presentano una scala numerica visibile**
scala numerica visibile**. Non è possibile rappresentare in modo sensato su un’unica scala
più assi con unità diverse (ad es.
chilometri e minuti). Ogni asse viene quindi esteso internamente in modo indipendente: da zero fino
al proprio valore massimo. I valori effettivi sono riportati nei punti dati,
nel tooltip e nella tabella dei dati. I grafici a barre e a linee mostrano
invece un vero e proprio asse dei valori, calcolato ed etichettato da ECharts.
Maggiori informazioni alla voce [Impostazioni](settings.md).
