import { configureStore } from '@reduxjs/toolkit';
// import productsReducer, { productApi } from '../api/products/productAPI';
//import rootReducer from './rootReducer';
import cartReducer from '../../features/cartSlice';
import { productsSlice } from '../api/products/productsSlice';
import userReducer from '../../features/userSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [productsSlice.reducerPath]: productsSlice.reducer,
        user: userReducer
    },
    devTools: process.env.NODE_ENV !== 'production',

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productsSlice.middleware);
    }
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(productApi)
});

export default store;
// Adding the api middleware enables caching, invalidation, polling,
// and other useful features of `rtk-query`.
//middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware)

// ? show the devTools only in development

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//export type AppDispatch = typeof store.dispatch;
