import React, { useEffect, useState } from "react"
import useSelectedText from "./hooks/useSelectedText"
import FloatingMenu from "./components/FloatingMenu"

export default function ContentApp() {
  const { text, cursorX, cursorY } = useSelectedText()
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.action === "yourAction") {
        alert("I listen my action")
      }
    });
  }, [])

  useEffect(() => {
    if (text && cursorX > 0 && cursorY > 0) {
      setTimeout(() => {
        setOpen(() => true)
      }, 100);
    }
  }, [text, cursorX, cursorY])

  return (
    <React.Fragment>
      <FloatingMenu
        isOpen={isOpen}
        text={text}
        x={cursorX}
        y={cursorY}
        onClose={() => { setOpen(() => false) }}
      />
    </React.Fragment>
  )
}
