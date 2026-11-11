# Andrzej Żygadło – strona (Astro)

Strona zbudowana na podstawie projektu z Figmy (`ZYGADLO-export/`).

## Uruchomienie

```bash
npm install
npm run dev       # podgląd na http://localhost:4321
npm run build     # wersja produkcyjna w katalogu dist/
npm run check     # sprawdzenie typów i treści
```

`dist/` to statyczne pliki HTML, które wrzucasz na dowolny hosting (np. przez FTP albo na Netlify/Vercel).
Przed wdrożeniem ustaw domenę w `astro.config.mjs` (`site`) i link do Facebooka w `src/data/site.ts`.

## Struktura stron

| Adres | Co to jest |
|---|---|
| `/` | strona główna: slider wybranych prac + 5 ostatnich nowości |
| `/bio` | biografia |
| `/kontakt` | kontakt (ta sama sekcja jest też w stopce każdej strony) |
| `/galeria`, `/galeria/<obraz>` | prace pogrupowane latami, filtry: malarstwo / grafika / ilustracja |
| `/obozy-badawcze`, `/obozy-badawcze/<wpis>` | obozy badawcze |
| `/wystawy`, `/wystawy/<wpis>` | wystawy |
| `/publikacje`, `/publikacje/<wpis>` | publikacje (filtry: artystyczne / naukowe / wywiady / inne) |
| `/wywiady`, `/wywiady/<wpis>` | wywiady |
| `/nowosci`, `/nowosci/<wpis>` | wspólny strumień wpisów ze wszystkich działów + własne aktualności |

## Panel treści (CMS)

Treści najwygodniej edytować w panelu: **https://kasanowak.github.io/ZYGADLO/**
(Sveltia CMS, interfejs po polsku). Panel zapisuje zmiany jako commity na `master`,
a pipeline „Build i wdrożenie” w ciągu ok. 1–2 minut buduje i publikuje stronę.

W panelu: Galeria, Nowości, Obozy badawcze, Wystawy, Publikacje, Wywiady, Bio
oraz Kontakt i ustawienia (e-mail, telefon, Facebook).

### Uruchomienie panelu (jednorazowo, właściciel repo)

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
   Workflow `.github/workflows/cms.yml` opublikuje katalog `cms/` pod adresem powyżej.
2. Osoba edytująca potrzebuje konta GitHub z dostępem do repo
   (**Settings → Collaborators → Add people**, rola *Write*).
3. Logowanie w panelu: **„Zaloguj się za pomocą tokenu dostępu”**. Token tworzy się w GitHub:
   *Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate*,
   repozytorium `kasanowak/ZYGADLO`, uprawnienie **Contents: Read and write**.
   Token zapamiętuje przeglądarka – wpisuje się go raz.

Logowanie przyciskiem „Zaloguj się przez GitHub” wymaga dodatkowo serwera OAuth
(np. darmowy Cloudflare Worker [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth))
i wpisania jego adresu jako `backend.base_url` w `cms/config.js`.

### Jak to działa

- Konfiguracja pól: `cms/config.js` – musi zgadzać się ze schematami w `src/content.config.ts`.
- Zdjęcia z panelu trafiają do `src/assets/obrazy` (Galeria) i `src/assets/zdjecia` (pozostałe),
  pliki do pobrania do `public/pliki`.
- Jeśli wpis ma błąd (np. brak wymaganego pola), build się nie uda i strona zostaje w poprzedniej
  wersji – szczegóły w zakładce **Actions**.

## Dodawanie treści ręcznie

Każdy wpis to plik w `src/content/<dział>/`. Nazwa pliku staje się adresem strony
(np. `src/content/wystawy/zapis-2016.md` → `/wystawy/zapis-2016`).

Zdjęcia wrzucaj do `src/assets/` i podawaj ścieżką względną. Astro samo zmniejsza je i konwertuje do WebP.
Pliki do pobrania (PDF itp.) wrzucaj do `public/pliki/`.

### Obraz (`src/content/obrazy/*.md`)

