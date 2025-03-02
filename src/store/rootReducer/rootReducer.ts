import { combineReducers } from '@reduxjs/toolkit';

import themeSlice from '@/store/slices/ThemeSlice';
import visibleControlsSlice from '../slices/visibleControlsSlice';
import specialThemeSlice from '../slices/SpecialThemeSlice';
import speechSynthesisSlice from '@/store/slices/SpeechSynthesisSlice';

export const rootReducer = combineReducers({
  speechSynthesis: speechSynthesisSlice,
  theme: themeSlice,
  visibleControls: visibleControlsSlice,
  specialTheme: specialThemeSlice,
});
