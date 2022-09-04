import React from "react";
import { AuthnLayout } from "../layouts";
import { LoginForm } from "../components";

const LoginPage = () => {
    return (
        <AuthnLayout>
            <LoginForm />
        </AuthnLayout>
    );
};

export default LoginPage;
