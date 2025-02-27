'use client';

import { useEffect, useRef, type FC } from 'react';

import Link from 'next/link';

import { useSpeechSynthesis } from '@/shared/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useBodyOverflow } from '@/shared/hooks/useBodyOverflow';
import { useUIControls } from '@/shared/contexts/FontSizeContext/FontSizeContext';

import {
  Div,
  HeaderLogo,
  Button,
  HeaderLocation,
  List,
  Nav,
  UIControlsFontSize,
  UIControlsThemes,
} from '@/index';

import CloseIcon from '@mui/icons-material/Close';

import { nav } from '@/shared/static/nav';

import { ClassNamesT } from '@/shared/types/UIControlsType';
import { colorsLabels, labels } from '@/shared/static/uiControls';

import styles from './BurgerMenu.module.scss';

interface BurgerMenuPropsI {
  isVisibleMenu: boolean;
  handleCloseBurgerMenu: () => void;
}

const uiControlsClassNames: ClassNamesT = {
  block: styles['burgerUiControlsBlock'],
  heading: styles['burgerUiControlsHeading'],
  buttonsBlock: styles['burgerUiControlsButtonsBlock'],
  button: styles['controlsButton'],
  activeButton: styles['active'],
};

export const BurgerMenu: FC<BurgerMenuPropsI> = ({
  isVisibleMenu,
  handleCloseBurgerMenu,
}) => {
  const { fontSize, setFontSize } = useUIControls();
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  useBodyOverflow(isVisibleMenu);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isVisibleMenu) {
      closeButtonRef.current?.focus();
    }
  }, [isVisibleMenu]);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleMouseEnterTitle = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = event.currentTarget.getAttribute('aria-label') || '';
      if (text) {
        speakText(text);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseBurgerMenu();
    }
    if (event.key === 'Tab') {
      const focusableElements = document
        .querySelector(`.${styles['burger']}`)
        ?.querySelectorAll(
          'button, a, input, select, textarea'
        ) as NodeListOf<HTMLElement>;

      if (focusableElements?.length) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleFontSizeSelect = (index: number) => {
    const sizes = ['small', 'medium', 'large'] as const;
    const newFontSize = sizes[index];

    setFontSize(newFontSize);
    localStorage.setItem('fontSize', newFontSize);
  };

  return (
    <>
      {isVisibleMenu && (
        <Div
          role="dialog"
          aria-labelledby="burgerMenuTitle"
          aria-modal="true"
          className={styles['burger']}
          aria-hidden={!isVisibleMenu}
          onKeyDown={handleKeyDown}
        >
          <Div className={styles['burgerContainer']}>
            <Div className={styles['burgerNav']}>
              <HeaderLogo />
              <Div className={styles['burgerRightBlock']}>
                <HeaderLocation
                  handleFocus={handleFocus}
                  handleMouseEnter={handleMouseEnter}
                />
                <Button
                  ariaLabel="Закрити Меню"
                  title="Закрити Меню"
                  role="button"
                  type="button"
                  className={styles['burgerCloseButton']}
                  onClick={handleCloseBurgerMenu}
                  onMouseEnter={handleMouseEnterTitle}
                  ref={closeButtonRef}
                >
                  <CloseIcon fontSize="large" />
                </Button>
              </Div>
            </Div>

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
          </Div>
        </Div>
      )}
    </>
  );
};
