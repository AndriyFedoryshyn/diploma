import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VisibleControlsState {
  isVisibleControls: boolean;
  isVisibleMenu: boolean;
}

const initialState: VisibleControlsState = {
  isVisibleControls: false,
  isVisibleMenu: false,
};

const visibleControlsSlice = createSlice({
  name: 'visibleControls',
  initialState,
  reducers: {
    toggleControlPanel: (state) => {
      state.isVisibleControls = !state.isVisibleControls;
    },
    toggleMenu: (state) => {
      state.isVisibleMenu = !state.isVisibleMenu;
      localStorage.setItem(
        'visibleControls',
        JSON.stringify(state.isVisibleMenu)
      );
    },
    setMenuVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisibleMenu = action.payload;
    },
  },
});

export const { toggleControlPanel, toggleMenu, setMenuVisibility } =
  visibleControlsSlice.actions;

export default visibleControlsSlice.reducer;
