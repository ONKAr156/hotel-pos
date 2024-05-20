import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const waiterApi = createApi({
    reducerPath: "waiterApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/waiter" }),
    tagTypes: ["waiterApi"],
    endpoints: (builder) => {
        return {
            getWaiter: builder.query({
                query: (id) => {
                    return {
                        url: "/:id",
                        method: "GET"
                    }
                },
                providesTags: ["waiterApi"]
            }),
            addProduct: builder.mutation({
                query: (id) => {
                    return {
                        url: `/item/${id}`,
                        method: "POST",
                        body: id
                    }
                },
                invalidatesTags: ["waiterApi"]
            }),
            

        }
    }
})

export const { useGetWaiterQuery, useAddProductMutation } = waiterApi
