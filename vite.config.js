import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';

export default defineConfig({
  base: "/especificador-de-material-de-redes/",
  plugins: [],
  css: {
    postcss: {
      plugins: [tailwindcss(tailwindConfig)],
    },
  },
  build: {
    css: {
      output: 'styles/output.css',
    },
    assets: {
      js: {
        mime: 'application/javascript',
      },
    },
    assetsDir: 'assets'
  },
});