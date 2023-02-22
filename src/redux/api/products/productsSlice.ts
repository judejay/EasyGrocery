import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { CartState } from '../../../features/cartSlice';
import { IUser } from '../../../features/userSlice';

export type PurchaseOrder = IUser & CartState;

export type IProduct = {
    groceryId: string;
    name: string;
    price: number;
    description: string;
    countInStock: number;
    quantity?: number;
    image: string;
    category: string;
    slug: string;
    quantityInStock: number;
};

export const productsSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:44323/api/'
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        // ? Query: Get All Products
        getProducts: builder.query<IProduct[], void>({
            query() {
                return 'Grocery';
            },

            transformResponse: (response: IProduct[]) => response
        }),
        createPurchaseOrder: builder.mutation<PurchaseOrder, any>({
            query(data) {
                return {
                    url: 'PurchaseOrder',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                };
            },
            // invalidatesTags: [{ type: 'purchaseOrder', id: 'LIST' }],
            transformResponse: (response: { data: { purchaseOrder: PurchaseOrder } }) => response.data.purchaseOrder
        })
    })
});

export const { useGetProductsQuery, useCreatePurchaseOrderMutation } = productsSlice;

export default productsSlice.reducer;
