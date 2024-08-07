import { LEFT_SPACING, TOP_SPACING } from "./constants";
import { MenuTypes } from "./types";

function Menu({ x, y, text }: MenuTypes): JSX.Element {
  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        flexDirection: "row",
        top: `${y + TOP_SPACING}px`,
        left: `${x + LEFT_SPACING}px`,
        zIndex: 99999,
        padding: "4px",
        borderRadius: "10px",
        background: "red",
        gap: "10px",
        paddingLeft: "10px",
        paddingRight: "10px"
      }}
    >
      <div>Translate</div>
      <div>English</div>
      <div>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => {
            chrome.runtime.sendMessage({ action: "openPopup" });
            setTimeout(() => {
              chrome.runtime.sendMessage({ action: "translate", msg: text });
            }, 100);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Menu
