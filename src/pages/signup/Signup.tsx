import React from "react";
import {AuthenticationLayout} from "../../layouts";
import {SignupForm} from "../../components";

export const Signup = () => {
    return (
        <AuthenticationLayout>
            <SignupForm/>
        </AuthenticationLayout>
    )
}