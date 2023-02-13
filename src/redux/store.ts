import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './api/products/productAPI';

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
