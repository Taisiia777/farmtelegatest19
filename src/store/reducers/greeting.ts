import { createSlice } from "@reduxjs/toolkit";

export interface IGreetingState {
   isFinished: boolean;
}

const initialState: IGreetingState = {
   isFinished: false,
};

export const greetingSlice = createSlice({
   name: "greeting",
   initialState,
   reducers: {
      finishGreeting: (state) => {
         state.isFinished = true;
      },
   },
});

export const { finishGreeting } = greetingSlice.actions;

export default greetingSlice.reducer;
