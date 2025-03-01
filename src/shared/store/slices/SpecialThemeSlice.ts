import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SpecialThemeT } from '@/shared/types/ThemesType';

interface SpecialThemeState {
  theme: SpecialThemeT;
  isLoaded: boolean;
}

const initialState: SpecialThemeState = {
  theme: 'cataract',
  isLoaded: false,
};

const specialThemeSlice = createSlice({
  name: 'specialTheme',
  initialState,
  reducers: {
    setSpecialTheme: (state, action: PayloadAction<SpecialThemeT>) => {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('specialTheme', action.payload);
        document.documentElement.setAttribute(
          'data-special-theme',
          action.payload
        );
      }
    },
    initializeSpecialTheme: (state) => {
      if (typeof window !== 'undefined') {
        const savedTheme =
          (localStorage.getItem('specialTheme') as SpecialThemeT) || 'cataract';
        state.theme = savedTheme;
        document.documentElement.setAttribute('data-special-theme', savedTheme);
      }
      state.isLoaded = true;
    },
    resetSpecialTheme: (state) => {
      state.theme = 'cataract';
      if (typeof window !== 'undefined') {
        localStorage.setItem('specialTheme', 'cataract');
        document.documentElement.setAttribute('data-special-theme', 'cataract');
      }
    },
  },
});

export const { initializeSpecialTheme, resetSpecialTheme, setSpecialTheme } =
  specialThemeSlice.actions;
  
export default specialThemeSlice.reducer;
