# Ustawienia

W oknie dialogowym konfiguracji znajdują się technicznie tylko dwa pola: **Wykres** i
**Wysokość w pikselach**. Pola „Wykres” nie edytuje się bezpośrednio — zamiast tego
automatycznie otwiera się **edytor wykresów**, w którym znajdują się wszystkie pozostałe
ustawienia.

## Pole w oknie dialogowym konfiguracji

| Ustawienie | Opis |
| --- | --- |
| Wykres | Zawiera kompletną, zakodowaną technicznie definicję wykresu. Edytuje się go wyłącznie za pomocą edytora wykresów, nigdy ręcznie. |
| Wysokość w pikselach | Wysokość wykresu na stronie. Dopuszczalny zakres to od 160 do 1200 pikseli, domyślna wartość to 420. Szerokość zawsze zależy od kolumny. |
| Zezwól na pobieranie | Wyświetla pod wykresem dwa przyciski umożliwiające pobranie go jako obraz. Plik zawiera wyłącznie wykres, a nie całą stronę. Domyślnie wyłączone. |

## Typ wykresu

Wybór znajdujący się na samym górze edytora określa rodzaj wykresu. Obecnie dostępny
jest tylko **wykres siatkowy (radar / pajęczyna)**; lista będzie się powiększać wraz z każdym kolejnym
obsługiwanym typem. Ustawienia zależne od typu — na przykład w przypadku wykresu radarowego
linie pomocnicze — pojawiają się tylko wtedy, gdy wybrany jest odpowiedni typ.

## Przenoszenie danych z tabeli

| Ustawienie | Opis |
| --- | --- |
| Pole wstawiania | Przenosi tabelę skopiowaną z programu Excel, PowerPoint lub Word. Rozpoznaje tabulator, średnik i przecinek jako separatory kolumn. |
| Jak wygląda Twoja tabela? | Określa kierunek odczytu. Domyślnie „jedna wartość w każdym wierszu, jedna wariant w każdej kolumnie” — tak jak tabela jest ułożona w siatce poniżej. Inny wybór powoduje jej odwrócenie podczas importowania. |
| Przenieś tabelę | Zastępuje osie, serie i wartości. Osie i serie o tej samej nazwie zachowują jednostkę, kierunek osi i kolor. |

## Rozpoczęcie bez danych

Dopóki nie utworzono ani osi, ani serii, edytor wyjaśnia
pojęcia i udostępnia dwa przyciski: **„Załaduj przykład”** wypełnia
kompletne porównanie (MAN eTGX kontra Mercedes-Benz eActros 600), które
można nadpisać; **„Utwórz pustą tabelę”** tworzy trzy osie i dwie
serii do wypełnienia.

## Dla każdej osi (jeden wiersz w siatce)

| Ustawienie | Opis |
| --- | --- |
| Oś | Nazwa osi, tak jak pojawia się na wykresie i w tabeli danych. Wiele wierszy: klawisz Enter powoduje przełamanie wiersza, które pojawia się również na wykresie. |
| Jednostka | Jest dołączana do każdej liczby na tej osi (punkt danych, podpowiedź, tabela), np. „kWh”. |
| Kierunek („im mniej, tym lepiej”) | Odwraca oś: mniejsza wartość znajduje się wtedy dalej na zewnątrz. Dla wskaźników, w przypadku których mniej oznacza lepszy wynik — waga, zużycie, czas ładowania. |
| Miejsca po przecinku | Tylko przy włączonych **precyzyjnych ustawieniach dla każdej osi**: Ile miejsc po przecinku ma być wyświetlanych. Jeśli nie podano wartości, przyjmowana jest liczba miejsc po przecinku faktycznie wprowadzona. |
| Minimum | Tylko przy włączonych ustawieniach zaawansowanych: dolna granica osi. Jeśli nie podano wartości, oś zaczyna się od zera — w przypadku wartości ujemnych od najmniejszej z nich. |
| Maksimum | Tylko przy włączonych ustawieniach precyzyjnych: górna granica osi. W przypadku braku określenia stosowana jest największa występująca wartość tej osi. |
| ↑ ↓ ✕ | Przesuwa oś po okręgu lub usuwa ją wraz z wartościami. |

## Dla każdej serii (jedna kolumna w siatce)

| Ustawienie | Opis |
| --- | --- |
| Nazwa serii | Nazwa wyświetlana w legendzie, podpowiedzi i tabeli danych. |
| Kolor | Zastępuje automatycznie przypisany kolor z palety MAN dla tej konkretnej serii. |
| ← → ✕ | Przesuwa serię — kolejność określa kolor z palety oraz kolejność w legendzie — lub ją usuwa. |

## Tytuł, legenda i wygląd

| Ustawienie | Opis |
| --- | --- |
| Tytuł | Nagłówek nad wykresem. Jeśli pole pozostanie puste, nagłówek nie pojawi się. |
| Przypis | Dodatkowy tekst napisany małą czcionką pod tytułem, np. w celu podania źródeł. |
| Legenda | „nad wykresem”, „pod wykresem” lub „ukryj”. |
| Linie pomocnicze w siatce | Tylko w przypadku wykresu radarowego: liczba koncentrycznych pierścieni pomocniczych. Domyślnie ustawiono 5. Ma charakter wyłącznie wizualny, nie zmienia wartości. |
| Wypełnianie obszarów | Tylko w przypadku wykresu radarowego: wypełnia obszar za każdą linią serii półprzezroczystym kolorem odpowiadającym jej barwie. Domyślnie wyłączone. |

## Automatyczne skalowanie

Osie nie posiadają widocznej skali liczbowej — w przypadku wielu osi
o różnych jednostkach nie da się jej sensownie przedstawić. Bez własnego określenia
każda oś zaczyna się zamiast tego od **zera** i sięga do swojej największej
występującej wartości. Długość promienia zachowuje się zatem tak samo jak sama wartość:
połowa odległości na zewnątrz to również połowa wielkości.

Jeśli na osi występują wartości ujemne, zaczyna się ona od najmniejszej z nich —
w przeciwnym razie punkt znalazłby się poza siatką.

Kto chce silniej podkreślić różnice między seriami, ustawia
ręcznie minimum i maksimum danej osi — np. 400 i 600 zamiast
0 i 600. Zwiększa to widoczne odstępy, ale sprawia również, że niewielkie,
w praktyce nieistotne różnice wydają się większe.

Ręcznie ustawiona wartość minimalna lub maksymalna ogranicza również zakres rysunku:
wartość wykraczająca poza te granice jest wyświetlana dokładnie na krawędzi, zamiast
wystawać poza siatkę. Liczba przy punkcie danych i w tabeli pozostaje
przy tym taka, jaka została wprowadzona — granica zmienia jedynie obraz, nigdy wartość. Kto
zatem ustawi oś w zakresie od 0 do 600 i wprowadzi wartość 700, zobaczy punkt na samym
skraju, a obok niego liczbę 700.
