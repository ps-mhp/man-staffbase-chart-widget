# Wykres

Widżet wykresu przedstawia wskaźniki w czterech typach — **wykres siatkowy
(radarowy), słupkowy, liniowy i kołowy**. Każdy typ konfiguruje się za pomocą
tego samego edytora, który otwiera się bezpośrednio w ustawieniach widżetu;
tabelę skopiowaną z programu Excel można tam zaimportować jednym kliknięciem, patrz
[Krok po kroku](usage.md).

## Cztery typy

**Wykres siatkowy (radar / pajęczyna).** Kilka osi rozchodzi się promieniście
z jednego punktu centralnego, a każda seria — na przykład porównanie pojazdów —
łączy swoje wartości na tych osiach, tworząc obszar. W ten sposób można
porównać na pierwszy rzut oka kilka wskaźników z różnych serii, nawet jeśli są one
mierzone w zupełnie różnych jednostkach — kilometrach, tonach,
minutach, kilowatach. Tylko w przypadku wykresu radarowego dostępne są wartości minimalne, maksymalne oraz przełącznik
„im mniejsze, tym lepsze” dla każdej osi, a także opcje wyświetlania linii pomocniczych w siatce
i wypełniania obszarów.

**Wykres słupkowy (słupki).** Porównuje wartości w ramach kilku kategorii.
Wszystkie słupki mają wspólną oś wartości, którą ECharts samodzielnie
oblicza i opisuje — w przeciwieństwie do wykresu radarowego oś ta ma zatem
sens tylko wtedy, gdy wszystkie kategorie mają tę samą jednostkę miary. Jako
opcje wyświetlania dostępne są: układanie w stosy (serie jedna nad drugą zamiast obok siebie) oraz
kierunek (pionowy lub poziomy).

**Wykres liniowy (przebieg).** Pokazuje zmiany w uporządkowanej
serii, na przykład w poszczególnych latach budowy. Kolejność osi w siatce odpowiada
kolejności na linii. Opcje wyświetlania: wygładzanie linii, wypełnianie obszaru pod
linią, wyświetlanie punktów w punktach podparcia.

**Wykres kołowy (tort / pierścień).** Przedstawia podział całości:
segmenty to osie (kategorie), a ich wartości określają wielkość segmentów.
**Rysowany jest wyłącznie pierwszy szereg** — pozostałe szeregi
pozostają zapisane i pojawiają się ponownie, gdy tylko nastąpi zmiana na inny typ
wykresu; edytor wyraźnie na to zwraca uwagę. Każda kategoria może otrzymać
własny kolor segmentu. Opcje wyświetlania: promień wewnętrzny (0 daje
pełne koło, większa wartość — pierścień/pączek) oraz etykiety segmentów
(udział procentowy, wartość bezwzględna, obie lub ukryte). Wartości ujemne
nie stanowią w przypadku `pie` problemu z wyświetlaniem, lecz błąd danych —
wykres wyświetla wówczas komunikat zamiast zniekształconego wykresu kołowego.

Zmiana typu wykresu w edytorze nie powoduje utraty danych: tytuł, przypis,
legenda, osie i serie pozostają zachowane, podobnie jak wartości pól specyficznych
dla danego typu — po prostu nie działają, dopóki wybrany jest inny typ.

## Co widzą czytelnicy

- Sam wykres z dowolną liczbą osi i serii.
- Wartości są wyświetlane bezpośrednio na wykresie (w przypadku typu `pie`, w zależności od ustawień, jako
  udział, wartość bezwzględna lub obie), dodatkowo po najechaniu kursorem
  na punkt lub segment pojawia się podpowiedź z odpowiednimi wartościami.
- Legenda powyżej lub poniżej wykresu, w zależności od ustawień.
  W przypadku typu `pie` legenda zawiera listę kategorii (segmentów), a w przypadku pozostałych
  typów — serii.
- Opcjonalnie tytuł i przypis.
- Jeśli pobieranie jest dozwolone (patrz [Ustawienia](settings.md)), dwa przyciski
  pod wykresem umożliwiające pobranie go jako obraz.
