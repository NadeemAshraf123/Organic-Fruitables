import { createSlice }  from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

const recalcTotals = (state: CartState) => {
  state.totalItems = state.items.reduce((sum, it) => sum + it.quantity, 0);
  state.totalPrice = state.items.reduce((sum, it) => sum + Number(it.price) * it.quantity, 0);
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>
    ) => {
      const { id, name, price, image } = action.payload;
      const quantity = action.payload.quantity ?? 1;
      const existing = state.items.find((it) => it.id === id);
      
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id, name, price, image, quantity });

      } 
      recalcTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((it) => it.id !== action.payload.id);
      recalcTotals(state);
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const it = state.items.find((i) => i.id === action.payload.id);
      if (!it) return;

      it.quantity = Math.max(1, action.payload.quantity);
      recalcTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      recalcTotals(state);
    },

  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
