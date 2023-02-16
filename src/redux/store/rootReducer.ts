import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../api/products/productsSlice';
import cartReducer from '../../features/cartSlice';

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
});

// export type RootState = ReturnType<typeof rootReducer>;
// export default rootReducer;
