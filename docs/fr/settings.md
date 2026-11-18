# Paramètres

Tous les paramètres se trouvent dans l’**éditeur de graphiques**, qui s’ouvre automatiquement en plein écran lorsque vous accédez aux
paramètres du widget. Dans la boîte de dialogue Staffbase
qui s’affiche en arrière-plan, seul le champ **Graphique** apparaît, avec sa
; elle n’est jamais modifiée manuellement.

## L’éditeur

En haut se trouve l’en-tête, comme pour tous les widgets MAN : nom et titre à gauche, au
centre l’affichage **Éditeur · Ordinateur de bureau · Tablette · Mobile**, à droite
**Annuler**, **Rétablir**, **Aide**, **Annuler** et
**Appliquer**. À côté, s’affiche ce qui a été modifié – par exemple « Type de diagramme
modifié » ou « Données modifiées » – ou la raison pour laquelle l’état actuel ne peut pas encore
être appliqué.

En dessous, deux zones :

- **À gauche, la grille de données** avec une barre au-dessus.
- **À droite, le panneau « Diagramme »** avec quatre onglets : **Données**,
  **Mise en forme**, **Axe** et **Comportement**.

Dans les vues Bureau, Tablette et Mobile, la grille est remplacée par
l’aperçu en largeur d’appareil ; le panneau de droite reste affiché, de sorte que chaque
réglage s’applique immédiatement à côté.

« Appliquer » transfère l’état actuel dans la boîte de dialogue Staffbase ; il n’est
enregistré de manière permanente qu’avec **Enregistrer** dans Studio. En l’absence de modification,
« Appliquer » reste désactivé.

| Touche | Effet |
| --- | --- |
| ⌘/Ctrl S | Appliquer |
| ⌘/Ctrl ↵ | Appliquer et fermer |
| ⌘/Ctrl Z, ⇧⌘/Ctrl Z | Annuler, Répéter (en dehors des champs de texte) |
| F1 | Aide |
| Échap | Fermer, avec confirmation en cas de modifications en cours |

## Grille de données

Chaque **ligne** correspond à un **axe** (un indicateur, un segment dans le cas d’un graphique circulaire),
chaque **colonne** à droite est une **série** (une variante ; les versions antérieures
parlaient de « série »). En haut de chaque colonne de série figurent un point de couleur et un nom.

| Colonne | Description |
| --- | --- |
| N° | Sélectionne l’axe. Un clic dans n’importe quel champ de la ligne produit le même effet. |
| Axe | Nom de l’axe, tel qu’il apparaît sur le graphique et dans le tableau de données. La touche Entrée génère un saut de ligne, qui apparaît également sur le graphique. |
| Unité | Est ajoutée à chaque nombre de cet axe (point de données, info-bulle, tableau), par exemple « kWh ». Pour les graphiques à barres et les graphiques linéaires, l’axe des valeurs commun n’affiche l’unité que si **tous** les axes comportant des valeurs ont la même unité. |
| par série | Les valeurs, au format allemand : virgule avant les décimales, point entre les milliers. |

Dans le diagramme circulaire, la grille n’affiche **que la première série** – une note
en dessous indique que d’autres séries sont enregistrées, mais ne
sont pas représentées.

**Valeurs depuis Excel :** copier les cellules dans Excel, sélectionner un champ dans la grille,
⌘ V (Ctrl V). Le bloc s’affiche à partir de ce champ ; les axes et séries manquants
sont ajoutés. Dans le diagramme circulaire, il ne remplit que la seule série visible.

## Barre au-dessus de la grille

| Élément | Description |
| --- | --- |
| Axe 2 sur 5 · Nom | L’axe sélectionné. |
| ↑ ↓ | Déplace l’axe sélectionné ainsi que ses valeurs. Pour le graphique en camembert, l’ordre détermine la position dans le cercle ; pour le graphique à barres, l’ordre sur la ligne de base. |
| Dupliquer | Insère une copie de l’axe, avec ses valeurs et ses paramètres, juste derrière. |
| Supprimer | Supprime l’axe ainsi que ses valeurs. Annuler avec ⌘/Ctrl Z. |
| + Axe | Ajoute un axe vide et place le curseur dans son nom. |
| + Ligne | Ajoute une ligne vide. |
| Insérer depuis Excel | Ouvre une barre à droite pour importer un tableau entier (voir ci-dessous). |
| Charger un exemple | Remplace les données par un exemple correspondant au type sélectionné. La hauteur et le téléchargement sont conservés. Annuler avec ⌘/Ctrl Z. |

## Insérer depuis Excel

