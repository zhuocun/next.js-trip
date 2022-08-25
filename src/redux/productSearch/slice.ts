import {createSlice, createAsyncThunk, PayloadAction,} from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchState {
    loading: boolean;
    error: string | null;
    searchResult: any;
    pagination: any;
}

const initialState: ProductSearchState = {
    loading: true,
    error: null,
    searchResult: null,
    pagination: null
}

export const searchProduct = createAsyncThunk(
    // typePrefix does not matter
    "productSearch/searchProduct",
    async (
        parameters: {
            keywords: string,
            nextPage: number | string,
            pageSize: number | string
        }) => {
        let url = `http://123.56.149.216:8080/api/touristRoutes?`;
        url += `pageNumber=${parameters.nextPage}`;
        url += `&pageSize=${parameters.pageSize}`;
        url += `&keyword=${parameters.keywords}`;
        const axiosResponse = await axios.get(url);
        return {
            searchResult: axiosResponse.data,
            pagination: JSON.parse(axiosResponse.headers["x-pagination"])
        };
    }
);

export const productSearchSlice = createSlice({
    name: "productSearch",
    initialState,
    reducers: {},
    extraReducers: {
        [searchProduct.pending.type]: (state) => {
            state.loading = true;
        },
        [searchProduct.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.searchResult = action.payload.searchResult;
            state.pagination = action.payload.pagination;
        },
        [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

