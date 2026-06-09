import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
  },
});
