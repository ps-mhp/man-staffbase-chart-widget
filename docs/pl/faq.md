# FAQ

Każdy komunikat, który może wyświetlać wykres zamiast grafiki, należy potraktować jako pytanie —
z dokładnym brzmieniem, aby można go było znaleźć za pomocą wyszukiwarki.

**Pytanie:** Widzę komunikat „Wykres nie został jeszcze skonfigurowany. Otwórz
ustawienia modułu”.

Odpowiedź: Dla tego modułu nie zapisano jeszcze żadnej konfiguracji.
Otwórz ustawienia widżetu, wypełnij edytor wykresów i zapisz.

**Pytanie:** Widzę komunikat „Nie udało się odczytać wykresu.
Proszę skonfigurować go ponownie w ustawieniach.”

Odpowiedź: Zapisane dane są uszkodzone lub zostały zmienione ręcznie.
Otwórz ustawienia widżetu i skonfiguruj wykres ponownie w edytorze —
w razie potrzeby za pomocą nowo wstawionej tabeli.

**Pytanie:** Wyświetla się komunikat „Typ wykresu „…“ nie jest rozpoznawany przez tę wersję
modułu. Proszę zaktualizować moduł.” (lub bez
podania nazwy typu: „Skonfigurowany typ wykresu nie jest znany tej wersji
modułu. Proszę zaktualizować moduł.”)

Odpowiedź: Wykres został skonfigurowany przy użyciu nowszej wersji modułu,
która rozpoznaje typ wykresu, którego ta wersja jeszcze nie
obsługuje. Należy zaktualizować moduł do najnowszej wersji.

**Pytanie:** Widzę komunikat „Brak danych na wykresie. Należy utworzyć
osie i serie w ustawieniach”.

Odpowiedź: W edytorze wykresów nie utworzono ani osi, ani serii. W
edytorze należy wstawić tabelę lub użyć jednego z dwóch przycisków: „Pobierz przykład”
lub „Utwórz pustą tabelę”.

**Pytanie:** Po wstawieniu moje wskaźniki są wyświetlane jako serie, a moje
warianty jako osie — wszystko jest odwrócone.

Odpowiedź: Pod polem wstawiania wybrano niewłaściwy kierunek czytania. Przełącz na
inną opcję w sekcji „Jak wygląda Twoja tabela?” i ponownie kliknij
„Przejmij tabelę”.

**Pytanie:** Moje etykiety osi są tak długie, że powodują
ściśnięcie wykresu.

Odpowiedź: W polu osi w wybranym miejscu naciśnij klawisz Enter
. Złamanie linii zostanie przeniesione do wykresu.

**Pytanie:** Widzę komunikat „Nie udało się załadować wykresu.
Proszę odświeżyć stronę”.

Odpowiedź: Nie udało się ponownie załadować biblioteki wykresów, najczęściej z powodu
przerwanego połączenia internetowego. Odśwież stronę; jeśli problem
nadal występuje, sprawdź połączenie sieciowe.

**Pytanie:** Dlaczego mój wykres jest pusty, mimo że wprowadzono dane?

Odpowiedź: Najczęściej moduł znajduje się w bardzo wąskiej kolumnie lub w
zwiniętym elemencie, przez co kontener ma wysokość 0. Wykres
pozostaje wtedy trwale pusty, ponieważ nie ma miejsca na rysowanie. Należy
przesunąć moduł do szerszej kolumny lub rozwinąć element.

**Pytanie:** Dlaczego przy dwóch niemal identycznych wartościach widzę dużą
różnicę na wykresie?

Odpowiedź: Bez ustawionej wartości maksymalnej każda oś rozciąga się do największej wartości, która
na niej występuje. Jeśli dwie wartości są blisko siebie, ale daleko od zera,
górna część osi wykorzystuje cały zakres — różnica
wydaje się przez to większa, niż jest w rzeczywistości. Rozwiązanie: W edytorze wykresów dla
danego osi ręcznie ustaw wartości minimalną i maksymalną.

**Pytanie:** Dlaczego gorsza wartość znajduje się dalej na zewnątrz?

Odpowiedź: Na tej osi brakuje przełącznika „Im mniejsza, tym lepsza”. Należy go włączyć dla
wszystkich wskaźników, w przypadku których mniejsza wartość oznacza lepszy
wynik — na przykład waga, zużycie lub czas ładowania. W edytorze wykresów należy
włączyć tę opcję dla danej osi.

**Pytanie:** Nie widzę przycisków pobierania pod wykresem.

Odpowiedź: Albo opcja „Zezwól na pobieranie” nie jest
włączona w ustawieniach, albo wykres nie został jeszcze w pełni wygenerowany —
przyciski pojawiają się dopiero wtedy, gdy grafika jest gotowa do pobrania.

**Pytanie:** Po kliknięciu „Jako SVG” lub „Jako PNG” pojawia się komunikat „Eksport
nie powiódł się. Proszę spróbować ponownie.”

Odpowiedź: Eksport nie mógł znaleźć narysowanego wykresu — najczęściej dlatego, że
właśnie się on ponownie ładuje. Należy chwilę poczekać i kliknąć ponownie; jeśli problem
nadal występuje, należy odświeżyć stronę.

**Pytanie:** Czy mogę wyświetlić więcej niż sześć serii?

Odpowiedź: Tak. Paleta kolorów MAN zawiera sześć kolorów; od siódmej serii
kolory się powtarzają. Serie pozostają jednak jednoznacznie
rozróżnialne, ponieważ każdy punkt danych ma swoją wartość jako etykietę, a
nazwy i wartości każdej serii znajdują się w podpowiedzi i legendzie.

**Pytanie:** Co stanie się z moim wykresem podczas automatycznego
tłumaczenia strony?

Odpowiedź: Tłumaczone są tytuły, przypisy, etykiety osi oraz
nazwy serii. Liczby, jednostki, granice osi, kolory i wszystkie pozostałe
ustawienia pozostają niezmienione.

**Pytanie:** Wstawiona liczba nagle okazuje się o współczynnik 1000 za duża lub
za mała.

Odpowiedź: Edytor wykresów interpretuje liczby zgodnie z niemiecką konwencją: kropka służy jako
oddzielacz tysięcy, a przecinek jako oddzielacz dziesiętny. Zatem `1.234` staje się
`1234`, a nie `1,234`. Jeśli wstawiasz tabelę z angielskim formatem
(kropka jako separator dziesiętny), musisz przed
przed wstawieniem dostosować do formatu niemieckiego, w przeciwnym razie np. „1.234” (tysiąc)
zostanie odczytane jako „1,234” (jeden przecinek dwa trzy cztery). Jeśli w liczbie występuje zarówno
kropek, jak i przecinek, niezależnie od sposobu zapisu za znak oddzielający dziesiętne uznaje się ostatni
znak — zarówno `1.234,5`, jak i `1,234.5` dają
wynik `1234,5`.