| Paramètre | Description |
| --- | --- |
| Tableau | Importe un tableau copié depuis Excel, PowerPoint ou Word. La première ligne et la première colonne constituent les en-têtes. Reconnaît la tabulation, le point-virgule et la virgule comme séparateurs de colonnes. |
| Comment est orienté le tableau ? | **Axes en lignes** (par défaut) : une valeur par ligne, une variante par colonne – comme dans la grille. **Axes en colonnes** : l’inverse ; le tableau est pivoté lors de l’importation. |
| Importer le tableau | Remplace les axes, les séries et les valeurs. Les axes et séries portant le même nom conservent leur unité, leurs limites, leur orientation et leur couleur. |

## Démarrage sans données

Tant qu’aucun axe ni aucune série n’ont été créés, la grille explique les
termes et propose deux boutons : **« Charger un exemple »** remplit le tableau avec un
exemple adapté au type sélectionné (par exemple, pour le radar, la comparaison entre le MAN
eTGX et le Mercedes-Benz eActros 600 ; pour le graphique en part de gâteau, une répartition des coûts de flotte
), **« Créer un tableau vide »** crée des axes et des séries à
remplir.

## Onglet « Données »

Les séries sous forme de liste ; un clic en déploie une.

| Paramètre | Description |
| --- | --- |
| ← → | Déplace la ligne. L’ordre détermine la couleur de la palette et la légende ; pour le graphique circulaire, c’est la ligne la plus en avant qui est dessinée. |
| Supprimer | Supprime la ligne ainsi que ses valeurs. |
| Nom | Tel qu’il apparaît dans la légende (sauf pour le graphique circulaire), l’info-bulle et le tableau de données. |
| Couleur | Remplace la couleur de la palette pour cette série ; « Palette » rétablit la couleur d’origine. Non disponible pour le graphique circulaire – dans ce cas, la couleur des segments dépend de l’axe. |
| + Ajouter une série | Ajoute une série vide et la déploie. |

## Onglet « Mise en page »

| Paramètre | Description |
| --- | --- |
| Type | **Grille**, **Barres**, **Ligne** ou **Camembert**. La phrase ci-dessous précise à quoi sert ce type. |
| Titre | Titre au-dessus du graphique. Vide : pas de titre. |
| Note de bas de page | Texte supplémentaire en petits caractères, par exemple pour les références bibliographiques. |
| Légende | **Au-dessus**, **En dessous** ou **Masquer**. Pour les diagrammes circulaires, la légende répertorie les axes (segments) ; dans les autres cas, les séries. |
| Section du type | Éléments propres au type sélectionné, voir ci-dessous. |
| Hauteur en px | Hauteur du graphique sur la page, de 160 à 1 200 pixels, valeur par défaut : 420. La largeur suit toujours celle de la colonne. Une hauteur hors de ces limites ne peut pas être prise en compte. |

| Type | Paramètre | Description |
| --- | --- | --- |
| Grille | Lignes auxiliaires | Nombre d’anneaux concentriques. Valeur par défaut : 5. À des fins purement esthétiques. |
| Grille | Remplir les zones | Remplit la zone derrière chaque ligne d’une couleur semi-transparente. Désactivé par défaut. |
| Barre | Direction | **Verticale** (catégories en bas) ou **Horizontale** (catégories à gauche). Par défaut : verticale. |
| Barre | Empilées | Les rangées sont superposées au lieu d’être côte à côte. Par défaut : désactivé. |
| Ligne | Lissée | Arrondit le tracé au lieu de tracer une ligne droite entre les valeurs. Par défaut : désactivé. |
| Ligne | Remplir la zone | Remplit la zone sous chaque ligne. Par défaut : désactivé. |
| Ligne | Afficher les points | Marque chaque valeur. Par défaut : activé. |
| Camembert | Rayon intérieur en % | 0 donne un cercle complet, une valeur plus élevée (par ex. 45) donne un anneau. Par défaut : 0. |
| Camembert | Libellé des segments | **Pourcentage**, **valeur**, **les deux** ou **aucun**. Par défaut : pourcentage. |

Un changement de type n’entraîne aucune perte de **données** : le titre, la note de bas de page, la légende, les axes et
les séries sont conservés, tout comme les indications sur les axes. Les **paramètres du
type** ne s’appliquent en revanche qu’à celui-ci : un graphique n’utilise toujours qu’un seul jeu
de paramètres, celui du type actuellement sélectionné. Si vous définissez des lignes auxiliaires
sur le réseau, passez au graphique à barres, y apportez des modifications puis revenez au réseau, vous retrouverez
les paramètres par défaut sur le réseau.

## Onglet « Axe »

Réglages précis de l’axe sélectionné dans la grille.

