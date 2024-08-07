import { LEFT_SPACING, TOP_SPACING } from "./constants";
import { MenuTypes } from "./types";
import { useState } from "react";
import { Container } from "./styled";
import MenuOptions from "../MenuOptions";


function Menu({ x, y, text }: MenuTypes): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<String | null>(null)
  return (
    <Container
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        top: `${y + TOP_SPACING}px`,
        left: `${x + LEFT_SPACING}px`,
      }}
    >
      <MenuOptions onSelect={(option) => { setSelectedOption(() => option) }} />
      <div>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (selectedOption) {
              chrome.runtime.sendMessage({ action: "openPopup" });
              setTimeout(() => {
                chrome.runtime.sendMessage({
                  action: "translate", context: {
                    text: text,
                    mode: selectedOption
                  }
                });
              }, 90);
            }
          }}
        >
          Submit
        </button>
      </div>
    </Container>
  )
}

export default Menu
