import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  prefetch: true,

  vite: {
    base: '67b7f88a2aeca0e6fdc42cdd--majestic-pastelito-8bd1d8.netlify.app',
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