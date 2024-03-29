import React from "react";
import "styles/globals.css";
import "i18n/configs";
import store from "redux/store";
import { Provider } from "react-redux";
import axios from "axios";
import { AppProps } from "next/app";

axios.defaults.headers["x-icode"] = "5D3A997F0D09A968";

const NextJSTrip = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={store}>
            {/*<PersistGate persistor={rootStore.persistor} loading={null}>*/}
            <Component {...pageProps} />
            {/*</PersistGate>*/}
        </Provider>
    );
};

export default NextJSTrip;
