# Ustawienia

W oknie dialogowym konfiguracji znajdują się technicznie tylko dwa pola: **Wykres** i
**Wysokość w pikselach**. Pola „Wykres” nie edytuje się bezpośrednio — zamiast tego
automatycznie otwiera się **edytor wykresów**, w którym znajdują się wszystkie pozostałe
ustawienia.

## Pole w oknie dialogowym konfiguracji

| Ustawienie | Opis |
| --- | --- |
| Wykres | Zawiera kompletną, zakodowaną technicznie definicję wykresu. Edytuje się go wyłącznie za pomocą edytora wykresów, nigdy ręcznie. |
| Wysokość w pikselach | Wysokość wykresu na stronie. Dopuszczalny zakres to od 160 do 1200 pikseli, wartość domyślna to 420. Szerokość zawsze zależy od kolumny. |
| Zezwól na pobieranie | Wyświetla pod wykresem dwa przyciski umożliwiające pobranie wykresu jako obrazu. Plik zawiera wyłącznie wykres, a nie całą stronę. Domyślnie wyłączone. |

## Nagłówek edytora wykresów

| Ustawienie | Opis |
| --- | --- |
| Tytuł | Nagłówek nad wykresem. Jeśli pole pozostanie puste, nagłówek nie zostanie wyświetlony. |
| Przypis | Dodatkowy tekst napisany małą czcionką pod tytułem, np. w celu podania źródeł. |
| Pokaż legendę | Włącza lub wyłącza wyświetlanie legendy z nazwami serii. |
| Położenie legendy | „u góry” lub „u dołu” — położenie legendy względem wykresu. |
| Liczba pierścieni | Tylko w przypadku wykresu radarowego: liczba koncentrycznych pierścieni pomocniczych w siatce. Domyślnie ustawiono 5. Ma charakter wyłącznie wizualny, nie zmienia wartości. |
| Wypełnij obszar | Tylko w przypadku wykresu radarowego: wypełnia obszar za każdą linią serii półprzezroczystym kolorem odpowiadającym jej barwie. Domyślnie wyłączone. |

## Dla każdej kategorii (osi)

| Ustawienie | Opis |
| --- | --- |
| Etykieta | Nazwa osi, tak jak pojawia się na wykresie i w tabeli danych. |
| Jednostka | Dodawana do każdej liczby na tej osi (punkt danych, podpowiedź, tabela), np. „kWh”. |
| Miejsca po przecinku | Liczba wyświetlanych miejsc po przecinku. Jeśli nie podano wartości, przyjmowana jest liczba miejsc po przecinku faktycznie wprowadzona. |
| Minimum | Dolna granica osi. Jeśli nie podano wartości, stosowana jest najmniejsza występująca wartość tej osi. |
| Maksimum | Górna granica osi. Jeśli nie podano wartości, zostanie użyta największa występująca wartość tej osi. |
| Im mniejsza, tym lepiej | Odwraca oś: mniejsza wartość znajduje się wtedy dalej na zewnątrz. Dla wskaźników, w przypadku których mniejsza wartość oznacza lepszy wynik — waga, zużycie, czas ładowania. |

## Dla każdej serii

| Ustawienie | Opis |
| --- | --- |
| Nazwa serii | Nazwa wyświetlana w legendzie, podpowiedzi i tabeli danych. |
| Kolor | Zastępuje automatycznie przypisany kolor z palety MAN dla tej konkretnej serii. |

## Automatyczne skalowanie

Osie nie posiadają widocznej skali liczbowej — nie da się jej sensownie przedstawić w przypadku wielu osi
o różnych jednostkach miary. Bez ustawionych wartości minimalnej
i maksymalnej każda oś rozciąga się automatycznie między
najniższą a najwyższą wartością, jaka na niej występuje. To wyraźnie uwidacznia różnice
między seriami, ale może również sprawić, że niewielkie, w praktyce
nieistotne różnice będą optycznie wydawały się duże. Kto tego nie chce,
może ręcznie ustawić minimalną i maksymalną wartość danej osi — np. 0 i 600
dla danego zakresu, zamiast rozciągać ją między najmniejszą a największą
występującą wartością.

Ręcznie ustawiona wartość minimalna lub maksymalna ogranicza również wykres:
wartość wykraczająca poza te granice jest wyświetlana dokładnie na krawędzi, zamiast
wystawać poza siatkę. Liczba przy punkcie danych i w tabeli pozostaje
przy tym taka, jaka została wprowadzona — granica zmienia jedynie obraz, nigdy wartość. Kto
zatem ustawi oś w zakresie od 0 do 600 i wpisze 700, zobaczy punkt na samym
skraju, a liczbę 700 obok niego.
