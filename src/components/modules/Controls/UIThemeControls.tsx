'use client';

import { FC, useCallback, useMemo } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';

import { setTheme } from '../../../store/slices/ThemeSlice';

import { Button, Div } from '@/index';

import { UIThemeControlsPropsT } from '@/interfaces/UIThemeControlts';

import styles from './UIControls.module.scss';

export const UIThemeControls: FC<UIThemeControlsPropsT> = ({
  labels,
  isActive,
  classNames,
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
    <Div className={classNames.block} aria-live="polite">
      {labels.map((label, index) => (
        <Button
          key={index}
          aria-label={label.title}
          aria-pressed={selectedIndex === index}
          title={label.title}
          role="button"
          className={`${classNames.button} ${
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
