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

## Dodawanie treści

Każdy wpis to plik w `src/content/<dział>/`. Nazwa pliku staje się adresem strony
(np. `src/content/wystawy/zapis-2016.mdx` → `/wystawy/zapis-2016`).

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

### Wpis: obóz, wystawa, wywiad, publikacja, aktualność (`*.mdx`)

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

W treści MDX możesz używać:

```mdx
<Lista tytul="Wybrane wystawy" widoczne={5}>
- pozycja 1
- pozycja 2
</Lista>

<Wideo youtube="IDENTYFIKATOR_FILMU" tytul="Relacja z obozu" />

<Galeria />   {/* miejsce galerii; bez tego galeria trafia na koniec wpisu */}
```

## Do uzupełnienia

Część treści to wypełniacze z makiety. Sprawdź je i podmień:

- tytuły obrazów „Bez tytułu (…)”, ich lata i technika – w projekcie znane były tylko „Rodzina B nr 1” i „Chram św. Paraskewii”;
- teksty wpisów („… do uzupełnienia”), kategorie publikacji, źródło wywiadu;
- przykładowa aktualność `src/content/nowosci/nowa-strona.mdx`;
- link do Facebooka i adres „Design by NUO” w `src/data/site.ts`;
- `public/pliki/przyklad.pdf` (atrapa pliku do pobrania).
