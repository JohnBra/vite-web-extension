import { createRoot } from "react-dom/client";
import './style.css'; 

// disable shadow dom if you want to affect your css styles to current page style
// more on shadow dom: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
const enableShadowDome = true;

const div = document.createElement("div");
const random = Math.random() * 10000;
div.id = "__root_container_" + random;
document.body.appendChild(div);

let rootContainer : HTMLElement | ShadowRoot = div;

if(enableShadowDome) {
  const shadow = div.attachShadow({ mode: "open" });
  rootContainer = shadow;
  import('./shadowDomStyle').then(({ ImportShadowDomStyle }) => {
    ImportShadowDomStyle(shadow);
  });
}

if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);
root.render(
  <div className="absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50">
    content script  <span className="your-class">loaded</span>
  </div>
);

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
