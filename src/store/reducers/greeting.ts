import { createSlice } from "@reduxjs/toolkit";

export interface IGreetingState {
   isOpen: boolean;
}

const initialState: IGreetingState = {
   isOpen: true,
};

export const greetingSlice = createSlice({
   name: "greeting",
   initialState,
   reducers: {
      finishGreeting: (state) => {
         state.isOpen = false;
      },
   },
});

export const { finishGreeting } = greetingSlice.actions;

export default greetingSlice.reducer;
