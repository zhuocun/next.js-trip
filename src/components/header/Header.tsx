import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { authenticationSlice } from "../../redux/authentication/slice";
import { useRouter } from "next/router";

interface MyJwtPayload extends JwtPayload {
    username: string;
}

export const Header: React.FC = () => {
    const logo = "/svg/logo.svg";
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useReduxDispatch();

    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);
    const [username, setUsername] = useState("");

    const shoppingCartItems = useReduxSelector((s) => s.shoppingCart.items);
    const shoppingCartLoading = useReduxSelector((s) => s.shoppingCart.loading);

    const searchHandler = (keywords) => {
        for (let i = 0; i < keywords.length; i++) {
            if (keywords[i] !== " ") {
                router.push(`/search/${keywords}`).then();
                break;
            }
        }
    };

    const onLogout = () => {
        dispatch(authenticationSlice.actions.logout());
        router.push("/").then();
    };

    useEffect(() => {
        if (jwtToken) {
            // prettier-ignore
            const token = jwt_decode<MyJwtPayload>(jwtToken);
            setUsername(token.username);
        }
    }, [dispatch, jwtToken]);

    return (
        <div>
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
                            placeholder={"Destination, attraction, etc."}
                            className={styles["search-input"]}
                            onSearch={(keywords) => searchHandler(keywords)}
                        />
                        {/* buttons and welcome */}
                        {jwtToken ? (
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
                                    onClick={() => router.push("/shoppingCart")}
                                    loading={shoppingCartLoading}
                                >
                                    {t("header.shoppingCart")}(
                                    {shoppingCartItems.length})
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
        </div>
    );
};
