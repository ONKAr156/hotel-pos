import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/api/',
    credentials: 'include'  // Add this line
  }),
  endpoints: (builder) => ({

    waiterLogin: builder.mutation({
      query: (userData) => ({
        url: 'waiter/login',
        method: 'POST',
        body: userData
      })
    }),
    adminLogin: builder.mutation({
      query: (userData) => ({
        url: 'admin/login',
        method: 'POST',
        body: userData
      })
    }),
  }),
});

export const { useWaiterLoginMutation, useAdminLoginMutation } = loginApi;