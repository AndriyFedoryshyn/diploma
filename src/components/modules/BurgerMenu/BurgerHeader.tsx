import { type FC } from 'react';

import { Div, HeaderLogo, HeaderLocation, Button } from '@/index';

import CloseIcon from '@mui/icons-material/Close';

import { BurgerHeaderPropsI } from '@/interfaces/BurgerHeader';

import styles from './BurgerMenu.module.scss';

export const BurgerHeader: FC<BurgerHeaderPropsI> = ({
  closeButtonRef,
  handleCloseBurgerMenu,
  handleFocus,
  handleMouseEnter,
  handleMouseEnterTitle,
}) => {
  return (
    <Div className={styles['burgerNav']}>
      <HeaderLogo />

      <Div className={styles['burgerRightBlock']}>
        <HeaderLocation
          handleFocus={handleFocus}
          handleMouseEnter={handleMouseEnter}
        />

        <Button
          ariaLabel="Закрити Меню"
          title="Закрити Меню"
          role="button"
          type="button"
          className={styles['burgerCloseButton']}
          onClick={handleCloseBurgerMenu}
          onMouseEnter={handleMouseEnterTitle}
          ref={closeButtonRef}
        >
          <CloseIcon fontSize="large" />
        </Button>
      </Div>
    </Div>
  );
};
