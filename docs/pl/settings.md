# Ustawienia

Wszystkie ustawienia znajdują się w **Edytorze wykresów**, który po otwarciu
ustawień widżetu automatycznie uruchamia się w trybie pełnoekranowym. W oknie dialogowym Staffbase
znajduje się jedynie pole **Wykres** z techniczną definicją
definicją; nigdy nie edytuje się go ręcznie.

## Edytor

U góry znajduje się nagłówek, tak jak we wszystkich widżetach MAN: nazwa i tytuł po lewej stronie, pośrodku
widok **Edytor · Komputer stacjonarny · Tablet · Urządzenie mobilne**, po prawej stronie
**Cofnij**, **Powtórz**, **Pomoc**, **Anuluj** i
**Zastosuj**. Obok widoczne są informacje o tym, co uległo zmianie – na przykład „Zmieniono typ wykresu
” lub „Zmieniono dane” – albo dlaczego stan nie może jeszcze
zostać zastosowany.

Poniżej znajdują się dwa obszary:

- **Po lewej stronie siatka danych** z paskiem nad nią.
- **Po prawej stronie panel „Wykres”** z czterema zakładkami: **Dane**,
  **Układ**, **Oś** i **Zachowanie**.

W widokach na komputer stacjonarny, tablet i urządzenie mobilne miejsce siatki
zajmuje podgląd w szerokości urządzenia; panel po prawej stronie pozostaje, dzięki czemu każde
ustawienie ma wpływ bezpośrednio obok niego.

„Zastosuj” przenosi aktualny stan do okna dialogowego Staffbase; zostanie on trwale
zapisany dopiero po kliknięciu **Zapisz** w Studio. Jeśli nie wprowadzono zmian,
opcja „Zastosuj” pozostaje nieaktywna.

| Klawisz | Działanie |
| --- | --- |
| ⌘/Ctrl S | Zastosuj |
| ⌘/Ctrl ↵ | Zastosuj i zamknij |
| ⌘/Ctrl Z, ⇧⌘/Ctrl Z | Cofnij, Powtórz (poza polami tekstowymi) |
| F1 | Pomoc |
| Esc | Zamknij, z pytaniem o zatwierdzenie otwartych zmian |

## Siatka danych

Każdy **wiersz** stanowi **oś** (wskaźnik, w przypadku wykresu kołowego – segment),
każda **kolumna** po prawej stronie to **szereg** (wariant; w poprzednich wersjach
używano terminu „seria”). W nagłówku każdej kolumny szeregu znajduje się kolorowa kropka i nazwa.

| Kolumna | Opis |
| --- | --- |
| Nr | Wybiera oś. Kliknięcie w dowolne pole wiersza powoduje to samo. |
| Oś | Nazwa osi, tak jak pojawia się na wykresie i w tabeli danych. Naciśnięcie klawisza Enter powoduje przełamanie wiersza, które pojawia się również na wykresie. |
| Jednostka | Jest dołączana do każdej liczby na tej osi (punkt danych, podpowiedź, tabela), np. „kWh”. W przypadku wykresów słupkowych i liniowych wspólna oś wartości zawiera jednostkę tylko wtedy, gdy **wszystkie** osie z wartościami mają tę samą jednostkę. |
| na rząd | Wartości zapisane zgodnie z niemiecką konwencją: przecinek przed miejscami po przecinku, kropka między tysiącami. |

W przypadku wykresu kołowego siatka pokazuje **tylko pierwszy rząd** – informacja
pod spodem wskazuje, że pozostałe rzędy są zapisane, ale nie
są wyświetlane.

**Wartości z Excela:** skopiuj komórki w Excelu, wybierz pole w siatce,
⌘ V (Ctrl V). Blok zostanie umieszczony od tego pola; brakujące osie i rzędy
zostaną dodane. W przypadku wykresu kołowego wypełnia on tylko jeden widoczny rząd.

