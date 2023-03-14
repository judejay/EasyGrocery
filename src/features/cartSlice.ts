import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../redux/api/products/productsSlice';
import { RootState } from '../redux/store/store';

type CheckoutState = 'LOADING' | 'READY' | 'ERROR';
export interface CartState {
    items: IProduct[];
    cartTotalQuantity: number;
    cartTotalAmount: number;
    checkoutState: CheckoutState;
}

const initialState: CartState = {
    items: [],
    checkoutState: 'READY',
    cartTotalQuantity: 0,
    cartTotalAmount: 0
};

const getItemIndex = (items: IProduct[], idToFind: number): number => {
    const ids = items.map((item) => item.productId);
    return ids.indexOf(idToFind);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<IProduct>) {
            const itemIndex = getItemIndex(state.items, action.payload.productId);
            if (itemIndex < 0) {
                state.items.push({ ...action.payload, quantity: 1 });
            } else {
                state.items[itemIndex].quantity!++;
            }
        },
        // removeFromCart(state, action: PayloadAction<{ productId: number }>) {
        //     return state.items.filter((item) => item.productId !== action.payload.productId);
        // }
        // removeFromCart(state, action: PayloadAction<{ groceryId: string }>) {
        //     return state.items.filter((item) => item.groceryId !== action.payload.groceryId);
        // }
        //,
        // incrementQuantity(state, action: PayloadAction<{ id: string }>) {
        //     const itemIndex = getItemIndex(state, action.payload.id);
        //     state[itemIndex].quantity! += 1;
        // },
        decrementQuantity(state, action: PayloadAction<{ productId: number }>) {
            const itemIndex = getItemIndex(state.items, action.payload.productId);

            if (state.items[itemIndex].quantity! >= 1) state.items[itemIndex].quantity! -= 1;
            else state.items.filter((item) => item.productId !== action.payload.productId);
        }
        // getTotals(state, action) {
        //     let { total, quantity } = state.items.reduce(
        //         (cartTotal, cartItem) => {
        //             const { price, quantity } = cartItem;
        //             const itemTotal = price * quantity!;

        //             cartTotal.total += itemTotal;
        //             cartTotal.quantity += quantity!;

        //             return cartTotal;
        //         },
        //         {
        //             total: 0,
        //             quantity: 0
        //         }
        //     );
        //     state.cartTotalAmount = total;
        //     state.cartTotalQuantity = quantity;
        // }
    }
});
export const getMemoizedNumItems = createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
        //  console.log('calling getMemoizedNumItems');
        let numItems = 0;
        if (items === null) return 0;
        for (let id in items) {
            numItems += items[id].quantity!;
        }
        return numItems;
    }
);
export const { addToCart, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
