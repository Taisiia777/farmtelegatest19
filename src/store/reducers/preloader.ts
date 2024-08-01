import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBoostState {
   isLodaing: boolean;
}

const initialState: IBoostState = {
   isLodaing: true,
};

export const loadingSlice = createSlice({
   name: "growthStages",
   initialState,
   reducers: {
      loadingToggle: (state, action: PayloadAction<boolean>) => {
         state.isLodaing = action.payload;
      },
   },
});

export const { loadingToggle } = loadingSlice.actions;

export default loadingSlice.reducer;
