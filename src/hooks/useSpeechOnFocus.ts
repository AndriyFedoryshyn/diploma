'use client';

import { useCallback, useRef } from 'react';
import { useSpeechSynthesis } from './useSpeechSynthesis ';

export const useSpeechOnFocus = (isSpeechEnabled: boolean, delay = 1000) => {
  const { speakText } = useSpeechSynthesis();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleElementFocus = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const text = event.currentTarget.innerText.trim();

      if (isSpeechEnabled) {
        timeoutRef.current = setTimeout(() => {
          speakText(text);
        }, delay);
      }
    },
    [isSpeechEnabled, speakText, delay]
  );

  return handleElementFocus;
};
