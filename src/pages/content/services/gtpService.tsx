import { SETTINGS } from "@src/settings";
import { TRANSLATE_PROMT } from "../promts/translate";


export function completionService(text: string) {
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
          "content": TRANSLATE_PROMT
        },
        {
          "role": "user",
          "content": text
        }
      ]
    })
  })
}
