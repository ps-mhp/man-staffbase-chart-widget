# Krok po kroku

Na przykładzie porównania pojazdów (MAN eTGX z konkurentem) w oparciu o
sześć wskaźników o różnych jednostkach w formie diagramu sieciowego;
kroki te mają odpowiednie zastosowanie również do pozostałych trzech typów.

## Konfiguracja wykresu

1. Umieść widżet **Wykres** na stronie. Otworzą się ustawienia widżetu,
   a w nich natychmiast pojawi się **edytor wykresów** nad
   samym polem. U góry znajduje się pasek sterowania z opcjami **Zapisz**,
   **Pomoc** (otwiera suwak z tymi samymi objaśnieniami, co w niniejszej
   dokumentacji) oraz **Zamknij**; pozostaje on widoczny podczas przewijania, nawet
   w przypadku długiej tabeli danych.
2. U góry edytora widnieje **typ wykresu**: **wykres siatkowy (radar /
   pajęczyna)**, **wykres słupkowy (kolumny)**, **wykres liniowy (przebieg)** lub
   **wykres kołowy (tort / pierścień)**; tekst poniżej wyjaśnia, do czego służy
   wybrany typ. Późniejsza zmiana typu nie powoduje utraty
   danych — osie, serie, tytuł i legenda pozostają zachowane, a także
   informacje na osiach (np. minimum/maksimum w przypadku wykresu radarowego) są jedynie
   ukrywane, dopóki typ nie zostanie ponownie wybrany.
   **Ustawienia wyświetlania** starego typu zostaną jednak utracone;
   więcej na ten temat w sekcji „Ustawienia”.
3. Dopóki nie ma jeszcze żadnych danych, sekcja **„Osie i
   serie”** oferuje dwie opcje: **„Wczytaj przykład”** wypełnia wykres przykładem
   pasującym do wybranego typu, który można po prostu nadpisać, oraz
   **„Utwórz pustą tabelę”** tworzy osie i serie do wypełnienia.
4. Zalecanym sposobem jest jednak **„Przenieś dane z tabeli”** — wystarczy
   u góry: zaznaczyć tabelę porównawczą w programie Excel, PowerPoint lub Word,
   skopiować ją i wkleić do pola. Poniżej określić, **jak wygląda tabela
  ** — domyślnym ustawieniem jest „jedna wartość w każdym wierszu, jedna
   wariant”, czyli tak, jak tabela pojawia się również w edytorze poniżej.
   Następnie kliknij **„Przenieś tabelę”**. Ten krok jest taki sam dla wszystkich
   czterech typów.
5. W siatce **każdy wiersz to oś**, a **każda kolumna po prawej to
   seria** — w przypadku wykresu kołowego siatka pokazuje **tylko pierwszą
   kolumnę serii**; informacja poniżej wyjaśnia, że pozostałe serie
   pozostają zapisane, ale nie są wyświetlane, aby nie wyglądało to na
   utratę danych. U góry każdej kolumny serii znajdują się nazwa, kolor oraz
   strzałki do zmiany kolejności; na końcu każdego wiersza osi znajdują się strzałki i
   krzyżyk dla tej osi.
6. Dla każdej osi wprowadź **jednostkę** (np. „kWh”). **Przełamanie wiersza w
   nazwie osi** — za pomocą klawisza Enter — zostanie przeniesione na wykres i
   zapewni czytelność długich opisów. W przypadku wykresu kołowego można
   dodatkowo ustawić dla każdej osi własny **kolor segmentu**.
7. Tylko w przypadku wykresu sieciowego: w przypadku osi, dla których **mniejsza wartość
   jest lepsza** — waga, zużycie, czas ładowania — w kolumnie **Kierunek**
   włącz przełącznik **„mniejsze jest lepsze”**. Bez tego
   gorsza (większa) wartość znajdowałaby się dalej na zewnątrz, a wykres sugerowałby dokładnie
   coś przeciwnego do zamierzonego.
8. **Liczba miejsc po przecinku** dla każdej osi znajduje się za przełącznikiem
   **„Precyzyjne ustawienia dla każdej osi”**; **Minimum** i **Maksimum** pojawiają się tam
   tylko w przypadku wykresu sieciowego, ponieważ słupki i linia rysują wspólną,
   obliczoną przez ECharts oś wartości. W normalnym przypadku nie są one
   potrzebne; puste pole oznacza „wyliczone na podstawie wartości”.
