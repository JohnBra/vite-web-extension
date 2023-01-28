import Browser from 'webextension-polyfill';

Browser
  .devtools
  .panels
  .create('Dev Tools', 'icon-34.png', 'src/pages/panel/index.html')
  .catch(console.error);
