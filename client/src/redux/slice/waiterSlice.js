import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../api/loginApi";
import { orderApi } from "../api/OrderApi";


const waiterSlice = createSlice({
    name: "waiterSlice",
    initialState: {},
    reducers: {
        updateWaiterData: (state, { payload }) => {
            state.waiterData = payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            loginApi.endpoints.waiterLogin.matchFulfilled,
            (state, { payload }) => {
                state.waiterData = payload;
            }
        );
        builder.addMatcher(
            orderApi.endpoints.completOrder.matchFulfilled,
            (state, { payload }) => {
                state.waiterData = [];
            }
        );
    },
});
export const { updateWaiterData } = waiterSlice.actions
export default waiterSlice.reducer;