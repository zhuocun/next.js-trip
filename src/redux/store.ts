import {createStore, applyMiddleware} from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from "redux-thunk";
import {actionLog} from "./middlewares/actionLog";
import {productDetailSlice} from "./productDetail/slice";
import {combineReducers} from "@reduxjs/toolkit"

const rootReducer = combineReducers(
    {
        language: languageReducer,
        recommendProducts: recommendProductsReducer,
        productDetail: productDetailSlice.reducer
    }
)

// reducers are saved in store
const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

// state of the store, including everything in redux folder
export type RootState = ReturnType<typeof store.getState>;

export default store;