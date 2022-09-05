import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createOrder } from "./shoppingCartSlice";
import {OrderSet} from "../../components/checkoutCard";

interface OrderState {
    loading: boolean;
    error: string | null;
    currentOrder: OrderSet | null;
}

const initialState: OrderState = {
    loading: false,
    error: null,
    currentOrder: null
};

export const checkout = createAsyncThunk(
    "order/checkout",
    async (parameters: { jwtToken: string, orderId: string | undefined }) => {
        const axiosResponse = await axios.post(
            `http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`,
            null,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: {
        // create order, save response data from backend
        [createOrder.pending.type]: (state) => {
            state.loading = true;
        },
        [createOrder.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload;
            state.loading = false;
            state.error = null;
        },
        [createOrder.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
        [checkout.pending.type]: (state) => {
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload;
            state.loading = false;
            state.error = null;
        },
        [checkout.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
