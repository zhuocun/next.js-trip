import React from "react";
import RegisterForm from "../components/registerForm";
import { NextPage } from "next";
import AuthLayout from "../layouts/authLayout";

const Register: NextPage = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
};

export default Register;
