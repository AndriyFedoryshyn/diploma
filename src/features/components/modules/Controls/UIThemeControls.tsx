'use client';

import { FC, useCallback, useMemo } from 'react';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useSpeechSynthesis } from '@/shared/hooks/useSpeechSynthesis ';

import { setTheme } from '../../../../shared/store/slices/ThemeSlice';

import { Button, Div } from '@/index';

import { ColorLabelI } from '@/shared/types/UIControlsType';

import styles from './UIControls.module.scss';

interface UIThemeControlsPropsT {
  labels: ColorLabelI[];
  isActive: boolean;
}

export const UIThemeControls: FC<UIThemeControlsPropsT> = ({
  labels,
  isActive,
}) => {
  const dispatch = useAppDispatch();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const { theme } = useAppSelector((state) => state.theme);
  const { speakText } = useSpeechSynthesis();

  const selectedIndex = useMemo(() => {
    return labels.findIndex((label) => label.theme === theme);
  }, [theme, labels]);

  const handleButtonClick = useCallback(
    (index: number, theme: 'light' | 'grayscale' | 'dark') => {
      dispatch(setTheme(theme));
    },
    [dispatch]
  );

  const handleSpeak = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text =
        (event.target as HTMLButtonElement).getAttribute('title')?.trim() || '';
      if (text) {
        speakText(text);
      }
    }
  };

  return (
    <Div className={styles['controlsButtonsBlock']} aria-live="polite">
      {labels.map((label, index) => (
        <Button
          key={index}
          aria-label={label.title}
          aria-pressed={selectedIndex === index}
          title={label.title}
          role="button"
          className={`${styles['controlsButton']} ${
            selectedIndex === index ? styles['active'] : ''
          }`}
          tabIndex={isActive ? 0 : -1}
          onClick={() => handleButtonClick(index, label.theme)}
          onMouseEnter={handleSpeak}
        >
          {label.label}
        </Button>
      ))}
    </Div>
  );
};
