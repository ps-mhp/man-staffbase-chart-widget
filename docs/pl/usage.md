# Krok po kroku

Na przykładzie porównania pojazdów (MAN eTGX z konkurentem) w oparciu o
sześć wskaźników o różnych jednostkach w formie diagramu sieciowego;
kroki te mają odpowiednie zastosowanie również do pozostałych trzech typów.

## Konfiguracja diagramu

1. Umieść widżet **Wykres** na stronie. Otworzą się ustawienia widżetu,
   a w nich od razu **edytor wykresów** w trybie pełnoekranowym. Po lewej stronie
   znajduje się siatka danych, a po prawej panel **„Wykres”** z zakładkami
   Dane, Układ, Oś i Zachowanie. Przycisk **Pomoc** w nagłówku otwiera te same
   objaśnienia, co niniejsza dokumentacja.
2. W panelu w sekcji **Układ** wybierz **typ**: **Siatka**, **słupek**,
   **linia** lub **kołowe**; opis poniżej wyjaśnia, do czego służy dany typ
  . Późniejsza zmiana nie powoduje utraty danych – osie, serie, tytuł
   i legenda pozostają, a informacje na osiach (np. minimum i maksimum
   w przypadku wykresu siatkowego) są jedynie ukrywane. **Ustawienia typu** mają jednak
   zastosowanie tylko do niego, patrz [Ustawienia](settings.md).
3. Dopóki nie ma jeszcze danych, siatka oferuje dwie opcje:
   **„Załaduj przykład”** wypełnia przykład pasujący do typu, który można
   nadpisać, **„Utwórz pustą tabelę”** tworzy osie i wiersze do
   wypełnienia.
4. Zalecaną metodą jest jednak opcja **„Wstaw z Excela”** w prawym górnym rogu nad
   siatką: zaznacz tabelę porównawczą w programie Excel, PowerPoint lub Word,
   skopiuj ją i wklej do pola na pasku. Poniżej
   należy określić, **jak wygląda tabela** – domyślnie **osie w wierszach**,
   czyli tak, jak tabela pojawia się w siatce. Następnie **„Przejmij tabelę”**.
   Ten krok jest taki sam dla wszystkich czterech typów.
5. W siatce **każdy wiersz to oś**, a **każda kolumna po prawej to
   rząd**. W przypadku wykresu kołowego siatka pokazuje **tylko pierwszy rząd**;
   informacja poniżej wskazuje, że pozostałe rzędy są zapisane, ale
   nie są wyświetlane.
6. Poszczególne wartości można nadpisać bezpośrednio w siatce. Możliwe jest również wklejanie bloków z Excela
: skopiuj komórki, zaznacz pole w siatce, ⌘ V (Ctrl V).
7. Dla każdej osi wprowadź **jednostkę** (np. „kWh”). **Złamanie wiersza w
   nazwie osi** – za pomocą klawisza Enter – zostanie przeniesione na wykres i
   zapewni czytelność długich opisów.
8. Kliknięcie wiersza powoduje zaznaczenie osi. Pasek nad nią podaje jej nazwę
   („Oś 2 z 6 · Masa akumulatora”) i oferuje opcje **w górę**, **w
   dół**, **duplikuj** oraz **usuń**. W panelu pod **osią**
   znajdują się jej ustawienia szczegółowe: nazwa, jednostka, liczba miejsc po przecinku,
   w przypadku sieci **minimum**, **maksimum** i **„Im mniejsze, tym lepiej”**, a w przypadku
   wykresu kołowego **kolor segmentu**.
9. Tylko w przypadku sieci: w przypadku osi, w których **mniejsza wartość jest lepsza** –
   waga, zużycie, czas ładowania – włącz opcję **„Im mniejsza, tym lepiej”**.
   Bez tej opcji gorsza (większa) wartość znajdowałaby się dalej na zewnątrz, a wykres
   sugerowałby coś przeciwnego do zamierzonego.
10. W sekcji **Dane** nadać nazwy seriom, w razie potrzeby ustawić własny **kolor**
    i zmienić ich kolejność – określa ona kolor palety i
    legendę.
11. W sekcji **Ukształtowanie** wprowadzić tytuł i przypis, umieścić **legendę** nad
    lub pod wykresem albo ukryj ją i wybierz ustawienia
    typu: w przypadku siatki **linie pomocnicze** i **wypełnienie obszarów**, w przypadku
    słupków **kierunek** i **układ warstwowy**, w przypadku linii **wygładzenie**,
    **wypełnienie obszaru** i **wyświetlanie punktów**, w przypadku wykresu kołowego **promień wewnętrzny** i
    **etykiety segmentów**. Na samym dole ustaw **wysokość w px** (od 160 do
    1200).
12. Jeśli wykres ma być dostępny do pobrania jako obraz, w sekcji
    **Zachowanie** włącz opcję **„Zezwól na pobieranie”**. Pod wykresem
    pojawią się wtedy dwa przyciski: „Jako SVG” i „Jako PNG”.
13. W nagłówku przełącz na **Komputer stacjonarny**, **Tablet** lub **Urządzenie mobilne**:
    Podgląd pokazuje wykres tak, jak wygląda on na stronie, a panel
    po prawej stronie pozostaje obok niego.
14. **Zastosuj** – lub ⌘/Ctrl ↵, aby zastosować zmiany i zamknąć. Następnie w
    Studio **Zapisz**; dopiero to zapisze stronę.

## Późniejsze zmiany

1. Ponownie otwórz ustawienia widżetu – edytor pojawi się z
   ostatnio zapisanym stanem, łącznie z typem.
2. Nadpisz wartości bezpośrednio w siatce lub ponownie zaimportuj zaktualizowaną tabelę za pomocą
   opcji „Wstaw z Excela”. Osie i wiersze o tej samej nazwie
   zachowują jednostki, granice, kierunek i kolory – zastępowane są jedynie
   wartości.
3. Każdy krok można cofnąć za pomocą ⌘/Ctrl Z; **Anuluj** odrzuca
   wszystko od ostatniego zatwierdzenia.
4. Zastosuj zmiany i zapisz w Studio tak jak powyżej.

## Jeśli coś nie działa

1. Jeśli na stronie zamiast wykresu pojawia się komunikat, zawiera on
   już przyczynę – zobacz [FAQ](faq.md), aby zapoznać się z każdym możliwym brzmieniem.
2. Jeśli nie można wykonać polecenia „Zastosuj”, w nagłówku podana jest przyczyna, a
  odpowiednia zakładka jest oznaczona czerwonym symbolem – na przykład „Oś „…”: maksymalna wartość zbyt
  mała”. Zobacz „Sprawdzanie” w sekcji [Ustawienia](settings.md).
3. Jeśli nie można zastosować wstawionej tabeli, sprawdź, czy ma ona
   nagłówki w pierwszym wierszu i pierwszej kolumnie. Jeśli
   osie i wiersze są odwrócone w siatce, oznacza to, że wybrano niewłaściwy
   kierunek odczytu – zmień go i zastosuj ponownie.
4. Jeśli po wstawieniu wykres wyświetla nieprawidłowe liczby (np. przesunięte o współczynnik
   1000), najczęściej wynika to z obecności znaku tysiąca w
   liczbach pochodzących ze źródeł innych niż niemieckie – zobacz [FAQ](faq.md).
5. W przypadku wykresu kołowego obszar pozostaje pusty, mimo że wprowadzono wartości
: oznacza to, że wszystkie wartości w pierwszym wierszu mają wartość zero lub są pominięte.