| Paramètre | Type | Description |
| --- | --- | --- |
| Nom | tous | Le nom de l’axe, sur plusieurs lignes. |
| Unité | tous | Comme dans la grille. |
| Décimales | tous | Nombre de décimales affichées. Vide : autant que celles saisies. |
| Minimum, Maximum | Grille | Limites de l’axe. Vide : dérivées des valeurs (de zéro à la valeur maximale). Le maximum doit être supérieur au minimum, sinon la valeur ne peut pas être prise en compte. |
| « Plus petit, mieux c’est » | Grille | Inverse l’axe : la plus petite valeur se trouve à l’extérieur. Pour le poids, la consommation, le temps de chargement. |
| Couleur du segment | Camembert | Couleur du segment de cet axe ; « Palette » la réinitialise. |

**Pourquoi les options Minimum, Maximum et « Plus c’est petit, mieux c’est » n’apparaissent que dans le graphique en réseau
:** elles sont définies par axe et ne peuvent pas être affichées dans le cas d’un
axe de valeurs commun – comme c’est le cas pour les graphiques à barres et les graphiques linéaires. Dans le
graphique circulaire, il n’y a pas d’axe du tout. Les valeurs masquées restent
enregistrées et s’affichent à nouveau dès que le type est sélectionné.

## Onglet « Comportement »

| Paramètre | Description |
| --- | --- |
| Autoriser le téléchargement | Affiche sous le graphique deux boutons, « Au format SVG » et « Au format PNG ». Le fichier ne contient que le graphique, pas la page. Désactivé par défaut. |

En bas figure la version du widget – si vous signalez une erreur, vous la trouverez
ici.

## Vérification

Le bouton « Appliquer » refuse un état que la page ne pourrait pas afficher correctement.
L’en-tête indique la raison, l’onglet porte une marque rouge, l’axe concerné
est surligné dans la grille, et le champ indique la marche à suivre.

| Message | Cause |
| --- | --- |
| Axe « … » : maximum trop petit | Dans le réseau, le maximum n’est pas supérieur au minimum. |
| « … » : part négative dans le graphique circulaire | Une valeur de la première ligne est négative ; un graphique circulaire n’affiche que des parts non négatives. |
| Hauteur : 160 à 1 200 pixels autorisés | La hauteur est hors limites. |

## Diagrammes existants

Jusqu’à la version 0.3, les champs **Hauteur** et **Autoriser le téléchargement** figuraient
séparément dans la boîte de dialogue Staffbase. Ces champs sont désormais masqués ; leurs valeurs restent
valables jusqu’à ce qu’un autre réglage soit défini dans l’éditeur. À l’ouverture,
l’éditeur les reprend comme état initial – un diagramme existant conserve, après
ouverture et application, exactement le même aspect qu’auparavant. Si l’ancienne case à cocher n’était pas
lisible, l’onglet « Comportement » l’indique sous le bouton.

## Mise à l’échelle automatique

**Dans le graphique radar**, les axes ne comportent pas d’échelle numérique visible ��� elle ne peut pas être représentée de manière pertinente lorsque
plusieurs axes ont des unités différentes. En l’absence
d’indication spécifique, chaque axe commence alors à **zéro** et s’étend jusqu’à
sa valeur maximale. La longueur d’un rayon se comporte donc
comme la valeur elle-même : la moitié de la distance vers l’extérieur correspond également à la moitié de la quantité.

Si un axe comporte des valeurs négatives, il commence par la plus petite d’entre elles –
sinon, le point se trouverait en dehors du maillage.

Si l’on souhaite mettre davantage en évidence les différences entre les séries, il suffit de
définir manuellement le minimum et le maximum de l’axe concerné – par exemple 400 et 600 au lieu de
0 et 600. Cela augmente les écarts visibles, mais accentue également les petites
différences, insignifiantes dans la pratique.

Un minimum ou un maximum défini manuellement limite également le tracé :
une valeur située en dehors de ces limites est représentée exactement sur le bord, au lieu de
dépasser la grille. Le chiffre au niveau du point de données et dans le tableau reste
celui qui a été saisi : la limite ne modifie que l’affichage, jamais la valeur. Ainsi, si
vous définissez un axe de 0 à 600 et que vous saisissez 700, vous verrez le point tout
à l’extérieur et le chiffre 700 à côté.

**Pour les graphiques à barres et les graphiques linéaires**, ECharts trace lui-même un axe des valeurs avec
une échelle visible ; celui-ci est ancré à zéro et ne peut pas être limité manuellement
. **Pour les graphiques circulaires**, il n’y a pas d’axe des valeurs : chaque segment indique
sa part dans l’ensemble. Une valeur négative ne pose pas de
problème d’affichage, mais constitue une erreur de données : l’éditeur ne permet pas de
la valider, et un graphique plus ancien affiche sur la page une remarque concernant
l’axe concerné, au lieu de tracer un camembert erroné.
