import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, splitVendorChunkPlugin} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), splitVendorChunkPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      target: 'esnext',
      minify: 'esbuild' as const,
      cssMinify: true
    }
  };
});
