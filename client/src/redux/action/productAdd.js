import { createAsyncThunk } from "@reduxjs/toolkit";

export const actionName = createAsyncThunk(
    "actionName",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { data } = await api.get("/apiEndPoint")
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })