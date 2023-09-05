import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { crx, ManifestV3Export } from '@crxjs/vite-plugin';
import merge from 'lodash/merge';

import manifest from './manifest.json';
import devManifest from './manifest.dev.json';
import pkg from './package.json';

const root = resolve(__dirname, 'src');
const pagesDir = resolve(root, 'pages');
const assetsDir = resolve(root, 'assets');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

const isDev = process.env.__DEV__ === 'true';

const extensionManifest = {
  ...merge(manifest, isDev ? devManifest : {}),
  manifest_version: 3,
  name: isDev ? `DEV: ${ pkg.displayName }` : pkg.displayName,
  description: pkg.description,
  version: pkg.version,
};

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
      manifest: extensionManifest as ManifestV3Export,
      contentScripts: {
        injectCss: true,
      }
    }),
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: false,
  },
});
