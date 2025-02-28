import { combineReducers } from '@reduxjs/toolkit';

import { themeSlice } from '@/shared/store/slices/ThemeSlice';
import { visibleControlsSlice } from '../slices/visibleControlsSlice';
import { specialThemeSlice } from '../slices/SpecialTheme';
import { speechSynthesisSlice } from '@/shared/store/slices/SpeechSynthesisSlice';

export const rootReducer = combineReducers({
  speechSynthesis: speechSynthesisSlice.reducer,
  theme: themeSlice.reducer,
  visibleControls: visibleControlsSlice.reducer,
  specialTheme: specialThemeSlice.reducer,
});
