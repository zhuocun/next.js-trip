import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null
}

export const getProductDetail = createAsyncThunk(
    "productDetail/getProductDetail",
    async (touristRouteId: string) => {
        const {data} = await axios.get(
            `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        );
        return data;
    }
);

export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {

    },
    extraReducers: {
        [getProductDetail.pending.type]: (state) => {
            //return {...state, loading: true};
            state.loading = true; // with immer
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload;
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

