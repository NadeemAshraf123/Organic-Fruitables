import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user:any
}
const initialState: AuthState = {
    isAuthenticated: false,
    user: {}
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(user) {
            // state.isAuthenticated = true;
            state.user = user
        },
        logout(state) {
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
