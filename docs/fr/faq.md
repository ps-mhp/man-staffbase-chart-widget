# FAQ

Chaque message que le diagramme peut afficher à la place du graphique doit être formulé sous forme de question —
avec le libellé exact, afin qu'il puisse être retrouvé via la recherche.

**Question :** Je vois le message « Aucun diagramme n’a encore été configuré. Ouvrez
les paramètres du module. »

Réponse : Aucune configuration n’a encore été enregistrée pour ce module.
Ouvrez les paramètres du widget, remplissez l’éditeur de diagramme et enregistrez.

**Question :** Je vois le message « Le graphique n'a pas pu être lu.
Veuillez le reconfigurer dans les paramètres. »

Réponse : Les données enregistrées sont corrompues ou ont été modifiées manuellement.
Ouvrez les paramètres du widget et reconfigurez le graphique dans l'éditeur,
si nécessaire à l'aide d'un tableau nouvellement inséré.

**Question :** Je vois le message « Le type de graphique « … » n’est pas reconnu par cette version du
module. Veuillez mettre à jour le module. » (ou, sans
mention du nom du type : « Le type de graphique configuré n’est pas reconnu par cette version du
module. Veuillez mettre à jour le module.”)

Réponse : Le graphique a été configuré avec une version plus récente du module
qui prend en charge un type de graphique que cette version ne prend pas encore
en charge. Mettez le module à jour vers la dernière version.

**Question :** Je vois le message « Aucune donnée dans le graphique pour l’instant. Créez des
axes et des séries dans les paramètres. »

Réponse : Aucun axe ni aucune série n’a été créé dans l’éditeur de graphiques. Dans l’
éditeur, importez un tableau via « Insérer depuis Excel » ou utilisez l’un des
deux boutons « Charger un exemple » ou « Créer un tableau vide »
.

**Question :** Après l’insertion, mes indicateurs apparaissent comme des séries et mes
variantes comme des axes — tout est inversé.

Réponse : Dans la barre « Insérer depuis Excel », le sens de lecture incorrect
avait été sélectionné. Sous « Comment est orienté le tableau ? », sélectionnez l’autre option et
cliquez à nouveau sur « Importer le tableau ».

**Question :** Le libellé de mon axe est si long qu’il comprime le graphique
.

Réponse : Dans le nom de l’axe – dans la grille ou sous « Axe » dans
« Libellé » – appuyez sur la touche Entrée à l’endroit souhaité. Le
retour à la ligne est repris dans le graphique.

**Question :** Je vois le message « « … » a une valeur négative. Un
diagramme circulaire ne peut pas représenter de parts négatives. » (ou, sans mention de
catégorie : « Un diagramme circulaire ne peut pas représenter de parts négatives. »)

Réponse : Un diagramme circulaire montre la répartition d’un tout ; une part négative
n’y trouve pas de correspondance. Corrigez la catégorie mentionnée dans l’
éditeur de diagrammes en lui attribuant une valeur non nulle — ou passez au
**diagramme à barres**, qui peut représenter des valeurs négatives. L’éditeur ne permet
tout simplement pas d’intégrer une part négative dans le diagramme circulaire ; ce message
ne peut s’afficher que sur un diagramme issu d’une version antérieure.

Le message bloque intentionnellement l’ensemble du graphique, au lieu de simplement omettre le
segment négatif : un diagramme circulaire répartit les valeurs restantes sur le
cercle complet ; on se retrouverait donc avec un diagramme d’apparence complète dont
les pourcentages seraient implicitement augmentés.

**Question :** Je vois le message « Le graphique n’a pas pu être chargé.
Veuillez recharger la page. »

Réponse : La bibliothèque de graphiques n’a pas pu être rechargée, généralement en raison
d’une connexion Internet interrompue. Rechargez la page ; si le problème
persiste, vérifiez la connexion réseau.

**Question :** Pourquoi mon graphique est-il vide alors que des données ont été saisies ?

Réponse : La plupart du temps, le bloc se trouve dans une colonne très étroite ou dans un
élément replié, de sorte que le conteneur a une hauteur de 0. Le graphique
reste alors vide en permanence, car il ne dispose d’aucun espace pour s’afficher. Déplacez le
déplacer le bloc dans une colonne plus large ou déplier l’élément.

