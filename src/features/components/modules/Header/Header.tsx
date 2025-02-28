'use client';

import { useEffect, type FC } from 'react';

import { useSpeechSynthesis } from '@/shared/hooks/useSpeechSynthesis ';
import { useScreenResize } from '@/shared/hooks/useScreenResize';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

import {
  HeaderForm,
  Div,
  HeaderLogo,
  BurgerMenu,
  HeaderLocation,
  HeaderElement,
  ControlButton,
  BurgerButton,
  Nav,
} from '@/index';

import { UIControls } from '../Controls/UIControls';

import {
  setMenuVisibility,
  toggleControlPanel,
  toggleMenu,
} from '@/shared/store/slices/visibleControlsSlice';

import { HeaderProps } from '@/shared/interfaces/Header';

import styles from './Header.module.scss';

export const Header: FC<HeaderProps> = ({ onSearch, settlements }) => {
  const dispatch = useAppDispatch();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const { isVisibleControls, isVisibleMenu } = useAppSelector(
    (state) => state.visibleControls
  );

  const { isResize } = useScreenResize(1024);
  const { speakText } = useSpeechSynthesis();

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleImageMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const altText = (event.target as HTMLImageElement).alt.trim();
      speakText(altText);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  useEffect(() => {
    const savedState = localStorage.getItem('burgerMenu');
    if (savedState !== null) {
      dispatch(setMenuVisibility(JSON.parse(savedState)));
    }
  }, [dispatch]);

  const handleCloseControls = () => {
    dispatch(toggleControlPanel());
  };

  return (
    <HeaderElement className={styles['header']} role="banner">
      <Div className={styles['headerContainer']}>
        <Nav className={styles['headerContainerRow']}>
          <HeaderLogo />
          {!isResize && (
            <Div className={styles['headerLocationThemeBlock']}>
              <ControlButton
                handleCloseControls={handleCloseControls}
                handleMouseEnter={handleMouseEnter}
                tabIndex={0}
              />
              <HeaderLocation
                handleMouseEnter={handleMouseEnter}
                handleImageMouseEnter={handleImageMouseEnter}
                handleFocus={handleFocus}
                tabIndex={0}
              />
            </Div>
          )}
        </Nav>

        <UIControls
          isVisibleControls={isVisibleControls}
          handleCloseControls={handleCloseControls}
        />

        <BurgerButton />
      </Div>

      <BurgerMenu
        isVisibleMenu={isVisibleMenu}
        handleCloseBurgerMenu={() => dispatch(toggleMenu())}
      />

      <Div className={styles['headerMainHeadingContainer']}>
        <h1
          className={styles['headerMainHeading']}
          aria-live="polite"
          tabIndex={0}
          onMouseEnter={handleMouseEnter}
          onFocus={handleFocus}
        >
          Графік відключення електроенергії у Львівській області
        </h1>

        <HeaderForm onSearch={onSearch} settlements={settlements} />
      </Div>
    </HeaderElement>
  );
};
