import { combineReducers } from "@reduxjs/toolkit";

import { speechSynthesisSlice } from "@/shared/store/slices/SpeechSynthesisSlice";

import { themeSlice } from "@/shared/store/slices/ThemeSlice";
import { visibleControlsSlice } from "../slices/visibleControlsSlice";

export const rootReducer = combineReducers({
  speechSynthesis: speechSynthesisSlice.reducer,
  theme: themeSlice.reducer,
  visibleControls: visibleControlsSlice.reducer,
});