9. W sekcji **„Tytuł, legenda i wygląd”** wprowadź tytuł i przypis,
   umieść lub ukryj **legendę** (w przypadku wykresów kołowych wymienia ona
   osie, w pozostałych przypadkach serie) oraz ustaw opcje wyświetlania odpowiednie dla danego typu wykresu
   : w przypadku wykresu radarowego **linie pomocnicze w siatce** i **wypełnianie obszarów**,
   w przypadku wykresu słupkowego **układanie w stosy** i **kierunek** (pionowy/poziomy), w przypadku wykresu liniowego
   **wygładzanie linii**, **wypełnienie obszaru** i **wyświetlanie punktów**, w przypadku wykresu kołowego
   **promień wewnętrzny** (0 = pełne koło, większa wartość = pierścień) oraz
   **etykiety segmentów** (udział, wartość bezwzględna, obie opcje lub wyłączone).
10. **Podgląd** przez cały czas pokazuje, jak wykres wygląda na stronie
    i zatrzymuje się podczas przewijania. Jeśli okno dialogowe jest wystarczająco szerokie
    (od około 900 pikseli), znajduje się obok pola wprowadzania danych; poniżej tej szerokości przesuwa się
    pod siatkę, a poniżej około 700 pikseli siatka zamienia się
    w sekwencję kart, po jednej na każdą oś. Okno dialogowe nigdy nie przewija się
    w poziomie.
11. Ustaw **wysokość** wykresu (zobacz [Ustawienia](settings.md)).
12. Jeśli chcesz, aby wykres można było pobrać jako obraz, włącz przełącznik
    **„Zezwól na pobieranie”** (zobacz [Ustawienia](settings.md)).
    Pod wykresem pojawią się wtedy dwa przyciski: „Jako SVG” i
    „Jako PNG” — działa to tak samo dla wszystkich czterech typów.
13. Kliknij **Zapisz**, a następnie **Zamknij**. Dopiero kliknięcie „Zapisz” powoduje
    przeniesienie danych do widżetu; dopóki obok przycisków widnieje napis „Niezapisane
    zmiany”, zmiany nie zostały jeszcze zastosowane.

## Późniejsze zmiany

1. Otwórz ponownie ustawienia widżetu — edytor wykresów pojawi się
   ponownie z ostatnio zapisanym stanem, łącznie z typem wykresu.
2. Nadpisz wartości bezpośrednio w siatce lub ponownie wstaw zaktualizowaną
   tabelę. Osie i serie o tej samej nazwie zachowują przy tym swoje dotychczasowe
   jednostki, kierunki osi i kolory — zastępowane są jedynie
   wartości.
3. Zapisz i zamknij tak jak powyżej.

## Jeśli coś nie działa

1. Jeśli zamiast wykresu pojawia się komunikat, zawiera on już
   przyczynę — zobacz [FAQ](faq.md), aby zapoznać się z każdym możliwym brzmieniem.
2. Jeśli wstawiona tabela nie zostaje zaimportowana, sprawdź, czy zawiera
   nagłówki w pierwszym wierszu i pierwszej kolumnie. Jeśli
   osie i serie są odwrócone w siatce, oznacza to, że kierunek odczytu pod
   polem wstawiania został wybrany nieprawidłowo — zmień go i spróbuj ponownie.
3. Jeśli po wstawieniu wykres wyświetla nieprawidłowe wartości (np. przesunięte o współczynnik
   1000), najczęściej wynika to z znaku tysiąca w
   liczby pochodzące z źródła innego niż niemieckie — zobacz wskazówki dotyczące liczb w
   [Ustawieniach](settings.md) i [FAQ](faq.md).
4. W przypadku wykresu kołowego obszar pozostaje pusty, mimo że wprowadzono wartości
   : albo wszystkie wartości pierwszej serii mają wartość zero lub
   są pominięte (`null`), albo co najmniej jedna wartość jest ujemna — w takim przypadku
   wykres wyświetla własną informację z nazwą danej
   osi zamiast zniekształconego wykresu kołowego.
