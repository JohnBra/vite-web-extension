import { QUESTION_MODE, SPELLING_MODE, TRANSLATE_MODE, WRITE_MODE } from '../components/MenuOptions/constants';
import { completionService } from '../services/gtpService';
import { useState } from 'react';
import { ChatContextType, ModeMapType } from './types';
import { WRITE_PROMT } from '../promts/write';
import { TRANSLATE_PROMT } from '../promts/translate';
import { GRAMMAR_PROMT } from '../promts/grammar';
import { QUESTION_PROMT } from '../promts/question';

const MODE_MAP_PROMNT: ModeMapType = {
  [TRANSLATE_MODE]: TRANSLATE_PROMT,
  [WRITE_MODE]: WRITE_PROMT,
  [SPELLING_MODE]: GRAMMAR_PROMT,
  [QUESTION_MODE]: QUESTION_PROMT
}

function useGptCompletions() {
  const [is_error, setIsError] = useState(false)
  const [is_loading, setIsLoading] = useState(false)
  const [context, setContext] = useState<ChatContextType[]>([])

  const send = (text: string, mode: string) => {
    setContext((ctx) => {
      const NEW_CONTEXT = [...ctx, { role: "user", content: text }]
      const PROMT = MODE_MAP_PROMNT[mode]

      setIsLoading(() => true)
      completionService(NEW_CONTEXT, PROMT)
        .then(res => res.json())
        .then(res => {
          setContext((e) => [...e, {
            role: res["choices"][0]["message"]["role"],
            content: res["choices"][0]["message"]["content"]
          }])
        })
        .catch(() => { setIsError(() => true) })
        .finally(() => { setIsLoading(() => false) })

      return NEW_CONTEXT
    })
  }
  return { is_error, is_loading, send, context }
};

export default useGptCompletions;
