import { useEffect, useState } from "react";
import { Context } from "../types";

function useSelectedText(): Context {
  const [context, setContext] = useState<Context>({
    text: "",
    cursorX: 0,
    cursorY: 0,
  });

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      const text = window.getSelection()?.toString() || "";
      const target = event.target as HTMLElement;
      const isTextElement =
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.isContentEditable;

      if (text && isTextElement) {
        const cursorX = event.clientX;
        const cursorY = event.clientY;
        setContext({ text, cursorX, cursorY });
      }
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return context;
}

export default useSelectedText;
