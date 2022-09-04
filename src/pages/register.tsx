import React from "react";
import { AuthnLayout } from "../layouts";
import { RegisterForm } from "../components";

const Register = () => {
    return (
        <AuthnLayout>
            <RegisterForm />
        </AuthnLayout>
    );
};

export default Register;
