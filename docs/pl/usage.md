# Krok po kroku

Na przykładzie porównania pojazdów (MAN eTGX a konkurent) w oparciu o
sześć wskaźników w różnych jednostkach miary.

## Konfiguracja wykresu

1. Umieść widżet **Wykres** na stronie. Otworzą się ustawienia widżetu,
   a w nich natychmiast pojawi się **edytor wykresów** nad
   właściwym polem.
2. U góry znajduje się **typ wykresu**. Obecnie dostępna jest tam tylko opcja „Wykres siatkowy
   (radar / pajęczyna)”; tekst poniżej wyjaśnia, do czego służy ten typ.
3. Dopóki nie ma jeszcze danych, sekcja **„Osie i
   serii”** dwie opcje: **„Pobierz przykład”** wypełnia gotowe
   porównanie MAN eTGX z Mercedes-Benz eActros 600, które można po prostu
   nadpisać, a **„Utwórz pustą tabelę”** udostępnia trzy osie i dwie
   serii do wypełnienia.
4. Zalecanym sposobem jest jednak opcja **„Przenieś dane z tabeli”** znajdująca się na samym
   górze: zaznacz tabelę porównawczą w programie Excel, PowerPoint lub Word,
   skopiuj ją i wklej do pola. Poniżej należy określić, **jak wygląda tabela
  ** — domyślnym ustawieniem jest „jedna wartość w każdym wierszu, jeden
  wariant w każdej kolumnie”, czyli tak, jak tabela pojawia się w edytorze poniżej.
  Następnie kliknij **„Przenieś tabelę”**.
5. W siatce **każdy wiersz to oś**, a **każda kolumna po prawej stronie to
   seria**. U góry każdej kolumny serii znajdują się nazwa, kolor oraz strzałki do
   zmiany kolejności; na końcu każdego wiersza osi znajdują się strzałki i krzyżyk dla tej
   osi.
6. Dla każdej osi wprowadź **jednostkę** (np. „kWh”). **Przełamanie wiersza w
   nazwie osi** — za pomocą klawisza Enter — zostanie przeniesione na wykres i
   zapewni czytelność długich opisów.
7. W przypadku osi, dla których **mniejsza wartość jest lepsza** — waga,
   zużycie, czas ładowania — w kolumnie **Kierunek** włącz przełącznik
   **„mniejsze jest lepsze”**. Bez tego gorsza
   (większa) wartość znajdowałaby się dalej na zewnątrz, a wykres sugerowałby coś zupełnie przeciwnego do
   tego, co ma na myśli: przy porównaniu zawsze powinno obowiązywać „dalej na zewnątrz =
   lepiej”.
8. **Miejsca po przecinku**, **minimum** i **maksimum** dla każdej osi znajdują się za
   przełącznikiem **„Precyzyjne ustawienia dla każdej osi”**. W normalnym przypadku nie są one
   potrzebne; puste pole oznacza „wyliczone na podstawie wartości”.
9. W sekcji **„Tytuł, legenda i wygląd”** wprowadź tytuł i przypis,
   umieść lub ukryj **legendę**, a w przypadku wykresu siatki ustaw
   **linie pomocnicze w siatce** oraz **wypełnienie obszarów**.
10. **Podgląd** po prawej stronie przez cały czas pokazuje, jak wykres
    wygląda na stronie, i pozostaje w tym samym miejscu podczas przewijania.
11. Ustawić **wysokość** wykresu (patrz [Ustawienia](settings.md)).
12. Jeśli chcesz, aby diagram można było pobrać jako obraz, włącz przełącznik
    **„Zezwól na pobieranie”** (zobacz [Ustawienia](settings.md)).
    Pod diagramem pojawią się wtedy dwa przyciski: „Jako SVG” i
    „Jako PNG”.
13. Kliknij **Zapisz**, a następnie **Zamknij**. Dopiero kliknięcie „Zapisz” przenosi
    dane do widżetu; dopóki obok przycisków widnieje napis „Niezapisane
    zmiany”, zmiany nie zostały jeszcze zastosowane.

## Późniejsze zmiany

1. Otwórz ponownie ustawienia widżetu — edytor wykresów pojawi się
   ponownie z ostatnio zapisanym stanem.
2. Nadpisz wartości bezpośrednio w siatce lub ponownie
   wstaw zaktualizowaną tabelę. Osie i serie o tej samej nazwie zachowują przy tym swoje dotychczasowe
   jednostki, kierunki osi i kolory — zastępowane są jedynie
   wartości.
3. Zapisz i zamknij, tak jak powyżej.

## Jeśli coś nie działa

1. Jeśli zamiast wykresu pojawia się komunikat, zawiera on już
   przyczyna — zapoznaj się z [FAQ](faq.md), aby sprawdzić wszystkie możliwe sformułowania.
2. Jeśli wstawiona tabela nie może zostać zaimportowana, sprawdź, czy posiada
   nagłówki w pierwszym wierszu i pierwszej kolumnie. Jeśli
   osie i serie są odwrócone w siatce, oznacza to, że kierunek czytania pod
   polem wstawiania został wybrany nieprawidłowo — należy go zmienić i ponownie zastosować.
3. Jeśli po wstawieniu wykres wyświetla nieprawidłowe liczby (np. przesunięte o współczynnik
   1000), najczęściej wynika to z obecności znaku tysiąca w
   liczbach pochodzących ze źródeł innych niż niemieckie — zobacz wskazówki dotyczące liczb w
   [Ustawieniach](settings.md) i [FAQ](faq.md).
