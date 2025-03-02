'use client';

import React, { Fragment, type FC } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useScreenResize } from '@/hooks/useScreenResize';

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
} from '@/index';

import {
  toggleControlPanel,
  toggleMenu,
} from '@/store/slices/visibleControlsSlice';

import styles from './GroupHeader.module.scss';

export const GroupHeader: FC = () => {
  const dispatch = useAppDispatch();

  const { isVisibleControls, isVisibleMenu } = useAppSelector(
    (state) => state.visibleControls
  );
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const { speakText } = useSpeechSynthesis();

  const { isResize } = useScreenResize(1024);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleCloseControls = () => {
    dispatch(toggleControlPanel());
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
                handleMouseEnter={handleMouseEnter}
              />
              <HeaderLocation handleFocus={handleFocus} />
            </Fragment>
          )}

          <BurgerButton />

          <BurgerMenu
            isVisibleMenu={isVisibleMenu}
            handleCloseBurgerMenu={() => dispatch(toggleMenu())}
          />
        </Div>
      </Nav>
    </HeaderElement>
  );
};
