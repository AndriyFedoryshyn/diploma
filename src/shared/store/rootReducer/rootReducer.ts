import { combineReducers } from '@reduxjs/toolkit';

import themeSlice from '@/shared/store/slices/ThemeSlice';
import visibleControlsSlice from '../slices/visibleControlsSlice';
import specialThemeSlice from '../slices/SpecialThemeSlice';
import speechSynthesisSlice from '@/shared/store/slices/SpeechSynthesisSlice';

export const rootReducer = combineReducers({
  speechSynthesis: speechSynthesisSlice,
  theme: themeSlice,
  visibleControls: visibleControlsSlice,
  specialTheme: specialThemeSlice,
});
