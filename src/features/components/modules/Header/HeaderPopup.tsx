'use client';

import { useState, type FC } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { setSpecialTheme } from '@/shared/store/slices/SpecialTheme';

import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';

import { PopupBody, Button } from '@/shared/utils/popup';

import { Div, Button as ButtonElement } from '@/index';

import { popupItems } from '@/shared/static/popupItems';

import { SpecialThemeT } from '@/shared/types/ThemesType';

import { AnchorT } from '@/shared/types/HeaderType';

import styles from './Header.module.scss';

export const HeaderPopup: FC = () => {
  const [anchor, setAnchor] = useState<AnchorT>(null);
  const dispatch = useAppDispatch();

  const handlePopupClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  const handleThemeSelect = (theme: SpecialThemeT) => {
    dispatch(setSpecialTheme(theme));
  };

  return (
    <Div className={styles['headerPopup']}>
      <Button aria-describedby={id} type="button" onClick={handlePopupClick}>
        Обрати тему
      </Button>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>
          {popupItems.map((item) => (
            <ButtonElement
              type="button"
              className={styles['headerPopupButton']}
              key={item.id}
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
