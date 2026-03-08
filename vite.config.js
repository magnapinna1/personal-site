import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // If USE_DUMMY_CONTENT is true, point to dummy folder. Otherwise private.
  const contentDir = process.env.USE_DUMMY_CONTENT === 'true'
    ? path.resolve(__dirname, './src/dummy-content')
    : path.resolve(__dirname, './src/private-content');

  return {
    resolve: {
      alias: {
        '@content': contentDir,
      },
    },
    plugins: [react()],
    base: process.env.VITE_BASE || '/',
    server: {
      port: 3000,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.js',
      css: false,
    },
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-router': ['react-router', 'react-router-dom'],
            'vendor-markdown': ['react-markdown'],
          }
        }
      }
    }
  }
});
