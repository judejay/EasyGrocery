import React from 'react';
import { useSelector } from 'react-redux';
import { IProduct } from '../../redux/api/products/productsSlice';
import { RootState } from '../../redux/store/store';
import CartItem from './CartItem';
import { nf } from '../../helpers/numberFormatter';
import { useAppSelector } from '../../redux/hooks';

const Cart = () => {
    const items: IProduct[] = useAppSelector((state: RootState) => state.cart.items);

    const calculateTotal = (items: IProduct[]) => items.reduce((ack: number, item) => ack + item.price * item.quantity!, 0);
    return (
        <>
            <div className=" flex-column font-sans content-center">
                <div className="flex items-center relative mt-4 ">
                    <h1 className="mx-4 mb-8 flex-auto text-lg font-semibold text-black-900">
                        {`Your shopping cart has `}
                        {items.length === 0 ? <span>no Items</span> : <span>{items.length} Items </span>}
                    </h1>
                </div>
            </div>
            {items.map((item) => (
                <CartItem key={item.groceryId} item={item}></CartItem>
            ))}
            {items.length === 0 ? null : <h2 className="mx-4 my-8 flex-auto text-lg font-semibold text-black-900">Total: {nf.format(calculateTotal(items))}</h2>}
        </>
    );
};

export default Cart;
