import { LEFT_SPACING, TOP_SPACING } from "./constants";
import { MenuTypes } from "./types";
import { useState } from "react";
import { Container, IaButton, Icon, Label } from "./styled";
import { SLEEP_TIME_OUT, START_CHAT_ACTION } from "../../constants";
import MenuOptions from "../MenuOptions";
import IaIcon from '@assets/svg/ia.svg';

function Menu({ x, y, text }: MenuTypes): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<String | null>(null)
  return (
    <Container
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => e.preventDefault()}
      style={{
        top: `${y + TOP_SPACING}px`,
        left: `${x + LEFT_SPACING}px`,
      }}
    >
      <MenuOptions onSelect={(option) => setSelectedOption(() => option)} />
      <IaButton
        onClick={() => {
          if (selectedOption) {
            chrome.runtime.sendMessage({ action: "openPopup" });
            setTimeout(() => {
              chrome.runtime.sendMessage({
                action: START_CHAT_ACTION,
                context: {
                  text: text,
                  mode: selectedOption
                }
              });
            }, SLEEP_TIME_OUT);
          }
        }}
      >
        <Icon src={IaIcon} />
        <Label>IA</Label>
      </IaButton>
    </Container>
  )
}

export default Menu
