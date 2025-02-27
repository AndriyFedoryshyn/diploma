import { type FC } from 'react';

import { useSpeechSynthesis } from '@/shared/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useUIControls } from '@/shared/contexts/FontSizeContext/FontSizeContext';

import Link from 'next/link';

import { Div, List, Nav, UIControlsFontSize, UIControlsThemes } from '@/index';

import { nav } from '@/shared/static/nav';

import { colorsLabels, labels } from '@/shared/static/uiControls';

import { ClassNamesT } from '@/shared/types/UIControlsType';

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
      <List
        classNames={{
          list: styles['burgerMenuList'],
          listItem: styles['burgerMenuListItem'],
        }}
        renderList={nav}
        renderItem={(item) => (
          <Link href={item.href} key={item.linkId}>
            {item.label}
          </Link>
        )}
      />

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
