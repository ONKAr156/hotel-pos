import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "./api/loginApi";
import { waiterApi } from "./api/waiterApi";
import { orderApi } from "./api/OrderApi";
import waiterSlice from "./slice/waiterSlice";


const reduxStore = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
        [waiterApi.reducerPath]: waiterApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        waiterData: waiterSlice
    },
    middleware: def => [...def(),
    loginApi.middleware,
    waiterApi.middleware,
    orderApi.middleware,]
})

export default reduxStore