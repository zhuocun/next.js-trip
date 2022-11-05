import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import styles from "./index.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export const RegisterForm: React.FC = () => {
    const router = useRouter();

    const onFinish = async (values: {
        username: string,
        password: string,
        confirm: string
    }) => {
        console.log("Success:", values);
        try {
            await axios.post("http://123.56.149.216:8080/auth/register", {
                email: values.username,
                password: values.password,
                confirmPassword: values.confirm
            });
            router.push("/Login/").then();
        } catch (error) {
            alert("Register failed");
        }
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
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
