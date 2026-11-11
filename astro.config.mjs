// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // Podmień na docelową domenę przed wdrożeniem.
  site: 'https://andrzejzygadlo.pl',
  integrations: [mdx()],
  trailingSlash: 'ignore',
});
