'use client';

import React, { Fragment, type FC } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useScreenResize } from '@/hooks/useScreenResize';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

import {
  Div,
  HeaderLogo,
  HeaderLocation,
  UIControls,
  ControlButton,
  HeaderElement,
  BurgerMenu,
  Nav,
  BurgerButton,
  HeaderPopup,
} from '@/index';

import {
  toggleControlPanel,
  toggleMenu,
} from '@/store/slices/visibleControlsSlice';

import styles from './GroupHeader.module.scss';

export const GroupHeader: FC = () => {
  const dispatch = useAppDispatch();
  const { isResize } = useScreenResize(1024);

  const { isVisibleControls, isVisibleMenu } = useAppSelector(
    (state) => state.visibleControls
  );
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  const handleCloseControls = () => {
    dispatch(toggleControlPanel());
  };

  const handleCloseBurger = () => {
    dispatch(toggleMenu());
  };

  return (
    <HeaderElement className={styles['groupHeader']}>
      <Nav className={styles['groupHeaderContainer']}>
        <UIControls
          isVisibleControls={isVisibleControls}
          handleCloseControls={handleCloseControls}
        />
        <HeaderLogo />
        <Div className={styles['groupHeaderControls']}>
          {!isResize && (
            <Fragment>
              <ControlButton
                handleCloseControls={handleCloseControls}
                handleFocus={handleFocus}
              />
              <HeaderPopup />
              <HeaderLocation handleFocus={handleFocus} />
            </Fragment>
          )}

          <BurgerButton />

          <BurgerMenu
            isVisibleMenu={isVisibleMenu}
            handleCloseBurgerMenu={handleCloseBurger}
          />
        </Div>
      </Nav>
    </HeaderElement>
  );
};
