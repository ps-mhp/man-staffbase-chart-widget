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
qui prend en charge un type de graphique que cette version ne
prend pas encore en charge. Mettez le module à jour vers la dernière version.

**Question :** Je vois le message « Aucune donnée dans le graphique pour l’instant. Créez des
axes et des séries dans les paramètres. »

Réponse : Aucun axe ni aucune série n’ont été créés dans l’éditeur de graphiques. Dans l’
éditeur, insérez un tableau ou utilisez l’un des deux boutons « Charger un exemple »
ou « Créer un tableau vide ».

**Question :** Après l’insertion, mes indicateurs apparaissent comme des séries et mes
variantes comme des axes — tout est inversé.

Réponse : Le sens de lecture incorrect était sélectionné sous la zone d’insertion. Passez à l’
autre réponse sous « Comment se présente votre tableau ? » et cliquez à nouveau sur
« Appliquer le tableau ».

**Question :** Le libellé de mon axe est si long qu’il
réduit la taille du graphique.

Réponse : Dans le champ de l’axe, appuyez sur la touche Entrée à l’endroit souhaité.
Le saut de ligne sera repris dans le graphique.

**Question :** Je vois le message « « … » a une valeur négative. Un
diagramme circulaire ne peut pas représenter de parts négatives. » (ou, sans mention de
catégorie : « Un diagramme circulaire ne peut pas représenter de parts négatives. »)

Réponse : Un diagramme circulaire montre la répartition d’un tout ; une part
négative n’y trouve pas de correspondance. Corrigez la catégorie mentionnée dans l’
éditeur de diagramme en lui attribuant une valeur non nulle — ou passez à un
**diagramme à barres**, qui peut représenter des valeurs négatives.

Le message bloque intentionnellement l’ensemble du graphique, au lieu de simplement omettre le
segment négatif : un diagramme circulaire répartit les valeurs restantes sur le
cercle complet ; on se retrouverait donc avec un diagramme d’apparence complète dont
les pourcentages seraient implicitement augmentés.

**Question :** Je vois le message « Le graphique n’a pas pu être chargé.
Veuillez recharger la page. »

Réponse : La bibliothèque de graphiques n’a pas pu être rechargée, généralement en raison d’
une connexion Internet interrompue. Rechargez la page ; si le problème
persiste, vérifiez la connexion réseau.

**Question :** Pourquoi mon diagramme est-il vide alors que des données ont été saisies ?

Réponse : La plupart du temps, le bloc se trouve dans une colonne très étroite ou dans un
élément replié, de sorte que le conteneur a une hauteur de 0. Le graphique
reste alors vide en permanence, car il ne dispose d’aucun espace pour s’afficher. Déplacez le
bloc dans une colonne plus large ou développez l’élément.

**Question :** Pourquoi, pour deux valeurs presque identiques, constate-je une grande
différence dans le graphique ?

Réponse : Sans limite maximale définie, chaque axe s'étend jusqu’à la plus grande valeur qui
y apparaît. Si deux valeurs sont proches l’une de l’autre mais éloignées de zéro,
la partie supérieure de l’axe utilise toute la plage — la différence
semble ainsi plus importante qu’elle ne l’est en réalité. Solution : dans l’éditeur de graphique,
définissez manuellement les valeurs minimale et maximale pour l’axe concerné.

**Question :** Pourquoi la valeur la moins bonne se trouve-t-elle plus à l’extérieur ?

Réponse : sur cet axe, l’option « Plus c’est petit, mieux c’est » n’est pas activée. Il doit être activé pour
tous les indicateurs pour lesquels une valeur plus faible correspond à un meilleur
résultat — par exemple le poids, la consommation ou le temps de chargement. Activez-le dans l’éditeur de graphiques pour
l’axe concerné.

**Question :** Je ne vois pas de boutons de téléchargement sous le graphique.

Réponse : Soit l’option « Autoriser le téléchargement » n’est pas
activée dans les paramètres, soit le graphique n’est pas encore entièrement tracé — les
boutons n’apparaissent que dès qu’un graphique est prêt à être téléchargé.

**Question :** Lorsque je clique sur « En tant que SVG » ou « En tant que PNG », le message « L'exportation a
échoué. Veuillez réessayer. » s'affiche.

Réponse : L’exportation n’a pas pu trouver le graphique dessiné — généralement parce qu’
il est en cours de rechargement. Patientez un instant et cliquez à nouveau ; si le problème
persiste, actualisez la page.

**Question :** Puis-je afficher plus de six séries ?

Réponse : Oui. La palette de couleurs MAN comporte six couleurs ; à partir de la septième série,
les couleurs se répètent. Les séries restent néanmoins clairement
distinguables, car chaque point de données porte sa valeur en légende et
le nom ainsi que les valeurs de chaque série figurent dans l’info-bulle et la légende.

**Question :** Que devient mon graphique lors de la traduction automatique
de la page ?

Réponse : Le titre, les notes de bas de page, les libellés des axes et
les noms des séries sont traduits. Les chiffres, les unités, les limites des axes, les couleurs et tous les autres
paramètres restent inchangés.

**Question :** Un chiffre inséré est soudainement 1 000 fois trop grand ou
trop petit.

Réponse : L'éditeur de graphiques interprète les chiffres à l'allemande : le point sert de
séparateur des milliers, la virgule de séparateur décimal. Ainsi, `1.234` devient
`1234` et non `1,234`. Si vous insérez un tableau au format anglais
(point comme séparateur décimal), vous devez mettre les nombres concernés au
les mettre au format allemand avant de les insérer, sinon « 1.234 » (mille)
sera par exemple interprété comme « 1,234 » (un virgule deux trois quatre). Si un nombre contient à la fois
un point et une virgule, c’est le dernier
caractère qui est considéré comme le séparateur décimal, quel que soit le format — `1.234,5` et `1,234.5` donnent
tous deux `1234,5`.
