<div align="center">
<img src="public/icon-128.png" alt="logo"/>
<h1> Chrome Extension Boilerplate with<br/>React + Vite + TypeScript + TailwindCSS</h1>

<h5>
This is a side product of my Chrome Extension <a target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/supatabs/icbcnjlaegndjabnjbaeihnnmidbfigk">Supatabs</a>.
Supatabs is a 🔥🔥 BLAZINGLY FAST 🔥🔥 free alternative to OneTab with support for chrome tab groups and searching through tabs.
</h5>

<h5>
If you tend to have thousands of tabs open, are a OneTab user, or use any other tab manager 
make sure to check it out <a target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/supatabs/icbcnjlaegndjabnjbaeihnnmidbfigk">here</a>!
</h5>

</div>

## Table of Contents

- [Intro](#intro)
- [Why another boilerplate?](#why)
- [Features](#features)
- [Usage](#usage)
  - [Setup](#setup) 
- [Tech Docs](#tech)
- [Credit](#credit)
- [Contributing](#contributing)


## Intro <a name="intro"></a>
This boilerplate is meant to be a minimal quick start for creating chrome extensions using React, Typescript and Tailwind CSS.

Built for:
> For improved DX and rapid building vite and nodemon are used.

> Chrome does not accept manifest v2 extensions since Jan 2022, therefore this template uses manifest v3.

> Firefox + other browsers don't yet support manifest v3, so cross browser usage is not encouraged.

* Read more about Chrome manifest v2 support [here](https://developer.chrome.com/docs/extensions/mv2/).
* Read more about Firefox Manifest v3 support [here](https://discourse.mozilla.org/t/manifest-v3/94564).

As soon as Firefox supports manifest v3, support will be added in this repo as well.

Oh by the way ... I also implemented a chrome local/sync storage hook for react, which works well with this 
template. [Check it out here](https://gist.github.com/JohnBra/c81451ea7bc9e77f8021beb4f198ab96).

## Why another boilerplate? <a name="why"></a>
I have used webpack react boilerplates and found it too hard to configure.

Vite is mega easy to understand which makes it easier to get into and to maintain for others.

I couldn't find another minimal boilerplate for React, TypeScript and Tailwind CSS. So here it is.

## Features <a name="features"></a>
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Github Action](https://github.com/JohnBra/vite-web-extension/actions/workflows/ci.yml) to build and zip your extension (manual trigger)

## Usage <a name="usage"></a>

### Setup <a name="setup"></a>
1. Clone this repository｀
2. Change `name` and `description` in `manifest.json`
3. Run `yarn` or `npm i` (check your node version >= 16)
4. Run `yarn dev` or `npm run dev`
5. Load Extension in Chrome
   1. Open - Chrome browser
   2. Access - chrome://extensions
   3. Tick - Developer mode
   4. Find - Load unpacked extension
   5. Select - `dist` folder in this project (after dev or build)
6. If you want to build in production, Just run `yarn build` or `npm run build`.

### Customization
The template includes **all** of the Chrome extension pages. You will likely have to customize it to fit your needs.

E.g. you don't want the newtab page to activate whenever you open a new tab:
1. remove the directory `newtab` and its contents in `src/pages`
2. remove `chrome_url_overrides: { newtab: 'src/pages/newtab/index.html' },` in `manifest.json`

If you need to declare extra HTML pages beyond those the manifest accommodates, place them in the Vite config under build.rollupOptions.input.

This example includes a welcome page to open when the user installs the extension.

CSS files in the `src/pages/*` directories are not necessary. They are left in there in case you want 
to use it in combination with Tailwind CSS. **Feel free to delete them**.

Tailwind can be configured as usual in the `tailwind.config.cjs` file. See doc link below.

### Publish your extension
To upload an extension to the Chrome store you have to pack (zip) it and then upload it to your item in entry 
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
It uses SASS instead of TailwindCSS if you want to check it out.

# Contributing <a name="contributing"></a>
Feel free to open PRs or raise issues!
