import { createSlice } from "@reduxjs/toolkit";

export interface IWheelState {
   isOpen: boolean;
}

const initialState: IWheelState = {
   isOpen: false, // начальное состояние закрыто
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
   },
});

export const { openWheel, finishWheel } = wheelSlice.actions;

export default wheelSlice.reducer;
