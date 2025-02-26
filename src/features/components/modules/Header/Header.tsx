"use client";

import { useEffect, type FC } from "react";

import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis ";
import { useScreenResize } from "@/shared/hooks/useScreenResize";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";

import {
  HeaderForm,
  Div,
  Heading,
  Button,
  HeaderLogo,
  BurgerMenu,
  HeaderLocation,
  HeaderElement,
  ControlButton,
} from "@/index";

import { AreasT } from "@/shared/types/AreasType";
import { UIControls } from "../Controls/UIControls";

import { SearchTermT } from "@/shared/types/HeaderType";

import MenuIcon from "@mui/icons-material/Menu";

import styles from "./Header.module.scss";
import {
  setMenuVisibility,
  toggleControlPanel,
  toggleMenu,
} from "@/shared/store/slices/visibleControlsSlice";

interface HeaderProps {
  onSearch: (searchTerm: SearchTermT) => void;
  settlements: AreasT;
}

export const Header: FC<HeaderProps> = ({ onSearch, settlements }) => {
  const dispatch = useAppDispatch();

  const { isSpeechEnabled } = useAppSelector((state) => state.speechSynthesis);
  const { isVisibleControls, isVisibleMenu } = useAppSelector(
    (state) => state.visibleControls
  );

  const { isResize } = useScreenResize(1024);
  const { speakText } = useSpeechSynthesis();

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const text = (event.target as HTMLElement).innerText.trim();
      speakText(text);
    }
  };

  const handleImageMouseEnter = (event: React.MouseEvent) => {
    if (isSpeechEnabled) {
      const altText = (event.target as HTMLImageElement).alt.trim();
      speakText(altText);
    }
  };

  useEffect(() => {
    const savedState = localStorage.getItem("burgerMenu");
    if (savedState !== null) {
      dispatch(setMenuVisibility(JSON.parse(savedState)));
    }
  }, [dispatch]);

  const handleCloseControls = () => {
    dispatch(toggleControlPanel());
  };

  return (
    <HeaderElement className={styles["header"]} role='banner'>
      <Div className={styles["headerContainer"]}>
        <Div className={styles["headerContainerRow"]}>
          <HeaderLogo />
          {!isResize && (
            <Div className={styles["headerLocationThemeBlock"]}>
              <ControlButton
                handleCloseControls={handleCloseControls}
                handleMouseEnter={handleMouseEnter}
              />
              <HeaderLocation
                handleMouseEnter={handleMouseEnter}
                handleImageMouseEnter={handleImageMouseEnter}
              />
            </Div>
          )}
        </Div>

        <UIControls
          isVisibleControls={isVisibleControls}
          handleCloseControls={handleCloseControls}
        />

        {isResize && (
          <Button
            onClick={() => dispatch(toggleMenu())}
            role='button'
            aria-label='Меню'
            aria-expanded={isVisibleMenu}
            className={styles["menuButton"]}
          >
            <MenuIcon fontSize='large' />
          </Button>
        )}
      </Div>

      <BurgerMenu
        isVisibleMenu={isVisibleMenu}
        handleCloseBurgerMenu={() => dispatch(toggleMenu())}
      />

      <Div className={styles["headerMainHeadingContainer"]}>
        <Heading
          level='h1'
          className={styles["headerMainHeading"]}
          aria-live='polite'
          tabIndex={0}
          onMouseEnter={handleMouseEnter}
        >
          Графік відключення електроенергії у Львівській області
        </Heading>

        <HeaderForm onSearch={onSearch} settlements={settlements} />
      </Div>
    </HeaderElement>
  );
};
