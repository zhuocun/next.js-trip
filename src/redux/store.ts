import { actionLog } from "./middlewares/actionLog";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { recommendedProductsSlice } from "./reducers/rcmdProdSlice";
import { prodDetailSlice } from "./reducers/prodDetailSlice";
import { prodSearchSlice } from "./reducers/prodSearchSlice";
import { authenticationSlice } from "./reducers/authnSlice";
import { shoppingCartSlice } from "./reducers/shoppingCartSlice";
import { orderSlice } from "./reducers/orderSlice";
import { languageSlice } from "./reducers/langSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["user"]
};

const rootReducer = combineReducers({
    language: languageSlice.reducer,
    recommendedProducts: recommendedProductsSlice.reducer,
    productDetail: prodDetailSlice.reducer,
    productSearch: prodSearchSlice.reducer,
    authentication: authenticationSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// reducers are saved in store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(actionLog),
    devTools: true
});

const persistor = persistStore(store);

// state of the store, including everything in redux folder
export type RootState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

const stores = { store, persistor };
export default stores;
