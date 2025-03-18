import { useCallback } from 'react';
import { useSpeechSynthesis } from './useSpeechSynthesis ';

export const useSpeechOnFocus = (isSpeechEnabled: boolean) => {
  const { speakText } = useSpeechSynthesis();

  const handleElementFocus = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      if (isSpeechEnabled) {
        const text = (event.target as HTMLElement).innerText.trim();
        speakText(text);
      }
    },
    [isSpeechEnabled, speakText]
  );

  return handleElementFocus;
};
