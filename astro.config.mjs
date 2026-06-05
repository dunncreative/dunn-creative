import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://dunncreative.net',
  output: 'static',
  integrations: [
    tailwind({
      // We control base styles via src/styles/global.css.
      applyBaseStyles: false,
    }),
  ],
});
