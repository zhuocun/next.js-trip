import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./reducers/searchSlice";
import { authSlice } from "./reducers/authSlice";
import { cartSlice } from "./reducers/cartSlice";
import { orderSlice } from "./reducers/orderSlice";
import { languageSlice } from "./reducers/langSlice";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//     key: "root",
//     storage,
//     whiteList: ["user"]
// };

const rootReducer = combineReducers({
    language: languageSlice.reducer,
    search: searchSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// reducers are saved in store
const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(actionLog),
    devTools: true
});

// const persistor = persistStore(store);

// state of the store, including everything in redux folder
export type RootState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

// const stores = { store, persistor };
// export default stores;

export default store;