## Pasek nad siatką

| Element | Opis |
| --- | --- |
| Oś 2 z 5 · Nazwa | Wybrana oś. |
| ↑ ↓ | Przesuwa wybraną oś wraz z jej wartościami. W przypadku wykresu radarowego kolejność określa położenie w okręgu, a w przypadku wykresu słupkowego – kolejność na linii bazowej. |
| Duplikuj | Umieszcza kopię osi wraz z wartościami i ustawieniami bezpośrednio za nią. |
| Usuń | Usuwa oś wraz z jej wartościami. Cofnięcie za pomocą ⌘/Ctrl Z. |
| + Oś | Dodaje pustą oś i umieszcza kursor w jej nazwie. |
| + Rząd | Dodaje pusty rząd. |
| Wstaw z Excela | Otwiera pasek po prawej stronie, umożliwiający wstawienie całej tabeli (patrz poniżej). |
| Wczytaj przykład | Zastępuje dane przykładem dla wybranego typu. Wysokość i plik do pobrania pozostają bez zmian. Cofnij za pomocą ⌘/Ctrl Z. |

## Wstaw z Excela

| Ustawienie | Opis |
| --- | --- |
| Tabela | Przenosi tabelę skopiowaną z programu Excel, PowerPoint lub Word. Pierwszy wiersz i pierwsza kolumna to nagłówki. Rozpoznaje tabulator, średnik i przecinek jako separatory kolumn. |
| Jak ułożona jest tabela? | **Osie w wierszach** (ustawienie domyślne): jeden wskaźnik na wiersz, jedna odmiana na kolumnę – tak jak w siatce. **Osie w kolumnach**: odwrotnie; podczas wstawiania tabela zostaje obrócona. |
| Przenoszenie tabeli | Zastępuje osie, wiersze i wartości. Osie i wiersze o tej samej nazwie zachowują jednostkę, granice, kierunek i kolor. |

## Rozpoczęcie bez danych

Dopóki nie utworzono ani osi, ani wierszy, siatka wyjaśnia
pojęcia i udostępnia dwa przyciski: **„Załaduj przykład”** wypełnia
przykład pasujący do wybranego typu (np. w przypadku radaru – porównanie MAN
eTGX z Mercedes-Benz eActros 600, w przypadku wykresu kołowego – podział kosztów floty
), **„Utwórz pustą tabelę”** tworzy osie i wiersze do
wypełnienia.

## Zakładka „Dane”

Wiersze w formie listy; jedno kliknięcie rozwija dany wiersz.

| Ustawienie | Opis |
| --- | --- |
| ← → | Przesuwa wiersz. Kolejność określa kolor z palety i legendę; w przypadku wykresu kołowego rysowany jest wiersz znajdujący się na samym początku. |
| Usuń | Usuwa wiersz wraz z jego wartościami. |
| Nazwa | Tak jak pojawia się w legendzie (z wyjątkiem wykresu kołowego), podpowiedzi i tabeli danych. |
| Kolor | Zastępuje kolor z palety dla tego wiersza; opcja „Paleta” przywraca domyślny kolor. Nie jest dostępna w przypadku wykresu kołowego – tam kolor segmentu zależy od osi. |
| + Dodaj wiersz | Dodaje pusty wiersz i rozwija go. |

## Zakładka „Układ”

| Ustawienie | Opis |
| --- | --- |
| Typ | **Siatka**, **Słupki**, **Linia** lub **Wykres kołowy**. Opis poniżej wyjaśnia, do czego służy dany typ. |
| Tytuł | Nagłówek nad wykresem. Puste pole: brak nagłówka. |
| Przypis | Dodatkowy tekst drukowany małą czcionką, np. dla odniesień do źródeł. |
| Legenda | **Nad**, **Pod** lub **Ukryj**. W przypadku wykresu kołowego legenda zawiera listę osi (segmentów), w pozostałych przypadkach — serii. |
| Sekcja typu | Opcje dostępne wyłącznie dla wybranego typu, patrz poniżej. |
| Wysokość w px | Wysokość wykresu na stronie, od 160 do 1200 pikseli, domyślnie 420. Szerokość zawsze dostosowuje się do kolumny. Nie można zastosować wysokości wykraczającej poza te granice. |

