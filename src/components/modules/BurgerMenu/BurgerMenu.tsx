'use client';

import { useEffect, useRef, type FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useBodyOverflow } from '@/hooks/useBodyOverflow';

import { BurgerMenuPropsI } from '@/interfaces/BurgerMenu';

import { Div, BurgerHeader, BurgerNav } from '@/index';

import styles from './BurgerMenu.module.scss';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

export const BurgerMenu: FC<BurgerMenuPropsI> = ({
  isVisibleMenu,
  handleCloseBurgerMenu,
}) => {
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  useBodyOverflow(isVisibleMenu);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isVisibleMenu) {
      closeButtonRef.current?.focus();
    }
  }, [isVisibleMenu]);

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
            />

            <BurgerNav />
          </Div>
        </Div>
      )}
    </>
  );
};
