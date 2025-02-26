import { FC } from "react";

import { Button, Heading } from "@/index";

import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "./ControlButton.module.scss";

interface UIControlButtonPropsI {
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
      className={styles["visibleButton"]}
      aria-label='Увімкнути/вимкнути панель доступності'
    >
      <Heading className='' level='h5' onMouseEnter={handleMouseEnter}>
        Людям з порушенням зору:
      </Heading>
      <VisibilityIcon />
    </Button>
  );
};
