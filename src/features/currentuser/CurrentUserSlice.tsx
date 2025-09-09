
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const initialState: User | null = null;

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (_, action: PayloadAction<User>) => action.payload,
    clearCurrentUser: () => null,
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
