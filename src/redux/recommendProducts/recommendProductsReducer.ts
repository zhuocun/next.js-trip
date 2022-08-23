/*
    reducer is in charge of
    1. definition of state
    2. update of state
 */
import {RecommendProductsActions} from "./recommendProductsActions";

// define state
interface RecommendProductsState {
    loading: boolean;
    error: string | null;
    productList: any[];
}

// define default state
const defaultState: RecommendProductsState = {
    loading: true,
    error: null,
    productList: []
};

/*
    1. listening to actions
    2. update state based on actions
 */
export const recommendProductReducer =
    (state = defaultState, action: RecommendProductsActions) => {
        switch (action.type) {
            case "FETCH_RECOMMEND_PRODUCTS_START":
                return {...state, loading: true};
            case "FETCH_RECOMMEND_PRODUCTS_SUCCESS":
                return {...state, loading: false, productList: action.payload};
            case "FETCH_RECOMMEND_PRODUCTS_FAIL":
                return {...state, loading: false, error: action.payload};
            default:
                return state;
        }
    };

export default recommendProductReducer;