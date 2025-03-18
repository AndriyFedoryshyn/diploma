import { type FC } from 'react';

import { Div, HeaderLogo, HeaderLocation, Button, HeaderPopup } from '@/index';

import CloseIcon from '@mui/icons-material/Close';

import { BurgerHeaderPropsI } from '@/interfaces/BurgerHeader';

import styles from './BurgerMenu.module.scss';

export const BurgerHeader: FC<BurgerHeaderPropsI> = ({
  closeButtonRef,
  handleCloseBurgerMenu,
  handleFocus,
}) => {
  return (
    <Div className={styles['burgerNav']}>
      <HeaderLogo />

      <Div className={styles['burgerRightBlock']}>
        <HeaderPopup />
        <HeaderLocation handleFocus={handleFocus} />

        <Button
          ariaLabel="Закрити Меню"
          title="Закрити Меню"
          role="button"
          type="button"
          className={styles['burgerCloseButton']}
          onClick={handleCloseBurgerMenu}
          ref={closeButtonRef}
        >
          <CloseIcon fontSize="large" />
        </Button>
      </Div>
    </Div>
  );
};
