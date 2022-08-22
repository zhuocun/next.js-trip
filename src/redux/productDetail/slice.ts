import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {
        fetchStart: (state) => {
            //return {...state, loading: true};
            state.loading = true; // with immer
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload;
        },
        fetchFail: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

