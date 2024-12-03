import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },
});
