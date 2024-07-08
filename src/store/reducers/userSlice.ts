// // userSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface UserState {
//     id: number;
//     username: string;
//     coins: number;
//     incomeMultiplier: number;
//     coinsPerHour: number;
//     xp: number;
//     level: number;
//     totalEarnings?: number; // Добавляем новое свойство
// }

// const initialState: { user: UserState | null } = {
//     user: null,
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser(state, action: PayloadAction<UserState>) {
//             state.user = action.payload;
//         },
//         clearUser(state) {
//             state.user = null;
//         },
//     },
// });

// export const { setUser, clearUser } = userSlice.actions;

// export default userSlice.reducer;










// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface UserState {
//     id: number;
//     username: string;
//     coins: number;
//     incomeMultiplier: number;
//     coinsPerHour: number;
//     xp: number;
//     level: number;
//     totalEarnings?: number;
//     grassEarnings?: number; // Добавляем новое свойство
// }

// const initialState: { user: UserState | null } = {
//     user: null,
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser(state, action: PayloadAction<UserState>) {
//             state.user = action.payload;
//         },
//         clearUser(state) {
//             state.user = null;
//         },
//         updateGrassEarnings(state, action: PayloadAction<number>) {
//             if (state.user) {
//                 state.user.grassEarnings = (state.user.grassEarnings || 0) + action.payload;
//             }
//         },
//     },
// });

// export const { setUser, clearUser, updateGrassEarnings } = userSlice.actions;

// export default userSlice.reducer;









import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, AppDispatch } from "../";

export interface UserState {
    id: number;
    username: string;
    coins: number;
    incomeMultiplier: number;
    coinsPerHour: number;
    xp: number;
    level: number;
    totalEarnings?: number;
    grassEarnings?: number;
    grassGrowthStage?: number;
}

const initialState: { user: UserState | null } = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
        updateGrassEarnings(state, action: PayloadAction<number>) {
            if (state.user) {
                state.user.grassEarnings = (state.user.grassEarnings || 0) + action.payload;
            }
        },
        setGrassGrowthStage(state, action: PayloadAction<number>) {
            if (state.user) {
                state.user.grassGrowthStage = action.payload;
            }
        },
    },
});

export const { setUser, clearUser, updateGrassEarnings, setGrassGrowthStage } = userSlice.actions;

export const fetchUser = (userId: number) => async (dispatch: AppDispatch) => {
    const response = await axios.get(`https://coinfarm.club/user/${userId}`);
    dispatch(setUser(response.data));
};

export const updateGrassStage = ({ userId, stage }: { userId: number, stage: number }) => async (dispatch: AppDispatch) => {
    const response = await axios.patch(`https://coinfarm.club/user/${userId}/grass/${stage}`);
    dispatch(setGrassGrowthStage(response.data.grassGrowthStage));
};

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

