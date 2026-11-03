# Diagramme

Le widget « Diagramme » présente les indicateurs sous forme de **diagramme radar/en réseau** : plusieurs
axes rayonnent en étoile à partir d'un point central, et chaque série — par
exemple, un véhicule comparé à d'autres — relie ses valeurs sur ces axes pour
former une surface. Cela permet de comparer d’un seul
coup d’œil plusieurs indicateurs de plusieurs séries, même s’ils sont mesurés dans des unités
très différentes — kilomètres, tonnes, minutes, kilowatts.

La configuration du diagramme s’effectue via un éditeur dédié, qui s’ouvre directement dans
les paramètres du widget. Un tableau copié depuis Excel peut y être
importé en un clic, voir [Étape par étape](usage.md).

D’autres types de graphiques (par exemple, des graphiques à barres ou linéaires) sont prévus pour de futures
versions, mais **ne sont pas encore disponibles** — pour l’instant, seul
le graphique radar/en réseau peut être sélectionné.

## Ce que voient les lecteurs et lectrices

- Le graphique lui-même, avec un nombre illimité d’axes et de séries.
- Les valeurs apparaissent directement sur les points de données ; de plus, lorsque
  l’on survole un point, une infobulle s’affiche avec toutes les valeurs de la série.
- Une légende au-dessus ou en dessous du graphique, selon les paramètres.
- En option, un titre et une note de bas de page.
- Si le téléchargement est autorisé (voir [Paramètres](settings.md)), deux boutons
  situés sous le graphique permettent de le télécharger sous forme d’image.
- Pour les lecteurs d’écran, un tableau complet des données est également disponible sous le
  graphique. Elle est masquée visuellement, mais bien présente — le graphique est
  ainsi utilisable même sans perception visuelle.

## Exportation d’image

Lorsque le téléchargement est activé, deux boutons apparaissent sous le graphique :
« Au format SVG » et « Au format PNG ». Le fichier téléchargé ne contient **que le
diagramme**, et non le reste de la page — titre, légende, axes et valeurs
tels qu’ils s’affichent actuellement, sur fond blanc (même si
la page elle-même est transparente ou sur fond sombre). Le fichier SVG peut être
agrandi sans perte de qualité, tandis que le fichier PNG convient aux environnements qui ne peuvent pas intégrer de SVG
(par exemple, la plupart des logiciels de présentation) et est généré en
double résolution.

## Traduction

Le graphique est pris en compte lors de la traduction automatique de la page. Sont traduits
le titre, la note de bas de page, les libellés des axes et les noms de séries — c’est-à-dire précisément les
textes qui ont été saisis par la rédaction. Les chiffres, les unités, les limites des axes,
les couleurs et tous les autres paramètres restent inchangés, car ils n’ont pas
de langue : une unité traduite serait erronée (« t » ne devient pas « ton »),
un chiffre traduit n’aurait aucun sens.

## Ce que vous voyez dans l’éditeur du CMS

Lorsque vous insérez le module, l’**éditeur de graphique** s’ouvre automatiquement :
un tableau composé de catégories (axes) et de séries (lignes), ainsi qu’un champ permettant d’
insérer un tableau copié, ainsi qu’un aperçu en direct qui montre exactement
comment le graphique apparaîtra ensuite sur la page. Le champ de texte situé derrière n’affiche
que la forme codée et enregistrée techniquement des données et n’est jamais modifié manuellement
.

Une particularité importante : les axes ne comportent **aucune échelle numérique visible**.
Plusieurs axes avec des unités différentes (par exemple, kilomètres et minutes)
ne peuvent pas être représentés de manière pertinente sur une échelle commune. Chaque axe
est donc étiré en interne de manière indépendante entre sa valeur minimale et sa valeur maximale
; les chiffres réels apparaissent au niveau des points de données, dans l’info-bulle et
dans le tableau de données. Pour en savoir plus, consultez la rubrique [Paramètres](settings.md).
