import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Button, Input, Layout, Menu, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { authSlice } from "../../redux/reducers/authSlice";
import { useRouter } from "next/router";

interface MyJwtPayload extends JwtPayload {
    username: string;
}

const logo = "/logo.svg";

const Header: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useReduxDispatch();

    const jwt = useReduxSelector((s) => s.auth.jwt);
    const [username, setUsername] = useState("");

    const cartItems = useReduxSelector((s) => s.cart.cartItems);
    const loading = useReduxSelector((s) => s.cart.loading);

    const onSearch = (keywords) => {
        for (let i = 0; i < keywords.length; i++) {
            if (keywords[i] !== " ") {
                router.push(`/search/${keywords}`);
                break;
            }
        }
    };

    const onLogout = () => {
        router.push("/").then(() => dispatch(authSlice.actions.logout()));
    };

    useEffect(() => {
        if (jwt) {
            const token = jwt_decode<MyJwtPayload>(jwt);
            setUsername(token.username);
        }
    }, [dispatch, jwt]);

    return (
        <>
            {/* app header */}
            <div className={styles["app-header"]}>
                {/* main header */}
                <Layout.Header className={styles["main-header"]}>
                    <div className={styles.inner}>
                        <img
                            src={logo}
                            alt="logo"
                            width={60}
                            height={80}
                            className={styles["App-logo"]}
                        />
                        <Typography.Title level={3} className={styles.title}>
                            {t("header.title")}
                        </Typography.Title>
                        <Input.Search
                            placeholder={"Destinations, attractions, etc."}
                            className={styles["search-input"]}
                            onSearch={(keywords) => onSearch(keywords)}
                        />
                        {/* buttons and welcome */}
                        {jwt ? (
                            <>
                                <Button
                                    type="default"
                                    shape="round"
                                    size="middle"
                                    className={styles.button}
                                    onClick={onLogout}
                                >
                                    {t("header.logout")}
                                </Button>
                                <Button
                                    type="default"
                                    shape="round"
                                    size="middle"
                                    className={styles.button}
                                    onClick={
                                        cartItems.length
                                            ? () => router.push("/shoppingCart")
                                            : () => {
                                                  return;
                                              }
                                    }
                                    loading={loading}
                                >
                                    {t("header.shoppingCart")}(
                                    {cartItems ? cartItems.length : 0})
                                </Button>
                                {/* welcome */}
                                <span className={styles.hail}>
                                    {t("header.hail")}
                                    <Typography.Text
                                        strong
                                        style={{ color: "white" }}
                                    >
                                        {username}
                                    </Typography.Text>
                                    {t("header.welcome")}
                                </span>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="default"
                                    shape="round"
                                    size="middle"
                                    className={styles.button}
                                    onClick={() => router.push("/login")}
                                >
                                    {t("header.login")}
                                </Button>

                                <Button
                                    type="default"
                                    shape="round"
                                    size="middle"
                                    className={styles.button}
                                    onClick={() => router.push("/register")}
                                >
                                    {t("header.register")}
                                </Button>
                                {/* welcome */}
                                <span className={styles.hail}>
                                    {t("header.welcome_without_login")}
                                </span>
                            </>
                        )}
                    </div>
                </Layout.Header>
                {/* main menu */}
                <div className={styles["main-menu"]}>
                    <Menu
                        mode={"horizontal"}
                        className={styles["main-menu-inner"]}
                        items={[
                            {
                                key: "1",
                                label: t("header.home_page"),
                                onClick: () => router.push("/")
                            },
                            { key: "2", label: t("header.stays") },
                            { key: "3", label: t("header.flights") },
                            { key: "4", label: t("header.trains") },
                            { key: "5", label: t("header.cars") },
                            { key: "6", label: t("header.tours_tickets") },
                            { key: "7", label: t("header.bundle_save") },
                            { key: "8", label: t("header.attractions") },
                            { key: "9", label: t("header.gift_cards") },
                            { key: "10", label: t("header.rewards") },
                            { key: "11", label: t("header.deals") }
                        ]}
                    />
                </div>
            </div>
        </>
    );
};

export default Header;
