import { useEffect, useState } from 'react';
import AIWriter from "react-aiwriter";
import useGptCompletions from '../content/hooks/useGpt';


export default function Popup(): JSX.Element {
  const [msg, setMsg] = useState("")
  const {resText} = useGptCompletions({ text: msg })

  /** Listen all actions of the extension */
  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.action === "translate") {
        setMsg(() => request.msg)
      }
    });
  }, [])

  return (
    <div>
      <h1>Traducelo al ingles: "{msg}"</h1>
      <AIWriter>
        <p>{resText}</p>
      </AIWriter>
      {/* <button onClick={() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id as any, {
            action: "yourAction",
            data: "Hello from Popup!",
          });
        });
      }}>Hello</button> */}
    </div>
  );
}
