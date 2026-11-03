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

## En-tête de l’éditeur de diagramme

| Paramètre | Description |
| --- | --- |
| Titre | Titre au-dessus du graphique. Si le champ reste vide, aucun titre n’apparaît. |
| Note de bas de page | Texte supplémentaire en petits caractères sous le titre, par exemple pour les références. |
| Afficher la légende | Affiche ou masque la légende contenant les noms des séries. |
| Position de la légende | « en haut » ou « en bas » — emplacement de la légende par rapport au graphique. |
| Nombre d'anneaux | Uniquement pour le graphique radar : nombre d'anneaux concentriques auxiliaires dans la grille. La valeur par défaut est 5. À des fins purement esthétiques, cela ne modifie pas les valeurs. |
| Remplir la zone | Uniquement pour le graphique radar : remplit la zone derrière chaque ligne de série de manière semi-transparente dans la couleur de celle-ci. Désactivé par défaut. |

## Par catégorie (axe)

| Paramètre | Description |
| --- | --- |
| Libellé | Nom de l’axe tel qu’il apparaît sur le graphique et dans le tableau de données. |
| Unité | Est ajoutée à chaque chiffre de cet axe (point de données, info-bulle, tableau), par exemple « kWh ». |
| Décimales | Nombre de décimales affichées. Si aucune valeur n’est indiquée, le nombre de décimales effectivement saisi est utilisé. |
| Minimum | Limite inférieure de l’axe. Si aucune valeur n’est indiquée, la plus petite valeur présente sur cet axe est utilisée. |
| Maximum | Limite supérieure de l’axe. Si aucune valeur n’est indiquée, la plus grande valeur présente sur cet axe est utilisée. |
| Plus c’est petit, mieux c’est | Inverse l’axe : la valeur la plus petite se trouve alors la plus à l’extérieur. Pour les indicateurs où une valeur plus faible est préférable — poids, consommation, temps de charge. |

## Par série

| Paramètre | Description |
| --- | --- |
| Nom de la série | Nom tel qu’il apparaît dans la légende, l’info-bulle et le tableau de données. |
| Couleur | Remplace la couleur attribuée automatiquement à partir de la palette MAN pour cette série spécifique. |

## Mise à l'échelle automatique

Les axes ne comportent pas d’échelle numérique visible — celle-ci ne peut pas être représentée de manière pertinente lorsque plusieurs axes
ont des unités différentes. Sans minimum
ni maximum définis, chaque axe s’étend alors automatiquement entre la
plus petite et la plus grande valeur qui y apparaissent. Cela rend les différences
entre les séries clairement visibles, mais peut également donner l’impression que de petites différences, insignifiantes dans la pratique,
sont importantes visuellement. Si vous ne le souhaitez pas,
définissez manuellement les valeurs minimales et maximales de l’axe concerné — par exemple 0 et 600
pour une plage, au lieu de l’étendre entre la plus petite et la plus grande
valeur présentes.

Un minimum ou un maximum défini manuellement limite également le tracé :
une valeur située en dehors de ces limites est affichée exactement sur le bord, au lieu de
dépasser la grille. Le chiffre au niveau du point de données et dans le tableau reste
celui qui a été saisi — la limite ne modifie que l’affichage, jamais la valeur. Ainsi, si
vous définissez un axe de 0 à 600 et que vous saisissez 700, vous verrez le point tout
à l’extérieur et le chiffre 700 à côté.
