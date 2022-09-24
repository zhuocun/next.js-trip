import React from "react";
import { AuthLayout } from "../layouts";
import { RegisterForm } from "../components/registerForm";
import { NextPage } from "next";

const Register: NextPage = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
};

export default Register;
