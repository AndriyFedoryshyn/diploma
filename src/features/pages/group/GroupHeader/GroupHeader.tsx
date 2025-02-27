'use client';

import React, { type FC } from 'react';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useSpeechSynthesis } from '@/shared/hooks/useSpeechSynthesis ';

import {
  Div,
  HeaderLogo,
  HeaderLocation,
  UIControls,
  ControlButton,
  HeaderElement,
} from '@/index';

import { toggleControlPanel } from '@/shared/store/slices/visibleControlsSlice';

import styles from './GroupHeader.module.scss';

export const GroupHeader: FC = () => {
  const dispatch = useAppDispatch();

  const { isVisibleControls } = useAppSelector(
    (state) => state.visibleControls
  );

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const { speakText } = useSpeechSynthesis();

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
      <Div className={styles['groupHeaderContainer']}>
        <UIControls
          isVisibleControls={isVisibleControls}
          handleCloseControls={handleCloseControls}
        />
        <HeaderLogo />
        <Div className={styles['groupHeaderControls']}>
          <ControlButton
            handleCloseControls={handleCloseControls}
            handleMouseEnter={handleMouseEnter}
          />
          <HeaderLocation handleFocus={handleFocus} />
        </Div>
      </Div>
    </HeaderElement>
  );
};
