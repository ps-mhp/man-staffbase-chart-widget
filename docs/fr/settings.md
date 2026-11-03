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
| Autoriser le téléchargement | Affiche sous le graphique deux boutons permettant de le télécharger sous forme d’image. Le fichier ne contient que le graphique, pas la page. Désactivé par défaut. |

## Type de graphique

La sélection tout en haut de l’éditeur détermine le type de graphique. Actuellement,
seul le **diagramme en réseau (radar / araignée)** est disponible ; la liste s'allonge à mesure que de nouveaux
types sont pris en charge. Les paramètres spécifiques au type — par exemple les
lignes auxiliaires pour le radar — n'apparaissent que lorsque le type correspondant est sélectionné.

## Importer des données depuis un tableau

| Paramètre | Description |
| --- | --- |
| Zone d’insertion | Intègre un tableau copié depuis Excel, PowerPoint ou Word. Reconnaît la tabulation, le point-virgule et la virgule comme séparateurs de colonnes. |
| Comment se présente votre tableau ? | Définit le sens de lecture. Par défaut : « un indicateur par ligne, une variante par colonne » — tel que le tableau apparaît également dans la grille ci-dessous. L’autre option inverse cet ordre lors de l’importation. |
| Importer le tableau | Remplace les axes, les séries et les valeurs. Les axes et séries portant le même nom conservent leur unité, leur sens et leur couleur. |

## Démarrage sans données

Tant qu’aucun axe ni aucune série n’ont été créés, l’éditeur explique les
termes et propose deux boutons : **« Charger un exemple »** remplit un
tableau comparatif complet (MAN eTGX contre Mercedes-Benz eActros 600), que
vous pouvez écraser ; **« Créer un tableau vide »** définit trois axes et deux
séries à remplir.

## Par axe (une ligne dans la grille)

| Paramètre | Description |
| --- | --- |
| Axe | Nom de l’axe, tel qu’il apparaît sur le graphique et dans le tableau de données. Sur plusieurs lignes : la touche Entrée génère un saut de ligne qui apparaît également dans le graphique. |
| Unité | Est ajoutée à chaque chiffre de cet axe (point de données, info-bulle, tableau), par exemple « kWh ». |
| Direction (« plus petit, c’est mieux ») | Inverse l’axe : la valeur la plus petite se trouve alors plus à l’extérieur. Pour les indicateurs où une valeur plus faible est préférable — poids, consommation, temps de charge. |
| Décimales | Uniquement lorsque les **réglages fins par axe** sont activés : Nombre de décimales affichées. Si aucune valeur n’est indiquée, le nombre de décimales effectivement saisi est repris. |
| Minimum | Uniquement lorsque les réglages précis sont activés : limite inférieure de l’axe. Si aucune valeur n’est indiquée, l’axe commence à zéro — pour les valeurs négatives, à la plus petite d’entre elles. |
| Maximum | Uniquement lorsque les « Réglages fins » sont activés : limite supérieure de l’axe. En l’absence d’indication, la plus grande valeur présente sur cet axe est utilisée. |
| ↑ ↓ ✕ | Déplace l’axe en cercle ou le supprime avec toutes ses valeurs. |

## Par série (une colonne de la grille)

| Paramètre | Description |
| --- | --- |
| Nom de la série | Nom tel qu’il apparaît dans la légende, l’info-bulle et le tableau de données. |
| Couleur | Remplace la couleur attribuée automatiquement à partir de la palette MAN pour cette série spécifique. |
| ← → ✕ | Déplace la série — l’ordre détermine la couleur de la palette et l’ordre dans la légende — ou la supprime. |

## Titre, légende et affichage

| Paramètre | Description |
| --- | --- |
| Titre | En-tête au-dessus du graphique. Si le champ reste vide, aucun en-tête n’apparaît. |
| Note de bas de page | Texte supplémentaire en petits caractères sous le titre, par exemple pour les références bibliographiques. |
| Légende | « au-dessus du graphique », « sous le graphique » ou « masquer ». |
| Lignes auxiliaires dans le réseau | Uniquement pour le graphique radar : nombre d’anneaux auxiliaires concentriques. La valeur par défaut est 5. À titre purement esthétique, cela ne modifie aucune valeur. |
| Remplir les zones | Uniquement pour le radar : remplit la zone située derrière chaque ligne de série de manière semi-transparente, dans la couleur de celle-ci. Désactivé par défaut. |

## Mise à l'échelle automatique

Les axes ne comportent pas d'échelle numérique visible — celle-ci ne peut pas être représentée de manière pertinente lorsque plusieurs axes
ont des unités différentes. Sans indication spécifique,
chaque axe commence alors à **zéro** et s’étend jusqu’à sa plus grande
valeur possible. La longueur d’un rayon se comporte ainsi comme la valeur
elle-même : la moitié du chemin vers l’extérieur correspond également à la moitié de la quantité.

Si un axe comporte des valeurs négatives, il commence par la plus petite d’entre elles —
sinon, le point se trouverait en dehors de la grille.

Si vous souhaitez mettre davantage en évidence les différences entre les séries, définissez
manuellement le minimum et le maximum de l’axe concerné — par exemple 400 et 600 au lieu de
0 et 600. Cela augmente les écarts visibles, mais amplifie également les petites
différences, insignifiantes dans la pratique.

Un minimum ou un maximum défini manuellement limite également le tracé :
une valeur située en dehors de ces limites est représentée exactement sur le bord, au lieu de
dépasser la grille. Le chiffre affiché au niveau du point de données et dans le tableau reste
celui qui a été saisi — la limite ne modifie que l’affichage, jamais la valeur. Ainsi, si
vous définissez un axe de 0 à 600 et que vous saisissez 700, vous verrez le point tout
à l’extérieur et le chiffre 700 à côté.
