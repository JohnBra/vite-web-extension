chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "openPopup") {
    chrome.action.openPopup(); // Abrir el popup de la extensión
  }
});
