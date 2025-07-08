import cssText from "src/pages/content/style.css?inline";

export const ImportShadowDomStyle = (shadow: ShadowRoot) => {
    const styleTag = document.createElement("style");
    styleTag.textContent = cssText;
    shadow.appendChild(styleTag);
}