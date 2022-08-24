import React from "react";
import {AuthenticationLayout} from "../../layouts";
import {LoginForm} from "../../components";

export const LoginPage = () => {
    return (
        <AuthenticationLayout>
            <LoginForm/>
        </AuthenticationLayout>
    )
}