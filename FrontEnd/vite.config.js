import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // specify the port
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:9120',
        changeOrigin: true,
      },
    },
  },

  process: {
    global: {},
  },
});