| Typ | Ustawienie | Opis |
| --- | --- | --- |
| Siatka | Linie pomocnicze | Liczba koncentrycznych pierścieni. Domyślnie 5. Ma charakter wyłącznie wizualny. |
| Siatka | Wypełnianie obszarów | Wypełnia obszar za każdą linią półprzezroczystym kolorem odpowiadającym jej barwie. Domyślnie wyłączone. |
| Słupki | Kierunek | **Pionowy** (kategorie na dole) lub **Poziomy** (kategorie po lewej). Domyślnie pionowy. |
| Słupki | Ułożone w stosy | Rzędy jeden nad drugim zamiast obok siebie. Domyślnie wyłączone. |
| Linia | Wygładzanie | Zaokrągla przebieg zamiast rysować prostą linię między wartościami. Domyślnie wyłączone. |
| Linia | Wypełnienie obszaru | Wypełnia obszar pod każdą linią. Domyślnie wyłączone. |
| Linia | Pokaż punkty | Zaznacza każdą wartość. Domyślnie włączone. |
| Wykres kołowy | Promień wewnętrzny w % | 0 daje pełne koło, większa wartość (np. 45) – pierścień. Domyślnie 0. |
| Wykres kołowy | Etykiety segmentów | **Procent**, **wartość**, **oba** lub **brak**. Domyślnie procent. |

Zmiana typu nie powoduje utraty **danych**: tytuł, przypis, legenda, osie i
szeregi pozostają, podobnie jak oznaczenia na osiach. Natomiast **ustawienia
typu** mają natomiast zastosowanie tylko do niego: wykres zawsze zawiera tylko jeden zestaw
tych ustawień, odpowiadający aktualnie wybranemu typowi. Kto w siatce ustawi linie pomocnicze,
przełączy się na wykres słupkowy, wprowadzi tam zmiany, a następnie powróci do siatki,
znajdzie w niej ponownie ustawienia domyślne.

## Zakładka „Oś”

Precyzyjne ustawienia osi wybranej w siatce.

| Ustawienie | Typ | Opis |
| --- | --- | --- |
| Nazwa | wszystkie | Nazwa osi, wielowierszowa. |
| Jednostka | wszystkie | Tak jak w siatce. |
| Miejsca po przecinku | wszystkie | Liczba wyświetlanych miejsc po przecinku. Puste: tyle, ile zostało wprowadzone. |
| Minimum, maksimum | Siatka | Granice osi. Puste: wyliczone na podstawie wartości (od zera do największej wartości). Wartość maksymalna musi być większa od minimalnej, w przeciwnym razie ustawienia nie zostaną zastosowane. |
| Im mniejsze, tym lepiej | Siatka | Odwraca oś: mniejsza wartość znajduje się na zewnątrz. Dla wagi, zużycia, czasu ładowania. |
| Kolor segmentu | Wykres kołowy | Kolor segmentu tej osi; „Paleta” przywraca domyślny. |

**Dlaczego wartości minimalne, maksymalne i opcja „Im mniejsze, tym lepiej” pojawiają się tylko w przypadku siatki
:** Są one definiowane dla każdej osi z osobna i nie można ich wyświetlić w przypadku wspólnej
osi wartości – takiej, jaką rysują wykresy słupkowe i liniowe. W przypadku
wykresu kołowego nie ma w ogóle osi. Ukryte wartości pozostają
zapisane i ponownie stają się aktywne, gdy tylko typ zostanie ponownie wybrany.

## Zakładka „Zachowanie”

