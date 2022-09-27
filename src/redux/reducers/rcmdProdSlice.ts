import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// define state
interface RecommendedProductsState {
    loading: boolean;
    error: string | null;
    productList: { touristRoutes: ITouristRoute }[];
}

// define default state
const initialState: RecommendedProductsState = {
    loading: true,
    error: null,
    productList: []
};

export const recommendProducts = createAsyncThunk(
    "recommendedProducts/recommendProducts",
    async () => {
        const axiosResponse = await axios.get(
            `http://123.56.149.216:8080/api/productCollections`
        );
        return axiosResponse.data;
    }
);

export const recommendedProductsSlice = createSlice({
    name: "recommendedProducts",
    initialState,
    reducers: {},
    extraReducers: {
        [recommendProducts.pending.type]: (state) => {
            state.loading = true;
        },
        [recommendProducts.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.productList = action.payload;
        },
        [recommendProducts.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
