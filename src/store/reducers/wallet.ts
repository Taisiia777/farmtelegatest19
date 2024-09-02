
import { createSlice } from "@reduxjs/toolkit";

export interface IWalletState {
   isOpen: boolean;
   isReady: boolean
}

const initialState: IWalletState = {
   isOpen: false, // начальное состояние закрыто
   isReady: false
};

export const walletSlice = createSlice({
   name: "wallet",
   initialState,
   reducers: {
      openWallet: (state) => {
         state.isOpen = true;
      },
      finishWallet: (state) => {
         state.isOpen = false;
      },
      ready: (state) => {
         state.isReady = true;
      },
      unready: (state) => {
         state.isReady = false;
      },
   },
});

export const { openWallet, finishWallet, ready, unready } = walletSlice.actions;

export default walletSlice.reducer;
