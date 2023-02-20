import React from 'react';
import { getMemoizedNumItems } from '../../features/cartSlice';
import { IUser } from '../../features/userSlice';
import { nf } from '../../helpers/numberFormatter';
import { IProduct } from '../../redux/api/products/productsSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store/store';
import CartItem from '../cart/CartItem';

function Checkout() {
    const items: IProduct[] = useAppSelector((state: RootState) => state.cart.items);
    const numberOfItems = useAppSelector(getMemoizedNumItems);
    const Noitems = items.length === 0;
    const user = useAppSelector((state: RootState) => state.user);
    const Membership = (user: IUser) => user.member === true;
    const calculateFee = (user: IUser) => user.member && user.membershipPaid === false;
    const calculateTotalNoMembership = (items: IProduct[]) => items.reduce((ack: number, item) => ack + item.price * item.quantity!, 0);
    const calculateTotalMembership = (items: IProduct[]) => items.reduce((ack: number, item) => ack + item.price * item.quantity!, 0) * 0.8;
    return (
        <div>
            {' '}
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

                {Noitems ? null : (
                    <h2 className="mx-4 my-8 flex-auto text-lg font-semibold text-black-900">
                        Total: {Membership(user) ? nf.format(calculateTotalMembership(items) + 5) : nf.format(calculateTotalNoMembership(items))}
                    </h2>
                )}

                <h2 className="mx-4 my-8 flex-auto text-lg font-semibold text-black-900">
                    Shipping Address :{user.name}, {user.houseNumber}, {user.streetname}, {user.town}, {user.postCode}, {user.country}
                </h2>
                <button className="mb-4 bg-red-300 hover:bg-gray-700 hover:text-white text-white px-3 py-2 rounded-md text-sm font-medium">Deliver</button>
            </>
        </div>
    );
}

export default Checkout;
