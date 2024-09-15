import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/especificador-de-material-de-redes/', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
