import React, {useEffect} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import styles from "./LoginForm.module.css";
import {useReduxSelector, useReduxDispatch} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import {login} from "../../redux/authentication/slice";

export const LoginForm = () => {

    const loading = useReduxSelector((s) => s.authentication.loading);
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);

    const dispatch = useReduxDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtToken !== null) {
            navigate("/");
        }
    }, [navigate, jwtToken])

    const onFinish = (values) => {
        console.log("Success:", values);
        dispatch(login({
            email: values.username,
            password: values.password
        }))
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
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
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
