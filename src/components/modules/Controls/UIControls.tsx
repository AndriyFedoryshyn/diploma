'use client';

import { FC, useEffect, useRef } from 'react';

import { Div, Button, UIControlsFontSize, UIControlsThemes } from '@/index';

import VisibilityIcon from '@mui/icons-material/Visibility';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CloseIcon from '@mui/icons-material/Close';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useScreenResize } from '@/hooks/useScreenResize';
import { useUIControls } from '@/context/FontSizeContext/FontSizeContext';

import {
  colorsLabels,
  labels,
  uiControlsClassNames,
} from '@/static/uiControls';

import { toggleSpeech } from '@/store/slices/SpeechSynthesisSlice';
import { initializeTheme, setTheme } from '@/store/slices/ThemeSlice';

import { HeaderUIControlsPropsT } from '@/interfaces/UIControls';

import styles from './UIControls.module.scss';
import { resetSpecialTheme } from '@/store/slices/SpecialThemeSlice';

export const UIControls: FC<HeaderUIControlsPropsT> = ({
  isVisibleControls,
  handleCloseControls,
}) => {
  const { fontSize, setFontSize } = useUIControls();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const appDispatch = useAppDispatch();
  const { speakText } = useSpeechSynthesis();
  const { isResize } = useScreenResize(1024);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisibleControls) {
      panelRef.current?.focus();
    }
  }, [isVisibleControls]);

  useEffect(() => {
    const storedSpeechState = localStorage.getItem('isSpeechEnabled');
    if (storedSpeechState !== null) {
      const isEnabled = JSON.parse(storedSpeechState);
      if (isEnabled !== isSpeechEnabled) {
        appDispatch(toggleSpeech());
      }
    }
  }, [appDispatch, isSpeechEnabled]);

  useEffect(() => {
    const storedFontSize = localStorage.getItem('fontSize');
    if (storedFontSize) {
      setFontSize(storedFontSize as 'small' | 'medium' | 'large');
    }
  }, [setFontSize]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      appDispatch(initializeTheme());
    }
  }, [appDispatch]);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleVoiceReadingClick = () => {
    const newState = !isSpeechEnabled;

    appDispatch(toggleSpeech());

    localStorage.setItem('isSpeechEnabled', JSON.stringify(newState));

    speakText(
      newState
        ? 'Голосове читання сайту увімкнено.'
        : 'Голосове читання сайту вимкнено.'
    );
  };

  const handleFontSizeSelect = (index: number) => {
    const sizes = ['small', 'medium', 'large'] as const;
    const newFontSize = sizes[index];

    setFontSize(newFontSize);
    localStorage.setItem('fontSize', newFontSize);
  };

  const handleRestoreTheme = () => {
    appDispatch(setTheme('light'));
    appDispatch(resetSpecialTheme());
  };

  return isVisibleControls ? (
    <Div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="uiControlsHeading"
      aria-live="polite"
      data-testid="controlsContainer"
      className={styles['controls']}
    >
      <Div className={styles['controlsContainer']}>
        <UIControlsFontSize
          fontSize={fontSize}
          handleFontSizeSelect={handleFontSizeSelect}
          handleMouseEnter={handleMouseEnter}
          labels={labels}
          classNames={uiControlsClassNames}
        />

        <UIControlsThemes
          colorsLabels={colorsLabels}
          handleMouseEnter={handleMouseEnter}
          speakText={speakText}
          classNames={uiControlsClassNames}
        />

        <Div className={styles['controlsVisibleBlock']}>
          <Button
            onMouseEnter={handleMouseEnter}
            onClick={handleRestoreTheme}
            tabIndex={0}
            className={styles['controlsVisibleButton']}
            aria-label="Toggle site visibility"
          >
            Звичайна версія сайту <VisibilityIcon />
          </Button>

          <Button
            title="Увімкнути голосове читання сайту"
            aria-label="Увімкнути голосове читання"
            className={styles['controlsVoiceButton']}
            type="button"
            role="button"
            onClick={handleVoiceReadingClick}
            onFocus={(e) => speakText(e.currentTarget.innerText)}
          >
            <RecordVoiceOverIcon />
          </Button>
        </Div>

        {isResize && (
          <Button
            title="Закрити панель управління"
            aria-label="Закрити панель управління"
            role="button"
            type="button"
            className={styles['close']}
            onClick={handleCloseControls}
            onFocus={(e) => speakText(e.currentTarget.title)}
          >
            <CloseIcon />
          </Button>
        )}
      </Div>
    </Div>
  ) : null;
};
