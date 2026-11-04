# Paramètres

Dans la boîte de dialogue de configuration, il n'y a techniquement que deux champs : **Diagramme** et
**Hauteur en pixels**. Le champ « Diagramme » ne peut pas être modifié directement — à la place,
l'**éditeur de diagramme** s'ouvre automatiquement, dans lequel se trouvent tous les autres
paramètres sont regroupés.

## Champs de la boîte de dialogue de configuration

| Paramètre | Description |
| --- | --- |
| Diagramme | Contient la définition complète et codée techniquement du diagramme. Il est modifié exclusivement via l’éditeur de diagramme, jamais manuellement. |
| Hauteur en pixels | Hauteur du diagramme sur la page. Valeurs autorisées : de 160 à 1 200 pixels ; valeur par défaut : 420. La largeur dépend toujours de la colonne. |
| Autoriser le téléchargement | Affiche sous le diagramme deux boutons permettant de le télécharger sous forme d’image. Le fichier ne contient que le diagramme, pas la page. Désactivé par défaut. |

## La boîte de dialogue de l’éditeur

En haut se trouve une barre de contrôle avec **Enregistrer**, **Aide** et **Fermer** ;
elle reste fixe lors du défilement, afin que l’enregistrement reste accessible même avec un long
grille de données. Tant que le brouillon diffère de la version enregistrée,
la mention « Modifications non enregistrées » s’affiche à côté. Le bouton Aide ouvre
un volet contenant les mêmes explications que sur cette page, directement dans
la boîte de dialogue ; il se ferme à l’aide du bouton ou de la touche « Échap ».

Si la boîte de dialogue est étroite, l’aperçu se déplace sous la grille de saisie, et
lorsque la largeur du conteneur est inférieure à environ 700 pixels, la grille se transforme en carte
par axe. La boîte de dialogue ne défile jamais horizontalement.

## Type de graphique

La sélection tout en haut de l’éditeur détermine le type de graphique :

| Type | Convient pour |
| --- | --- |
| Graphique en réseau (radar / araignée) | Comparaison de quelques variantes sur plusieurs paramètres avec des unités éventuellement différentes. |
| Diagramme à barres (colonnes) | Comparaison de valeurs sur quelques catégories avec une unité commune. |
| Diagramme linéaire (courbe) | Évolution sur une série ordonnée, par exemple des années. |
| Diagramme circulaire (tourte / anneau) | Répartition d’un tout en segments ; ne trace que la première série. |

Un changement de type n’entraîne aucune perte de données : le titre, les notes de bas de page, la légende, les axes et
les séries sont conservés. Les paramètres spécifiques au type enregistrés (par exemple,
minimum/maximum pour le graphique en radar) sont également conservés et s’appliquent à nouveau
dès que le type correspondant est sélectionné — ils ne sont donc pas
supprimés, mais simplement masqués.

## Quels champs apparaissent pour quel type ?

| Champ | Radar | Barres | Ligne | Circulaire |
| --- | :-: | :-: | :-: | :-: |
| Unité, décimales | ✓ | ✓ | ✓ | ✓ |
| Minimum, maximum | ✓ | – | – | – |
| Direction (« plus c’est petit, mieux c’est ») | ✓ | – | – | – |
| Couleur par axe (couleur du segment) | – | – | – | ✓ |
| Colonnes de séries dans la grille | toutes | toutes | toutes | uniquement la première |

**Pourquoi les valeurs minimales, maximales et « plus c’est petit, mieux c’est » n’apparaissent que dans le graphique radar
:** elles sont définies par axe et, dans le cas d’un
— comme c’est le cas pour les graphiques à barres et les graphiques linéaires —. Dans les graphiques circulaires,
il n’y a pas d’axe du tout. « Plus petit, mieux c’est » est d’ailleurs un
concept propre au graphique radar : avec un véritable axe des valeurs, on n’inverse pas l’axe, mais
on trie ou on étiquette.

