# Wykres

Widżet wykresu przedstawia wskaźniki w formie **wykresu radarowego/siatkowego**: kilka
osi rozchodzi się promieniście od punktu centralnego, a każda seria — na
przykład porównanie pojazdów — łączy swoje wartości na tych osiach, tworząc
powierzchnię. W ten sposób można jednym
rzutem oka porównać kilka wskaźników z różnych serii, nawet jeśli są one mierzone w zupełnie różnych jednostkach
— kilometrach, tonach, minutach, kilowatach.

Wykres konfiguruje się za pomocą dedykowanego edytora, który otwiera się bezpośrednio w
ustawieniach widżetu. Tabelę skopiowaną z programu Excel można
tam zaimportować jednym kliknięciem, patrz [Krok po kroku](usage.md).

Inne typy wykresów (np. wykresy słupkowe lub liniowe) są planowane w przyszłych
wersjach, ale **nie są jeszcze dostępne** — obecnie można wybrać tylko
wykres radarowy/siatkowy.

## Co widzą czytelnicy

- Sam wykres z dowolną liczbą osi i serii.
- Wartości są wyświetlane bezpośrednio przy punktach danych, a dodatkowo po
  najechaniu kursorem na punkt pojawia się podpowiedź zawierająca wszystkie wartości z serii.
- Legenda powyżej lub poniżej wykresu, w zależności od ustawień.
- Opcjonalnie tytuł i przypis.
- Jeśli pobieranie jest dozwolone (patrz [Ustawienia](settings.md)), dwa przyciski
  pod wykresem umożliwiające pobranie go jako obraz.
- Dla czytników ekranu dodatkowo pełna tabela danych pod
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
podwójnej rozdzielczości.

## Tłumaczenie

W przypadku automatycznego tłumaczenia strony wykres jest uwzględniany. Tłumaczone
są tytuły, przypisy, opisy osi i nazwy serii — dokładnie te
teksty, które zostały wprowadzone redakcyjnie. Liczby, jednostki, granice osi,
kolory i wszystkie pozostałe ustawienia pozostają niezmienione, ponieważ nie mają
charakteru językowego: przetłumaczona jednostka byłaby błędna („t” nie staje się „ton”),
a przetłumaczona liczba nie miałaby sensu.

## Co widać w edytorze CMS

Po wstawieniu modułu automatycznie otwiera się **edytor wykresów**:
tabela zawierająca kategorie (osie) i serie (wiersze), a także pole do
wklejenia skopiowanej tabeli, a także podgląd na żywo, który dokładnie pokazuje,
jak wykres pojawi się później na stronie. Pole tekstowe znajdujące się za nim wyświetla
tylko technicznie zapisaną, zakodowaną formę danych i nigdy nie jest edytowane
ręcznie.

Ważna cecha: osie nie posiadają **widocznej skali liczbowej**.
Kilka osi o różnych jednostkach miary (np. kilometry i minuty)
nie da się sensownie przedstawić na jednej wspólnej skali. Każda oś
jest zatem wewnętrznie rozciągana niezależnie między swoją najmniejszą a największą wartością;
rzeczywiste liczby znajdują się przy punktach danych, w podpowiedzi oraz
w tabeli danych. Więcej informacji na ten temat w sekcji [Ustawienia](settings.md).
