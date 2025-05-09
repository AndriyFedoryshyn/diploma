import { type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useUIControls } from '@/context/FontSizeContext/FontSizeContext';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import { Div, Nav, UIControlsFontSize, UIControlsThemes } from '@/index';

import { colorsLabels, labels } from '@/static/uiControls';

import { ClassNamesT } from '@/types/UIControlsType';

import styles from './BurgerMenu.module.scss';
import { VisibleButton } from '@/components/ui/VisibleButton/VisibleButton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setTheme } from '@/store/slices/ThemeSlice';
import { resetSpecialTheme } from '@/store/slices/SpecialThemeSlice';

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

        <VisibleButton
          handleFocus={handleFocus}
          handleRestoreTheme={handleRestoreTheme}
          className={styles['controlsVisibleButton']}
        />
      </Div>
    </Nav>
  );
};
