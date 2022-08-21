import {createStore, combineReducers, applyMiddleware} from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers(
    {
        language: languageReducer,
        recommendProducts: recommendProductsReducer
    }
)

// reducers are saved in store
const store = createStore(rootReducer, applyMiddleware(thunk));

// state of the store, including everything in redux folder
export type RootState = ReturnType<typeof store.getState>;

export default store;