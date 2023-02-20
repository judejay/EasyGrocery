import React from 'react';
import { IProduct } from '../../redux/api/products/productsSlice';
import { RootState } from '../../redux/store/store';
import CartItem from './CartItem';
import { nf } from '../../helpers/numberFormatter';
import { useAppSelector } from '../../redux/hooks';
import { getMemoizedNumItems } from '../../features/cartSlice';
import { IUser } from '../../features/userSlice';

const Cart = () => {
    const items: IProduct[] = useAppSelector((state: RootState) => state.cart.items);
    const numberOfItems = useAppSelector(getMemoizedNumItems);
    const Noitems = items.length === 0;
    const user = useAppSelector((state: RootState) => state.user);
    const Membership = (user: IUser) => user.member === true;
    const calculateFee = (user: IUser) => user.member && user.membershipPaid === false;
    const calculateTotalNoMembership = (items: IProduct[]) => items.reduce((ack: number, item) => ack + item.price * item.quantity!, 0);
    const calculateTotalMembership = (items: IProduct[]) => items.reduce((ack: number, item) => ack + item.price * item.quantity!, 0) * 0.8;
    return (
        <>
            <div className=" flex-column font-sans content-center">
                <div className="flex items-center relative mt-4 ">
                    <h1 className="mx-4 mb-8 flex-auto text-lg font-semibold text-black-900">
                        {`Your shopping cart has `}
                        {Noitems ? <span>no Items</span> : <span>{numberOfItems} Items </span>}
                    </h1>
                </div>
            </div>
            {items.map((item) => (
                <CartItem key={item.groceryId} item={item}></CartItem>
            ))}
            {calculateFee(user) ? (
                <>
                    <div className=" flex-row font-sans ">
                        <div className=" mx-8  flex-auto text-lg font-semibold text-slate-300">
                            {' '}
                            <span>1 X </span>
                            Membership at <span>{nf.format(5.0)}</span>
                        </div>
                    </div>
                </>
            ) : (
                <div className=" mx-4  flex-auto text-lg font-semibold text-red-300">Become a member to get 20% discount </div>
            )}

            {Noitems ? null : (
                <h2 className="mx-4 my-8 flex-auto text-lg font-semibold text-black-900">
                    Total: {Membership(user) ? nf.format(calculateTotalMembership(items) + 5) : nf.format(calculateTotalNoMembership(items))}
                </h2>
            )}
        </>
    );
};

export default Cart;
