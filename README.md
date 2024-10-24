<div align="center">
<img src="public/icon-128.png" alt="logo"/>
<h1> Minimalist Chrome/Firefox Extension Boilerplate with<br/>React + Vite + TypeScript + TailwindCSS</h1>

<h5>
This template repository is a side product of my Chrome Extension <a target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/supatabs/icbcnjlaegndjabnjbaeihnnmidbfigk">Supatabs</a>.
<br />
If you tend to have tons of tabs open, or are a OneTab user, make sure to check it out <a target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/supatabs/icbcnjlaegndjabnjbaeihnnmidbfigk">here</a>!
</h5>

<h5>Supatabs is an example and showcase of what you can develop with this template. (anything you want, really 🚀)</h5>

</div>

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Usage](#usage)
  - [Setup](#setup) 
  - [Customization](#customization)
  - [Publish](#publish)
- [Tech Docs](#tech)
- [Credit](#credit)
- [Contributing](#contributing)


## Intro <a name="intro"></a>
This boilerplate is meant to be a minimal quick start for creating chrome/firefox extensions using React, Typescript and Tailwind CSS.

It includes all possible pages such as **new tab**, **dev panel**, **pop up**, etc., as well as corresponding manifest settings by default.
You will likely have to customize/delete some of the pages (see docs below).

You can build dist files for both Chrome and Firefox with manifest v3.

If you are looking for a React focused way to access the local storage, I also implemented a chrome local/sync storage hook. The hook works
well with this template. [Check it out here](https://gist.github.com/JohnBra/c81451ea7bc9e77f8021beb4f198ab96).

## Features <a name="features"></a>
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Github Action](https://github.com/JohnBra/vite-web-extension/actions/workflows/ci.yml) to build and zip your extension (manual trigger)

## Usage <a name="usage"></a>

### Setup <a name="setup"></a>

#### Chrome

1. Clone this repository or click "Use this template"
2. Change `name` and `description` in `manifest.json`
3. Run `yarn` or `npm i` (check your node version >= 16)
4. Run `yarn dev` or `npm run dev`
5. Load Extension in Chrome
   1. Open - Chrome browser
   2. Access - [chrome://extensions](chrome://extensions)
   3. Tick - Developer mode
   4. Find - Load unpacked extension
   5. Select - `dist` folder in this project (after dev or build)
6. If you want to build for production, run `yarn build` or `npm run build`.

#### Firefox
By default this template generates a dist for Chrome, but you can also generate a dist for Firefox
by simply changing a couple of things in the config files.

This is the complete Firefox setup from a fresh project:

1. Clone this repository or click "Use this template"
2. Change `name` and `description` in `manifest.json`
3. Change the `browser` target in `vite.config.ts` to `'firefox'`
4. Remove `service_worker` and `type` prop in `background` object of `manifest.json` and replace with `"scripts": [ "service-worker-loader.js" ]`
5. Run `yarn` or `npm i` (check your node version >= 16)
6. Run `yarn dev` or `npm run dev` (_Firefox does not support hot reloading_)
7. Load Extension in Firefox
   1. Open - Firefox browser
   2. Access - [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
   4. Click - Load temporary Add-on
   5. Select - any file in `dist` folder (i.e. `manifest.json`) in this project (after dev or build)
8. If you want to build for production, run `yarn build` or `npm run build`.

### Customization <a name="customization"></a>
The template includes **all** of the extension pages (i.e. New Tab, Dev Panel, Popup, etc.). You will likely have to customize it to fit your needs.

E.g. you don't want the newtab page to activate whenever you open a new tab:
1. remove the directory `newtab` and its contents in `src/pages`
2. remove `chrome_url_overrides: { newtab: 'src/pages/newtab/index.html' },` in `manifest.json`

If you need to declare extra HTML pages beyond those the manifest accommodates, place them in the Vite config under build.rollupOptions.input.

CSS files in the `src/pages/*` directories are not necessary. They are left in there in case you want 
to use it in combination with Tailwind CSS. **Feel free to delete them**.

Tailwind can be configured as usual in the `tailwind.config.cjs` file. See doc link below.

### Publish your extension <a name="publish"></a>
To upload an extension to the Chrome store you have to pack (zip) it and then upload it to your item 
in the Chrome Web Store.

This repo includes a Github Action Workflow to create a 
[optimized prod build and create the zip file](https://github.com/JohnBra/vite-web-extension/actions/workflows/ci.yml).

To run the workflow do the following:
1. Go to the **"Actions"** tab in your forked repository from this template
2. In the left sidebar click on **"Build and Zip Extension"**
3. Click on **"Run Workflow"** and select the main branch, then **"Run Workflow"**
4. Refresh the page and click the most recent run
5. In the summary page **"Artifacts"** section click on the generated **"vite-web-extension"**
6. Upload this file to the Chrome Web Store as described [here](https://developer.chrome.com/docs/webstore/publish/)

# Tech Docs <a name="tech"></a>
- [Vite](https://vitejs.dev/)
- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [Chrome Extension with manifest 3](https://developer.chrome.com/docs/extensions/mv3/)
- [Rollup](https://rollupjs.org/guide/en/)
- [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin)
- [Tailwind CSS](https://tailwindcss.com/docs/configuration)

# Credit <a name="credit"></a>
Heavily inspired by [Jonghakseo's vite chrome extension boilerplate](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite). 
It uses SASS instead of TailwindCSS and is slightly less minimalist in case you want to check it out.

# Contributing <a name="contributing"></a>
Feel free to open PRs or raise issues!
