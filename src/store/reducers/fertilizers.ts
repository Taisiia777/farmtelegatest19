import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFertilizers } from "../../types/globalTypes";

export interface IFertilizersState {
   info: {
      name: TFertilizers;
      earning: string;
      price: string;
      fertilizersId: number

   };
   isOpen: boolean;
}

const initialState: IFertilizersState = {
   info: {
      name: "Humus Elixir",
      earning: "",
      price: "",
      fertilizersId: 0
   },
   isOpen: false,
};

export const fertilizersSlice = createSlice({
   name: "growthStages",
   initialState,
   reducers: {
      setFertilizersIfno: (
         state,
         action: PayloadAction<{
            name: TFertilizers;
            earning: string;
            price: string;
            fertilizersId: number
         }>
      ) => {
         state.info = action.payload;
         state.isOpen = true;
      },
      closeFertilizersBuyPopup: (state) => {
         state.isOpen = false;
      },
   },
});

export const { setFertilizersIfno, closeFertilizersBuyPopup } = fertilizersSlice.actions;

export default fertilizersSlice.reducer;
