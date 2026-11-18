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
osie i serie w ustawieniach.”

Odpowiedź: W edytorze wykresów nie utworzono ani osi, ani szeregów. W
edytorze należy zaimportować tabelę za pomocą opcji „Wstaw z Excela” lub skorzystać z jednego z
dwóch przycisków: „Pobierz przykład” lub „Utwórz pustą tabelę”
.

**Pytanie:** Po wstawieniu moje wskaźniki są wyświetlane jako serie, a moje
warianty jako osie — wszystko jest odwrócone.

Odpowiedź: Na pasku „Wstaw z Excela” wybrano niewłaściwy kierunek odczytu
. W sekcji „Jak wygląda tabela?” należy zmienić wybór na drugi i
ponownie kliknąć „Przenieś tabelę”.

**Pytanie:** Nazwa mojej osi jest tak długa, że powoduje
ściśnięcie wykresu.

Odpowiedź: W nazwie osi – w siatce lub w sekcji „Oś” w polu
„Nazwa” – naciśnij klawisz Enter w żądanym miejscu.
Złamanie wiersza zostanie przeniesione do wykresu.

**Pytanie:** Widzę komunikat „„…“ ma wartość ujemną.
Wykres kołowy nie może przedstawiać ujemnych udziałów.” (lub bez podanej
kategorii: „Wykres kołowy nie może przedstawiać ujemnych udziałów.”)

Odpowiedź: Wykres kołowy przedstawia podział całości; ujemny
udział nie ma w nim odpowiednika. W edytorze wykresów
należy skorygować wymienioną kategorię na wartość nie mniejszą od zera — lub
przełączyć na wykres **słupkowy**, który może przedstawiać wartości ujemne. Edytor nie
pozwala w ogóle na uwzględnienie ujemnego udziału w wykresie kołowym; komunikat
może pojawić się jedynie w przypadku wykresu ze starszej wersji.

Komunikat celowo blokuje cały wykres, zamiast po prostu pominąć ujemny
segment: wykres kołowy rozdziela pozostałe wartości na
pełne koło, w wyniku czego powstałby wykres sprawiający wrażenie kompletnego, z
domyślnie zwiększonymi wartościami procentowymi.

**Pytanie:** Widzę komunikat „Nie udało się załadować wykresu.
Proszę odświeżyć stronę”.

Odpowiedź: Nie udało się ponownie załadować biblioteki wykresów, najczęściej z powodu
przerwanego połączenia internetowego. Należy odświeżyć stronę; jeśli problem
nadal występuje, należy sprawdzić połączenie sieciowe.

**Pytanie:** Dlaczego mój wykres jest pusty, mimo że wprowadzono dane?

Odpowiedź: Najczęściej moduł znajduje się w bardzo wąskiej kolumnie lub w
zwiniętym elemencie, przez co kontener ma wysokość 0. Wykres
pozostaje wtedy trwale pusty, ponieważ nie ma miejsca na wygenerowanie wykresu. Należy
przenieść moduł do szerszej kolumny lub rozwinąć element.

**Pytanie:** Dlaczego przy dwóch niemal identycznych wartościach widzę dużą
różnicę na wykresie?

Odpowiedź: Bez ustawionej wartości maksymalnej każda oś sięga do największej wartości, która
na niej występuje. Jeśli dwie wartości są blisko siebie, ale daleko od zera,
górna część osi wykorzystuje cały zakres — różnica
wydaje się przez to większa, niż jest w rzeczywistości. Rozwiązanie: W edytorze wykresów
wybierz daną oś i w sekcji „Oś” ręcznie ustaw
minimum i maksimum.

**Pytanie:** Dlaczego gorsza wartość znajduje się dalej na zewnątrz?

Odpowiedź: Na tej osi brakuje przełącznika „Mniejsze jest lepsze”. Należy go włączyć dla
wszystkich wskaźników, w przypadku których mniejsza wartość oznacza lepszy
wynik — na przykład waga, zużycie lub czas ładowania. W edytorze wykresów
wybierz oś i włącz tę opcję w sekcji „Oś”.

