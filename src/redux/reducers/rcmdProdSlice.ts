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

export const getRecommendedProducts = createAsyncThunk(
    "recommendedProducts/getRecommendedProducts",
    async () => {
        const axiosResponse = await axios.get(
            `http://123.56.149.216:8080/api/productCollections`
        );
        console.log(axiosResponse.data);
        return axiosResponse.data;
    }
);

export const recommendedProductsSlice = createSlice({
    name: "recommendedProducts",
    initialState,
    reducers: {},
    extraReducers: {
        [getRecommendedProducts.pending.type]: (state) => {
            state.loading = true;
        },
        [getRecommendedProducts.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.productList = action.payload;
        },
        [getRecommendedProducts.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
