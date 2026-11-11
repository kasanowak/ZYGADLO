/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** Zdjęcia galerii bieżącego wpisu – używane przez komponent <Galeria /> w MDX. */
    galeria?: { src: import('astro').ImageMetadata; alt: string }[];
  }
}
