# Ustawienia

W oknie dialogowym konfiguracji znajdują się technicznie tylko dwa pola: **Wykres** i
**Wysokość w pikselach**. Pole „Wykres” nie jest edytowane bezpośrednio — zamiast tego
automatycznie otwiera się **edytor wykresów**, w którym znajdują się wszystkie pozostałe
ustawienia.

## Pole w oknie dialogowym konfiguracji

| Ustawienie | Opis |
| --- | --- |
| Wykres | Zawiera kompletną, zakodowaną technicznie definicję wykresu. Edytuje się go wyłącznie za pomocą edytora wykresów, nigdy ręcznie. |
| Wysokość w pikselach | Wysokość wykresu na stronie. Dopuszczalny zakres to od 160 do 1200 pikseli, domyślna wartość to 420. Szerokość zawsze zależy od kolumny. |
| Zezwól na pobieranie | Wyświetla pod wykresem dwa przyciski umożliwiające pobranie go jako obraz. Plik zawiera wyłącznie wykres, a nie całą stronę. Domyślnie wyłączone. |

## Okno dialogowe edytora

U góry znajduje się pasek sterowania z przyciskami **Zapisz**, **Pomoc** i **Zamknij**;
pozostaje on nieruchomy podczas przewijania, dzięki czemu zapisywanie jest możliwe nawet przy długiej
tabeli danych. Dopóki projekt różni się od zapisanego stanu,
obok widnieje napis „Niezapisane zmiany”. Przycisk pomocy otwiera
pasek z tymi samymi objaśnieniami, co na tej stronie, bezpośrednio w
oknie dialogowym; można go zamknąć za pomocą przycisku lub klawisza „Esc”.

Jeśli okno dialogowe jest wąskie, podgląd przesuwa się pod siatkę wprowadzania danych, a
przy szerokości kontenera poniżej około 700 pikseli siatka zamienia się w wykres
dla każdej osi. Okno dialogowe nigdy nie przewija się w poziomie.

## Typ wykresu

Wybór u góry edytora określa rodzaj wykresu:

| Typ | Nadaje się do |
| --- | --- |
| Wykres siatkowy (radar / pajęczyna) | Porównanie kilku wariantów na podstawie kilku parametrów o potencjalnie różnych jednostkach miary. |
| Wykres słupkowy | Porównanie wartości w kilku kategoriach o tej samej jednostce miary. |
| Wykres liniowy (przebieg) | Zmiany w uporządkowanej serii, np. w latach. |
| Wykres kołowy (tort / pierścień) | Podział całości na segmenty; rysuje tylko pierwszą serię. |

Zmiana typu nie powoduje utraty danych: tytuł, przypis, legenda, osie i
serie pozostają zachowane. Zapisane ustawienia specyficzne dla danego typu (np.
minimum/maksimum w wykresie radarowym) również pozostają zachowane i zaczynają ponownie działać,
gdy tylko ponownie wybierze się odpowiedni typ — nie są więc
usuwane, a jedynie ukrywane.

## Jakie pola pojawiają się w poszczególnych typach wykresów

| Pole | Radar | Słupkowy | Liniowy | Kołowy |
| --- | :-: | :-: | :-: | :-: |
| Jednostka, miejsca po przecinku | ✓ | ✓ | ✓ | ✓ |
| Minimum, maksimum | ✓ | – | – | – |
| Kierunek („im mniejsza, tym lepiej”) | ✓ | – | – | – |
| Kolor dla każdej osi (kolor segmentu) | – | – | – | ✓ |
| Kolumny serii w siatce | wszystkie | wszystkie | wszystkie | tylko pierwsza |

**Dlaczego wartości minimalne, maksymalne i „im mniejsza, tym lepiej” pojawiają się tylko w wykresie radarowym
:** Są one definiowane dla każdej osi i w przypadku wspólnej
osi wartości — takiej, na której rysowane są wykresy słupkowe i liniowe — nie można ich wyświetlić. W przypadku wykresów kołowych
nie ma w ogóle żadnej osi. „Im mniejsza, tym lepiej” jest ponadto koncepcją
charakterystyczną dla wykresów radarowych: w przypadku prawdziwej osi wartości nie odwraca się osi, lecz
sortuje lub opisuje.

