'use client';

import { useEffect, useRef, type FC } from 'react';

import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useBodyOverflow } from '@/hooks/useBodyOverflow';

import { BurgerMenuPropsI } from '@/interfaces/BurgerMenu';

import { Div, BurgerHeader, BurgerNav } from '@/index';

import styles from './BurgerMenu.module.scss';

export const BurgerMenu: FC<BurgerMenuPropsI> = ({
  isVisibleMenu,
  handleCloseBurgerMenu,
}) => {
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
            <BurgerHeader
              closeButtonRef={closeButtonRef}
              handleCloseBurgerMenu={handleCloseBurgerMenu}
              handleFocus={handleFocus}
              handleMouseEnter={handleMouseEnter}
              handleMouseEnterTitle={handleMouseEnterTitle}
            />

            <BurgerNav />
          </Div>
        </Div>
      )}
    </>
  );
};