## Importer des données depuis un tableau

| Paramètre | Description |
| --- | --- |
| Zone d’insertion | Accueille un tableau copié depuis Excel, PowerPoint ou Word. Reconnaît la tabulation, le point-virgule et la virgule comme séparateurs de colonnes. |
| Comment se présente votre tableau ? | Définit le sens de lecture. Par défaut : « un indicateur par ligne, une variante par colonne » — tel que le tableau apparaît également dans la grille ci-dessous. L’autre option le fait basculer lors de l’importation. |
| Importer le tableau | Remplace les axes, les séries et les valeurs. Les axes et séries portant le même nom conservent leur unité, leur sens et leur couleur. |

L'insertion depuis Excel est indépendante du type et fonctionne de la même manière pour les quatre types
.

## Démarrage sans données

Tant qu’aucun axe ni aucune série n’ont été créés, l’éditeur explique les
termes et propose deux boutons : **« Charger un exemple »** remplit le tableau avec un
exemple adapté au type sélectionné (par exemple, pour le radar, la comparaison entre l’eTGX de MAN
eTGX et le Mercedes-Benz eActros 600 ; pour le graphique en part de tarte, une répartition des coûts de flotte
), que l’on peut modifier ; **« Créer un tableau vide »** crée des axes
et des séries à remplir.

## Par axe (une ligne dans la grille)

| Paramètre | Description |
| --- | --- |
| Axe | Nom de l’axe tel qu’il apparaît sur le graphique et dans le tableau de données. Plusieurs lignes : la touche Entrée génère un saut de ligne qui apparaît également sur le graphique. |
| Unité | Est ajoutée à chaque nombre de cet axe (point de données, info-bulle, tableau), par exemple « kWh ». Pour les graphiques à barres et les graphiques linéaires, l’axe des valeurs commun n’affiche l’unité que si **tous** les axes comportant des valeurs utilisent la même unité. |
| Direction (« plus petit, c’est mieux ») | Uniquement pour le graphique radar. Inverse l’axe : la valeur la plus petite se trouve alors plus à l’extérieur. Pour les indicateurs où une valeur plus faible est préférable — poids, consommation, temps de charge. |
| Couleur | Uniquement pour le graphique en camembert. Définit la couleur du segment correspondant et remplace ainsi la couleur de la palette attribuée automatiquement. |
| Décimales | Uniquement lorsque les **réglages avancés par axe** sont activés : nombre de décimales à afficher. Si aucune valeur n’est indiquée, le nombre de décimales effectivement saisi est utilisé. |
| Minimum | Uniquement pour le graphique en radar, lorsque les réglages fins sont activés : limite inférieure de l’axe. Si aucune valeur n’est indiquée, l’axe commence à zéro — ou à la plus petite des valeurs négatives, le cas échéant. |
| Maximum | Uniquement pour le radar, lorsque les réglages fins sont activés : limite supérieure de l’axe. En l’absence d’indication, la plus grande valeur présente sur cet axe est utilisée. |
| ↑ ↓ ✕ | Déplace l’axe ou le supprime avec toutes ses valeurs. |

## Par série (une colonne dans la grille)

Dans le diagramme circulaire, la grille n’affiche **que la première colonne de la série** — une
remarque en dessous précise que d’autres séries restent enregistrées mais
ne sont pas représentées.

| Paramètre | Description |
| --- | --- |
| Nom de la série | Nom tel qu’il apparaît dans la légende (sauf pour les diagrammes circulaires, voir ci-dessous), l’info-bulle et le tableau de données. |
| Couleur | Remplace la couleur attribuée automatiquement à partir de la palette MAN pour cette série spécifique. Sans effet sur les graphiques en camembert — dans ce cas, la couleur varie selon l’axe (voir ci-dessus). |
| ← → ✕ | Déplace la série — l’ordre détermine la couleur de la palette et l’ordre dans la légende — ou la supprime. |

## Titre, légende et présentation

