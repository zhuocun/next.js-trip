import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import environment from "../../constants/env";

interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    cartItems: CartItem[];
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    cartItems: []
};

export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwt: string | null) => {
        const axiosResponse = await axios.get(
            `${environment.apiBaseUrl}/shoppingCart`,
            {
                headers: {
                    Authorization: `bearer ${jwt}`
                }
            }
        );
        return axiosResponse.data.shoppingCartItems;
    }
);

export const addToCart = createAsyncThunk(
    "shoppingCart/addToCart",
    async (parameters: { jwt: string; touristRouteId: string | undefined }) => {
        const axiosResponse = await axios.post(
            `${environment.apiBaseUrl}/shoppingCart/items`,
            {
                touristRouteId: parameters.touristRouteId
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`
                }
            }
        );
        return axiosResponse.data.shoppingCartItems;
    }
);

export const createOrder = createAsyncThunk(
    "shoppingCart/createOrder",
    async (jwt: string | null) => {
        const axiosResponse = await axios.post(
            `${environment.apiBaseUrl}/shoppingCart/checkout`,
            null,
            {
                headers: {
                    Authorization: `bearer ${jwt}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const clearCart = createAsyncThunk(
    "shoppingCart/clearCart",
    async (parameters: { jwt: string | null; itemIds: number[] }) => {
        let url = `${environment.apiBaseUrl}/shoppingCart/items/`;
        url += `(${parameters.itemIds.join(",")})`;
        return await axios.delete(url, {
            headers: {
                Authorization: `bearer ${parameters.jwt}`
            }
        });
    }
);

export const cartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: {
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.cartItems = action.payload;
        },
        [getShoppingCart.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addToCart.pending.type]: (state) => {
            state.loading = true;
        },
        [addToCart.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.cartItems = action.payload;
        },
        [addToCart.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
        [clearCart.pending.type]: (state) => {
            state.loading = true;
        },
        [clearCart.fulfilled.type]: (state) => {
            state.loading = false;
            state.error = null;
            state.cartItems = [];
        },
        [clearCart.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
