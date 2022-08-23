/*
    thunk does creators' job more intelligently
    slice does reducer's job more intelligently
 */
import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

// state of page
interface UserState {
    loading: boolean;
    error: string | null;
    token: string | null;
}

// initial state of page
const initialState: UserState = {
    loading: false,
    error: null,
    token: null
}

/*
    thunk does creators' job more intelligently:
    1. by returning action type:
        change actions
    2. reducer will update state once the action type is changed
    3. UI will update once the state is changed
 */
export const login = createAsyncThunk(
    "user/login",
    async (parameters: {
        email: string,
        password: string
    }) => {
        const {data} = await axios.post(
            `http://123.56.149.216:8080/auth/login`, {
                email: parameters.email,
                password: parameters.password
            }
        );
        return data.token;
    }
);

/*
    createAsyncThunk + slice = creator + reducer
    slice does reducer's job:
        1 listen to action type automatically by
            using returned action type of thunk
        2 change state based on action type
 */
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.error = null;
            state.token = null;
        }
    },
    /*
        1. use returned action type of thunk
        2. be care of naming rule of extra reducers
     */
    extraReducers: {
        // action.type == loading
        [login.pending.type]: (state) => {
            //return {...state, loading: true};
            state.loading = true; // with immer
        },
        // action.type == success
        [login.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.token = action.payload;
        },
        // action.type = error
        [login.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.token = action.payload;
        }
    }
});

