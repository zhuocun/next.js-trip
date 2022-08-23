/*
    thunk does creators' job more intelligently
    slice does reducer's job more intelligently
 */
import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

// state of page
interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}

// initial state of page
const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null
}

/*
    thunk does creators' job more intelligently:
    1. by returning action type:
        change actions
    2. reducer will update state once the action type is changed
    3. UI will update once the state is changed
 */
export const getProductDetail = createAsyncThunk(
    "productDetail/getProductDetail",
    async (touristRouteId: string) => {
        const {data} = await axios.get(
            `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        );
        return data;
    }
);

/*
    createAsyncThunk + slice = creator + reducer
    slice does reducer's job:
        1 listen to action type automatically by
            using returned action type of thunk
        2 change state based on action type
 */
export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {

    },
    /*
        1. use returned action type of thunk
        2. be care of naming rule of extra reducers
     */
    extraReducers: {
        // action.type == loading
        [getProductDetail.pending.type]: (state) => {
            //return {...state, loading: true};
            state.loading = true; // with immer
        },
        // action.type == success
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload;
        },
        // action.type = error
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

