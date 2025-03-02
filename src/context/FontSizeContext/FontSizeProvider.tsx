'use client';

import { FC, useEffect, useState } from 'react';

import { UIControlsContext } from './FontSizeContext';

import {
  Color,
  FontSize,
  UIControlsProviderPropsI,
} from '@/types/FontSizeContextType';

export const UIControlsProvider: FC<UIControlsProviderPropsI> = ({
  children,
}) => {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [color, setColor] = useState<Color>('light');

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-font', fontSize);
  }, [fontSize]);

  return (
    <UIControlsContext.Provider
      value={{ fontSize, setFontSize, color, setColor }}
    >
      {children}
    </UIControlsContext.Provider>
  );
};
