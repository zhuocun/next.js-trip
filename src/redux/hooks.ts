import {useSelector, TypedUseSelectorHook, useDispatch} from "react-redux";
import {AppDispatch, RootState} from "./store";

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();