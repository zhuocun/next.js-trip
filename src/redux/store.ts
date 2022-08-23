import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import {actionLog} from "./middlewares/actionLog";
import {productDetailSlice} from "./productDetail/slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {productSearchSlice} from "./productSearch/slice";
import {userSlice} from "./user/slice";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["user"]
}

const rootReducer = combineReducers(
    {
        language: languageReducer,
        recommendProducts: recommendProductsReducer,
        productDetail: productDetailSlice.reducer,
        productSearch: productSearchSlice.reducer,
        user: userSlice.reducer
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