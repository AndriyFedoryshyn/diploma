import { FC, useCallback, useMemo } from "react";

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

  const selectedIndex = useMemo(() => {
    return labels.findIndex((label) => label.theme === theme);
  }, [theme, labels]);

  const handleButtonClick = useCallback(
    (index: number, theme: "light" | "grayscale" | "dark") => {
      dispatch(setTheme(theme));
    },
    [dispatch]
  );

  return (
    <Div className={styles["controlsButtonsBlock"]} aria-live='polite'>
      {labels.map((label, index) => (
        <Button
          key={label.theme}
          aria-label={label.title}
          aria-pressed={selectedIndex === index}
          title={label.title}
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