- W przypadku czytników ekranu dodatkowo pełna tabela danych pod
  wykresu. Jest ona ukryta wizualnie, ale istnieje — dzięki temu z wykresu można
  korzystać nawet bez percepcji wzrokowej.

## Eksport obrazu

Gdy opcja pobierania jest włączona, pod wykresem pojawiają się dwa przyciski:
„Jako SVG” i „Jako PNG”. Pobrany plik zawiera **wyłącznie
wykres**, a nie pozostałą część strony — tytuł, legendę, osie i wartości
dokładnie tak, jak są one aktualnie wyświetlane, na białym tle (nawet jeśli
sama strona ma przezroczyste lub ciemne tło). Plik SVG można
powiększać bez utraty jakości, natomiast plik PNG nadaje się do miejsc, w których nie można osadzić pliku SVG
(np. w większości programów do prezentacji) i jest generowany w
podwójnej rozdzielczości. Eksport działa tak samo dla wszystkich czterech typów
— opiera się na narysowanym obrazie i nie rozróżnia typu wykresu.

## Tłumaczenie

Wykres jest uwzględniany podczas automatycznego tłumaczenia strony. Tłumaczeniu
podlegają tytuł, przypis, opisy osi i nazwy serii — dokładnie te
teksty, które zostały wprowadzone redakcyjnie. Liczby, jednostki, granice osi,
kolory i wszystkie pozostałe ustawienia pozostają niezmienione, ponieważ nie mają
charakteru językowego: przetłumaczona jednostka byłaby błędna („t” nie staje się „ton”),
a przetłumaczona liczba nie miałaby sensu.

## Co widać w edytorze CMS

Po wstawieniu modułu automatycznie otwiera się **edytor wykresów**
w trybie pełnoekranowym, z tym samym nagłówkiem, co w przypadku wszystkich widżetów MAN: Zastosuj,
Anuluj, Cofnij, Pomoc oraz przełącznik **Edytor · Komputer stacjonarny · Tablet ·
Urządzenie mobilne**. Po lewej stronie znajduje się siatka z **jednym wierszem na każdą oś** i **jedną
kolumną na każdy rząd** (w przypadku wykresu kołowego tylko pierwszy rząd), a nad nią pasek z
wybraną osią i jej opcjami, „Wstaw z Excela” oraz „Pobierz przykład
”. Po prawej stronie znajduje się panel **„Wykres”** z zakładkami Dane, Układ,
Oś i Zachowanie. W widokach urządzeń edytor wyświetla zamiast
siatki rzeczywisty podgląd w szerokości urządzenia; panel pozostaje obok.
Dopóki nic nie zostało utworzone, edytor wyjaśnia pojęcia i oferuje
opcje „Pobierz przykład” oraz „Utwórz pustą tabelę” – w zależności od typu z
innym, odpowiednim przykładem.

W oknie dialogowym Staffbase pozostaje tylko pole „Wykres” z technicznie
zakodowaną formą danych; nigdy nie edytuje się go ręcznie. Poprzednie
pola „Wysokość w pikselach” i „Zezwól na pobieranie” są tam ukryte – obie
opcje znajdują się teraz w edytorze, a starsze wykresy zachowują swoje wartości.

Ważna cecha charakterystyczna wykresu radarowego: jego osie nie posiadają **widocznej
skali liczbowej**. Nie da się sensownie przedstawić na jednej wspólnej skali
kilku osi o różnych jednostkach miary (np.
kilometrów i minut). Dlatego każda oś jest wewnętrznie rozciągana niezależnie: od zera do
swojej największej wartości. Rzeczywiste wartości liczbowe znajdują się przy punktach danych,
w podpowiedzi oraz w tabeli danych. Natomiast wykresy słupkowe i liniowe pokazują
prawdziwą oś wartości, obliczoną i opatrzoną etykietami przez ECharts.
Więcej informacji na ten temat w sekcji [Ustawienia](settings.md).
