// features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the cart item interface
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  description?: string;
}

// Define the cart state interface
interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

// Initial state
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return { totalQuantity, totalAmount };
};

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If new item, add it with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    // Remove item from cart completely
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    // Update item quantity
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
      }
    },

    // Decrease item quantity by 1
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity becomes 0
          state.items = state.items.filter(item => item.id !== itemId);
        }

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
      }
    },

    // Increase item quantity by 1
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);

      if (item) {
        item.quantity += 1;

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    // Load cart from localStorage (for persistence)
    loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
  loadCartFromStorage,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// Selectors for easy access to cart data
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state: { cart: CartState }) => state.cart.totalAmount;
export const selectCartItemById = (state: { cart: CartState }, id: number) => 
  state.cart.items.find(item => item.id === id);
export const selectCartIsEmpty = (state: { cart: CartState }) => state.cart.items.length === 0;