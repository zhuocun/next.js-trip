import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { login } from "../../redux/reducers/authSlice";
import { useRouter } from "next/router";
import styles from "./index.module.css";

const LoginForm: React.FC = () => {
    const loading = useReduxSelector((s) => s.auth.loading);
    const jwt = useReduxSelector((s) => s.auth.jwt);

    const dispatch = useReduxDispatch();
    const router = useRouter();

    useEffect(() => {
        if (jwt) {
            router.push("/").then();
        }
    }, [jwt]);

    const onFinish = (values) => {
        dispatch(
            login({
                email: values.username,
                password: values.password
            })
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 5
            }}
            wrapperCol={{
                span: 16
            }}
            initialValues={{
                remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles["login-form"]}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!"
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!"
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 4,
                    span: 16
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 16
                }}
            >
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
