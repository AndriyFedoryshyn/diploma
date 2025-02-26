import { HTMLProps, type FC } from "react";

import Image from "next/image";

import { Div } from "@/index";

import styles from "./Header.module.scss";

interface HeaderLocationProps extends HTMLProps<HTMLElement> {
  handleMouseEnter?: (event: React.MouseEvent) => void;
  handleImageMouseEnter?: (event: React.MouseEvent) => void;
  handleFocus: (event: React.FocusEvent<HTMLHeadingElement>) => void;
}

export const HeaderLocation: FC<HeaderLocationProps> = ({
  handleMouseEnter,
  handleImageMouseEnter,
  handleFocus,
}) => {
  return (
    <Div
      className={styles["headerLocation"]}
      onMouseEnter={handleImageMouseEnter}
      tabIndex={0}
    >
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
        onFocus={handleFocus}
      >
        Львівська обл.
      </h5>
    </Div>
  );
};
