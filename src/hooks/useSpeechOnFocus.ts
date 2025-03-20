import { useCallback } from 'react';
import { useSpeechSynthesis } from './useSpeechSynthesis ';

export const useSpeechOnFocus = (isSpeechEnabled: boolean) => {
  const { speakText } = useSpeechSynthesis();

  const handleElementFocus = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      const text = event.currentTarget.innerText.trim();

      if (isSpeechEnabled) {
        speakText(text);
      }
    },
    [isSpeechEnabled, speakText]
  );

  return handleElementFocus;
};
