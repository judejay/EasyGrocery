import React from 'react';
import { useSelector } from 'react-redux';
import { IProduct } from '../../redux/api/products/productsSlice';
import { RootState } from '../../redux/store/store';
import CartItem from './CartItem';

const Cart = () => {
    const items: IProduct[] = useSelector((state: RootState) => state.cart.items);

    const calculateTotal = (items: IProduct[]) => items.reduce((ack: number, item) => ack + item.price * item.quantity!, 0);
    return (
        <>
            <h2>Your shopping cart</h2>
            {items.length === 0 ? <p>No Items in cart</p> : null}
            {items.map((item) => (
                <CartItem key={item.groceryId} item={item}></CartItem>
            ))}
            <h2>Total: £{calculateTotal(items).toFixed(2)}</h2>
        </>
    );
};

export default Cart;
