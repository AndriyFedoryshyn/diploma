'use client';

import { type FC } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useScreenResize } from '@/hooks/useScreenResize';
import { useAppSelector } from '@/hooks/useAppSelector';

import { Button } from '@/index';

import MenuIcon from '@mui/icons-material/Menu';

import { toggleMenu } from '@/store/slices/visibleControlsSlice';

import styles from './BurgerButton.module.scss';

export const BurgerButton: FC = () => {
  const { isResize } = useScreenResize(1024);

  const { isVisibleMenu } = useAppSelector((state) => state.visibleControls);

  const dispatch = useAppDispatch();

  return (
    isResize && (
      <Button
        onClick={() => dispatch(toggleMenu())}
        aria-label="Меню"
        aria-expanded={isVisibleMenu}
        className={styles['menuButton']}
        tabIndex={0}
        title="Кнопка відкриття меню"
      >
        <MenuIcon fontSize="large" aria-hidden="true" />
      </Button>
    )
  );
};
