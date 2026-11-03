# Krok po kroku

Na przykładzie porównania pojazdów (MAN eTGX a konkurent) w oparciu o
sześć wskaźników w różnych jednostkach miary.

## Konfiguracja wykresu

1. Umieść widżet **Wykres** na stronie. Otworzą się ustawienia widżetu,
   a nad samym polem natychmiast pojawi się **edytor wykresów**.
   
2. Zaznacz i skopiuj dane porównawcze z Excela: w **pierwszym wierszu**
   kategorie (osie, np. „Zasięg [km]”, „Czas ładowania [min]”), w **pierwszej
   kolumna** – serie (np. nazwy pojazdów). W edytorze wklej je do pola
   **„Wstaw tabelę”** i kliknij **„Przejmij tabelę”**.
   Wartości pojawią się następnie w siatce powyżej oraz w podglądzie.
3. Dla każdej kategorii (kolumna osi w siatce) ustaw **jednostkę** i
   **liczbę miejsc po przecinku** — określa to, jak liczba będzie wyświetlana przy
   punktach danych, w podpowiedzi i w tabeli, np. „125,5 kWh”.
4. W przypadku kategorii, w których **mniejsza wartość jest lepsza** — waga,
   zużycie, czas ładowania — włącz przełącznik **„Mniejsze jest lepsze”** na osi.
   Bez tego przełącznika gorsza (większa) wartość
   znajdowałaby się dalej na zewnątrz osi, a wykres sugerowałby coś zupełnie przeciwnego do
   tego, co ma na myśli: w przypadku porównania zawsze powinno obowiązywać „dalej na zewnątrz = lepiej”
  .
5. Wprowadź **tytuł** i **przypis**, włącz/wyłącz legendę i wybierz jej
   położenie (u góry/u dołu).
6. Ustaw **wysokość** wykresu (zobacz [Ustawienia](settings.md)).
7. Jeśli wykres ma być dostępny do pobrania jako obraz, włącz przełącznik
   **„Zezwól na pobieranie”** (zobacz [Ustawienia](settings.md)).
   Pod wykresem pojawią się wówczas dwa przyciski: „Jako SVG” i
   „Jako PNG”.
8. Kliknij **Zapisz**, a następnie **Zamknij**. Dopiero kliknięcie „Zapisz” powoduje
   przeniesienie danych do widżetu; dopóki obok przycisków „Niezapisane
   zmiany”, zmiany nie zostały jeszcze zastosowane.

## Późniejsze zmiany

1. Otwórz ponownie ustawienia widżetu — edytor wykresów pojawi się
   ponownie z ostatnio zapisanym stanem.
2. Nadpisz wartości bezpośrednio w siatce lub ponownie wstaw zaktualizowaną
   tabelę. Kategorie i serie o tej samej nazwie zachowują przy tym swoje
   dotychczasowe jednostki, kierunki osi i kolory — zastępowane są tylko
   wartości.
3. Zapisz i zamknij tak jak powyżej.

## Jeśli coś nie działa

1. Jeśli zamiast wykresu pojawia się komunikat, zawiera on już
   przyczynę — zobacz [FAQ](faq.md), aby zapoznać się z każdym możliwym sformułowaniem.
2. Jeśli wstawiona tabela nie jest pobierana, sprawdź, czy pierwszy
   wiersz zawiera kategorie, a pierwsza kolumna nazwy serii.
3. Jeśli po wstawieniu wykres wyświetla nieprawidłowe liczby (np. przesunięte o współczynnik
   1000), najczęściej wynika to z użycia oddzielacza tysięcy w
   liczbach pochodzących ze źródeł innych niż niemieckie — zobacz wskazówki dotyczące liczb w
   [Ustawieniach](settings.md) i [FAQ](faq.md).
