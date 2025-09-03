import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CounterSlice';
import productsReducer from '../features/products/ProductsSlice';
import authReducer from '../features/auth/AuthSlice';
import cartReducer from '../features/cart/CartSlice';
// import categoryReducer from '../features/counter/CategorySlice';
// import usersReducer from '../features/counter/UsersSlice';



export const Store = configureStore({
    reducer: {
        counter: counterReducer,
        products: productsReducer,
        auth: authReducer,
        cart: cartReducer,
    }
});


export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
