import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBoostState {
   info: {
      name: string;
      boostNameNew: string;
      imgSrc: string;
      earning: string;
      price: string;
      boosterId: number

   };
   isOpen: boolean;
}

const initialState: IBoostState = {
   info: {
      name: "",
      boostNameNew: "",
      imgSrc: "",
      earning: "",
      price: "",
      boosterId: 0
   },
   isOpen: false,
};

export const boostSlice = createSlice({
   name: "growthStages",
   initialState,
   reducers: {
      setBoostInfo: (
         state,
         action: PayloadAction<{
            name: string;
            boostNameNew: string;
            imgSrc: string;
            earning: string;
            price: string;
            boosterId: number
         }>
      ) => {
         state.info = action.payload;
         state.isOpen = true;
      },
      closeBoostBuyPopup: (state) => {
         state.isOpen = false;
      },
   },
});

export const { setBoostInfo, closeBoostBuyPopup } = boostSlice.actions;

export default boostSlice.reducer;
