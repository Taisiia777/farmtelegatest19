// import { createSlice } from "@reduxjs/toolkit";

// export interface IGuideState {
//    isOpen: boolean;
// }

// const initialState: IGuideState = {
//    isOpen: true,
// };

// export const guideSlice = createSlice({
//    name: "guide",
//    initialState,
//    reducers: {
//       finishGuide: (state) => {
//          state.isOpen = false;
//       },
//    },
// });

// export const { finishGuide } = guideSlice.actions;

// export default guideSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export interface IGuideState {
   isOpen: boolean;
}

const initialState: IGuideState = {
   isOpen: false, // начальное состояние закрыто
};

export const guideSlice = createSlice({
   name: "guide",
   initialState,
   reducers: {
      openGuide: (state) => {
         state.isOpen = true;
      },
      finishGuide: (state) => {
         state.isOpen = false;
      },
   },
});

export const { openGuide, finishGuide } = guideSlice.actions;

export default guideSlice.reducer;
