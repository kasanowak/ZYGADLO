import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import type { SchemaContext } from 'astro:content';

/** Pola wspólne dla wpisów: obozy, wystawy, wywiady, publikacje, nowości. */
const postFields = ({ image }: SchemaContext) => ({
  /** Główny nagłówek wpisu (pokazywany też na liście „Nowości”). */
  title: z.string(),
  /** Data publikacji – służy do sortowania i wyświetlania w „Nowościach”. */
  data: z.coerce.date(),
  /** Duża nazwa nad nagłówkiem, np. miejscowość obozu albo tytuł wystawy. */
  nazwa: z.string().optional(),
  /** Opis okresu kursywą, np. „sierpień 2019”. */
  okres: z.string().optional(),
  /** Dopisek w nawiasie przy okresie, np. „powiat przeworski, woj. podkarpackie”. */
  lokalizacja: z.string().optional(),
  /** Krótki opis na listach. */
  opis: z.string().optional(),
  /** Mała notka pod nagłówkiem, np. współorganizatorzy. */
  notka: z.string().optional(),
  /** Miniatura pokazywana po najechaniu na liście „Nowości”. */
  okladka: image().optional(),
  /** Zdjęcia do galerii wpisu (pierwsze jest pokazywane w treści). */
  galeria: z.array(z.object({ src: image(), alt: z.string().default('') })).default([]),
  /** Pliki do pobrania – ścieżki względem katalogu /public. */
  pliki: z.array(z.object({ nazwa: z.string(), url: z.string() })).default([]),
  /** true = wpis ukryty (nie trafia na stronę). */
  szkic: z.boolean().default(false),
  /** false = nie pokazuj w „Nowościach”. */
  wNowosciach: z.boolean().default(true),
});

const loader = (dir: string) => glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${dir}` });

const obrazy = defineCollection({
  loader: loader('obrazy'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Rok powstania – grupuje prace w galerii. */
      rok: z.number().int(),
      /** Opis datowania w podpisie, gdy inny niż sam rok, np. „Bonów, 2015-16 r.”. */
      datowanie: z.string().optional(),
      kategoria: z.enum(['malarstwo', 'grafika', 'ilustracja']),
      technika: z.string().optional(),
      wymiary: z.string().optional(),
      obraz: image(),
      /** Opcjonalny kadr szczegółu (pełna szerokość ekranu). Domyślnie powiększony obraz. */
      detal: image().optional(),
      alt: z.string().optional(),
      /** Pozycja w sliderze na stronie głównej (brak = nie pokazuj). */
      naStronieGlownej: z.number().optional(),
      /** Kolejność w obrębie roku (mniejsza = wyżej). */
      kolejnosc: z.number().default(100),
      /** Ustaw datę, żeby obraz pojawił się w „Nowościach” (kategoria „galeria”). */
      dataNowosci: z.coerce.date().optional(),
      /** Tytuł wpisu w „Nowościach” (domyślnie tytuł obrazu). */
      tytulNowosci: z.string().optional(),
      szkic: z.boolean().default(false),
    }),
});

export const collections = {
  obrazy,
  obozy: defineCollection({ loader: loader('obozy'), schema: (ctx) => z.object(postFields(ctx)) }),
  wystawy: defineCollection({ loader: loader('wystawy'), schema: (ctx) => z.object(postFields(ctx)) }),
  nowosci: defineCollection({ loader: loader('nowosci'), schema: (ctx) => z.object(postFields(ctx)) }),
  wywiady: defineCollection({
    loader: loader('wywiady'),
    schema: (ctx) => z.object({ ...postFields(ctx), zrodlo: z.string().optional() }),
  }),
  publikacje: defineCollection({
    loader: loader('publikacje'),
    schema: (ctx) =>
      z.object({
        ...postFields(ctx),
        kategoria: z.enum(['artystyczne', 'naukowe', 'inne']).default('naukowe'),
        /** Gdzie ukazała się publikacja, np. „Barbizon Wiśniowski”, nr 6/2012. */
        zrodlo: z.string().optional(),
      }),
  }),
};
