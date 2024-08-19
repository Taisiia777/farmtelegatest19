import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCoin } from "../../types/globalTypes";

export interface ICoinState {
   info: {
      name: TCoin;
      earning: string;
      price: string;
      coinId: number

   };
   isOpen: boolean;
}

const initialState: ICoinState = {
   info: {
      name: "Bitcoin",
      earning: "",
      price: "",
      coinId: 0
   },
   isOpen: false,
};

export const coinSlice = createSlice({
   name: "growthStages",
   initialState,
   reducers: {
      setCoinIfno: (
         state,
         action: PayloadAction<{
            name: TCoin;
            earning: string;
            price: string;
            coinId: number
         }>
      ) => {
         state.info = action.payload;
         alert("open")

         state.isOpen = true;
      },
      closeCoinBuyPopup: (state) => {
         alert("close")
         state.isOpen = false;
      },
   },
});

export const { setCoinIfno, closeCoinBuyPopup } = coinSlice.actions;

export default coinSlice.reducer;
