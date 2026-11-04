# Étape par étape

Prenons l'exemple d'une comparaison de véhicules (MAN eTGX face à un concurrent) à partir de
six indicateurs avec différentes unités, sous forme de diagramme en réseau ; les
étapes s'appliquent par analogie aux trois autres types.

## Configurer le diagramme

1. Placez le widget **Diagramme** sur la page. Les paramètres du widget
   s’ouvrent et l’**éditeur de diagramme** apparaît immédiatement au-dessus du
   champ proprement dit. En haut se trouve une barre de contrôle avec **Enregistrer**,
   **Aide** (ouvre un menu déroulant contenant les mêmes explications que dans cette
   documentation) et **Fermer** ; elle reste fixe lors du défilement, même
   dans le cas d’un tableau de données long.
2. En haut de l’éditeur figure le **type de graphique** : **graphique en réseau (radar /
   araignée)**, **graphique à barres (colonnes)**, **graphique linéaire (courbe)** ou
   **diagramme circulaire (tarte / anneau)** ; le texte situé en dessous indique à quoi sert le
   type sélectionné. Un changement ultérieur de type n’entraîne aucune perte de
   données : les axes, les séries, le titre et la légende sont conservés, tout comme les
   indications sur les axes (par exemple, minimum/maximum pour le radar) sont simplement
   masquées jusqu’à ce que ce type soit à nouveau sélectionné. Les
   **paramètres d’affichage** de l’ancien type sont toutefois perdus ;
   pour en savoir plus, consultez la section « Paramètres ».
3. Tant qu’il n’y a pas encore de données, la section **« Axes et
   séries »** propose deux options : **« Charger un exemple »** remplit le graphique avec un exemple adapté au
   type sélectionné, que l’on peut simplement écraser, et
   **« Créer un tableau vide »** crée les axes et les séries à remplir.
4. La méthode recommandée est toutefois **« Importer des données depuis un tableau »** tout
   en haut : sélectionnez le tableau comparatif dans Excel, PowerPoint ou Word,
   copiez-le et collez-le dans le champ. Indiquez en dessous **comment le tableau
   est structuré** — la valeur par défaut est « un indicateur par ligne, une
   variante », c’est-à-dire exactement comme le tableau apparaît dans l’éditeur situé en dessous.
   Cliquez ensuite sur **« Importer le tableau »**. Cette étape est identique pour les
   quatre types.
5. Dans la grille, **chaque ligne correspond à un axe** et **chaque colonne à droite à une
   série** — dans le diagramme circulaire, la grille n’affiche **que la première
   colonne de série** ; une note en dessous précise que d’autres séries
   restent enregistrées, mais ne sont pas tracées, afin que cela ne ressemble pas à
   une perte de données. En haut de chaque colonne de série figurent le nom, la couleur et
   les flèches permettant de réorganiser l'ordre ; à la fin de chaque ligne d'axe, les flèches et la
   croix correspondant à cet axe.
6. Saisir l'**unité** pour chaque axe (par exemple « kWh »). Un **saut de ligne dans le
   nom de l’axe** — à l’aide de la touche Entrée — est repris dans le graphique et
   permet de conserver la lisibilité des libellés longs. Dans le graphique circulaire, il est
   également possible de définir une **couleur de segment** distincte pour chaque axe.
7. Uniquement pour le diagramme en réseau : pour les axes où une **valeur plus petite
   est préférable** — poids, consommation, temps de charge —, activez dans la colonne **Direction**
   le bouton **« Plus petit, c’est mieux »**. Sans cela, la
   valeur la moins bonne (la plus grande) se trouverait plus à l’extérieur, et le graphique indiquerait exactement le
   contraire de ce qui est voulu.
8. Les **décimales** par axe se règlent via le bouton
   **« Réglages fins par axe »** ; les **minimum** et **maximum** n’y
   apparaissent que dans le diagramme en réseau, car les barres et la courbe tracent un axe de valeurs commun,
   calculé par ECharts. Dans le cas normal, ils ne sont
   pas nécessaires ; la case vide signifie « dérivé des valeurs ».
