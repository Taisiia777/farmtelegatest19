import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGrowthStage } from "../../types/globalTypes";
import { RootState } from "..";

export interface IGrowthStages {
   blocks: [
      {
         id: 1;
         stage: TGrowthStage;
      },
      {
         id: 2;
         stage: TGrowthStage;
      },
      {
         id: 3;
         stage: TGrowthStage;
      },
      {
         id: 4;
         stage: TGrowthStage;
      },
      {
         id: 5;
         stage: TGrowthStage;
      },
      {
         id: 6;
         stage: TGrowthStage;
      },
      {
         id: 7;
         stage: TGrowthStage;
      },
      {
         id: 8;
         stage: TGrowthStage;
      },
      {
         id: 9;
         stage: TGrowthStage;
      }
   ];

   // True если все блоки зелми в последней стадии.
   // Это означает, что пшеницу можно собирать
   isReady: boolean;
}

const initialState: IGrowthStages = {
   blocks: [
      {
         id: 1,
         stage: "fourth",
      },
      {
         id: 2,
         stage: "fourth",
      },
      {
         id: 3,
         stage: "fourth",
      },
      {
         id: 4,
         stage: "fourth",
      },
      {
         id: 5,
         stage: "fourth",
      },
      {
         id: 6,
         stage: "fourth",
      },
      {
         id: 7,
         stage: "fourth",
      },
      {
         id: 8,
         stage: "fourth",
      },
      {
         id: 9,
         stage: "fourth",
      },
   ],

   isReady: false,
};

export const counterSlice = createSlice({
   name: "growthStages",
   initialState,
   reducers: {
      ready: (state) => {
         state.isReady = true;
      },

      // В action.payload передется id блока
      pickWheat: (state, action: PayloadAction<{ id: number }>) => {
         const block = state.blocks.find(
            (block) => block.id === action.payload.id
         );

         if (block) {
            block.stage = "first";
         }
      },
   },
});

export const { pickWheat, ready } = counterSlice.actions;

export const selectEarthBlock = (state: RootState, id: number) =>
   state.growthStages.blocks.find((block) => block.id === id);

export default counterSlice.reducer;
