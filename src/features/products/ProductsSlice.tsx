import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:3000/products');
  return response.data.map((p: any) => ({ 
    ...p,
    price: Number(p.price),
  }));
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [] as any[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default productsSlice.reducer;