**Pytanie:** Nie widzę przycisków pobierania pod wykresem.

Odpowiedź: Albo opcja „Zezwól na pobieranie” w edytorze wykresów w sekcji
„Zachowanie” nie jest włączona, albo wykres nie został jeszcze w całości narysowany —
przyciski pojawiają się dopiero wtedy, gdy wykres jest gotowy do pobrania.

**Pytanie:** Po kliknięciu „Jako SVG” lub „Jako PNG” pojawia się komunikat „Eksport
nie powiódł się. Proszę spróbować ponownie”.

Odpowiedź: Eksport nie mógł znaleźć narysowanego wykresu — zazwyczaj dlatego, że
właśnie się on ponownie ładuje. Poczekaj chwilę i kliknij ponownie; jeśli problem
nadal występuje, odśwież stronę.

**Pytanie:** Czy mogę wyświetlić więcej niż sześć rzędów?

Odpowiedź: Tak. Paleta kolorów MAN zawiera sześć kolorów; od siódmego rzędu
kolory się powtarzają. Rzędy pozostają jednak jednoznacznie
rozróżnialne, ponieważ każdy punkt danych ma swoją wartość jako etykietę, a
nazwa i wartości każdego rzędu znajdują się w podpowiedzi i legendzie. W sekcji „Dane”
można również przypisać każdemu rzędowi własny kolor.

**Pytanie:** Co stanie się z moim wykresem podczas automatycznego
tłumaczenia strony?

Odpowiedź: Tłumaczeniu podlegają tytuły, przypisy, opisy osi oraz
nazwy serii. Liczby, jednostki, granice osi, kolory i wszystkie pozostałe
ustawienia pozostają niezmienione.

**Pytanie:** Wstawiona liczba nagle okazuje się o współczynnik 1000 za duża lub
za mała.

Odpowiedź: Edytor wykresów interpretuje liczby zgodnie z niemieckimi zasadami – podczas wpisywania, podczas
wstawiania do siatki oraz przy opcji „Wstaw z Excela”: kropka służy jako
oddzielnik tysięcy, a przecinek jako oddzielnik dziesiętny. Z `1.234` staje się
więc `1234`, a nie `1,234`. Kto wstawia tabelę z angielskim formatem
(kropka jako oddzielnik dziesiętny), musi przed wstawieniem dostosować odpowiednie liczby
wstawieniem dostosować do formatu niemieckiego, w przeciwnym razie np. „1.234” (tysiąc)
zostanie odczytane jako „1,234” (jeden przecinek dwa trzy cztery). Jeśli w liczbie występuje zarówno
kropka, jak i przecinek, niezależnie od sposobu zapisu za znak oddzielający dziesiętne uznaje się ostatni
znak — `1.234,5` i `1,234.5` dają
w obu przypadkach wynik `1234,5`.

**Pytanie:** Gdzie zniknęły pola „Wysokość w pikselach” i „Zezwól na pobieranie” w
oknie dialogowym Staffbase?

Odpowiedź: Oba znajdują się teraz w edytorze wykresów: wysokość w sekcji
„Układ”, a opcja pobierania w sekcji „Zachowanie”. Stare pola są
ukryte. Starsze wykresy zachowują swoje wartości; edytor przejmuje je
podczas otwierania, a bez wprowadzania zmian wykres pozostaje na stronie taki, jaki był.

**Pytanie:** Przycisk „Zastosuj” nie działa, u góry widnieje komunikat „Oś „…”: Maksimum zbyt małe”.

Odpowiedź: W sieci dla tej osi wprowadzono wartość maksymalną, która nie jest
większa od wartości minimalnej. Oś jest zaznaczona w siatce; w sekcji „Oś”
należy zwiększyć wartość maksymalną lub wyczyścić pole – puste pole oznacza „wyliczone
na podstawie wartości”.
