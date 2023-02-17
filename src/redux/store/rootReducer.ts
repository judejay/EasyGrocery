import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../api/products/productsSlice';
import cartReducer from '../../features/cartSlice';
import userReducer from '../../features/userSlice';

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    user: userReducer
});

// export type RootState = ReturnType<typeof rootReducer>;
// export default rootReducer;