| Ustawienie | Opis |
| --- | --- |
| Zezwól na pobieranie | Wyświetla pod wykresem dwa przyciski: „Jako SVG” i „Jako PNG”. Plik zawiera wyłącznie wykres, a nie całą stronę. Domyślnie wyłączone. |

Na dole znajduje się wersja widżetu – osoby zgłaszające błędy znajdą ją
tutaj.

## Sprawdzanie

Przycisk „Zastosuj” odrzuca stan, którego strona nie mogłaby w ten sposób wyświetlić.
W nagłówku podana jest przyczyna, zakładka ma czerwony znacznik, dana
oś jest zaznaczona w siatce, a pole wskazuje, co należy zrobić.

| Komunikat | Przyczyna |
| --- | --- |
| Oś „…”: maksymalna wartość zbyt mała | W przypadku sieci maksymalna wartość nie jest większa od minimalnej. |
| „…”: ujemny udział w wykresie kołowym | Wartość w pierwszym wierszu jest ujemna; wykres kołowy pokazuje tylko udziały większe od zera. |
| Wysokość: dopuszczalne wartości to od 160 do 1200 pikseli | Wysokość wykracza poza dopuszczalne granice. |

## Istniejące wykresy

Do wersji 0.3 pola **Wysokość** i **Zezwól na pobieranie** występowały jako osobne pola
w oknie dialogowym Staffbase. Pola te są teraz ukryte; ich wartości obowiązują
nadal, dopóki w edytorze nie zostanie ustawione inaczej. Po otwarciu
edytor przyjmuje je jako ustawienia początkowe – istniejący wykres po
otwarciu i zastosowaniu zmian wygląda dokładnie tak samo jak wcześniej. Jeśli stare zaznaczenie nie było
czytelne, informacja ta znajduje się w zakładce „Zachowanie” pod przyciskiem.

## Automatyczne skalowanie

**W przypadku wykresu radarowego** osie nie mają widocznej skali liczbowej ��� nie da się jej sensownie przedstawić w przypadku
kilku osi o różnych jednostkach. Jeśli nie
podano inaczej, każda oś zaczyna się od **zera** i sięga aż do
największej występującej wartości. Długość promienia zachowuje się zatem
tak samo jak sama wartość: połowa odległości na zewnątrz to również połowa wartości.

Jeśli na osi występują wartości ujemne, zaczyna się ona od najmniejszej z nich –
w przeciwnym razie punkt znalazłby się poza siatką.

Kto chce silniej podkreślić różnice między rzędami, powinien
ręcznie ustawić minimum i maksimum danej osi – np. 400 i 600 zamiast
0 i 600. Zwiększa to widoczne odległości, ale sprawia również, że niewielkie,
w praktyce nieistotne różnice wydają się większe.

Ręcznie ustawiona wartość minimalna lub maksymalna ogranicza również zakres wykresu:
wartość wykraczająca poza te granice zostanie wyświetlona dokładnie na krawędzi, zamiast
wystawać poza siatkę. Liczba przy punkcie danych i w tabeli pozostaje
przy tym taka, jaka została wprowadzona – ograniczenie zmienia jedynie wygląd, nigdy wartość. Kto
zatem ustawi oś w zakresie od 0 do 600 i wprowadzi wartość 700, zobaczy punkt na samym
skraju, a liczbę 700 obok niego.

**W przypadku wykresów słupkowych i liniowych** ECharts sam rysuje oś wartości z
widoczną skalą; jest ona zakotwiczona w punkcie zerowym i nie można jej ręcznie
ograniczyć. **W przypadku wykresów kołowych** nie ma osi wartości – każdy segment pokazuje
swój udział w całości. Wartość ujemna nie stanowi tam
problemu z wyświetlaniem, lecz błąd w danych: edytor nie pozwala na jej
zastosowanie, a starszy wykres wyświetla na stronie wskazówkę dotyczącą
odpowiedniej osi zamiast rysować zniekształcony wykres kołowy.
