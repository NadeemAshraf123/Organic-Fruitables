import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if(existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1});
      }
    },
    // optional: removefromcart,updatequantity, clearcart
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

