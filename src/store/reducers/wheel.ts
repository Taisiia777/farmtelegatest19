import { createSlice } from "@reduxjs/toolkit";

export interface IWheelState {
   isOpen: boolean;
   isReady: boolean
}

const initialState: IWheelState = {
   isOpen: false, // начальное состояние закрыто
   isReady: false

};

export const wheelSlice = createSlice({
   name: "wheel",
   initialState,
   reducers: {
      openWheel: (state) => {
         state.isOpen = true;
      },
      finishWheel: (state) => {
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

export const { openWheel, finishWheel, ready, unready } = wheelSlice.actions;

export default wheelSlice.reducer;