## Przenoszenie danych z tabeli

| Ustawienie | Opis |
| --- | --- |
| Pole wstawiania | Przyjmuje tabelę skopiowaną z programu Excel, PowerPoint lub Word. Rozpoznaje tabulator, średnik i przecinek jako separatory kolumn. |
| Jak wygląda Twoja tabela? | Określa kierunek odczytu. Domyślnie „jedna wartość w każdym wierszu, jedna wariacja w każdej kolumnie” — tak jak tabela jest ułożona w siatce poniżej. Inny wybór powoduje jej odwrócenie podczas importowania. |
| Przenieś tabelę | Zastępuje osie, serie i wartości. Osie i serie o tej samej nazwie zachowują jednostkę, kierunek osi i kolor. |

Wstawianie z programu Excel jest niezależne od typu i działa tak samo dla wszystkich czterech typów
.

## Rozpoczęcie bez danych

Dopóki nie utworzono ani osi, ani serii, edytor wyjaśnia
pojęcia i udostępnia dwa przyciski: **„Załaduj przykład”** wypełnia
przykładem pasującym do wybranego typu (np. w przypadku wykresu radarowego — porównanie MAN
eTGX z Mercedes-Benz eActros 600, w przypadku wykresu kołowego – podział kosztów floty
), który można nadpisać; **„Utwórz pustą tabelę”** tworzy osie
i serie do wypełnienia.

## Dla każdej osi (jeden wiersz w siatce)

| Ustawienie | Opis |
| --- | --- |
| Oś | Nazwa osi, tak jak pojawia się na wykresie i w tabeli danych. W przypadku tekstu wielowierszowego: naciśnięcie klawisza Enter powoduje przełamanie wiersza, które pojawia się również na wykresie. |
| Jednostka | Jest dołączana do każdej liczby na tej osi (punkt danych, podpowiedź, tabela), np. „kWh”. W przypadku wykresów słupkowych i liniowych wspólna oś wartości zawiera jednostkę tylko wtedy, gdy **wszystkie** osie z wartościami mają tę samą jednostkę. |
| Kierunek („im mniejsza, tym lepiej”) | Tylko w przypadku wykresu radarowego. Odwraca kierunek osi: mniejsza wartość znajduje się wtedy dalej na zewnątrz. Dla wskaźników, w przypadku których mniejsza wartość oznacza lepszy wynik — waga, zużycie, czas ładowania. |
| Kolor | Tylko w przypadku wykresu kołowego. Określa kolor odpowiedniego segmentu, zastępując automatycznie przypisany kolor z palety. |
| Liczba miejsc po przecinku | Tylko przy włączonych **precyzyjnych ustawieniach dla każdej osi**: ile miejsc po przecinku ma być wyświetlanych. W przypadku braku określenia przyjmowana jest liczba miejsc po przecinku faktycznie wprowadzona. |
| Minimum | Tylko w przypadku wykresu radarowego, przy włączonych ustawieniach precyzyjnych: dolna granica osi. W przypadku braku określenia oś zaczyna się od zera — w przypadku wartości ujemnych od najmniejszej z nich. |
| Maksimum | Tylko w przypadku radaru, przy włączonych **precyzyjnych ustawieniach dla każdej osi**: górna granica osi. W przypadku braku określenia stosowana jest największa występująca wartość tej osi. |
| ↑ ↓ ✕ | Przesuwa oś lub usuwa ją wraz z jej wartościami. |

## Dla każdej serii (jedna kolumna w siatce)

W przypadku wykresu kołowego siatka pokazuje **tylko pierwszą kolumnę serii** —
uwaga poniżej wyjaśnia, że pozostałe serie pozostają zapisane i
nie są wyświetlane.

| Ustawienie | Opis |
| --- | --- |
| Nazwa serii | Nazwa wyświetlana w legendzie (z wyjątkiem wykresów kołowych, patrz poniżej), podpowiedzi i tabeli danych. |
| Kolor | Zastępuje automatycznie przypisany kolor z palety MAN dla tej konkretnej serii. W przypadku wykresów kołowych nie ma to wpływu — tam kolor jest przypisywany osobno dla każdej osi (patrz wyżej). |
| ← → ✕ | Przesuwa serię — kolejność określa kolor z palety oraz kolejność w legendzie — lub ją usuwa. |

