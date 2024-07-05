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
    totalEarnings?: number; // Добавляем новое свойство
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
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
