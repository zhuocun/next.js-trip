import React from "react";
import { AuthnLayout } from "../layouts";
import { LoginForm } from "../components";

const Login = () => {
    return (
        <AuthnLayout>
            <LoginForm />
        </AuthnLayout>
    );
};

export default Login;