## Tytuł, legenda i wygląd

| Ustawienie | Opis |
| --- | --- |
| Tytuł | Nagłówek nad wykresem. Jeśli pole pozostanie puste, nagłówek nie pojawi się. |
| Przypis | Dodatkowy tekst napisany małą czcionką pod tytułem, np. w celu podania źródeł. |
| Legenda | „nad wykresem”, „pod wykresem” lub „ukryj”. W przypadku wykresów kołowych legenda zawiera listę osi (segmentów), a w pozostałych typach — serii. |

### Opcje wyświetlania dla poszczególnych typów

| Typ | Pola | Opis |
| --- | --- | --- |
| Radar | Linie pomocnicze w siatce | Liczba koncentrycznych pierścieni pomocniczych. Domyślnie 5. Ma charakter wyłącznie wizualny, nie zmienia wartości. |
| Radar | Wypełnianie obszarów | Wypełnia obszar za każdą linią serii półprzezroczystym kolorem tej linii. Domyślnie wyłączone. |
| Słupki | Układanie w stosy | Rysuje serie jedna nad drugą zamiast obok siebie. Domyślnie wyłączone. |
| Słupki | Kierunek | „pionowy” (kategorie na dole) lub „poziomy” (kategorie po lewej). Domyślnie pionowy. |
| Linia | Wygładzanie linii | Zaokrągla przebieg linii zamiast rysowania jej prosto między punktami podparcia. Domyślnie wyłączone. |
| Linia | Wypełnij obszar | Wypełnia obszar pod linią jej kolorem. Domyślnie wyłączone. |
| Linia | Pokaż punkty | Wyświetla punkt w każdym punkcie kontrolnym. Domyślnie włączone. |
| Wykres kołowy | Promień wewnętrzny | Procentowy udział otworu w wykresie kołowym. Wartość 0 oznacza pełne koło, a większa wartość (np. 45) – pierścień/pączek. Domyślnie 0. |
| Wykres kołowy | Etykiety segmentów | „Udział w procentach”, „Wartość bezwzględna”, „Oba” lub „Ukryj”. Domyślnie „Odsetek w procentach”. |

## Automatyczne skalowanie

**W przypadku wykresu radarowego** osie nie posiadają widocznej skali liczbowej — nie da się jej sensownie przedstawić w przypadku
kilku osi o różnych jednostkach miary. Bez
własnego określenia każda oś zaczyna się zamiast tego od **zera** i sięga aż do
największej występującej wartości. Długość promienia zachowuje się zatem
tak samo jak sama wartość: połowa odległości na zewnątrz to również połowa wielkości.

Jeśli na osi występują wartości ujemne, zaczyna się ona od najmniejszej z nich —
w przeciwnym razie punkt znalazłby się poza siatką.

Kto chce silniej podkreślić różnice między seriami, ustawia
ręcznie minimum i maksimum danej osi — np. 400 i 600 zamiast
0 i 600. Zwiększa to widoczne odstępy, ale sprawia również, że niewielkie,
w praktyce nieistotne różnice wydają się większe.

Ręcznie ustawiona wartość minimalna lub maksymalna ogranicza również zakres rysunku:
wartość wykraczająca poza te granice jest wyświetlana dokładnie na krawędzi, zamiast
wystawać poza siatkę. Liczba przy punkcie danych i w tabeli pozostaje
przy tym taka, jaka została wprowadzona — ograniczenie zmienia jedynie wygląd, nigdy wartość. Kto
zatem ustawi oś w zakresie od 0 do 600 i wprowadzi wartość 700, zobaczy punkt na samym
skraju, a liczbę 700 obok niego.

**W przypadku wykresów słupkowych i liniowych** ECharts sam rysuje oś wartości z
widoczną skalą; jest ona zakotwiczona w punkcie zerowym i nie można jej ręcznie
ograniczyć. **W przypadku wykresu kołowego** nie ma osi wartości — każdy segment pokazuje
swój udział w całości. Wartość ujemna nie stanowi tam
problemu z wyświetlaniem, lecz błąd w danych: wykres wyświetla wówczas
wskazówkę dotyczącą danej osi, zamiast rysować zniekształcony wykres kołowy
.
