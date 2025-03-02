'use client';

import { useEffect, useState, type FC } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';
import { useAppSelector } from '@/hooks/useAppSelector';

import {
  initializeSpecialTheme,
  setSpecialTheme,
} from '@/store/slices/SpecialThemeSlice';

import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';

import { PopupBody, Button } from '@/utils/popup';

import { Div, Button as ButtonElement } from '@/index';

import { popupItems } from '@/static/popupItems';

import { SpecialThemeT } from '@/types/ThemesType';

import { AnchorT } from '@/types/HeaderType';

import VisibilityIcon from '@mui/icons-material/Visibility';

import styles from './Header.module.scss';

export const HeaderPopup: FC = () => {
  const [anchor, setAnchor] = useState<AnchorT>(null);
  const dispatch = useAppDispatch();
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  const handleSpeakText = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handlePopupClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  useEffect(() => {
    dispatch(initializeSpecialTheme());
  }, [dispatch]);

  const handleThemeSelect = (theme: SpecialThemeT) => {
    dispatch(setSpecialTheme(theme));
  };

  return (
    <Div className={styles['headerPopup']}>
      <Button
        aria-describedby={id}
        type="button"
        onClick={handlePopupClick}
        onMouseEnter={handleSpeakText}
        tabIndex={0}
      >
        Обрати тему <VisibilityIcon />
      </Button>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>
          {popupItems.map((item) => (
            <ButtonElement
              type="button"
              className={styles['headerPopupButton']}
              key={item.id}
              onClick={() => handleThemeSelect(item.dataLabel as SpecialThemeT)}
              onMouseEnter={handleSpeakText}
            >
              {item.label}
            </ButtonElement>
          ))}
        </PopupBody>
      </BasePopup>
    </Div>
  );
};
