import React from "react";
import "../styles/globals.css";
import "../i18n/configs";
import rootStore from "../redux/store";
import { Provider } from "react-redux";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import { AppProps } from "next/app";

axios.defaults.headers["x-icode"] = "5AFFC4226F716869";

const NextJSTrip = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={rootStore.store}>
            <PersistGate persistor={rootStore.persistor} loading={null}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
};

export default NextJSTrip;
