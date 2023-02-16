import React from 'react';
import { useDispatch } from 'react-redux';
import { IProduct } from '../../redux/api/products/productsSlice';

interface Props {
    item: IProduct;
}

const CartItem = ({ item: { name, price, quantity } }: Props) => {
    const dispatch = useDispatch();
    <div className="container"></div>;

    return <div>CartItem</div>;
};

export default CartItem;
