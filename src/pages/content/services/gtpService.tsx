import { SETTINGS } from "@src/settings";

export function completionService(text: string, promt: string) {
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
        {
          "role": "user",
          "content": text
        }
      ]
    })
  })
}
