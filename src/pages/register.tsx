import React from "react";
import { AuthnLayout } from "../layouts";
import { RegisterForm } from "../components";

export const RegisterPage = () => {
    return (
        <AuthnLayout>
            <RegisterForm />
        </AuthnLayout>
    );
};
