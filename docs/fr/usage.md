# Étape par étape

À partir de l'exemple d'une comparaison de véhicules (MAN eTGX face à un concurrent) sur la base de
six indicateurs exprimés en différentes unités.

## Configurer le diagramme

1. Placez le widget **Diagramme** sur la page. Les paramètres du widget
   s'ouvrent et l'**éditeur de diagramme** apparaît immédiatement au-dessus du
   champ proprement dit.
2. En haut se trouve le **type de graphique**. Pour l’instant, seul « Graphique en réseau
   (radar / araignée) » y figure ; le texte en dessous explique à quoi sert ce type de graphique.
3. Tant qu’il n’y a pas encore de données, la section **« Axes et
   séries»** propose deux options : **« Charger un exemple »** remplit la comparaison
   MAN eTGX contre Mercedes-Benz eActros 600 déjà prête, qu’il suffit de
   remplacer, et **« Créer un tableau vide »** propose trois axes et deux
   séries à remplir.
4. La méthode recommandée est toutefois **« Importer des données depuis un tableau »** tout
   en haut : sélectionnez le tableau comparatif dans Excel, PowerPoint ou Word,
   copiez-le et collez-le dans le champ. Indiquez ensuite **comment le tableau
   est structuré** — la valeur par défaut est « un indicateur par ligne, une
   variante par colonne », c'est-à-dire exactement comme le tableau apparaît dans l'éditeur en dessous.
   Cliquez ensuite sur **« Importer le tableau »**.
5. Dans la grille, **chaque ligne correspond à un axe** et **chaque colonne à droite à une
   série**. En haut de chaque colonne de série se trouvent le nom, la couleur et les flèches permettant de
   réorganiser ; à la fin de chaque ligne d’axe, les flèches et la croix correspondant à cet
   axe.
6. Saisissez l’**unité** pour chaque axe (par exemple « kWh »). Un **saut de ligne dans le
   nom de l’axe** — à l’aide de la touche Entrée — est repris dans le graphique et
   permet de conserver la lisibilité des libellés longs.
7. Pour les axes où une **valeur plus petite est préférable** — poids,
   consommation, temps de recharge —, activez dans la colonne **Direction** le bouton
   **« plus petit, c’est mieux »**. Sans cela, la moins bonne
   (la plus grande) valeur se trouverait plus à l’extérieur, et le graphique indiquerait exactement le contraire de
   ce qui est voulu : dans une comparaison, il faut toujours que « plus à l’extérieur =
   mieux » s’applique.
8. Les **décimales**, le **minimum** et le **maximum** par axe se trouvent derrière
   le bouton **« Réglages fins par axe »**. En règle générale, ils ne sont pas nécessaires
   ; laisser le champ vide signifie « dérivé des valeurs ».
9. Sous **« Titre, légende et présentation »**, saisissez le titre et la note de bas de page,
   placez ou masquez la **légende** et, pour le diagramme en réseau, configurez les
   **lignes auxiliaires dans le réseau** ainsi que le **remplissage des zones**.
10. L’**aperçu** à droite affiche en permanence l’aspect du diagramme sur la page
    et reste figé lors du défilement.
11. Régler la **hauteur** du diagramme (voir [Paramètres](settings.md)).
12. Si vous souhaitez que le diagramme puisse être téléchargé sous forme d’image, activez le bouton
    **« Autoriser le téléchargement »** (voir [Paramètres](settings.md)).
    Deux boutons apparaissent alors sous le diagramme : « En SVG » et
    « En PNG ».
13. Cliquez sur **Enregistrer**, puis sur **Fermer**. Ce n’est qu’après avoir cliqué sur « Enregistrer » que
    les données sont transférées dans le widget ; tant que la mention « Modifications non enregistrées »
    apparaît à côté des boutons, rien n’a encore été pris en compte.

## Modifier a posteriori

1. Rouvrez les paramètres du widget — l’éditeur de graphique s’affiche
   à nouveau avec l’état enregistré en dernier.
2. Remplacez les valeurs directement dans la grille ou insérez à nouveau un tableau
   mis à jour. Les axes et séries portant le même nom conservent leurs
   unités, orientations d’axe et couleurs déjà définies — seules les valeurs sont
   remplacées.
3. Enregistrer et fermer comme indiqué ci-dessus.

## En cas de problème

1. Si un message d’erreur s’affiche à la place du graphique, la
   cause — consultez la [FAQ](faq.md) pour connaître toutes les formulations possibles.
2. Si le tableau inséré ne peut pas être pris en compte, vérifiez s’il
   comporte des en-têtes dans la première ligne et dans la première colonne. Si
   les axes et les séries sont inversés dans la grille, c’est que le sens de lecture sous la
   zone d’insertion a été mal sélectionné — modifiez-le et réappliquez.
3. Si, après insertion, le graphique affiche des chiffres erronés (par exemple, décalés d’un facteur
   1 000), cela est généralement dû au séparateur des milliers pour les
   nombres provenant d’une source non allemande — voir les remarques concernant les nombres dans
   [Paramètres](settings.md) et [FAQ](faq.md).
