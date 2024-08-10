import { createSlice } from "@reduxjs/toolkit";

export interface IGuide1State {
   isOpen: boolean;
}

const initialState: IGuide1State = {
   isOpen: false, // начальное состояние закрыто
};

export const guide1Slice = createSlice({
   name: "guide1",
   initialState,
   reducers: {
      openGuide1: (state) => {
         state.isOpen = true;
      },
      finishGuide1: (state) => {
         state.isOpen = false;
      },
   },
});

export const { openGuide1, finishGuide1 } = guide1Slice.actions;

export default guide1Slice.reducer;
