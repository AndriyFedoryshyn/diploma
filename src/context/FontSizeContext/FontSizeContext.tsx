'use client';

import { createContext, useContext } from 'react';

import { UIControlsContextTypeT } from '@/types/FontSizeContextType';

export const UIControlsContext = createContext<
  UIControlsContextTypeT | undefined
>(undefined);

export const useUIControls = (): UIControlsContextTypeT => {
  const context = useContext(UIControlsContext);
  if (!context) {
    throw new Error('useUIControls must be used within a UIControlsProvider');
  }
  return context;
};
