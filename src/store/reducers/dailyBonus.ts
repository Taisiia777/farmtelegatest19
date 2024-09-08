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
      openDailyBonus: (state) => {
         state.isOpen = true;
      },
   },
});

export const { closeDailyBonus, openDailyBonus } = dailyBonusSlice.actions;

export default dailyBonusSlice.reducer;










