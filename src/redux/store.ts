import {actionLog} from "./middlewares/actionLog";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {recommendedProductsSlice} from "./recommendProducts/slice";
import {productDetailSlice} from "./productDetail/slice";
import {productSearchSlice} from "./productSearch/slice";
import {userSlice} from "./user/slice";
import {shoppingCartSlice} from "./shoppingCart/slice";
import {orderSlice} from "./order/slice";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"
import {languageSlice} from "./language/slice";

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["user"]
}

const rootReducer = combineReducers(
    {
        language: languageSlice.reducer,
        recommendedProducts: recommendedProductsSlice.reducer,
        productDetail: productDetailSlice.reducer,
        productSearch: productSearchSlice.reducer,
        user: userSlice.reducer,
        shoppingCart: shoppingCartSlice.reducer,
        order: orderSlice.reducer
    }
)

const persistedReducer = persistReducer(persistConfig, rootReducer);

// reducers are saved in store
const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
        devTools: true
    }
);

const persistor = persistStore(store);

// state of the store, including everything in redux folder
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const stores = {store, persistor};
export default stores;