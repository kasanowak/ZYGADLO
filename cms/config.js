/**
 * Konfiguracja panelu treści (Sveltia CMS) – https://sveltiacms.app
 *
 * Panel zapisuje zmiany jako commity w repozytorium. Każdy commit na `master`
 * uruchamia pipeline „Build i wdrożenie”, który buduje i publikuje stronę.
 * Pola muszą odpowiadać schematom w src/content.config.ts.
 */

// ---------- pola wspólne ----------
const data = (name, label, extra = {}) => ({
  name,
  label,
  widget: 'datetime',
  time_format: false,
  format: 'YYYY-MM-DD',
  ...extra,
});
const optional = { required: false };

const f = {
  title: { name: 'title', label: 'Tytuł', widget: 'string' },
  data: data('data', 'Data publikacji', { hint: 'Decyduje o kolejności na listach i w „Nowościach”.' }),
  nazwa: { name: 'nazwa', label: 'Nazwa (duży napis nad tytułem)', widget: 'string', ...optional, hint: 'Np. miejscowość obozu albo tytuł wystawy.' },
  okres: { name: 'okres', label: 'Okres', widget: 'string', ...optional, hint: 'Np. „sierpień 2019”.' },
  lokalizacja: { name: 'lokalizacja', label: 'Lokalizacja', widget: 'string', ...optional, hint: 'Pokazywana w nawiasie, np. „powiat przeworski, woj. podkarpackie”.' },
  opis: { name: 'opis', label: 'Krótki opis na liście', widget: 'text', ...optional },
  notka: { name: 'notka', label: 'Notka pod tytułem', widget: 'string', ...optional, hint: 'Np. współorganizatorzy.' },
  okladka: { name: 'okladka', label: 'Miniatura w „Nowościach”', widget: 'image', ...optional, hint: 'Gdy brak – używane jest pierwsze zdjęcie z galerii.' },
  galeria: {
    name: 'galeria',
    label: 'Galeria zdjęć',
    label_singular: 'zdjęcie',
    widget: 'list',
    ...optional,
    summary: '{{fields.alt}}',
    fields: [
      { name: 'src', label: 'Zdjęcie', widget: 'image' },
      { name: 'alt', label: 'Opis zdjęcia (dla niewidomych i wyszukiwarek)', widget: 'string', ...optional },
    ],
  },
  body: { name: 'body', label: 'Treść', widget: 'markdown', ...optional },
  sekcje: {
    name: 'sekcje',
    label: 'Dodatkowe sekcje (pod treścią)',
    label_singular: 'sekcję',
    widget: 'list',
    ...optional,
    typeKey: 'typ',
    hint: 'Bloki pod główną treścią, w tej kolejności. Galeria zdjęć pojawia się w miejscu bloku „Galeria”, a jeśli go nie ma – na końcu.',
    types: [
      {
        name: 'tekst',
        label: 'Tekst',
        widget: 'object',
        summary: '{{fields.tresc | truncate(60)}}',
        fields: [{ name: 'tresc', label: 'Tekst', widget: 'markdown' }],
      },
      {
        name: 'lista',
        label: 'Lista rozwijana',
        widget: 'object',
        summary: '{{fields.tytul}}',
        fields: [
          { name: 'tytul', label: 'Tytuł listy', widget: 'string', ...optional },
          { name: 'widoczne', label: 'Ile pozycji widać przed rozwinięciem', widget: 'number', value_type: 'int', default: 5, min: 0, hint: '0 = wszystkie.' },
          {
            name: 'pozycje',
            label: 'Pozycje',
            label_singular: 'pozycję',
            widget: 'list',
            field: { name: 'pozycja', label: 'Pozycja', widget: 'string', hint: 'Kursywa: *tekst*' },
          },
        ],
      },
      {
        name: 'wideo',
        label: 'Film z YouTube',
        widget: 'object',
        summary: '{{fields.tytul}}',
        fields: [
          { name: 'youtube', label: 'Link do filmu na YouTube', widget: 'string' },
          { name: 'tytul', label: 'Tytuł filmu', widget: 'string', ...optional },
        ],
      },
      {
        name: 'galeria',
        label: 'Galeria (miejsce w treści)',
        widget: 'object',
        // Blok bez pól – zaznacza miejsce, w którym pojawią się zdjęcia z pola „Galeria zdjęć”.
        fields: [],
      },
    ],
  },
  pliki: {
    name: 'pliki',
    label: 'Pliki do pobrania',
    label_singular: 'plik',
    widget: 'list',
    ...optional,
    summary: '{{fields.nazwa}}',
    fields: [
      { name: 'nazwa', label: 'Nazwa pliku na stronie', widget: 'string' },
      { name: 'url', label: 'Plik', widget: 'file', media_folder: '/public/pliki', public_folder: '/pliki' },
    ],
  },
  wNowosciach: { name: 'wNowosciach', label: 'Pokaż w „Nowościach”', widget: 'boolean', default: true, ...optional },
  szkic: { name: 'szkic', label: 'Szkic (ukryj na stronie)', widget: 'boolean', default: false, ...optional },
};

