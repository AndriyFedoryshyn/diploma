import { FC, HTMLProps } from 'react';

import { Button } from '@/index';

import styles from './ControlButton.module.scss';

interface UIControlButtonPropsI extends HTMLProps<HTMLButtonElement> {
  handleCloseControls: () => void;
  handleFocus: (event: React.FocusEvent<HTMLElement>) => void;
}

export const ControlButton: FC<UIControlButtonPropsI> = ({
  handleCloseControls,
  handleFocus,
}) => {
  return (
    <Button
      onClick={handleCloseControls}
      className={styles['visibleButton']}
      aria-label="Увімкнути/вимкнути панель доступності"
      onFocus={handleFocus}
    >
      Людям з порушенням зору:
    </Button>
  );
};
