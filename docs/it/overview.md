# Grafico

Il widget Grafico rappresenta gli indicatori sotto forma di **grafico radar/a rete**: diversi
assi si irradiano a forma di stella da un punto centrale e ogni serie — ad
esempio, un veicolo a confronto — collega i propri valori su questi assi fino a
formare un’area. In questo modo è possibile confrontare a colpo d’occhio diversi indicatori di più serie,
anche se misurati in unità completamente diverse
— chilometri, tonnellate, minuti, kilowatt.

Il grafico viene configurato tramite un editor dedicato, che si apre direttamente nelle
impostazioni del widget. Una tabella copiata da Excel può essere
importata con un clic, vedi [Passo dopo passo](usage.md).

Altri tipi di grafici (ad es. grafici a barre o a linee) sono previsti per le future
versioni, ma **non sono ancora disponibili** — attualmente è possibile selezionare solo
il grafico radar/a rete.

## Cosa vedono i lettori

- Il grafico stesso, con un numero illimitato di assi e serie.
- I valori sono riportati direttamente sui punti dati; inoltre, passando il mouse su
  un punto, appare un tooltip con tutti i valori della serie.
- Una legenda sopra o sotto il grafico, a seconda delle impostazioni.
- Facoltativamente, un titolo e una nota a piè di pagina.
- Se il download è consentito (vedi [Impostazioni](settings.md)), due pulsanti
  sotto il grafico per scaricare l’immagine.
- Per gli screen reader, inoltre, una tabella completa dei dati sotto il
  grafico. È nascosta alla vista, ma presente — il grafico è
  quindi utilizzabile anche senza percezione visiva.

## Esportazione immagine

Se il download è abilitato, sotto il grafico compaiono due pulsanti:
«Come SVG» e «Come PNG». Il file scaricato contiene **solo il
grafico**, non il resto della pagina — titolo, legenda, assi e valori
esattamente come vengono visualizzati in quel momento, con sfondo bianco (anche se
la pagina stessa ha uno sfondo trasparente o scuro). Il file SVG può essere
ingrandito senza perdita di qualità, mentre il PNG è adatto per contesti che non supportano l’integrazione di file SVG
(ad es. la maggior parte dei programmi di presentazione) e viene generato a
doppia risoluzione.

## Traduzione

Il grafico viene incluso nella traduzione automatica della pagina. Vengono tradotti
il titolo, la nota a piè di pagina, le etichette degli assi e i nomi delle serie — esattamente i
testi che sono stati inseriti manualmente. Numeri, unità di misura, limiti degli assi,
colori e tutte le altre impostazioni rimangono invariati, poiché non hanno
una lingua: un’unità di misura tradotta sarebbe errata («t» non diventa «ton»),
un numero tradotto non avrebbe senso.

## Cosa vedete nell’editor del CMS

Quando si inserisce il modulo, si apre automaticamente l’**editor del grafico**:
una tabella composta da categorie (assi) e serie (righe), oltre a un campo per
inserire una tabella copiata e un’anteprima in tempo reale che mostra esattamente
come apparirà il grafico in seguito sulla pagina. Il campo di testo sottostante mostra
solo la forma tecnicamente memorizzata e codificata dei dati e non viene mai modificato manualmente
.

Una caratteristica importante: gli assi **non presentano una scala numerica visibile**.
Non è possibile rappresentare in modo sensato su una scala comune più assi con unità diverse (ad es. chilometri e minuti). Ogni asse
viene quindi esteso internamente in modo indipendente tra il suo valore minimo e quello massimo;
i numeri effettivi sono riportati nei punti dati, nel tooltip e
nella tabella dei dati. Maggiori informazioni alla voce [Impostazioni](settings.md).
