'use client';

import { useEffect, type FC } from 'react';

import { useScreenResize } from '@/hooks/useScreenResize';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

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
  UIControls,
  HeaderPopup,
  Section,
} from '@/index';

import {
  setMenuVisibility,
  toggleControlPanel,
  toggleMenu,
} from '@/store/slices/visibleControlsSlice';

import { HeaderProps } from '@/interfaces/Header';

import styles from './Header.module.scss';

export const Header: FC<HeaderProps> = ({ onSearch, settlements }) => {
  const dispatch = useAppDispatch();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const { isVisibleControls, isVisibleMenu } = useAppSelector(
    (state) => state.visibleControls
  );

  const { isResize } = useScreenResize(1024);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

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
                tabIndex={0}
                handleFocus={handleFocus}
              />
              <HeaderPopup />

              <HeaderLocation handleFocus={handleFocus} />
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

      <Section className={styles['headerMainHeadingContainer']}>
        <h1
          className={styles['headerMainHeading']}
          aria-live="polite"
          tabIndex={0}
          onFocus={handleFocus}
        >
          Графік відключення електроенергії у Львівській області
        </h1>

        <HeaderForm onSearch={onSearch} settlements={settlements} />
      </Section>
    </HeaderElement>
  );
};
