import React from 'react';
import { getMemoizedNumItems } from '../../features/cartSlice';
import { IUser } from '../../features/userSlice';
import { nf } from '../../helpers/numberFormatter';
import { IProduct } from '../../redux/api/products/productsSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store/store';
import CartItem from '../cart/CartItem';
import { useCreatePurchaseOrderMutation } from '../../redux/api/products/productsSlice';

function Checkout() {
    const [createPurchaseOrder, response] = useCreatePurchaseOrderMutation();
    const items: IProduct[] = useAppSelector((state: RootState) => state.cart.items);
    const numberOfItems = useAppSelector(getMemoizedNumItems);
    const Noitems = items.length === 0;
    const user = useAppSelector((state: RootState) => state.user);
    const Membership = (user: IUser) => user.member === true;
    const calculateFee = (user: IUser) => user.member && user.membershipPaid === false;
    const calculateTotalNoMembership = (items: IProduct[]) => items.reduce((ack: number, item) => ack + item.price * item.quantity!, 0);
    const calculateTotalMembership = (items: IProduct[]) => items.reduce((ack: number, item) => ack + item.price * item.quantity!, 0) * 0.8;
    const onHandleSubmit = (user: IUser, items: IProduct[]) => {
        let data = { user, items };

        return createPurchaseOrder(data);
    };
    return (
        <div>
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
                <div className="flex">
                    <h2 className="mx-4 my-8 flex-auto text-lg font-semibold text-black-900">Shipping Address : </h2>
                </div>
                <div>
                    <h3> {user.name},</h3>
                </div>
                <div>
                    <h3> {user.houseNumber}, </h3>
                </div>
                <div>
                    <h3> {user.streetname}, </h3>
                </div>
                <div>
                    <h3> {user.town}, </h3>
                </div>
                <div>
                    <h3> {user.postCode}, </h3>
                </div>
                <div>
                    <h3>{user.country} </h3>
                </div>

                <button onClick={() => onHandleSubmit(user, items)} className=" my-4 bg-red-300 hover:bg-gray-700 hover:text-white text-white px-3 py-2 rounded-md text-sm font-medium">
                    Purchase
                </button>
            </>
        </div>
    );
}

export default Checkout;
