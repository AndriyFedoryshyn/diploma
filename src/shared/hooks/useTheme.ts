import { useEffect } from "react";

import {
  initializeTheme,
  setTheme,
  ThemeT,
} from "@/shared/store/slices/ThemeSlice";

import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

export const useTheme = () => {
  const dispatch = useAppDispatch();

  const { theme, isLoaded } = useAppSelector((state) => state.theme);

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  const toggleTheme = () => {
    const newTheme: ThemeT =
      theme === "light" ? "dark" : theme === "dark" ? "grayscale" : "light";
    dispatch(setTheme(newTheme));
  };

  return { theme, toggleTheme, isLoaded };
};
