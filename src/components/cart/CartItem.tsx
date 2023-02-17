import React from 'react';
import { useDispatch } from 'react-redux';
import { IProduct } from '../../redux/api/products/productsSlice';
import { nf } from '../../helpers/numberFormatter';

interface Props {
    item: IProduct;
}

const CartItem = ({ item: { name, price, quantity, image, description } }: Props) => {
    const dispatch = useDispatch();
    <div className="container"></div>;

    return (
        <>
            <div className=" flex-row font-sans ">
                <div className=" mx-8  flex-auto text-lg font-semibold text-slate-300">
                    {' '}
                    <span>{quantity} X </span>
                    {name} at <span>{nf.format(price)} each</span>
                </div>
            </div>
        </>
    );
};

export default CartItem;
