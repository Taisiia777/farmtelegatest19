import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import growthStagesSlice from './reducers/growthStages';
import boostSlice from './reducers/boost';
import coinSlice from './reducers/coin';
import greetingSlice from './reducers/greeting';
import guideSlice from './reducers/guide';
import guide1Slice from './reducers/guide1';

import preloaderSlice from './reducers/preloader';
import dailyBonus from './reducers/dailyBonus';
import userSlice from './reducers/userSlice'; // Импортируем тип UserState
import userCoinsReducer from './reducers/userCoinsSlice'; // Импорт типа состояния
const store = configureStore({
  reducer: {
    growthStages: growthStagesSlice,
    boost: boostSlice,
    coin: coinSlice,
    greeting: greetingSlice,
    guide: guideSlice,
    guide1: guide1Slice,
    preloader: preloaderSlice,
    dailyBonus,
    user: userSlice,
    userCoins: userCoinsReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: (selector: (state: RootState) => any) => any = useSelector;
export const useAppStore = () => useStore<AppStore>();

export default store;




