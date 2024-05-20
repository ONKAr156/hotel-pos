import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../api/loginApi";


const waiterSlice = createSlice({
    name: "waiterSlice",
    initialState: { },
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
    },
});
export const { updateWaiterData } = waiterSlice.actions
export default waiterSlice.reducer;