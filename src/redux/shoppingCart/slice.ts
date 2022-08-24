import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    items: [];
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: []
}
export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwtToken: string, thunkAPI) => {
        const {data} = await axios.get(
            `http://123.56.149.216:8080/api/shoppingCart`,
            {
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            }
        );
        return data.shoppingCartItems;
    }
);

export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: { jwtToken: string, touristRouteId: string }, thunkAPI) => {
        const {data} = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/items`,
            {
                touristRouteId: parameters.touristRouteId
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwtToken}`
                }
            }
        );
        return data.shoppingCartItems;
    }
);

export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: { jwtToken: string, itemIds: number[] }, thunkAPI) => {
        return await axios.delete(
            `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(",")})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwtToken}`
                }
            }
        );
    }
);

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: {
        // get shopping cart
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = action.payload;
        },
        [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // add item to shopping cart
        [addShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = action.payload;
        },
        [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // clear shopping cart
        [clearShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [clearShoppingCartItem.fulfilled.type]: (state) => {
            state.loading = false;
            state.error = null;
            state.items = [];
        },
        [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

