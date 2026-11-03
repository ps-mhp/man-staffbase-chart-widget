# FAQ

Chaque message que le diagramme peut afficher à la place du graphique doit être formulé sous forme de question —
avec le libellé exact, afin qu'il puisse être retrouvé via la recherche.

**Question :** Je vois le message « Aucun diagramme n’a encore été configuré. Ouvrez
les paramètres du module. »

Réponse : Aucune configuration n’a encore été enregistrée pour ce module.
Ouvrez les paramètres du widget, remplissez l’éditeur de diagramme et enregistrez.

**Question :** Je vois le message « Le graphique n’a pas pu être lu.
Veuillez le reconfigurer dans les paramètres. »

Réponse : Les données enregistrées sont corrompues ou ont été modifiées manuellement.
Ouvrez les paramètres du widget et reconfigurez le graphique dans l’éditeur,
si nécessaire à l’aide d’un tableau nouvellement inséré.

**Question :** Je vois le message « Le type de graphique « … » n’est pas reconnu par cette version du
module. Veuillez mettre à jour le module. » (ou, sans
mention du nom du type : « Le type de graphique configuré n’est pas reconnu par cette version du
module. Veuillez mettre à jour le module.”)

Réponse : Le graphique a été configuré avec une version plus récente du module
qui prend en charge un type de graphique que cette version ne
prend pas encore en charge. Mettez le module à jour vers la dernière version.

**Question :** Je vois le message « Aucune donnée dans le graphique pour l’instant. Ajoutez
des catégories et des séries dans les paramètres. »

Réponse : Aucune catégorie (axe) ni aucune série n’a été créée dans l’éditeur de graphiques.
Ajoutez au moins une catégorie et une série, ou insérez un
tableau.

**Question :** Je vois le message « Le graphique n’a pas pu être chargé.
Veuillez actualiser la page. »

Réponse : La bibliothèque de graphiques n’a pas pu être rechargée, généralement en raison
d’une connexion Internet interrompue. Actualisez la page ; si le problème
persiste, vérifiez la connexion réseau.

**Question :** Pourquoi mon graphique est-il vide alors que des données ont été saisies ?

Réponse : Le plus souvent, le bloc se trouve dans une colonne très étroite ou dans un
élément replié, de sorte que le conteneur a une hauteur de 0. Le graphique
reste alors vide en permanence, car il ne dispose d’aucun espace pour s’afficher. Déplacez le
bloc dans une colonne plus large ou développez l’élément.

**Question :** Pourquoi, pour deux valeurs presque identiques, constate-je une grande
différence dans le graphique ?

Réponse : Sans valeurs minimales et maximales définies, chaque axe s’étend automatiquement
entre la plus petite et la plus grande valeur présentes — ce qui fait que même
de petites différences semblent visuellement importantes. Solution : dans l’éditeur de diagramme, pour l’
axe concerné, définir manuellement les valeurs minimales et maximales.

**Question :** Pourquoi la valeur la moins bonne se trouve-t-elle plus à l’extérieur ?

Réponse : Sur cet axe, l’option « Plus c’est petit, mieux c’est » n’est pas activée. Elle doit être
activée pour tous les indicateurs pour lesquels une valeur plus petite correspond à un meilleur
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
