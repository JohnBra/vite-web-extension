import { useEffect, useRef, useState } from 'react';
import { Container, Message, MessageList } from './styled';
import { USER_ROLE } from './constants';
import AIWriter from "react-aiwriter";
import useGptCompletions from '../content/hooks/useGpt';
import { CLOSE_MENU_ACTION, START_CHAT_ACTION } from '../content/constants';


export default function Popup(): JSX.Element {
  const chatRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<string>("")
  const { is_error, is_loading, send, context } = useGptCompletions()

  /** Listen all actions of the extension */
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id as any, {
        action: CLOSE_MENU_ACTION,
      });
    });

    chrome.runtime.onMessage.addListener((request) => {
      if (request.action === START_CHAT_ACTION) {
        const PRONT_MODE = request.context["mode"];
        const TEXT = request.context["text"];
        setMode(() => PRONT_MODE)
        send(TEXT, PRONT_MODE)
      }
    });
  }, [])

  return (
    <Container>
      {/* Messages list */}
      <MessageList>
        {context.map((message, k) => {
          return (
            <Message
              key={k}
              style={{
                justifyContent: message.role === USER_ROLE ? "flex-end" : "flex-start",
                background: message.role === USER_ROLE ? "#3D82F6" : "#F0F0F0", borderRadius: "10px",
              }}
            >
              <AIWriter>
                {message.content}
              </AIWriter>
            </Message>
          )
        })}
      </MessageList>

      <h1>{is_error && "Hay un error :("}</h1>
      <input type='text' placeholder='Escribe algo' ref={chatRef} />
      <button onClick={() => {
        if (chatRef.current && !is_loading) {
          send(chatRef.current.value, mode)
        }
      }}>{is_loading ? "Loading ..." : "Enviar"}</button>
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
