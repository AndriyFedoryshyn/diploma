import { createSlice } from '@reduxjs/toolkit';

interface SpeechSynthesisStateI {
  isSpeechEnabled: boolean;
}

const initialState: SpeechSynthesisStateI = {
  isSpeechEnabled: false,
};

const speechSynthesisSlice = createSlice({
  name: 'speechSynthesis',
  initialState,
  reducers: {
    enableSpeech: (state) => {
      state.isSpeechEnabled = true;
    },
    disableSpeech: (state) => {
      state.isSpeechEnabled = false;
    },
    toggleSpeech: (state) => {
      state.isSpeechEnabled = !state.isSpeechEnabled;
    },
  },
});

export const { enableSpeech, disableSpeech, toggleSpeech } =
  speechSynthesisSlice.actions;

export default speechSynthesisSlice.reducer;
