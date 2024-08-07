
import React from "react";
import { FloatingMenuTypes } from "./types";
import { ESCAPE_KEY } from "./constants";
import Menu from "./Menu";

function FloatingMenu({ x, y, isOpen, onClose, text }: FloatingMenuTypes) {

  /** Close the menu whith the SCAPE key */
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === ESCAPE_KEY && isOpen) {
      onClose()
    }
  });

  return isOpen && (
    <React.Fragment>
      <Menu x={x} y={y} text={text} />
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999
        }}
      />
    </React.Fragment>
  )
}


export default FloatingMenu
