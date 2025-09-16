import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CounterSlice';
import productsReducer from '../features/products/ProductsSlice';
import cartReducer from '../features/cart/CartSlice';
import currentUserReducer from '../features/currentuser/CurrentUserSlice';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
// import categoryReducer from '../features/counter/CategorySlice';
// import usersReducer from '../features/counter/UsersSlice';

const persistConfig = {
  key: 'root',
  storage,
}   



const rootReducer = combineReducers({
    counter: counterReducer,
    products: productsReducer,
    cart: cartReducer,
    currentUser: currentUserReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(Store)


export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
