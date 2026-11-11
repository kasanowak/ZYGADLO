// Dane kontaktowe edytowane w CMS („Ustawienia strony”).
import ustawienia from './ustawienia.json';

export const site = {
  name: 'Andrzej Żygadło',
  description: ustawienia.opis,
  tagline: ['Malarstwo,', 'rysunek,', 'grafika,', 'fotografia.'],
  email: ustawienia.email,
  phone: ustawienia.telefon,
  facebook: ustawienia.facebook,
  invite: ustawienia.zaproszenie,
  designBy: { name: 'NUO', url: '#' },
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Bio', href: '/bio' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Nowości', href: '/nowosci' },
  { label: 'Publikacje', href: '/publikacje' },
  { label: 'Obozy badawcze', href: '/obozy-badawcze' },
  { label: 'Wystawy', href: '/wystawy' },
  { label: 'Wywiady', href: '/wywiady' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const galleryCategories = [
  { key: 'malarstwo', label: 'malarstwo' },
  { key: 'grafika', label: 'grafika' },
  { key: 'ilustracja', label: 'ilustracja' },
] as const;

export const publicationCategories = [
  { key: 'artystyczne', label: 'artystyczne' },
  { key: 'naukowe', label: 'naukowe' },
  { key: 'wywiady', label: 'wywiady' },
  { key: 'inne', label: 'inne' },
] as const;
