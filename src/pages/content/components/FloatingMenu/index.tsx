
import React from "react";
import { FloatingMenuTypes } from "./types";
import { ESCAPE_KEY } from "./constants";
import { Screen } from "./styled";
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
      <Screen onClick={onClose} />
    </React.Fragment>
  )
}


export default FloatingMenu
