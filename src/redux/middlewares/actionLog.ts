import {Middleware} from "redux";

export const actionLog: Middleware = (store) => (next) => (action) => {
    console.log("current state", store.getState());
    console.log("fire action", action);
    next(action);
    console.log("update state", store.getState());
}