import {useSelector, TypedUseSelectorHook} from "react-redux";
import {RootState} from "./store";

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;