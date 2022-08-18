import React from 'react';
import styles from "./App.module.css";
import {DetailPage, HomePage, Login, Signup} from "./pages";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/detail/:touristRouterId" element={<DetailPage />} />
                    <Route path="*" element={<h1>404 not found</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