9. Sous **« Titre, légende et affichage »**, saisir le titre et la note de bas de page,
   placer ou masquer la **légende** (pour les graphiques circulaires, elle répertorie les
   axes, sinon les séries) et configurer les options d’affichage adaptées au type de graphique
   : pour le graphique radar, **lignes auxiliaires dans la grille** et **remplir les zones**,
   pour le graphique à barres, **empiler** et **orientation** (verticale/horizontale), pour le graphique linéaire,
   **lisser les lignes**, **Remplir la zone** et **Afficher les points**, pour le graphique circulaire
   **Rayon intérieur** (0 = cercle complet, valeur supérieure = anneau) et
   **Étiquette de segment** (pourcentage, valeur absolue, les deux ou désactivé).
10. L’**aperçu** montre en permanence à quoi ressemble le diagramme sur la page
    et reste figé lors du défilement. Si la boîte de dialogue est suffisamment large
    (à partir d’environ 900 pixels), elle se trouve à côté du champ de saisie ; en dessous de cette largeur, elle se déplace
    sous la grille, et en dessous d’environ 700 pixels, la grille se transforme
    en une succession de cartes, une par axe. La boîte de dialogue ne défile
    jamais horizontalement.
11. Régler la **hauteur** du graphique (voir [Paramètres](settings.md)).
12. Si vous souhaitez pouvoir télécharger le graphique sous forme d’image, activez le bouton
    **« Autoriser le téléchargement »** (voir [Paramètres](settings.md)).
    Deux boutons apparaissent alors sous le diagramme : « En tant que SVG » et
    « En tant que PNG » — le fonctionnement est identique pour les quatre types.
13. Cliquez sur **Enregistrer**, puis sur **Fermer**. Ce n’est qu’après avoir cliqué sur « Enregistrer » que
    les données sont transférées dans le widget ; tant que la mention « Modifications non enregistrées »
    apparaît à côté des boutons, rien n’a encore été pris en compte.

## Modifier a posteriori

1. Rouvrez les paramètres du widget — l’éditeur de graphique s’affiche
   à nouveau avec la dernière version enregistrée, y compris le type de graphique.
2. Remplacez les valeurs directement dans la grille ou insérez à nouveau un tableau
   mis à jour. Les axes et séries portant le même nom conservent leurs
   unités, orientations d’axes et couleurs déjà définies — seules les valeurs sont
   remplacées.
3. Enregistrez et fermez comme indiqué ci-dessus.

## Si quelque chose ne fonctionne pas

1. Si un message d'erreur s'affiche à la place du graphique, la
   cause y est déjà indiquée — consultez la [FAQ](faq.md) pour connaître toutes les formulations possibles.
2. Si le tableau inséré ne peut pas être pris en compte, vérifiez s’il
   comporte des en-têtes dans la première ligne et dans la première colonne. Si
   les axes et les séries sont inversés dans la grille, c’est que le sens de lecture sous le
   champ d’insertion a été mal sélectionné — modifiez-le et réessayez.
3. Si, après l’insertion, le graphique affiche des chiffres erronés (par exemple, décalés d’un facteur
   1 000), cela est généralement dû au séparateur des milliers dans les
   des nombres provenant d’une source non allemande — voir les remarques concernant les nombres dans
   [Paramètres](settings.md) et [FAQ](faq.md).
4. Dans le diagramme circulaire, la surface reste vide bien que des valeurs aient été saisies
   : soit toutes les valeurs de la première série sont égales à zéro ou
   manquantes (`null`), soit au moins une valeur est négative — dans ce cas,
   le graphique affiche un message d’erreur spécifique indiquant le nom de l’axe
   concerné au lieu d’un graphique circulaire erroné.
