'use client';

import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useUIControls } from '@/context/FontSizeContext/FontSizeContext';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import {
  Div,
  HeaderPopup,
  Nav,
  UIControlsFontSize,
  UIControlsThemes,
} from '@/index';

import { colorsLabels, labels } from '@/static/uiControls';

import { ClassNamesT } from '@/types/UIControlsType';

import styles from './BurgerMenu.module.scss';
import { VisibleButton } from '@/components/ui/VisibleButton/VisibleButton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setTheme } from '@/store/slices/ThemeSlice';
import { resetSpecialTheme } from '@/store/slices/SpecialThemeSlice';
import { VoiceButton } from '@/components/ui/VoiceButton/VoiceButton';
import { toggleSpeech } from '@/store/slices/SpeechSynthesisSlice';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useScreenResize } from '@/hooks/useScreenResize';

const uiControlsClassNames: ClassNamesT = {
  block: styles['burgerUiControlsBlock'],
  heading: styles['burgerUiControlsHeading'],
  buttonsBlock: styles['burgerUiControlsButtonsBlock'],
  button: styles['controlsButton'],
  activeButton: styles['active'],
};

export const BurgerNav: FC = () => {
  const { fontSize, setFontSize } = useUIControls();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const { speakText } = useSpeechSynthesis();

  const { isResize } = useScreenResize(520);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  const appDispatch = useAppDispatch();

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

  return (
    <Nav className={styles['burgerMenu']}>
      <Div className={styles['burgerUiControlsContainer']}>
        <UIControlsFontSize
          fontSize={fontSize}
          handleFontSizeSelect={handleFontSizeSelect}
          handleFocus={handleFocus}
          labels={labels}
          classNames={uiControlsClassNames}
        />

        <UIControlsThemes
          colorsLabels={colorsLabels}
          classNames={uiControlsClassNames}
          handleFocus={handleFocus}
        />
        <Div className={styles['visibleContainerElements']} role="container">
          {isResize && <HeaderPopup />}
          <VisibleButton
            handleFocus={handleFocus}
            handleRestoreTheme={handleRestoreTheme}
            className={styles['controlsVisibleButton']}
          />
          <VoiceButton
            className={styles['controlsVisibleButton']}
            handleFocus={handleFocus}
            handleVoiceReadingClick={handleVoiceReadingClick}
          >
            {' '}
            Голосове читання сайту
          </VoiceButton>
        </Div>
      </Div>
    </Nav>
  );
};
