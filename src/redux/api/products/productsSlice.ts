import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

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
        // ? Query: Get a single product
        getProduct: builder.query<IProduct, string>({
            query(id) {
                return `products/${id}`;
            },
            transformResponse: (response: { data: { product: IProduct } }, args, meta) => response.data.product,
            providesTags: (result, error, id) => [{ type: 'Products', id }]
        }),
        // ? Mutation: Create a product
        createProduct: builder.mutation<IProduct, FormData>({
            query(data) {
                return {
                    url: 'products',
                    method: 'POST',
                    credentials: 'include',
                    body: data
                };
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
            transformResponse: (response: { data: { product: IProduct } }) => response.data.product
        }),
        // ? Mutation: Update Product
        updateProduct: builder.mutation<IProduct, { id: string; formData: FormData }>({
            query({ id, formData }) {
                return {
                    url: `products/${id}`,
                    method: 'PATCH',
                    credentials: 'include',
                    body: formData
                };
            },
            invalidatesTags: (result, error, { id }) =>
                result
                    ? [
                          { type: 'Products', id },
                          { type: 'Products', id: 'LIST' }
                      ]
                    : [{ type: 'Products', id: 'LIST' }],
            transformResponse: (response: { data: { product: IProduct } }) => response.data.product
        }),
        // ? Mutation: Delete product
        deleteProduct: builder.mutation<null, string>({
            query(id) {
                return {
                    url: `products/${id}`,
                    method: 'DELETE',
                    credentials: 'include'
                };
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }]
        })
    })
});

export const { useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useGetProductsQuery, useGetProductQuery, usePrefetch } = productsSlice;

export default productsSlice.reducer;
