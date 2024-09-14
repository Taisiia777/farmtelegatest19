import { createSlice } from "@reduxjs/toolkit";

export interface IComboState {
   isOpen: boolean;
   isReady: boolean
}

const initialState: IComboState = {
   isOpen: false, // начальное состояние закрыто
   isReady: false
};

export const comboSlice = createSlice({
   name: "combo",
   initialState,
   reducers: {
      openCombo: (state) => {
         state.isOpen = true;
      },
      finishCombo: (state) => {
         state.isOpen = false;
      },
      ready: (state) => {
         state.isReady = true;
      },
      unready: (state) => {
         state.isReady = false;
      },
   },
});

export const { openCombo, finishCombo, ready, unready } = comboSlice.actions;

export default comboSlice.reducer;
