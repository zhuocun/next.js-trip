import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// define state
interface CollectionState {
    loading: boolean;
    error: string | null;
    collections: IProductCollection[];
}

// define default state
const initialState: CollectionState = {
    loading: true,
    error: null,
    collections: []
};

export const getCollection = createAsyncThunk(
    "collection/getCollection",
    async () => {
        const axiosResponse = await axios.get(
            `http://123.56.149.216:8080/api/productCollections`
        );
        console.log(axiosResponse.data);
        return axiosResponse.data;
    }
);

export const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {},
    extraReducers: {
        [getCollection.pending.type]: (state) => {
            state.loading = true;
        },
        [getCollection.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.collections = action.payload;
        },
        [getCollection.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
