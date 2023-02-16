import React from 'react';
import { useGetProductsQuery } from '../../redux/api/products/productsSlice';
import { IProduct } from '../../redux/api/products/productsSlice';
import { nf } from '../../helpers/numberFormatter';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';

function Products() {
    const { data = [], isLoading } = useGetProductsQuery();
    const dispatch = useDispatch();

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));
        //    navigate(`/cart`);
    };
    return (
        <div className="container">
            <div className=" flex flex-wrap">
                {isLoading && <div> ....Loading</div>}

                {data &&
                    data.map((product, index) => {
                        return (
                            <div key={index} className="w-48  bg-white shadow mx-auto px-4 mt-4 rounded  ">
                                <div className=" flex-row font-sans ">
                                    <div className="flex items-center relative mt-4 ">
                                        <img src={product.image} alt={product.description} className="  object-cover aspect-square h-200 w-200" loading="lazy" />
                                    </div>
                                    <div className="flex flex-wrap">
                                        <h1 className="flex-auto text-lg font-semibold text-black-900">{product.name}</h1>
                                    </div>
                                    <div>
                                        <p className="flex-auto text-lg font-semibold text-slate-300">{product.description}</p>
                                    </div>
                                    <div className="text-lg font-semibold text-slate-500">{nf.format(product.price)}</div>{' '}
                                    <div className="w-full bg-green-300 flex-none text-sm font-medium text-slate-700 mt-2">In stock</div>
                                </div>
                                <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>{' '}
                                <div className="flex space-x-4 mb-6 text-sm font-medium">
                                    <div className="flex-auto ">
                                        <button onClick={() => handleAddToCart(product)} className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                                            Add to Cart
                                        </button>
                                        <button className="h-10 mt-4 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                                            Remove from Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Products;
