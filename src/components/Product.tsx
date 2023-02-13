import React from 'react';
import { IProduct } from '../redux/api/products/productAPI';
import { useAppSelector } from '../redux/hooks';

type ProductProps = {
    groceryId: string;
    name: string;
    price: number;
    description: string;
    quantity?: number | undefined;
    slug: string;
};

const Product = ({ groceryId, name, price, quantity, slug, description }: ProductProps) => {
    const Image = require('../pictures/' + slug + '.jpg');

    return (
        <div className="w-48  bg-white shadow mx-auto px-4 mt-4 rounded  ">
            <div className=" flex-row font-sans ">
                <div className="flex w-48 relative ">
                    <img src={Image} alt={description} className="relative inset-0 w-full h-full object-cover" loading="lazy" />
                </div>
                <form className="flex-auto p-6">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-lg font-semibold text-slate-900">{description}</h1>
                        <div className="text-lg font-semibold text-slate-500">$110.00</div>
                        <div className="w-full bg-green-300 flex-none text-sm font-medium text-slate-700 mt-2">In stock</div>
                    </div>
                    <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                        <div className="space-x-2 flex text-sm">
                            <label>
                                <input className="sr-only peer" name="size" type="radio" value="xs" checked />
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                    XS
                                </div>
                            </label>
                            <label>
                                <input className="sr-only peer" name="size" type="radio" value="s" />
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">S</div>
                            </label>
                            <label>
                                <input className="sr-only peer" name="size" type="radio" value="m" />
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">M</div>
                            </label>
                            <label>
                                <input className="sr-only peer" name="size" type="radio" value="l" />
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">L</div>
                            </label>
                            <label>
                                <input className="sr-only peer" name="size" type="radio" value="xl" />
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                    XL
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-6 text-sm font-medium">
                        <div className="flex-auto flex space-x-4">
                            <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                                At to Cart
                            </button>
                            <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                                Remove from Cart
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-slate-700">Free shipping on all continental US orders.</p>
                </form>
            </div>
        </div>
    );
};

export default Product;
