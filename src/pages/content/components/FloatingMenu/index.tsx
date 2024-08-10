
import React from "react";
import { FloatingMenuTypes } from "./types";
import { Screen } from "./styled";
import Menu from "./Menu";

function FloatingMenu({ x, y, isOpen, onClose, text }: FloatingMenuTypes) {
  return isOpen && (
    <React.Fragment>
      <Menu x={x} y={y} text={text} />
      <Screen onClick={onClose} />
    </React.Fragment>
  )
}


export default FloatingMenu
