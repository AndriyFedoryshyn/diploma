import { FC, useState, useEffect, useCallback } from "react";

import { setTheme } from "../../../../shared/store/slices/ThemeSlice";

import { Button, Div } from "@/index";

import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

import styles from "./UIControls.module.scss";

export interface LabelT {
  label: string;
  title: string;
  theme: "light" | "grayscale" | "dark";
}

interface UIThemeControlsPropsT {
  labels: LabelT[];
  isActive: boolean;
}

export const UIThemeControls: FC<UIThemeControlsPropsT> = ({
  labels,
  isActive,
}) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  const getThemeIndex = useCallback(
    (theme: string) => labels.findIndex((label) => label.theme === theme),
    [labels]
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(
    getThemeIndex(theme)
  );

  useEffect(() => {
    setSelectedIndex(getThemeIndex(theme));
  }, [getThemeIndex, theme]);

  const handleButtonClick = (
    index: number,
    theme: "light" | "grayscale" | "dark"
  ) => {
    setSelectedIndex(index);
    dispatch(setTheme(theme));
  };

  return (
    <Div className={styles["controlsButtonsBlock"]}>
      {labels.map((label, index) => (
        <Button
          aria-label={label.title}
          aria-pressed={selectedIndex === index}
          title={label.title}
          key={index}
          role='button'
          className={`${styles["controlsButton"]} ${
            selectedIndex === index ? styles["active"] : ""
          }`}
          tabIndex={isActive ? 0 : -1}
          onClick={() => handleButtonClick(index, label.theme)}
        >
          {label.label}
        </Button>
      ))}
    </Div>
  );
};
