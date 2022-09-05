import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TouristRoute } from "../../interfaces/productList";

interface Product {
    id: number;
    touristRoute: TouristRoute;
    originalPrice: number;
    discountPresent: number;
}

interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    items: Product[];
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: []
};

export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwtToken: string) => {
        const axiosResponse = await axios.get(
            `http://123.56.149.216:8080/api/shoppingCart`,
            {
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            }
        );
        return axiosResponse.data.shoppingCartItems;
    }
);

export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: {
        jwtToken: string,
        touristRouteId: string | undefined
    }) => {
        const axiosResponse = await axios.post(
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
        return axiosResponse.data.shoppingCartItems;
    }
);

// the response data will be saved in order's slice
export const createOrder = createAsyncThunk(
    "shoppingCart/createOrder",
    async (jwtToken: string) => {
        const axiosResponse = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/checkout`,
            null,
            {
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: { jwtToken: string, itemIds: number[] }) => {
        let url = `http://123.56.149.216:8080/api/shoppingCart/items/`;
        url += `(${parameters.itemIds.join(",")})`;
        return await axios.delete(url, {
            headers: {
                Authorization: `bearer ${parameters.jwtToken}`
            }
        });
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
        [getShoppingCart.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
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
        [addShoppingCartItem.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
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
        [clearShoppingCartItem.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
