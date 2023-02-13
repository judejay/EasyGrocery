import React from 'react';
import { useGetProductsQuery } from '../redux/api/products/productAPI';
import Product from './Product';

function Products() {
    const { data, isLoading } = useGetProductsQuery();
    return (
        <div className="container">
            <div className=" flex flex-wrap">
                {isLoading && <div> ....Loading</div>}
                {data &&
                    data.map((product, index) => {
                        return (
                            <Product
                                key={index}
                                description={product.description}
                                quantity={product.quantity}
                                groceryId={product.groceryId}
                                name={product.name}
                                price={product.price}
                                slug={product.slug}
                            ></Product>
                        );
                    })}
            </div>
        </div>
    );
}

export default Products;
