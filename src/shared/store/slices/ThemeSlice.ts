import { ThemeT } from '@/shared/types/ThemesType';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeStateI {
  theme: ThemeT;
  isLoaded: boolean;
}

const initialState: ThemeStateI = {
  theme: 'light',
  isLoaded: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeT>) => {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        document.documentElement.setAttribute('data-theme', action.payload);
      }
    },
    initializeTheme: (state) => {
      if (typeof window !== 'undefined') {
        const savedTheme = (localStorage.getItem('theme') as ThemeT) || 'light';
        state.theme = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
      state.isLoaded = true;
    },
  },
});

export const { setTheme, initializeTheme } = themeSlice.actions;
