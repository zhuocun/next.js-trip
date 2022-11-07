import React from "react";
import LoginForm from "../components/loginForm";
import { NextPage } from "next";
import AuthLayout from "../layouts/authLayout";

const Login: NextPage = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};

export default Login;
