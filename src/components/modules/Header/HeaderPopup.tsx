'use client';

import { useEffect, useState, type FC } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useSpeechOnFocus } from '@/hooks/useSpeechOnFocus';

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
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis ';

export const HeaderPopup: FC = () => {
  const [anchor, setAnchor] = useState<AnchorT>(null);
  const dispatch = useAppDispatch();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const { speakText } = useSpeechSynthesis();

  const handleFocus = useSpeechOnFocus(isSpeechEnabled);

  const handlePopupClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleSpeakThemeSelect = (
    event: React.FocusEvent<HTMLElement>,
    theme: SpecialThemeT
  ) => {
    if (theme && isSpeechEnabled) {
      const text = (event?.target as HTMLElement).innerText.trim();
      speakText(`Обрано тему ${text}`);
    }
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
        onFocus={handleFocus}
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
              tabIndex={0}
              onFocus={(event: React.FocusEvent<HTMLElement>) =>
                handleSpeakThemeSelect(event, item.dataLabel as SpecialThemeT)
              }
              onClick={() => handleThemeSelect(item.dataLabel as SpecialThemeT)}
            >
              {item.label}
            </ButtonElement>
          ))}
        </PopupBody>
      </BasePopup>
    </Div>
  );
};
