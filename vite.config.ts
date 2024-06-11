import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

import pkg from "./package.json";

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const assetsDir = resolve(root, "assets");

export default defineConfig(({ mode }) => {
  return {
    root: ".",
    server: {
      port: 5000,
    },
    resolve: {
      alias: {
        "@src": root,
        "@assets": assetsDir,
        "@pages": pagesDir,
      },
    },
    plugins: [
      react(),
      crx({
        manifest: defineManifest({
          manifest_version: 3,
          version: pkg.version,
          name: mode === "development" ? `DEV: myname` : "myname",
          description: "description",
          options_ui: {
            page: "src/pages/options/index.html",
          },
          background: {
            service_worker: "src/pages/background/index.ts",
            type: "module",
          },
          action: {
            default_popup: "src/pages/popup/index.html",
            default_icon: {
              "32": "icon-32.png",
            },
          },
          chrome_url_overrides: {
            newtab: "src/pages/newtab/index.html",
          },
          icons: {
            "128": "icon-128.png",
          },
          permissions: ["activeTab"],
          content_scripts: [
            {
              matches: ["http://*/*", "https://*/*", "<all_urls>"],
              js: ["src/pages/content/index.tsx"],
              css: ["contentStyle.css"],
            },
          ],
          devtools_page: "src/pages/devtools/index.html",
        }),
        contentScripts: {
          injectCss: true,
        },
      }),
    ],
  };
});
