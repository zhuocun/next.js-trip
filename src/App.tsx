import React, {useEffect} from 'react';
import styles from "./App.module.css";
import {DetailPage, HomePage, LoginPage, SearchPage, SignupPage, ShoppingCartPage, PlaceOrderPage} from "./pages";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {useReduxDispatch, useReduxSelector} from "./redux/hooks";
import {getShoppingCart} from "./redux/shoppingCart/slice";

const PrivateRoute = ({children}) => {
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);
    // unprofessional method
    return jwtToken ? children : <Navigate to="/login"/>;
};

const App = () => {

    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);
    const dispatch = useReduxDispatch();

    useEffect(() => {
        if (jwtToken) {
            dispatch(getShoppingCart(jwtToken));
        }
    }, [dispatch, jwtToken])

    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/detail/:touristRouteId" element={<DetailPage/>}/>
                    <Route path="/search/:keywords" element={<SearchPage/>}/>
                    <Route
                        path="/shoppingCart"
                        element={
                            <PrivateRoute>
                                <ShoppingCartPage/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/placeOrder"
                        element={
                            <PrivateRoute>
                                <PlaceOrderPage/>
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<h1>404 not found</h1>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
