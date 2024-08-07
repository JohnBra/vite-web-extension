import { TRANSLATE_MODE, WRITE_MODE } from '../components/MenuOptions/constants';
import { completionService } from '../services/gtpService';
import { useEffect, useState } from 'react';
import { gptTypes, ModeMapType } from './types';
import { WRITE_PROMT } from '../promts/write';
import { TRANSLATE_PROMT } from '../promts/translate';

const MODE_MAP_PROMNT: ModeMapType = {
  [TRANSLATE_MODE]: TRANSLATE_PROMT,
  [WRITE_MODE]: WRITE_PROMT
}

function useGptCompletions({ text, mode }: gptTypes) {
  const [resText, setResText] = useState("")
  const [is_error, setIsError] = useState(false)
  const [is_loading, setIsLoading] = useState(false)

  useEffect(() => {
    if (text) {
      const PROMT = MODE_MAP_PROMNT[mode]
      setIsLoading(() => true)
      completionService(text, PROMT)
        .then(res => res.json())
        .then(res => { setResText(res["choices"][0]["message"]["content"]) })
        .catch(() => { setIsError(() => true) })
        .finally(() => { setIsLoading(() => false) })
    }
  }, [text, mode])

  return { resText, is_error, is_loading }
};

export default useGptCompletions;
