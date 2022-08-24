import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    items: any[];
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: [],
};

export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwtToken: string) => {
        const {data} = await axios.get(
            `http://123.56.149.216:8080/api/shoppingCart`,
            {
                headers: {
                    Authorization: `bearer ${jwtToken}`,
                },
            }
        );
        return data.shoppingCartItems;
    }
);

export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: { jwtToken: string; touristRouteId: string }) => {
        const {data} = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/items`,
            {
                touristRouteId: parameters.touristRouteId,
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwtToken}`,
                },
            }
        );
        return data.shoppingCartItems;
    }
);

export const checkout = createAsyncThunk(
    "shoppingCart/checkout",
    async (jwtToken: string) => {
        const {data} = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/checkout`,
            null,
            {
                headers: {
                    Authorization: `bearer ${jwtToken}`,
                },
            }
        );
        return data;
    }
);

export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: { jwtToken: string; itemIds: number[] }) => {
        return await axios.delete(
            `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(
                ","
            )})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwtToken}`,
                },
            }
        );
    }
);

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: {
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getShoppingCart.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [addShoppingCartItem.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
        [clearShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [clearShoppingCartItem.fulfilled.type]: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        [clearShoppingCartItem.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
        [checkout.pending.type]: (state) => {
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        [checkout.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
