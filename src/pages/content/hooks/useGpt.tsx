import { useEffect, useState } from 'react';
import { SelectedTextInfo } from '../types';
import { completionService } from '../services/gtpService';


interface gptTypes {
  text: string;
}


function useGptCompletions({ text }: gptTypes) {
  const [resText, setResText] = useState("")

  useEffect(() => {
    if(text) {
      completionService(text)
        .then(res => res.json())
        .then(res => {
          setResText(res["choices"][0]["message"]["content"])
        })
        .catch((e) => {
          alert("Error in gtp service")
        })
    }
  }, [text])

  return {resText}
};

export default useGptCompletions;
