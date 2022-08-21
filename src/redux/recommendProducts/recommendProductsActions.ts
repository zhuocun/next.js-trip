import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START =
    "FETCH_RECOMMEND_PRODUCTS_START";

export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
    "FETCH_RECOMMEND_PRODUCTS_SUCCESS";

export const FETCH_RECOMMEND_PRODUCTS_FAIL =
    "FETCH_RECOMMEND_PRODUCTS_FAIL";

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
    payload: any;
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
    payload: any;
}

export type RecommendProductsActions =
      FetchRecommendProductsStartAction
    | FetchRecommendProductsSuccessAction
    | FetchRecommendProductsFailAction;

export const fetchRecommendProductStartActionCreator =
    (): FetchRecommendProductsStartAction => {
        return (
            {type: FETCH_RECOMMEND_PRODUCTS_START}
        );
};

export const fetchRecommendProductSuccessActionCreator =
    (data): FetchRecommendProductsSuccessAction => {
        return (
            {
                type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
                payload: data
            }
        );
};

export const fetchRecommendProductFailActionCreator =
    (error): FetchRecommendProductsFailAction => {
        return (
            {
                type: FETCH_RECOMMEND_PRODUCTS_FAIL,
                payload: error
            }
        );
};

/*
    1. call action creators when in the process of fetching data
    2. action creators will change the type of actions
    3. reducer will update state once the action type is changed
    4. UI will update once the state is changed
 */
export const giveMeDataActionCreator = ():
    ThunkAction<void, RootState, undefined, RecommendProductsActions> =>
    async (dispatch) => {
        dispatch(fetchRecommendProductStartActionCreator());
        try {
            const {data} = await axios.get(
                "http://123.56.149.216:8080/api/productCollections"
            );
            dispatch(fetchRecommendProductSuccessActionCreator(data));
        } catch (error) {
            dispatch(fetchRecommendProductFailActionCreator
            (error instanceof Error ? error.message : "error"));
        }
    };
