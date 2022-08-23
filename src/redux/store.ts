import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import {actionLog} from "./middlewares/actionLog";
import {productDetailSlice} from "./productDetail/slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {productSearchSlice} from "./productSearch/slice";
import {userSlice} from "./user/slice";

const rootReducer = combineReducers(
    {
        language: languageReducer,
        recommendProducts: recommendProductsReducer,
        productDetail: productDetailSlice.reducer,
        productSearch: productSearchSlice.reducer,
        user: userSlice.reducer
    }
)

// reducers are saved in store
const store = configureStore(
    {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
        devTools: true
    }
);

// state of the store, including everything in redux folder
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;