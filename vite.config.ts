import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { crx, ManifestV3Export } from '@crxjs/vite-plugin';

import manifest from './manifest.json';
import pkg from './package.json';

const root = resolve(__dirname, 'src');
const pagesDir = resolve(root, 'pages');
const assetsDir = resolve(root, 'assets');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

export default defineConfig({
  resolve: {
    alias: {
      '@src': root,
      '@assets': assetsDir,
      '@pages': pagesDir,
    },
  },
  plugins: [
    react(),
    crx({
      manifest: {
        ...manifest as unknown as ManifestV3Export,
        manifest_version: 3,
        name: pkg.displayName,
        description: pkg.description,
        version: pkg.version,
      },
    }),
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: process.env.__DEV__ === 'true',
    emptyOutDir: false,
  },
});