| Paramètre | Description |
| --- | --- |
| Titre | En-tête au-dessus du graphique. Si le champ reste vide, aucun en-tête n’apparaît. |
| Note de bas de page | Texte supplémentaire en petits caractères sous le titre, par exemple pour les références. |
| Légende | « au-dessus du graphique », « sous le graphique » ou « masquer ». Pour les graphiques circulaires, la légende répertorie les axes (segments) ; pour les autres types, elle répertorie les séries. |

### Options d’affichage par type

| Type | Champs | Description |
| --- | --- | --- |
| Radar | Lignes auxiliaires dans le réseau | Nombre d’anneaux auxiliaires concentriques. Valeur par défaut : 5. À visée purement esthétique, ne modifie aucune valeur. |
| Radar | Remplir les zones | Remplit la zone derrière chaque ligne de série de manière semi-transparente dans sa couleur. Désactivé par défaut. |
| Barres | Empiler | Dessine les séries les unes au-dessus des autres plutôt que côte à côte. Désactivé par défaut. |
| Barres | Orientation | « verticale » (catégories en bas) ou « horizontale » (catégories à gauche). Par défaut : verticale. |
| Ligne | Lisser les lignes | Arrondit le tracé des lignes au lieu de les tracer en ligne droite entre les points d'appui. Par défaut : désactivé. |
| Ligne | Remplir la zone | Remplit la zone sous la ligne avec sa couleur. Désactivé par défaut. |
| Ligne | Afficher les points | Affiche un point à chaque point d’appui. Activé par défaut. |
| Camembert | Rayon intérieur | Pourcentage de la partie creuse du camembert. 0 correspond à un cercle complet, une valeur supérieure (par exemple 45) à un anneau/beignet. Par défaut : 0. |
| Camembert | Libellé des segments | « Pourcentage », « Valeur absolue », « Les deux » ou « Masquer ». Par défaut : « Pourcentage ». |

## Mise à l'échelle automatique

**Dans le graphique radar**, les axes ne comportent pas d’échelle numérique visible — celle-ci ne peut en effet pas être représentée de manière pertinente lorsque
plusieurs axes ont des unités différentes. Sans
spécification particulière, chaque axe commence donc à **zéro** et s’étend jusqu’à
sa valeur maximale. La longueur d’un rayon se comporte ainsi
comme la valeur elle-même : la moitié de la distance vers l’extérieur correspond également à la moitié de la quantité.

Si des valeurs négatives apparaissent sur un axe, celui-ci commence par la plus petite d’entre elles —
sinon, le point se trouverait en dehors de la grille.

Si l’on souhaite mettre davantage en évidence les différences entre les séries, on définit
manuellement le minimum et le maximum de l’axe concerné — par exemple 400 et 600 au lieu de
0 et 600. Cela augmente les écarts visibles, mais amplifie également les petites
différences, insignifiantes dans la pratique.

Un minimum ou un maximum défini manuellement limite également le tracé :
une valeur située en dehors de ces limites est représentée exactement sur le bord, au lieu de
dépasser de la grille. Le chiffre au niveau du point de données et dans le tableau reste
celui qui a été saisi — la limite ne modifie que l’affichage, jamais la valeur. Ainsi, si
vous définissez un axe de 0 à 600 et que vous saisissez 700, vous verrez le point tout
à l’extérieur et le 700 à côté.

**Pour les graphiques à barres et les graphiques linéaires**, ECharts trace lui-même un axe des valeurs avec
une échelle visible ; celui-ci est ancré à zéro et ne peut pas être limité manuellement
. **Dans le cas d’un graphique circulaire**, il n’y a pas d’axe des valeurs — chaque segment indique
sa part dans l’ensemble. Une valeur négative ne constitue pas ici un
problème d’affichage, mais une erreur de données : le graphique affiche alors une
remarque concernant l’axe concerné, au lieu de dessiner un graphique circulaire
faussé.
