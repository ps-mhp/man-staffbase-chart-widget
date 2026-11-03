# Étape par étape

À partir de l'exemple d'une comparaison de véhicules (MAN eTGX face à un concurrent) sur la base de
six indicateurs exprimés en différentes unités.

## Configurer le diagramme

1. Placez le widget **Diagramme** sur la page. Les paramètres du widget
   s'ouvrent et l'**éditeur de diagramme** apparaît immédiatement au-dessus du
   champ proprement dit.
2. Sélectionnez et copiez les données de comparaison depuis Excel : **première ligne**, les
   catégories (axes, par exemple « Autonomie [km] », « Temps de recharge [min] »), **première
   colonne** les séries (par exemple, les noms de véhicules). Dans l’éditeur, collez-les dans le champ
   **« Insérer un tableau »** et cliquez sur **« Appliquer le tableau »**.
   Les valeurs apparaissent alors dans la grille au-dessus et dans l’aperçu.
3. Pour chaque catégorie (colonne « Axes » dans la grille), définissez l’**unité** et
   les **décimales** — cela détermine la façon dont le chiffre s’affiche au niveau des
   points de données, dans l’info-bulle et dans le tableau, par exemple « 125,5 kWh ».
4. Pour les catégories où une **valeur plus petite est préférable** — poids,
   consommation, temps de recharge —, activez le bouton **« Plus petit, c’est mieux »** de l’axe
  . Sans ce bouton, la valeur la moins bonne (la plus grande) se trouverait
   plus à l’extérieur sur l’axe, et le graphique indiquerait exactement le contraire de
   ce qui est voulu : dans une comparaison, il faut toujours que « plus à l’extérieur = mieux »
   s’applique.
5. Saisir le **titre** et la **note de bas de page**, activer/désactiver la légende et choisir sa
   position (en haut/en bas).
6. Régler la **hauteur** du graphique (voir [Paramètres](settings.md)).
7. Si vous souhaitez que le graphique puisse être téléchargé sous forme d’image, activez le bouton
   **« Autoriser le téléchargement »** (voir [Paramètres](settings.md)).
   Deux boutons apparaissent alors sous le graphique : « Au format SVG » et
   « Au format PNG ».
8. Cliquez sur **Enregistrer**, puis sur **Fermer**. Ce n’est qu’après avoir cliqué sur « Enregistrer » que
   les données sont transférées dans le widget ; tant que la mention « Modifications non enregistrées
   » s’affiche, rien n’a encore été pris en compte.

## Modifier ultérieurement

1. Rouvrez les paramètres du widget — l’éditeur de graphique s’affiche
   à nouveau avec la dernière version enregistrée.
2. Remplacez les valeurs directement dans la grille ou insérez à nouveau un tableau
   mis à jour. Les catégories et séries portant le même nom conservent leurs
   unités, orientations d’axes et couleurs déjà définies — seules les valeurs sont
   remplacées.
3. Enregistrez et fermez comme indiqué ci-dessus.

## En cas de problème

1. Si un message d’erreur s’affiche à la place du graphique, la
   cause y est déjà indiquée — consultez la [FAQ](faq.md) pour connaître toutes les formulations possibles.
2. Si le tableau inséré ne s’affiche pas, vérifiez que la première
   ligne contient les catégories et que la première colonne contient les noms des séries.
3. Si le graphique affiche des chiffres erronés après l’insertion (par exemple, décalés d’un facteur
   1 000), cela est généralement dû au séparateur des milliers pour les
   nombres provenant d’une source non allemande — voir les remarques sur les nombres dans
   [Paramètres](settings.md) et [FAQ](faq.md).
