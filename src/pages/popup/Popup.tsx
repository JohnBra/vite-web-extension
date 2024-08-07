import { useEffect, useState } from 'react';
import AIWriter from "react-aiwriter";
import useGptCompletions from '../content/hooks/useGpt';
import { Container } from './styled';


export default function Popup(): JSX.Element {
  const [text, setText] = useState("")
  const [mode, setMode] = useState("")
  const { resText, is_error, is_loading } = useGptCompletions({ text, mode })

  /** Listen all actions of the extension */
  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.action === "translate") {
        const PRONT_MODE = request.context["mode"];
        const TEXT = request.context["text"];

        setMode(() => PRONT_MODE)
        setText(() => TEXT)
      }
    });
  }, [])

  return (
    <Container>
      <h1>{mode}: "{text}"</h1>
      <AIWriter>
        {is_error && (<h1>Gpt service errror.</h1>)}
        {!is_error && is_loading && (<p>...</p>)}
        {!is_error && (<p>{resText}</p>)}
      </AIWriter>
      {/* <button onClick={() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id as any, {
            action: "yourAction",
            data: "Hello from Popup!",
          });
        });
      }}>Hello</button> */}
    </Container>
  );
}
