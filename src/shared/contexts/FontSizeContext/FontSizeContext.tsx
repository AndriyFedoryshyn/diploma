"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useEffect,
} from "react";

interface UIControlsProviderPropsI {
  children: ReactNode;
}

type UIControlsContextTypeT = {
  fontSize: string;
  setFontSize: (size: string) => void;
  color: string;
  setColor: (color: string) => void;
};

export const UIControlsContext = createContext<
  UIControlsContextTypeT | undefined
>(undefined);

export const useUIControls = (): UIControlsContextTypeT => {
  const context = useContext(UIControlsContext);
  if (!context) {
    throw new Error("useUIControls must be used within a UIControlsProvider");
  }
  return context;
};

export const UIControlsProvider: FC<UIControlsProviderPropsI> = ({
  children,
}) => {
  const [fontSize, setFontSize] = useState<string>("medium");
  const [color, setColor] = useState<string>("light");

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("data-font", fontSize);
  }, [fontSize]);

  return (
    <UIControlsContext.Provider
      value={{ fontSize, setFontSize, color, setColor }}
    >
      {children}
    </UIControlsContext.Provider>
  );
};
