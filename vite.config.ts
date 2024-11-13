import react from '@vitejs/plugin-react';
import { stripDevIcons, crxI18n } from './custom-vite-plugins';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { crx, ManifestV3Export } from '@crxjs/vite-plugin';

import manifest from './manifest.json';
import devManifest from './manifest.dev.json';
import pkg from './package.json';

const root = resolve(__dirname, 'src');
const pagesDir = resolve(root, 'pages');
const assetsDir = resolve(root, 'assets');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

const isDev = process.env.__DEV__ === 'true';
// set this flag to true, if you want localization support
const localize = false;

const extensionManifest = {
  ...manifest,
  version: pkg.version,
  ...(isDev ? devManifest : {} as ManifestV3Export),
  ...(localize ? {
    name: '__MSG_extName__',
    description: '__MSG_extDescription__',
    default_locale : 'en'
  } : {})
};

/*
* By default this vite config produces a dist for chrome
* To build for firefox change the "browser" prop in the crx config below to 'firefox'
* AND ALSO change the "background" config in the manifest.json to the following:
* 
{
  "manifest_version": 3,
  "name": "<name in manifest.json>",
  "description": "<description in manifest.json>",
  ...
  "background": 
    "scripts": [ "service-worker-loader.js" ]
  },
  ...
}
* NOTE: remove "type" prop and "service_worker" prop (string val) 
* then replace with "scripts" prop (array val)
*/

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
      browser: 'chrome', // <-- change value to 'firefox' or 'chrome'
      contentScripts: {
        injectCss: true,
      }
    }),
    stripDevIcons(isDev),
    crxI18n({
      localize,
      src: './src/locales'
    })
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: !isDev
  },
});
