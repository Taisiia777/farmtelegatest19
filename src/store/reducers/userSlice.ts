// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    id: number;
    username: string;
    coins: number;
    incomeMultiplier: number;
    coinsPerHour: number;
    xp: number;
    level: number;
    totalEarnings: number; // Добавляем новое свойство
    grassEarnings: number; // Добавляем новое свойство
}

const initialState: { user: UserState | null } = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
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
                state.user.grassEarnings += action.payload;
                state.user.totalEarnings += action.payload;
                state.user.coins += action.payload;
            }
        }
    },
});

export const { setUser, clearUser, updateGrassEarnings } = userSlice.actions;

export default userSlice.reducer;
