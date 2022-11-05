import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchState {
    loading: boolean;
    error: string | null;
    searchResult: ITouristRoute[] | null;
    pagination: IPagination | null;
}

const initialState: ProductSearchState = {
    loading: true,
    error: null,
    searchResult: null,
    pagination: null
};

export const search = createAsyncThunk(
    "productSearch/search",
    async (parameters: {
        keywords: string | string[],
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

export const searchSlice = createSlice({
    name: "productSearch",
    initialState,
    reducers: {},
    extraReducers: {
        [search.pending.type]: (state) => {
            state.loading = true;
        },
        [search.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.searchResult = action.payload.searchResult;
            state.pagination = action.payload.pagination;
        },
        [search.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
