import { createSlice } from "@reduxjs/toolkit";

export interface ICoinState {
   isFinished: boolean;
}

const initialState: ICoinState = {
   isFinished: false,
};

export const greetingSlice = createSlice({
   name: "growthStages",
   initialState,
   reducers: {
      finishGreeting: (state) => {
         state.isFinished = true;
      },
   },
});

export const { finishGreeting } = greetingSlice.actions;

export default greetingSlice.reducer;
