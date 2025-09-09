import { createSlice }  from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  selected: boolean;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}


const loadCart = (): CartState => {
  try {
    const stored = localStorage.getItem("cart");
    return stored? JSON.parse(stored) : { items: [], totalItems: 0, totalPrice: 0};
  } catch {
    return { items: [], totalItems: 0, totalPrice: 0};
  }
}

const saveCart = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state));
};


const initialState: CartState = loadCart();



// const initialState: CartState = {
//   items: [],
//   totalItems: 0,
//   totalPrice: 0,
// }

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
        state.items.push({ id, name, price, image, quantity, selected: true });

      } 
      recalcTotals(state);
      saveCart(state);
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((it) => it.id !== action.payload.id);
      recalcTotals(state);

      saveCart(state);
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const it = state.items.find((i) => i.id === action.payload.id);
      if (!it) return;

      it.quantity = Math.max(1, action.payload.quantity);
      recalcTotals(state);

      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      recalcTotals(state);

      saveCart(state);
    },

    toggleItemSelection: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.selected = !item.selected;
        saveCart(state);
      }
  },

  selectAllItems: (state) => {
    state.items.forEach(item => item.selected = true);
    saveCart(state);
  },

  deselectedAllItems: (state) => {
    state.items.forEach(item => item.selected = false);
    saveCart(state);
  },

  removeSelectedItems: (state) => {
    state.items = state.items.filter(item => !item.selected)
    recalcTotals(state);
    saveCart(state);
  },
},
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleItemSelection,
  selectAllItems, 
  deselectAllItems,
  removeSelectedItems,
} = CartSlice.actions;
export default CartSlice.reducer;
