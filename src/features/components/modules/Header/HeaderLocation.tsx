import { type FC } from "react";

import Image from "next/image";

import { Div } from "@/index";

import styles from "./Header.module.scss";

interface HeaderLocationProps {
  handleMouseEnter?: (event: React.MouseEvent) => void;
  handleImageMouseEnter?: (event: React.MouseEvent) => void;
}

export const HeaderLocation: FC<HeaderLocationProps> = ({
  handleMouseEnter,
  handleImageMouseEnter,
}) => {
  return (
    <Div className={styles["headerLocation"]} tabIndex={0}>
      <Image
        src={"/icons/location_logo.svg"}
        className={styles["headerLocationIcon"]}
        alt='Логотип локації'
        width={15}
        height={15}
        priority
        onMouseEnter={handleImageMouseEnter}
      />
      <h5
        onMouseEnter={handleMouseEnter}
        className={styles["headerLocationMark"]}
      >
        Львівська обл.
      </h5>
    </Div>
  );
};
