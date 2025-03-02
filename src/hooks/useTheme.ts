import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import { initializeTheme, setTheme } from '@/store/slices/ThemeSlice';

import { ThemeT } from '../types/ThemesType';

export const useTheme = () => {
  const dispatch = useAppDispatch();

  const { theme, isLoaded } = useAppSelector((state) => state.theme);

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  const toggleTheme = () => {
    const newTheme: ThemeT =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'grayscale' : 'light';
    dispatch(setTheme(newTheme));
  };

  return { theme, toggleTheme, isLoaded };
};
