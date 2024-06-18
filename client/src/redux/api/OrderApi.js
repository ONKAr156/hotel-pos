import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/waiter' }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getTableOrder: builder.query({
            query: (id) => `/orders/by-table/${id}`,
            providesTags: ['Order'],
        }),
        addOrder: builder.mutation({
            query: ({ table, ...userData }) => ({
                url: `/orders/add-order/${table}`,
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Order'],
        }),

        deleteItemFromOrder: builder.mutation({
            query: ({ tableId, itemId }) => ({
                url: `/orders/delete/${tableId}`,
                method: 'DELETE',
                body: { itemId },
            }),
            invalidatesTags: ['Order'],
        }),

        updateItemQuantity: builder.mutation({
            query: ({ table, itemId, newQuantity }) => ({
                url: `orders/update-quantity/${table}`,
                method: 'PUT',
                body: { itemId, newQuantity },
            }),
            invalidatesTags: ['Order'],
        }),
        completOrder: builder.mutation({
            query: (id) => ({
                url: `/order/complete/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const {
    useGetTableOrderQuery,
    useAddOrderMutation,
    useDeleteItemFromOrderMutation,
    useUpdateItemQuantityMutation,
    useCompletOrderMutation } = orderApi;