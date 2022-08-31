import React from "react";
import {AuthnLayout} from "../../layouts";
import {LoginForm} from "../../components";

export const LoginPage = () => {
    return (
        <AuthnLayout>
            <LoginForm/>
        </AuthnLayout>
    )
}