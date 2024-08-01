import { createSlice } from "@reduxjs/toolkit";

export interface IdailyBonusState {
   isOpen: boolean;
}

const initialState: IdailyBonusState = {
   isOpen: true,
};

export const dailyBonusSlice = createSlice({
   name: "dailyBonus",
   initialState,
   reducers: {
      closeDailyBonus: (state) => {
         state.isOpen = false;
      },
   },
});

export const { closeDailyBonus } = dailyBonusSlice.actions;

export default dailyBonusSlice.reducer;










