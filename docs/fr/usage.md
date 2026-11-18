# Étape par étape

Prenons l'exemple d'une comparaison de véhicules (MAN eTGX face à un concurrent) à partir de
six indicateurs avec différentes unités, sous forme de diagramme en réseau ; les
étapes s'appliquent par analogie aux trois autres types.

## Configurer le diagramme

1. Placez le widget **Diagramme** sur la page. Les paramètres du widget
   s’ouvrent et l’**éditeur de diagramme** s’affiche immédiatement en plein écran. À gauche
   se trouve la grille de données, à droite le panneau **« Diagramme »** avec les onglets
   Données, Mise en forme, Axe et Comportement. L'option **Aide** en haut de la page ouvre les mêmes
   explications que celles de cette documentation.
2. Dans le panneau, sous **Mise en forme**, sélectionnez le **type** : **Réseau**, **Barre**,
   **Ligne** ou **Camembert** ; la description en dessous indique à quoi sert ce type
  . Un changement ultérieur n’entraîne aucune perte de données : les axes, les séries, le titre
   et la légende sont conservés ; les indications sur les axes (par exemple, le minimum et le maximum
   pour le **réseau**) sont simplement masquées. Les **paramètres du type** ne s’appliquent
   toutefois qu’à celui-ci, voir [Paramètres](settings.md).
3. Tant qu’il n’y a pas encore de données, la grille propose deux options :
   **« Charger un exemple »** remplit un exemple adapté au type, que l’on peut
   remplacer, **« Créer un tableau vide »** crée les axes et les séries à
   remplir.
4. La méthode recommandée est toutefois **« Insérer depuis Excel »**, en haut à droite au-dessus
   de la grille : sélectionnez le tableau comparatif dans Excel, PowerPoint ou Word,
   copiez-le et collez-le dans le champ de la barre. En dessous,
   indiquer **la disposition du tableau** – par défaut **Axes dans les lignes**,
   c’est-à-dire telle qu’elle apparaît dans la grille. Puis **« Appliquer le tableau
   »**. Cette étape est identique pour les quatre types.
5. Dans la grille, **chaque ligne correspond à un axe** et **chaque colonne à droite correspond à une
   série**. Pour le diagramme circulaire, la grille n’affiche **que la première série** ;
   une note en dessous indique que les autres séries sont enregistrées, mais
   ne sont pas affichées.
6. Remplacer des valeurs individuelles directement dans la grille. Il est également possible d’importer des blocs depuis Excel
   : copier des cellules, sélectionner un champ dans la grille, ⌘ V (Ctrl V).
7. Saisir l’**unité** pour chaque axe (par ex. « kWh »). Un **saut de ligne dans le
   nom de l’axe** – à l’aide de la touche Entrée – est repris dans le graphique et
   permet de conserver la lisibilité des libellés longs.
8. Cliquer sur une ligne sélectionne l’axe. La barre située au-dessus l’identifie
   (« Axe 2 sur 6 · Poids de la batterie ») et propose les options **vers le haut**, **vers
   le bas**, **dupliquer** et **supprimer**. Dans le panneau sous **Axe**
   se trouvent ses réglages avancés : libellé, unité, décimales,
   pour le réseau : **minimum**, **maximum** et **« Plus c’est petit, mieux c’est »**, pour le
   graphique circulaire : la **couleur du segment**.
9. Uniquement pour le réseau : pour les axes où une **valeur plus petite est préférable** –
   poids, consommation, temps de charge –, activez **« Plus petit, c’est mieux »**.
   Sans cette option, la valeur la moins bonne (la plus grande) se trouverait plus à l’extérieur, et le graphique
   indiquerait le contraire de ce qui est voulu.
10. Sous **Données**, nommez les séries, attribuez-leur une **couleur** distincte si nécessaire
    et modifiez leur ordre – celui-ci détermine la couleur de la palette et
    la légende.
11. Sous **Mise en page**, saisissez le titre et la note de bas de page, placez la **légende** au-dessus
    ou sous le graphique, ou masquez-la, puis sélectionnez les paramètres du
    type : pour le graphique en réseau, **Lignes auxiliaires** et **Remplissage** ; pour le
    graphique à barres, **Direction** et **Empilé** ; pour le graphique en ligne, **Lissé**,
    **Remplissage de la zone** et **Afficher les points**, pour le diagramme circulaire : **Rayon intérieur** et
    **Étiquettes des segments**. Tout en bas, la **Hauteur en px** (160 à
    1 200).
12. Si vous souhaitez que le graphique puisse être téléchargé sous forme d’image, activez sous
    **Comportement** l’option **« Autoriser le téléchargement »**. Deux boutons apparaissent alors sous le graphique :
    « En tant que SVG » et « En tant que PNG ».
13. Dans l’en-tête, sélectionnez **Ordinateur de bureau**, **Tablette** ou **Mobile** : l’
    aperçu affiche le diagramme tel qu’il apparaît sur la page, le panneau
    de droite reste affiché à côté.
14. **Appliquer** – ou ⌘/Ctrl ↵ pour appliquer et fermer. Ensuite, dans
    Studio, **Enregistrer** ; c’est ce qui permet de sauvegarder la page.

## Modifier a posteriori

1. Rouvrez les paramètres du widget : l’éditeur s’affiche avec la
   dernière version enregistrée, y compris le type.
2. Remplacez les valeurs directement dans la grille ou réimportez un tableau mis à jour via
   « Insérer depuis Excel ». Les axes et séries portant le même nom
   conservent leurs unités, limites, sens et couleurs – seules les valeurs
   sont remplacées.
3. Chaque étape peut être annulée avec ⌘/Ctrl Z ; **Annuler** supprime
   tout ce qui a été fait depuis la dernière validation.
4. Appliquer et enregistrer dans Studio comme indiqué ci-dessus.

## Si quelque chose ne fonctionne pas

1. Si un message d’erreur s’affiche à la place du graphique, celui-ci
   indique déjà la cause – consultez la [FAQ](faq.md) pour connaître toutes les formulations possibles.
2. Si l’option « Appliquer » ne peut pas être exécutée, l’en-tête indique la raison et l’
onglet concerné est marqué en rouge – par exemple « Axe « … » : maximum trop
petit ». Voir « Vérification » sous [Paramètres](settings.md).
3. Si le tableau inséré ne peut pas être appliqué, vérifiez s’il
   comporte des en-têtes dans la première ligne et dans la première colonne. Si
   les axes et les séries sont inversés dans la grille, c’est que le sens de lecture a été
   mal choisi – inversez-les et réessayez d’appliquer.
4. Si, après insertion, le graphique affiche des chiffres erronés (par exemple décalés d’un facteur
   1 000), cela est généralement dû au séparateur des milliers pour les
   chiffres provenant d’une source non allemande – voir [FAQ](faq.md).
5. Dans le diagramme circulaire, la surface reste vide bien que des valeurs aient été saisies
   : cela signifie que toutes les valeurs de la première ligne sont égales à zéro ou manquantes.
