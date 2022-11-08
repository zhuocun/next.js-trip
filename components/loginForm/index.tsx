import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { login } from "../../redux/reducers/authSlice";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { getShoppingCart } from "../../redux/reducers/cartSlice";
import { IconType, NotificationPlacement } from "antd/lib/notification";

const LoginForm: React.FC = () => {
    const loading = useReduxSelector((s) => s.auth.loading);
    const dispatch = useReduxDispatch();
    const router = useRouter();

    const openNotification = (
        description: string,
        placement: NotificationPlacement,
        type: IconType | undefined
    ) => {
        notification.open({
            message: "Notification",
            placement,
            description,
            type: type,
            duration: 1.5
        });
    };

    const onFinish = (values) => {
        dispatch(
            login({
                email: values.username,
                password: values.password
            })
        ).then((res) => {
            if (res.payload) {
                openNotification(
                    "Login successful! Redirecting...",
                    "top",
                    "success"
                );
                dispatch(getShoppingCart(res.payload)).then(() =>
                    router.push("/")
                );
            } else {
                onFinishFailed();
            }
        });
    };

    const onFinishFailed = () => {
        openNotification("Login failed, please try again.", "top", "error");
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