**Question :** Pourquoi, pour deux valeurs presque identiques, est-ce que je constate une grande
différence dans le graphique ?

Réponse : Sans limite maximale définie, chaque axe s’étend jusqu’à la plus grande valeur qui
y apparaît. Si deux valeurs sont proches l’une de l’autre, mais très éloignées de zéro,
la partie supérieure de l’axe utilise toute la plage — la différence
semble ainsi plus grande qu’elle ne l’est en réalité. Solution : dans l’éditeur de diagramme,
sélectionnez l’axe concerné et définissez manuellement le minimum et le maximum
sous « Axe ».

**Question :** Pourquoi la valeur la moins bonne se trouve-t-elle plus à l’extérieur ?

Réponse : Sur cet axe, l’option « Plus petit, c’est mieux » n’est pas activée. Elle doit être activée pour
tous les indicateurs pour lesquels une valeur plus petite correspond à un meilleur
résultat — par exemple le poids, la consommation ou le temps de chargement. Dans l’éditeur de graphiques,
sélectionnez l’axe et activez cette option sous « Axe ».

**Question :** Je ne vois pas de boutons de téléchargement sous le graphique.

Réponse : Soit l’option « Autoriser le téléchargement » n’est pas activée dans l’éditeur de graphiques sous
« Comportement », soit le graphique n’est pas encore entièrement tracé — les
boutons n’apparaissent que dès qu’un graphique est prêt à être téléchargé.

**Question :** Lorsque je clique sur « En tant que SVG » ou « En tant que PNG », le message « L’exportation a
échoué. Veuillez réessayer. » s’affiche.

Réponse : L’exportation n’a pas pu trouver le diagramme dessiné — généralement parce qu’
il est en cours de rechargement. Patientez quelques instants et cliquez à nouveau ; si le problème
persiste, actualisez la page.

**Question :** Puis-je afficher plus de six séries ?

Réponse : Oui. La palette de couleurs MAN comporte six couleurs ; à partir de la septième série,
les couleurs se répètent. Les séries restent néanmoins clairement
distinguables, car chaque point de données porte sa valeur en légende et
le nom ainsi que les valeurs de chaque série figurent dans l’info-bulle et la légende. Sous « Données »,
vous pouvez également attribuer une couleur distincte à chaque série.

**Question :** Que devient mon graphique lors de la traduction automatique
de la page ?

Réponse : Le titre, la note de bas de page, les libellés des axes et
les noms des séries sont traduits. Les chiffres, les unités, les limites des axes, les couleurs et tous les autres
paramètres restent inchangés.

**Question :** Un chiffre inséré est soudainement 1 000 fois trop grand ou
trop petit.

Réponse : L’éditeur de graphiques interprète les chiffres à l’allemande – lors de la saisie, lors de l’
insertion dans la grille et lors de l’« insertion depuis Excel » : un point est considéré comme
séparateur de milliers, une virgule comme séparateur décimal. `1.234` devient
donc `1234` et non `1,234`. Si vous insérez un tableau au format anglais
(point comme séparateur décimal), vous devez mettre les nombres concernés au
les mettre au format allemand avant de les insérer, sinon « 1.234 » (mille)
sera par exemple lu comme « 1,234 » (un virgule deux trois quatre). Si un nombre contient à la fois
un point et une virgule, c’est le dernier
caractère qui est considéré comme le séparateur décimal, quel que soit le format — `1.234,5` et `1,234.5` donnent
tous deux `1234,5`.

**Question :** Où sont passés les champs « Hauteur en pixels » et « Autoriser le téléchargement » dans la
boîte de dialogue Staffbase ?

Réponse : Ils se trouvent désormais tous les deux dans l’éditeur de diagramme : la hauteur sous
« Mise en page », le téléchargement sous « Comportement ». Les anciens champs sont
masqués. Les graphiques plus anciens conservent leurs valeurs ; l’éditeur les reprend
à l’ouverture, et sans modification, le graphique reste tel quel sur la page.

**Question :** « Appliquer » ne fait rien, en haut il est indiqué « Axe « … » : « Maximum trop petit ».

Réponse : Dans le réseau, une valeur maximale a été saisie pour cet axe, qui n’est pas
supérieure à la valeur minimale. L’axe est sélectionné dans la grille ; sous « Axe »,
augmentez la valeur maximale ou videz le champ – un champ vide signifie « dérivé des valeurs
».
