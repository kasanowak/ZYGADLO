import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type PostCollection = 'obozy' | 'wystawy' | 'wywiady' | 'publikacje' | 'nowosci';

/** Sekcje strony: adres listy, nazwa przycisku „wstecz” i etykieta w „Nowościach”. */
export const sections: Record<
  PostCollection | 'obrazy',
  { href: string; label: string; badge: string; filter: string }
> = {
  obrazy: { href: '/galeria', label: 'Galeria', badge: 'Galeria', filter: 'galeria' },
  wystawy: { href: '/wystawy', label: 'Wystawy', badge: 'Wystawa', filter: 'wystawy' },
  wywiady: { href: '/wywiady', label: 'Wywiady', badge: 'Wywiad', filter: 'wywiad' },
  publikacje: { href: '/publikacje', label: 'Publikacje', badge: 'Publikacja', filter: 'publikacje' },
  obozy: { href: '/obozy-badawcze', label: 'Obozy badawcze', badge: 'Obozy badawcze', filter: 'obozy' },
  nowosci: { href: '/nowosci', label: 'Nowości', badge: 'Aktualności', filter: 'aktualnosci' },
};

export const newsFilters = [
  { key: 'galeria', label: 'galeria' },
  { key: 'wystawy', label: 'wystawy' },
  { key: 'wywiad', label: 'wywiad' },
  { key: 'publikacje', label: 'publikacje' },
  { key: 'obozy', label: 'obozy badawcze' },
];

const byDateDesc = <T extends { data: { data: Date } }>(a: T, b: T) =>
  b.data.data.getTime() - a.data.data.getTime();

export async function getPosts<C extends PostCollection>(collection: C) {
  const items = (await getCollection(collection, ({ data }) => !data.szkic)) as CollectionEntry<C>[];
  return items.sort(byDateDesc);
}

export async function getPaintings() {
  const items = await getCollection('obrazy', ({ data }) => !data.szkic);
  return items.sort((a, b) => b.data.rok - a.data.rok || a.data.kolejnosc - b.data.kolejnosc);
}

export type FeedItem = {
  title: string;
  href: string;
  date: Date;
  badge: string;
  filter: string;
  thumb?: ImageMetadata;
};

/** Wspólny strumień „Nowości” złożony ze wszystkich sekcji. */
export async function getFeed(): Promise<FeedItem[]> {
  const collections: PostCollection[] = ['nowosci', 'wystawy', 'wywiady', 'publikacje', 'obozy'];
  const items: FeedItem[] = [];
  for (const c of collections) {
    for (const p of await getPosts(c)) {
      if (!p.data.wNowosciach) continue;
      items.push({
        title: p.data.title,
        href: `${sections[c].href}/${p.id}`,
        date: p.data.data,
        badge: sections[c].badge,
        filter: sections[c].filter,
        thumb: p.data.okladka ?? p.data.galeria[0]?.src,
      });
    }
  }
  for (const o of await getPaintings()) {
    if (!o.data.dataNowosci) continue;
    items.push({
      title: o.data.tytulNowosci ?? o.data.title,
      href: `/galeria/${o.id}`,
      date: o.data.dataNowosci,
      badge: sections.obrazy.badge,
      filter: sections.obrazy.filter,
      thumb: o.data.obraz,
    });
  }
  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/** Format daty z projektu: 1/9/2019 */
export const formatDate = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

/** Podpis obrazu: tytuł | datowanie | technika | wymiary */
export function paintingCaption(o: CollectionEntry<'obrazy'>['data']) {
  const details = [o.datowanie ?? String(o.rok), o.technika, o.wymiary].filter(Boolean) as string[];
  return { title: o.title, details, full: [o.title, ...details].join('  |  ') };
}
