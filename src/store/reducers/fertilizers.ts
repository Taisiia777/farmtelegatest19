import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFertilizers } from "../../types/globalTypes";

export interface IFertilizersState {
   info: {
      name: TFertilizers;
      earning: string;
      price: string;
      fertilizersId: number
      level: number
   };
   isOpen: boolean;
   isLoading: boolean;

}

const initialState: IFertilizersState = {
   info: {
      name: "Humus Elixir",
      earning: "",
      price: "",
      fertilizersId: 0,
      level: 1
   },
   isOpen: false,
   isLoading: false,

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
            fertilizersId: number;
            level: number;

         }>
      ) => {
         state.info = action.payload;
         state.isOpen = true;
      },
      closeFertilizersBuyPopup: (state) => {
         state.isOpen = false;
      },
      noLoading: (state) => {
         state.isLoading = false;
      },
      loading: (state) => {
         state.isLoading = true;
      },
   },
});

export const { setFertilizersIfno, closeFertilizersBuyPopup, loading, noLoading } = fertilizersSlice.actions;

export default fertilizersSlice.reducer;
