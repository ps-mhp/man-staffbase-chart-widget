# Diagramme

Le widget « Diagramme » permet de représenter des indicateurs sous quatre formes différentes : **diagramme en nuage
(radar), à barres, linéaire et circulaire**. Chaque type se configure via
le même éditeur, qui s’ouvre directement dans les paramètres du widget ; un
tableau copié depuis Excel peut y être importé en un clic, voir
[Étape par étape](usage.md).

## Les quatre types

**Diagramme en réseau (radar / araignée).** Plusieurs axes rayonnent en forme d’étoile
à partir d’un point central, et chaque série — par exemple, une comparaison de véhicules —
relie ses valeurs sur ces axes pour former une surface. Cela permet de
comparer d’un seul coup d’œil plusieurs indicateurs de plusieurs séries, même s’ils
sont mesurés dans des unités très différentes — kilomètres, tonnes,
minutes, kilowatts. Seul le graphique en radar propose des valeurs minimales, maximales et l’option
« plus c’est petit, mieux c’est » pour chaque axe, ainsi que les options d’affichage « lignes auxiliaires dans le réseau »
et « remplir les zones ».

**Graphique à barres (colonnes).** Compare les valeurs entre quelques catégories.
Toutes les barres partagent un axe des valeurs commun, que ECharts
calcule et étiquette lui-même — contrairement au graphique en radar, cet axe n’a donc
de sens que si toutes les catégories utilisent la même unité. Parmi les
options d’affichage disponibles : l’empilement (séries les unes au-dessus des autres plutôt que côte à côte) et
l’orientation (verticale ou horizontale).

**Graphique linéaire (courbe).** Affiche une évolution sur une
série ordonnée, par exemple sur les années de construction. L’ordre des axes dans la grille correspond à
l’ordre sur la courbe. Options d’affichage : lisser les courbes, remplir la zone sous
la courbe, afficher les points aux points d’appui.

**Diagramme circulaire (tarte / anneau).** Affiche la répartition d’un tout :
les segments correspondent aux axes (catégories), leurs valeurs déterminent la taille des segments.
**Seule la première série est tracée** — les autres séries
restent enregistrées et réapparaissent dès qu’on passe à un autre type
de graphique ; l’éditeur le signale expressément. Chaque catégorie peut se voir attribuer une
couleur de segment distincte. Options d’affichage : rayon intérieur (0 donne un
cercle complet, une valeur plus grande donne un anneau/beignet) et l’étiquette du segment
(pourcentage, valeur absolue, les deux ou masquée). Les valeurs négatives
ne posent pas de problème d’affichage avec `pie`, mais constituent une erreur de données — le
diagramme affiche alors un message d’avertissement à la place d’un diagramme de type « tarte » erroné.

Changer de type de graphique dans l’éditeur n’entraîne aucune perte de données : le titre, la note de bas de page,
la légende, les axes et les séries sont conservés, tout comme les valeurs des champs spécifiques au type
— elles ne s’affichent simplement pas tant qu’un autre type est sélectionné.

## Ce que voient les lecteurs et lectrices

- Le graphique lui-même, avec autant d’axes et de séries que souhaité.
- Les valeurs apparaissent directement sur le graphique (pour `pie`, selon le paramétrage, sous forme de
  pourcentage, de valeur absolue ou des deux) ; de plus, lorsque l’on survole
  un point ou un segment, une infobulle s’affiche avec les valeurs correspondantes.
- Une légende au-dessus ou en dessous du graphique, selon les paramètres.
  Pour le type `pie`, la légende répertorie les catégories (segments) ; pour les autres
  types, elle répertorie les séries.
- En option, un titre et une note de bas de page.
- Si le téléchargement est autorisé (voir [Paramètres](settings.md)), deux boutons
  situés sous le graphique permettent de télécharger celui-ci sous forme d’image.
- Pour les lecteurs d’écran, un tableau complet des données est également disponible sous le
  graphique. Elle est masquée visuellement, mais bien présente — le graphique est
  ainsi utilisable même sans perception visuelle.

## Exportation d’image

Lorsque le téléchargement est activé, deux boutons apparaissent sous le graphique :
« Au format SVG » et « Au format PNG ». Le fichier téléchargé ne contient **que le
diagramme**, et non le reste de la page — titre, légende, axes et valeurs
tels qu’ils s’affichent actuellement, sur fond blanc (même si
la page elle-même est transparente ou sur fond sombre). Le fichier SVG peut être
agrandi sans perte de qualité, tandis que le PNG convient aux environnements qui ne peuvent pas intégrer de SVG
(par exemple, la plupart des logiciels de présentation) et est généré en
double résolution. L’exportation fonctionne de la même manière pour les quatre types
— elle s'applique à l'image dessinée et ne tient pas compte du type de graphique.

## Traduction

Le graphique est pris en compte lors de la traduction automatique de la page. Sont traduits
le titre, la note de bas de page, les libellés des axes et les noms de séries — c'est-à-dire précisément les
textes qui ont été saisis lors de la rédaction. Les chiffres, les unités, les limites des axes,
les couleurs et tous les autres paramètres restent inchangés, car ils n’ont pas
de langue : une unité traduite serait erronée (« t » ne devient pas « ton »),
un chiffre traduit n’aurait aucun sens.

## Ce que vous voyez dans l’éditeur CMS

Lorsque vous insérez le module, l’**éditeur de graphique** s’ouvre automatiquement
avec une barre de contrôle en haut (Enregistrer, Aide, Fermer) à la place d’un
pied de page — ainsi, la fonction Enregistrer reste accessible même avec un tableau de données long,
car la barre reste fixe lors du défilement. En haut, le choix du type de graphique
et un champ dans lequel insérer un tableau copié depuis Excel ; en dessous,
une grille avec **une ligne par axe** et **une colonne par série**
(pour `pie`, une seule colonne de séries), à côté un aperçu en temps réel qui montre exactement
comment le graphique apparaîtra ensuite sur la page. Tant que rien
n’a encore été créé, l’éditeur explique les termes et propose « Charger un exemple »
ainsi que « Créer un tableau vide » — avec, selon le type sélectionné, un exemple différent
et adapté. Le champ de texte situé derrière n’affiche que la forme techniquement
enregistrée et codée des données et n’est jamais modifié manuellement.

Si la boîte de dialogue est étroite (par exemple sur de petits écrans), l’
aperçu se déplace sous la grille et — à partir d’une largeur d’environ 700 pixels —
la grille se transforme en une succession de graphiques, un par axe. La boîte de dialogue ne défile
jamais horizontalement.

Une particularité importante du radar : ses axes ne comportent **aucune échelle numérique visible**
**échelle numérique visible**. Il n’est pas possible de représenter de manière pertinente plusieurs axes avec des unités différentes (par exemple
des kilomètres et des minutes) sur une même échelle.
Chaque axe est donc étiré en interne de manière indépendante : de zéro jusqu’à
sa valeur maximale. Les chiffres réels apparaissent au niveau des points de données,
dans l’info-bulle et dans le tableau de données. Les graphiques à barres et linéaires affichent
en revanche un véritable axe des valeurs, calculé et annoté par ECharts.
Pour en savoir plus, consultez la rubrique [Paramètres](settings.md).
