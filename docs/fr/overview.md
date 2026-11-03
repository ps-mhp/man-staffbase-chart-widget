# Diagramme

Le widget « Diagramme » présente les indicateurs sous forme de **diagramme radar/en réseau** : plusieurs
axes rayonnent en étoile à partir d'un point central, et chaque série — par
exemple, un véhicule en comparaison — relie ses valeurs sur ces axes pour
former une surface. Cela permet de comparer d’un seul
coup d’œil plusieurs indicateurs de plusieurs séries, même s’ils sont mesurés dans des unités
très différentes — kilomètres, tonnes, minutes, kilowatts.

La configuration du diagramme s’effectue via un éditeur dédié, qui s’ouvre directement dans
les paramètres du widget. Un tableau copié depuis Excel peut y être
importé en un clic, voir [Étape par étape](usage.md).

D'autres types de graphiques (par exemple, des graphiques à barres ou linéaires) sont prévus pour de futures
versions, mais **ne sont pas encore disponibles** — pour l'instant, seul
le graphique radar/en réseau peut être sélectionné.

## Ce que voient les lecteurs et lectrices

- Le graphique lui-même, avec un nombre illimité d’axes et de séries.
- Les valeurs apparaissent directement sur les points de données ; de plus, lorsque
  l’on passe la souris sur un point, une infobulle s’affiche avec toutes les valeurs de la série.
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

Lors de l’insertion du module, l’**éditeur de graphique** s’ouvre automatiquement :
en haut, le choix du type de graphique et un champ dans lequel un tableau copié depuis Excel
, en dessous une grille avec **une ligne par axe** et
**une colonne par série**, à côté un aperçu en temps réel qui montre exactement comment
le graphique apparaîtra ensuite sur la page. Tant que rien n’a encore été créé,
l’éditeur explique les termes et propose les options « Charger un exemple » et
« Créer un tableau vide ». Le champ de texte situé derrière n’affiche que la forme techniquement
enregistrée et codée des données et n’est jamais modifié manuellement.

Une particularité importante : les axes ne comportent **aucune échelle numérique visible**.
Il n’est pas possible de représenter de manière pertinente sur une même échelle plusieurs axes avec des unités différentes (par exemple, des kilomètres et des minutes).
Chaque axe Chaque axe
est donc étiré en interne de manière indépendante entre sa valeur minimale et sa valeur maximale
; les chiffres réels apparaissent au niveau des points de données, dans l’info-bulle et
dans le tableau de données. Pour en savoir plus, consultez la rubrique [Paramètres](settings.md).
