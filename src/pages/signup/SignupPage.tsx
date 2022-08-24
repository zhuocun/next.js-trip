import React from "react";
import {AuthenticationLayout} from "../../layouts";
import {SignupForm} from "../../components";

export const SignupPage = () => {
    return (
        <AuthenticationLayout>
            <SignupForm/>
        </AuthenticationLayout>
    )
}