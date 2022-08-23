import React from "react";
import {AuthenticationLayout} from "../../layouts";
import {LoginForm} from "../../components";

export const Login = () => {
    return (
        <AuthenticationLayout>
            <LoginForm/>
        </AuthenticationLayout>
    )
}