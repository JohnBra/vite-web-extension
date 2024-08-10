import { useEffect, useState } from 'react';
import { SelectedTextInfo } from '../types';


const useSelectedText = (): SelectedTextInfo => {
  const [selectedTextInfo, setSelectedTextInfo] = useState({
    text: '',
    cursorX: 0,
    cursorY: 0,
  });

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      event.preventDefault();
      const text = window.getSelection()?.toString() || '';
      const target = event.target as HTMLElement;

      const isTextElement =
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.isContentEditable;

      if (text && isTextElement) {
        const cursorX = event.clientX;
        const cursorY = event.clientY;
        setSelectedTextInfo({ text, cursorX, cursorY });
        console.log(`Texto: ${text}, CursorX: ${cursorX}, CursorY: ${cursorY}`); // Puedes quitar esto si no lo necesitas
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return selectedTextInfo;
};

export default useSelectedText;
