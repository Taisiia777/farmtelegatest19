// userCoinsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Coin {
  name: string;
  value: number;
  cost: number;
}
interface Reward {
  description: string;
  type: string;
  amount: number;
  level: number;
  coins: number;
}


export interface UserCoinsState { // Явный экспорт типа состояния
  coins: Coin[];
  rewards: Reward[];
}

const initialState: UserCoinsState = {
  coins: [],
  rewards: []
};

const userCoinsSlice = createSlice({
  name: 'userCoins',
  initialState,
  reducers: {
    setUserCoins1(state, action: PayloadAction<Coin[]>) {
      state.coins = action.payload;
    },
    setUserRewards1(state, action: PayloadAction<Reward[]>) {
      state.rewards = action.payload;
    },
  },
});

export const { setUserCoins1, setUserRewards1 } = userCoinsSlice.actions;
export default userCoinsSlice.reducer;
