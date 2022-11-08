import { Button, Checkbox, Form, Input, notification } from "antd";
import React from "react";
import styles from "./index.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { IconType, NotificationPlacement } from "antd/lib/notification";

const RegisterForm: React.FC = () => {
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

    const onFinish = async (values: {
        username: string,
        password: string,
        confirm: string
    }) => {
        try {
            await axios
                .post("http://123.56.149.216:8080/auth/register", {
                    email: values.username,
                    password: values.password,
                    confirmPassword: values.confirm
                })
                .then(() => {
                    openNotification(
                        "Register successful! Redirecting...",
                        "top",
                        "success"
                    );
                    router.push("/login").then();
                });
        } catch (err) {
            onFinishFailed();
        }
    };

    const onFinishFailed = () => {
        openNotification("Register failed, please try again.", "top", "error");
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
            className={styles["register-form"]}
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
                label="Confirm"
                name="confirm"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!"
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject("Confirmation failed");
                            }
                        }
                    })
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
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