```yaml
---
title: "Rodzina B nr 1"
rok: 2016                     # grupuje prace w galerii
kategoria: malarstwo          # malarstwo | grafika | ilustracja
technika: "olej, sprej, płótno"
wymiary: "100x81"
datowanie: "Bonów, 2015-16 r." # opcjonalnie, zamiast samego roku w podpisie
obraz: ../../assets/obrazy/rodzina-b-nr-1.png
detal: ../../assets/obrazy/rodzina-detal.jpg  # opcjonalny kadr na pełną szerokość
alt: "Opis obrazu dla czytników ekranu"
naStronieGlownej: 1           # pozycja w sliderze na stronie głównej (opcjonalnie)
kolejnosc: 1                  # kolejność w obrębie roku
dataNowosci: 2019-06-11       # opcjonalnie: pokaż w „Nowościach”
---
Opis obrazu (opcjonalny).
```

### Wpis: obóz, wystawa, wywiad, publikacja, aktualność (`*.md`)

```yaml
---
title: "Ewidencjonowanie nagrobków, renowacja cmentarza cerkiewnego."
data: 2019-08-31              # sortowanie i data w „Nowościach”
nazwa: "Leżachów"             # duży napis nad tytułem (opcjonalnie)
okres: "sierpień 2019"
lokalizacja: "powiat przeworski, woj. podkarpackie"
opis: "Krótki opis na liście"
notka: "Obóz współorganizowany ze …"
okladka: ../../assets/…       # miniatura w „Nowościach” (opcjonalnie)
galeria:                      # zdjęcia do galerii (lightbox)
  - src: ../../assets/zdjecia/foto.jpg
    alt: "Opis"
pliki:
  - nazwa: "Program obozu"
    url: "/pliki/program.pdf"
wNowosciach: true             # false = nie pokazuj w „Nowościach”
szkic: false                  # true = ukryj wpis
# tylko publikacje:
kategoria: naukowe            # artystyczne | naukowe | inne
zrodlo: "„Barbizon Wiśniowski”, nr 6/2012"
---
```

Pod treścią można dodać bloki `sekcje` (w panelu: „Dodatkowe sekcje”):

```yaml
sekcje:
  - typ: tekst
    tresc: "Akapit w **Markdown**."
  - typ: lista                # lista rozwijana strzałką
    tytul: "Wybrane wystawy"
    widoczne: 5               # 0 = wszystkie
    pozycje:
      - "IX-X 2012 – wystawa *„Bez widoku”*, Kraków"
  - typ: wideo
    youtube: "https://www.youtube.com/watch?v=…"   # link albo sam identyfikator
  - typ: galeria              # miejsce galerii; bez tego galeria trafia na koniec wpisu
```

Pliki `.mdx` też działają (komponenty `<Lista>`, `<Wideo>`, `<Galeria />`), ale panel CMS
obsługuje tylko `.md`.

Bio: `src/content/strony/bio.md`. Dane kontaktowe: `src/data/ustawienia.json`.

## Do uzupełnienia

Część treści to wypełniacze z makiety. Sprawdź je i podmień:

- tytuły obrazów „Bez tytułu (…)”, ich lata i technika – w projekcie znane były tylko „Rodzina B nr 1” i „Chram św. Paraskewii”;
- teksty wpisów („… do uzupełnienia”), kategorie publikacji, źródło wywiadu;
- przykładowa aktualność `src/content/nowosci/nowa-strona.md`;
- link do Facebooka (panel → Kontakt i ustawienia) i adres „Design by NUO” w `src/data/site.ts`;
- `public/pliki/przyklad.pdf` (atrapa pliku do pobrania).

## Wdrożenie (GitHub Actions)

Workflow `.github/workflows/deploy.yml` przy każdym pushu na `master` buduje stronę
i wysyła zawartość `dist/` przez FTP do katalogu `/new/`. Pull requesty są tylko budowane.
Ręczne uruchomienie: zakładka **Actions → Build i wdrożenie → Run workflow**.

Ustaw w **Settings → Secrets and variables → Actions**:

| Sekret | Opis |
|---|---|
| `FTP_SERVER` | adres serwera FTP |
| `FTP_USERNAME` | login |
| `FTP_PASSWORD` | hasło |

Opcjonalne zmienne (zakładka *Variables*): `FTP_PROTOCOL` (`ftp` / `ftps` / `ftps-legacy`, domyślnie `ftp`)
i `FTP_PORT` (domyślnie `21`). Wysyłane są tylko zmienione pliki (stan synchronizacji
trzymany w `/new/.ftp-deploy-sync-state.json`).
