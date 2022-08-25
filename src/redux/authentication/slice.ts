import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface AuthenticationState {
    loading: boolean;
    error: string | null;
    jwtToken: string | null;
}

const initialState: AuthenticationState = {
    loading: false,
    error: null,
    jwtToken: null
}

export const login = createAsyncThunk(
    "authentication/login",
    async (parameters: {
        email: string,
        password: string
    }) => {
        const axiosResponse = await axios.post(
            `http://123.56.149.216:8080/auth/login`, {
                email: parameters.email,
                password: parameters.password
            }
        );
        return axiosResponse.data.token;
    }
);

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.error = null;
            state.jwtToken = null;
        }
    },
    extraReducers: {
        [login.pending.type]: (state) => {
            state.loading = true;
        },
        [login.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.jwtToken = action.payload;
        },
        [login.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.jwtToken = action.payload;
        }
    }
});

