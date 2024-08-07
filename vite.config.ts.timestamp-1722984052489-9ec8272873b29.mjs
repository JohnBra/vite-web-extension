// vite.config.ts
import react from "file:///Users/mateo/Desktop/astro-pm-extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import fs from "fs";
import { defineConfig } from "file:///Users/mateo/Desktop/astro-pm-extension/node_modules/vite/dist/node/index.js";
import { crx } from "file:///Users/mateo/Desktop/astro-pm-extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "OpenAI Integration Extension",
  description: "",
  options_ui: {
    page: "src/pages/options/index.html"
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: {
      "32": "icon-32.png"
    }
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html"
  },
  icons: {
    "128": "icon-128.png"
  },
  permissions: ["activeTab", "scripting", "storage"],
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.tsx"],
      css: ["contentStyle.css"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["contentStyle.css", "icon-128.png", "icon-32.png"],
      matches: []
    }
  ]
};

// manifest.dev.json
var manifest_dev_default = {
  action: {
    default_icon: "public/dev-icon-32.png",
    default_popup: "src/pages/popup/index.html"
  },
  icons: {
    "128": "public/dev-icon-128.png"
  },
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "dev-icon-128.png",
        "dev-icon-32.png"
      ],
      matches: []
    }
  ]
};

// package.json
var package_default = {
  name: "vite-web-extension",
  version: "1.2.0",
  description: "A simple chrome extension template with Vite, React, TypeScript and Tailwind CSS.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/JohnBra/web-extension.git"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon"
  },
  type: "module",
  dependencies: {
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "webextension-polyfill": "^0.11.0"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.23",
    "@types/chrome": "^0.0.268",
    "@types/node": "^20.12.11",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@types/webextension-polyfill": "^0.10.7",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    "@vitejs/plugin-react": "^4.2.1",
    autoprefixer: "^10.4.19",
    eslint: "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "fs-extra": "^11.2.0",
    nodemon: "^3.1.0",
    postcss: "^8.4.38",
    tailwindcss: "^3.4.3",
    "ts-node": "^10.9.2",
    typescript: "^5.4.5",
    vite: "^5.2.11"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/mateo/Desktop/astro-pm-extension";
var root = resolve(__vite_injected_original_dirname, "src");
var pagesDir = resolve(root, "pages");
var assetsDir = resolve(root, "assets");
var outDir = resolve(__vite_injected_original_dirname, "dist");
var publicDir = resolve(__vite_injected_original_dirname, "public");
var isDev = process.env.__DEV__ === "true";
var extensionManifest = {
  ...manifest_default,
  ...isDev ? manifest_dev_default : {},
  name: isDev ? `DEV: ${manifest_default.name}` : manifest_default.name,
  version: package_default.version
};
function stripDevIcons(apply) {
  if (apply)
    return null;
  return {
    name: "strip-dev-icons",
    resolveId(source) {
      return source === "virtual-module" ? source : null;
    },
    renderStart(outputOptions, inputOptions) {
      const outDir2 = outputOptions.dir;
      fs.rm(resolve(outDir2, "dev-icon-32.png"), () => console.log(`Deleted dev-icon-32.png frm prod build`));
      fs.rm(resolve(outDir2, "dev-icon-128.png"), () => console.log(`Deleted dev-icon-128.png frm prod build`));
    }
  };
}
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    crx({
      manifest: extensionManifest,
      contentScripts: {
        injectCss: true
      }
    }),
    stripDevIcons(isDev)
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: !isDev
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWF0ZW8vRGVza3RvcC9hc3Ryby1wbS1leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYXRlby9EZXNrdG9wL2FzdHJvLXBtLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWF0ZW8vRGVza3RvcC9hc3Ryby1wbS1leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgY3J4LCBNYW5pZmVzdFYzRXhwb3J0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJztcblxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuanNvbic7XG5pbXBvcnQgZGV2TWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5kZXYuanNvbic7XG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJztcblxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyk7XG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUocm9vdCwgJ3BhZ2VzJyk7XG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsICdhc3NldHMnKTtcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpO1xuY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKTtcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSAndHJ1ZSc7XG5cbmNvbnN0IGV4dGVuc2lvbk1hbmlmZXN0ID0ge1xuICAuLi5tYW5pZmVzdCxcbiAgLi4uKGlzRGV2ID8gZGV2TWFuaWZlc3QgOiB7fSBhcyBNYW5pZmVzdFYzRXhwb3J0KSxcbiAgbmFtZTogaXNEZXYgPyBgREVWOiAkeyBtYW5pZmVzdC5uYW1lIH1gIDogbWFuaWZlc3QubmFtZSxcbiAgdmVyc2lvbjogcGtnLnZlcnNpb24sXG59O1xuXG4vLyBwbHVnaW4gdG8gcmVtb3ZlIGRldiBpY29ucyBmcm9tIHByb2QgYnVpbGRcbmZ1bmN0aW9uIHN0cmlwRGV2SWNvbnMgKGFwcGx5OiBib29sZWFuKSB7XG4gIGlmIChhcHBseSkgcmV0dXJuIG51bGxcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdzdHJpcC1kZXYtaWNvbnMnLFxuICAgIHJlc29sdmVJZCAoc291cmNlOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzb3VyY2UgPT09ICd2aXJ0dWFsLW1vZHVsZScgPyBzb3VyY2UgOiBudWxsXG4gICAgfSxcbiAgICByZW5kZXJTdGFydCAob3V0cHV0T3B0aW9uczogYW55LCBpbnB1dE9wdGlvbnM6IGFueSkge1xuICAgICAgY29uc3Qgb3V0RGlyID0gb3V0cHV0T3B0aW9ucy5kaXJcbiAgICAgIGZzLnJtKHJlc29sdmUob3V0RGlyLCAnZGV2LWljb24tMzIucG5nJyksICgpID0+IGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTMyLnBuZyBmcm0gcHJvZCBidWlsZGApKVxuICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsICdkZXYtaWNvbi0xMjgucG5nJyksICgpID0+IGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTEyOC5wbmcgZnJtIHByb2QgYnVpbGRgKSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQHNyYyc6IHJvb3QsXG4gICAgICAnQGFzc2V0cyc6IGFzc2V0c0RpcixcbiAgICAgICdAcGFnZXMnOiBwYWdlc0RpcixcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjcngoe1xuICAgICAgbWFuaWZlc3Q6IGV4dGVuc2lvbk1hbmlmZXN0IGFzIE1hbmlmZXN0VjNFeHBvcnQsXG4gICAgICBjb250ZW50U2NyaXB0czoge1xuICAgICAgICBpbmplY3RDc3M6IHRydWUsXG4gICAgICB9XG4gICAgfSksXG4gICAgc3RyaXBEZXZJY29ucyhpc0RldilcbiAgXSxcbiAgcHVibGljRGlyLFxuICBidWlsZDoge1xuICAgIG91dERpcixcbiAgICBzb3VyY2VtYXA6IGlzRGV2LFxuICAgIGVtcHR5T3V0RGlyOiAhaXNEZXZcbiAgfSxcbn0pO1xuIiwgIntcbiAgXCJtYW5pZmVzdF92ZXJzaW9uXCI6IDMsXG4gIFwibmFtZVwiOiBcIk9wZW5BSSBJbnRlZ3JhdGlvbiBFeHRlbnNpb25cIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIlwiLFxuICBcIm9wdGlvbnNfdWlcIjoge1xuICAgIFwicGFnZVwiOiBcInNyYy9wYWdlcy9vcHRpb25zL2luZGV4Lmh0bWxcIlxuICB9LFxuICBcImJhY2tncm91bmRcIjoge1xuICAgIFwic2VydmljZV93b3JrZXJcIjogXCJzcmMvcGFnZXMvYmFja2dyb3VuZC9pbmRleC50c1wiLFxuICAgIFwidHlwZVwiOiBcIm1vZHVsZVwiXG4gIH0sXG4gIFwiYWN0aW9uXCI6IHtcbiAgICBcImRlZmF1bHRfcG9wdXBcIjogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiLFxuICAgIFwiZGVmYXVsdF9pY29uXCI6IHtcbiAgICAgIFwiMzJcIjogXCJpY29uLTMyLnBuZ1wiXG4gICAgfVxuICB9LFxuICBcImNocm9tZV91cmxfb3ZlcnJpZGVzXCI6IHtcbiAgICBcIm5ld3RhYlwiOiBcInNyYy9wYWdlcy9uZXd0YWIvaW5kZXguaHRtbFwiXG4gIH0sXG4gIFwiaWNvbnNcIjoge1xuICAgIFwiMTI4XCI6IFwiaWNvbi0xMjgucG5nXCJcbiAgfSxcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXCJhY3RpdmVUYWJcIiwgXCJzY3JpcHRpbmdcIiwgXCJzdG9yYWdlXCJdLFxuICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAge1xuICAgICAgXCJtYXRjaGVzXCI6IFtcImh0dHA6Ly8qLypcIiwgXCJodHRwczovLyovKlwiLCBcIjxhbGxfdXJscz5cIl0sXG4gICAgICBcImpzXCI6IFtcInNyYy9wYWdlcy9jb250ZW50L2luZGV4LnRzeFwiXSxcbiAgICAgIFwiY3NzXCI6IFtcImNvbnRlbnRTdHlsZS5jc3NcIl1cbiAgICB9XG4gIF0sXG4gIFwiZGV2dG9vbHNfcGFnZVwiOiBcInNyYy9wYWdlcy9kZXZ0b29scy9pbmRleC5odG1sXCIsXG4gIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcbiAgICB7XG4gICAgICBcInJlc291cmNlc1wiOiBbXCJjb250ZW50U3R5bGUuY3NzXCIsIFwiaWNvbi0xMjgucG5nXCIsIFwiaWNvbi0zMi5wbmdcIl0sXG4gICAgICBcIm1hdGNoZXNcIjogW11cbiAgICB9XG4gIF1cbn1cbiIsICJ7XG4gIFwiYWN0aW9uXCI6IHtcbiAgICBcImRlZmF1bHRfaWNvblwiOiBcInB1YmxpYy9kZXYtaWNvbi0zMi5wbmdcIixcbiAgICBcImRlZmF1bHRfcG9wdXBcIjogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiXG4gIH0sXG4gIFwiaWNvbnNcIjoge1xuICAgIFwiMTI4XCI6IFwicHVibGljL2Rldi1pY29uLTEyOC5wbmdcIlxuICB9LFxuICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXG4gICAge1xuICAgICAgXCJyZXNvdXJjZXNcIjogW1xuICAgICAgICBcImNvbnRlbnRTdHlsZS5jc3NcIixcbiAgICAgICAgXCJkZXYtaWNvbi0xMjgucG5nXCIsXG4gICAgICAgIFwiZGV2LWljb24tMzIucG5nXCJcbiAgICAgIF0sXG4gICAgICBcIm1hdGNoZXNcIjogW11cbiAgICB9XG4gIF1cbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcInZpdGUtd2ViLWV4dGVuc2lvblwiLFxuICBcInZlcnNpb25cIjogXCIxLjIuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBzaW1wbGUgY2hyb21lIGV4dGVuc2lvbiB0ZW1wbGF0ZSB3aXRoIFZpdGUsIFJlYWN0LCBUeXBlU2NyaXB0IGFuZCBUYWlsd2luZCBDU1MuXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0pvaG5CcmEvd2ViLWV4dGVuc2lvbi5naXRcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJkZXZcIjogXCJub2RlbW9uXCJcbiAgfSxcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInJlYWN0XCI6IFwiXjE4LjMuMVwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjMuMVwiLFxuICAgIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTEuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIl4yLjAuMC1iZXRhLjIzXCIsXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yNjhcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjEyLjExXCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMy4xXCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjMuMFwiLFxuICAgIFwiQHR5cGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEwLjdcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjcuOC4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuOC4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOiBcIl40LjIuMVwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTlcIixcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcbiAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOS4xLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4taW1wb3J0XCI6IFwiXjIuMjkuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1qc3gtYTExeVwiOiBcIl42LjguMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdFwiOiBcIl43LjM0LjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNC42LjJcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjIuMFwiLFxuICAgIFwibm9kZW1vblwiOiBcIl4zLjEuMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzhcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4zXCIsXG4gICAgXCJ0cy1ub2RlXCI6IFwiXjEwLjkuMlwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjQuNVwiLFxuICAgIFwidml0ZVwiOiBcIl41LjIuMTFcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVTLE9BQU8sV0FBVztBQUN6VCxTQUFTLGVBQWU7QUFDeEIsT0FBTyxRQUFRO0FBQ2YsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxXQUE2Qjs7O0FDSnRDO0FBQUEsRUFDRSxrQkFBb0I7QUFBQSxFQUNwQixNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixZQUFjO0FBQUEsSUFDWixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsWUFBYztBQUFBLElBQ1osZ0JBQWtCO0FBQUEsSUFDbEIsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFFBQVU7QUFBQSxJQUNSLGVBQWlCO0FBQUEsSUFDakIsY0FBZ0I7QUFBQSxNQUNkLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0Esc0JBQXdCO0FBQUEsSUFDdEIsUUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxhQUFlLENBQUMsYUFBYSxhQUFhLFNBQVM7QUFBQSxFQUNuRCxpQkFBbUI7QUFBQSxJQUNqQjtBQUFBLE1BQ0UsU0FBVyxDQUFDLGNBQWMsZUFBZSxZQUFZO0FBQUEsTUFDckQsSUFBTSxDQUFDLDZCQUE2QjtBQUFBLE1BQ3BDLEtBQU8sQ0FBQyxrQkFBa0I7QUFBQSxJQUM1QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWlCO0FBQUEsRUFDakIsMEJBQTRCO0FBQUEsSUFDMUI7QUFBQSxNQUNFLFdBQWEsQ0FBQyxvQkFBb0IsZ0JBQWdCLGFBQWE7QUFBQSxNQUMvRCxTQUFXLENBQUM7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUNGOzs7QUN0Q0E7QUFBQSxFQUNFLFFBQVU7QUFBQSxJQUNSLGNBQWdCO0FBQUEsSUFDaEIsZUFBaUI7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsT0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLDBCQUE0QjtBQUFBLElBQzFCO0FBQUEsTUFDRSxXQUFhO0FBQUEsUUFDWDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBVyxDQUFDO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDRjs7O0FDbEJBO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxZQUFjO0FBQUEsSUFDWixNQUFRO0FBQUEsSUFDUixLQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1QsT0FBUztBQUFBLElBQ1QsS0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLE1BQVE7QUFBQSxFQUNSLGNBQWdCO0FBQUEsSUFDZCxPQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYix5QkFBeUI7QUFBQSxFQUMzQjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIsc0JBQXNCO0FBQUEsSUFDdEIsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsZ0NBQWdDO0FBQUEsSUFDaEMsb0NBQW9DO0FBQUEsSUFDcEMsNkJBQTZCO0FBQUEsSUFDN0Isd0JBQXdCO0FBQUEsSUFDeEIsY0FBZ0I7QUFBQSxJQUNoQixRQUFVO0FBQUEsSUFDViwwQkFBMEI7QUFBQSxJQUMxQix3QkFBd0I7QUFBQSxJQUN4QiwwQkFBMEI7QUFBQSxJQUMxQix1QkFBdUI7QUFBQSxJQUN2Qiw2QkFBNkI7QUFBQSxJQUM3QixZQUFZO0FBQUEsSUFDWixTQUFXO0FBQUEsSUFDWCxTQUFXO0FBQUEsSUFDWCxhQUFlO0FBQUEsSUFDZixXQUFXO0FBQUEsSUFDWCxZQUFjO0FBQUEsSUFDZCxNQUFRO0FBQUEsRUFDVjtBQUNGOzs7QUg1Q0EsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTSxPQUFPLFFBQVEsa0NBQVcsS0FBSztBQUNyQyxJQUFNLFdBQVcsUUFBUSxNQUFNLE9BQU87QUFDdEMsSUFBTSxZQUFZLFFBQVEsTUFBTSxRQUFRO0FBQ3hDLElBQU0sU0FBUyxRQUFRLGtDQUFXLE1BQU07QUFDeEMsSUFBTSxZQUFZLFFBQVEsa0NBQVcsUUFBUTtBQUU3QyxJQUFNLFFBQVEsUUFBUSxJQUFJLFlBQVk7QUFFdEMsSUFBTSxvQkFBb0I7QUFBQSxFQUN4QixHQUFHO0FBQUEsRUFDSCxHQUFJLFFBQVEsdUJBQWMsQ0FBQztBQUFBLEVBQzNCLE1BQU0sUUFBUSxRQUFTLGlCQUFTLElBQUssS0FBSyxpQkFBUztBQUFBLEVBQ25ELFNBQVMsZ0JBQUk7QUFDZjtBQUdBLFNBQVMsY0FBZSxPQUFnQjtBQUN0QyxNQUFJO0FBQU8sV0FBTztBQUVsQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixVQUFXLFFBQWdCO0FBQ3pCLGFBQU8sV0FBVyxtQkFBbUIsU0FBUztBQUFBLElBQ2hEO0FBQUEsSUFDQSxZQUFhLGVBQW9CLGNBQW1CO0FBQ2xELFlBQU1BLFVBQVMsY0FBYztBQUM3QixTQUFHLEdBQUcsUUFBUUEsU0FBUSxpQkFBaUIsR0FBRyxNQUFNLFFBQVEsSUFBSSx3Q0FBd0MsQ0FBQztBQUNyRyxTQUFHLEdBQUcsUUFBUUEsU0FBUSxrQkFBa0IsR0FBRyxNQUFNLFFBQVEsSUFBSSx5Q0FBeUMsQ0FBQztBQUFBLElBQ3pHO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixVQUFVO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxRQUNkLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxjQUFjLEtBQUs7QUFBQSxFQUNyQjtBQUFBLEVBQ0E7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxhQUFhLENBQUM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbIm91dERpciJdCn0K
