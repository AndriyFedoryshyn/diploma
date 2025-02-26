"use client";

import { type FC } from "react";

import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis ";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useBodyOverflow } from "@/shared/hooks/useBodyOverflow";

import { Div, HeaderLogo, Button, HeaderLocation } from "@/index";

import CloseIcon from "@mui/icons-material/Close";

import styles from "./BurgerMenu.module.scss";

interface BurgerMenuPropsI {
  isVisibleMenu: boolean;
  handleCloseBurgerMenu: () => void;
}

export const BurgerMenu: FC<BurgerMenuPropsI> = ({
  isVisibleMenu,
  handleCloseBurgerMenu,
}) => {
  const { speakText } = useSpeechSynthesis();
  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);

  useBodyOverflow(isVisibleMenu);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();

      speakText(text);
    }
  };

  const handleMouseEnterTitle = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = event.currentTarget.getAttribute("aria-label") || "";

      if (text) {
        speakText(text);
      }
    }
  };

  return (
    <>
      {isVisibleMenu && (
        <Div
          role='dialog'
          aria-labelledby='burgerMenuTitle'
          className={styles["burger"]}
          aria-hidden={!isVisibleMenu}
        >
          <Div className={styles["burgerContainer"]}>
            <Div className={styles["burgerNav"]}>
              <HeaderLogo />
              <Div className={styles["burgerRightBlock"]}>
                <HeaderLocation handleMouseEnter={handleMouseEnter} />
                <Button
                  ariaLabel='Закрити Меню'
                  title='Закрити Меню'
                  role='button'
                  type='button'
                  className={styles["burgerCloseButton"]}
                  onClick={handleCloseBurgerMenu}
                  onMouseEnter={handleMouseEnterTitle}
                >
                  <CloseIcon fontSize='large' />
                </Button>
              </Div>
            </Div>
          </Div>
        </Div>
      )}
    </>
  );
};
