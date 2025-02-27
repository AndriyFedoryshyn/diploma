import { ReactNode } from "react";

export interface UIControlsProviderPropsI {
  children: ReactNode;
}

export type UIControlsContextTypeT = {
  fontSize: string;
  setFontSize: (size: string) => void;
  color: string;
  setColor: (color: string) => void;
};

export type FontSize = string;
export type Color = string;