import { SETTINGS } from "@src/settings";
import { ChatContextType } from "../hooks/types";

export function completionService(context: ChatContextType[], promt: string) {
  return fetch(SETTINGS.gtp_completions_service, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SETTINGS.gtp_api_key}`
    },
    body: JSON.stringify({
      "model": "gpt-4o",
      "messages": [
        {
          "role": "system",
          "content": promt
        },
        ...context
      ]
    })
  })
}
