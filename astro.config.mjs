import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  prefetch: true,

  vite: {
    base: '/la-95-trucking-show.netlify.app',
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },

  adapter: node({
    mode: 'standalone',
  }),

  integrations: [react()],
});