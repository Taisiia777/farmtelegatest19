import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCoin } from "../../types/globalTypes";

export interface ICoinState {
   info: {
      name: TCoin;
      earning: string;
      price: string;
   };
   isOpen: boolean;
}

const initialState: ICoinState = {
   info: {
      name: "BTC",
      earning: "",
      price: "",
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
         }>
      ) => {
         state.info = action.payload;
         state.isOpen = true;
      },
      closeCoinBuyPopup: (state) => {
         state.isOpen = false;
      },
   },
});

export const { setCoinIfno, closeCoinBuyPopup } = coinSlice.actions;

export default coinSlice.reducer;
