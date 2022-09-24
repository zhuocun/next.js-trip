import React from "react";
import { AuthLayout } from "../layouts";
import { LoginForm } from "../components/loginForm";
import { NextPage } from "next";

const Login: NextPage = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};

export default Login;