const byDate = { fields: ['data', 'title'], default: { field: 'data', direction: 'descending' } };

/** Kolekcja wpisów (obozy, wystawy…) – zdjęcia trafiają do src/assets/zdjecia. */
const posts = (name, label, label_singular, icon, url, fields, extra = {}) => ({
  name,
  label,
  label_singular,
  icon,
  folder: `src/content/${name}`,
  extension: 'md',
  format: 'frontmatter',
  create: true,
  media_folder: '/src/assets/zdjecia',
  public_folder: '../../assets/zdjecia',
  preview_path: `${url}/{{slug}}`,
  sortable_fields: byDate,
  fields,
  ...extra,
});

const tail = [f.okladka, f.galeria, f.body, f.sekcje, f.pliki, f.wNowosciach, f.szkic];

window.CMS_CONFIG = {
  load_config_file: false,
  backend: {
    name: 'github',
    repo: 'kasanowak/ZYGADLO',
    branch: 'master',
    // Tylko logowanie tokenem. „Zaloguj przez GitHub” wymaga własnego serwera OAuth
    // (np. sveltia-cms-auth) – wtedy dodaj 'oauth' i ustaw base_url.
    auth_methods: ['token'],
    commit_messages: {
      create: 'CMS: dodano {{collection}} „{{slug}}”',
      update: 'CMS: zmieniono {{collection}} „{{slug}}”',
      delete: 'CMS: usunięto {{collection}} „{{slug}}”',
      uploadMedia: 'CMS: dodano plik {{path}}',
      deleteMedia: 'CMS: usunięto plik {{path}}',
    },
  },
  app_title: 'Andrzej Żygadło – panel treści',
  site_url: 'https://andrzejzygadlo.pl',
  display_url: 'https://andrzejzygadlo.pl',
  // Zdjęcia wstawiane do treści, gdy kolekcja nie ma własnego folderu
  media_folder: 'public/media',
  public_folder: '/media',
  slug: { encoding: 'ascii', clean_accents: true },
  output: { omit_empty_optional_fields: true },
  editor: { preview: false },

  collections: [
    {
      name: 'obrazy',
      label: 'Galeria',
      label_singular: 'obraz',
      icon: 'palette',
      folder: 'src/content/obrazy',
      extension: 'md',
      format: 'frontmatter',
      create: true,
      media_folder: '/src/assets/obrazy',
      public_folder: '../../assets/obrazy',
      summary: '{{title}} ({{rok}})',
      thumbnail: 'obraz',
      preview_path: 'galeria/{{slug}}',
      sortable_fields: { fields: ['rok', 'title'], default: { field: 'rok', direction: 'descending' } },
      view_groups: [{ label: 'Rok', field: 'rok' }],
      fields: [
        f.title,
        { name: 'obraz', label: 'Obraz', widget: 'image' },
        { name: 'alt', label: 'Opis obrazu (dla niewidomych)', widget: 'string', ...optional },
        { name: 'rok', label: 'Rok powstania', widget: 'number', value_type: 'int', hint: 'Grupuje prace w galerii.' },
        {
          name: 'kategoria',
          label: 'Kategoria',
          widget: 'select',
          options: ['malarstwo', 'grafika', 'ilustracja'],
        },
        { name: 'datowanie', label: 'Datowanie w podpisie', widget: 'string', ...optional, hint: 'Gdy inne niż sam rok, np. „Bonów, 2015-16 r.”.' },
        { name: 'technika', label: 'Technika', widget: 'string', ...optional, hint: 'Np. „olej na płótnie”.' },
        { name: 'wymiary', label: 'Wymiary', widget: 'string', ...optional, hint: 'Np. „100 × 120 cm”.' },
        { name: 'detal', label: 'Kadr szczegółu', widget: 'image', ...optional, hint: 'Szeroki kadr na stronie obrazu. Gdy brak – powiększony fragment obrazu.' },
        { name: 'kolejnosc', label: 'Kolejność w obrębie roku', widget: 'number', value_type: 'int', default: 100, ...optional, hint: 'Mniejsza liczba = wyżej.' },
        { name: 'naStronieGlownej', label: 'Pozycja w sliderze na stronie głównej', widget: 'number', value_type: 'int', ...optional, hint: 'Puste = obraz nie pojawia się w sliderze.' },
        data('dataNowosci', 'Data w „Nowościach”', { ...optional, hint: 'Ustaw, żeby obraz pojawił się w „Nowościach”.' }),
        { name: 'tytulNowosci', label: 'Tytuł w „Nowościach”', widget: 'string', ...optional },
        f.szkic,
      ],
    },

    posts('nowosci', 'Nowości (aktualności)', 'aktualność', 'campaign', 'nowosci', [f.title, f.data, f.opis, ...tail], {
      description: 'Wpisy z pozostałych działów trafiają do „Nowości” automatycznie – tu dodawaj tylko osobne aktualności.',
    }),

    posts(
      'obozy',
      'Obozy badawcze',
      'obóz',
      'landscape',
      'obozy-badawcze',
      [f.nazwa, f.title, f.data, f.okres, f.lokalizacja, f.opis, f.notka, ...tail],
      { summary: '{{nazwa}} – {{title}}' },
    ),

    posts(
      'wystawy',
      'Wystawy',
      'wystawę',
      'museum',
      'wystawy',
      [f.nazwa, f.title, f.data, f.okres, f.lokalizacja, f.opis, f.notka, ...tail],
      { summary: '{{nazwa}} – {{title}}' },
    ),

    posts('publikacje', 'Publikacje', 'publikację', 'menu_book', 'publikacje', [
      f.title,
      f.data,
      {
        name: 'kategoria',
        label: 'Kategoria',
        widget: 'select',
        default: 'naukowe',
        options: ['artystyczne', 'naukowe', 'inne'],
      },
      { name: 'zrodlo', label: 'Gdzie się ukazała', widget: 'string', ...optional, hint: 'Np. „Barbizon Wiśniowski”, nr 6/2012.' },
      f.opis,
      f.notka,
      ...tail,
    ]),

    posts('wywiady', 'Wywiady', 'wywiad', 'mic', 'wywiady', [
      f.title,
      f.data,
      { name: 'zrodlo', label: 'Źródło (gazeta, portal)', widget: 'string', ...optional },
      f.opis,
      ...tail,
    ]),
  ],

  singletons: [
    {
      name: 'bio',
      label: 'Bio',
      icon: 'person',
      file: 'src/content/strony/bio.md',
      format: 'frontmatter',
      media_folder: '/src/assets/zdjecia',
      public_folder: '../../assets/zdjecia',
      fields: [
        { name: 'title', label: 'Tytuł strony', widget: 'string', default: 'Bio' },
        { name: 'opis', label: 'Opis dla wyszukiwarek', widget: 'text', ...optional },
        { name: 'wstep', label: 'Wstęp (większy tekst)', widget: 'text', ...optional },
        { name: 'zdjecie', label: 'Zdjęcie', widget: 'image', ...optional },
        { name: 'zdjecieAlt', label: 'Opis zdjęcia', widget: 'string', ...optional },
        { name: 'body', label: 'Treść', widget: 'markdown', ...optional },
        f.sekcje,
      ],
    },
    {
      name: 'ustawienia',
      label: 'Kontakt i ustawienia',
      icon: 'settings',
      file: 'src/data/ustawienia.json',
      format: 'json',
      fields: [
        { name: 'email', label: 'E-mail', widget: 'string' },
        { name: 'telefon', label: 'Telefon', widget: 'string' },
        { name: 'facebook', label: 'Link do Facebooka', widget: 'string', ...optional, hint: 'Puste = link się nie pokazuje.' },
        { name: 'zaproszenie', label: 'Tekst w sekcji Kontakt', widget: 'string' },
        { name: 'opis', label: 'Opis strony dla wyszukiwarek', widget: 'text' },
      ],
    },
  ],
};
