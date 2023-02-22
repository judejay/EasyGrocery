import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState } from '../../../features/cartSlice';
import { IUser } from '../../../features/userSlice';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { buildQueries } from '@testing-library/react';

export type PurchaseOrder = IUser & CartState;

// const initialState: PurchaseOrder = {
//     name: 'John Doe',
//     member: true,
//     membershipPaid: false,
//     membershipId: 123455,
//     houseNumber: '1',
//     streetname: 'High street',
//     town: 'Newark',
//     postCode: 'NW12 5JX',
//     country: 'UK',
//     items: [],
//     checkoutState: 'READY',
//     cartTotalQuantity: 0,
//     cartTotalAmount: 0
// };

const purchaseOrderSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:44323/api/'
    }),
    tagTypes: ['purchaseOrder'],
    endpoints: (builder) => ({
        getPurchaseOrders: builder.query<PurchaseOrder[], void>({
            query() {
                return 'purchaseOrder';
            },
            transformResponse: (reponse: PurchaseOrder[]) => reponse
        }),

        createPurchaseOrder: builder.mutation<PurchaseOrder, any>({
            query(data) {
                return {
                    url: 'purchaseOrder',
                    method: 'POST',
                    credentials: 'include',
                    body: data,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                };
            },
            invalidatesTags: [{ type: 'purchaseOrder', id: 'LIST' }],
            transformResponse: (response: { data: { purchaseOrder: PurchaseOrder } }) => response.data.purchaseOrder
        })
    })
});

//export const { useGetPurchaseOrdersQuery, useCreatePurchaseOrderMutation } = purchaseOrderSlice;

export default purchaseOrderSlice.reducer;
