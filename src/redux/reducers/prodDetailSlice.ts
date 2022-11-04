import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
    loading: boolean;
    error: string | null;
    productDetail: IProduct | null;
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    productDetail: null
};

export const getProductDetail = createAsyncThunk(
    // typePrefix doesn't matter
    "productDetail/getProductDetail",
    async (touristRouteId: string | string[]) => {
        const axiosResponse = await axios.get(
            `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        );
        return axiosResponse.data;
    }
);

export const prodDetailSlice = createSlice({
    // name doesn't matter
    name: "productDetail",
    initialState,
    reducers: {},
    extraReducers: {
        [getProductDetail.pending.type]: (state) => {
            state.loading = true; // with immer
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.productDetail = action.payload;
        },
        [getProductDetail.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
