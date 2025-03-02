import { FC, HTMLProps } from 'react';

import { Button } from '@/index';

import styles from './ControlButton.module.scss';

interface UIControlButtonPropsI extends HTMLProps<HTMLButtonElement> {
  handleCloseControls: () => void;
  handleMouseEnter: (event: React.MouseEvent) => void;
}

export const ControlButton: FC<UIControlButtonPropsI> = ({
  handleCloseControls,
  handleMouseEnter,
}) => {
  return (
    <Button
      onClick={handleCloseControls}
      className={styles['visibleButton']}
      aria-label="Увімкнути/вимкнути панель доступності"
      onMouseEnter={handleMouseEnter}
    >
      Людям з порушенням зору:
    </Button>
  );
};
