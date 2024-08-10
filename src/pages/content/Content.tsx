import React, { useEffect, useState } from "react"
import useSelectedText from "./hooks/useSelectedText"
import FloatingMenu from "./components/FloatingMenu"
import { CLOSE_MENU_ACTION, SLEEP_TIME_OUT } from "./constants"

export default function ContentApp(): JSX.Element {
  const { text, cursorX, cursorY } = useSelectedText()
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    window.addEventListener("keydown", () => isOpen && setOpen(false));
    chrome.runtime.onMessage.addListener((request) => {
      request.action === CLOSE_MENU_ACTION && setOpen(false);
    });
  }, [isOpen])

  useEffect(() => {
    if (text && cursorX > 0 && cursorY > 0) {
      setTimeout(() => setOpen(() => true), SLEEP_TIME_OUT);
    }
  }, [text, cursorX, cursorY])

  return (
    <React.Fragment>
      <FloatingMenu
        onClose={() => setOpen(() => false)}
        isOpen={isOpen}
        text={text}
        x={cursorX}
        y={cursorY}
      />
    </React.Fragment>
  )
}
