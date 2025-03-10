import { type FC } from 'react';

import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useUIControls } from '@/context/FontSizeContext/FontSizeContext';

import { Div, Nav, UIControlsFontSize, UIControlsThemes } from '@/index';

import { colorsLabels, labels } from '@/static/uiControls';

import { ClassNamesT } from '@/types/UIControlsType';

import styles from './BurgerMenu.module.scss';

const uiControlsClassNames: ClassNamesT = {
  block: styles['burgerUiControlsBlock'],
  heading: styles['burgerUiControlsHeading'],
  buttonsBlock: styles['burgerUiControlsButtonsBlock'],
  button: styles['controlsButton'],
  activeButton: styles['active'],
};

export const BurgerNav: FC = () => {
  const { fontSize, setFontSize } = useUIControls();
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFontSizeSelect = (index: number) => {
    const sizes = ['small', 'medium', 'large'] as const;
    const newFontSize = sizes[index];

    setFontSize(newFontSize);
    localStorage.setItem('fontSize', newFontSize);
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  return (
    <Nav className={styles['burgerMenu']}>
      <Div className={styles['burgerUiControlsContainer']}>
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
      </Div>
    </Nav>
  );
};
