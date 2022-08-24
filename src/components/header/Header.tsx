import React, {useEffect, useState} from "react"
import styles from "./Header.module.css"
import logo from "../../assets/logo.svg"
import {Layout, Typography, Input, Menu, Button} from "antd"
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useReduxDispatch, useReduxSelector} from "../../redux/hooks";
import jwt_decode, {JwtPayload as DefaultJwtPayload} from "jwt-decode";
import {userSlice} from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayload {
    username: string;
}

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const dispatch = useReduxDispatch();

    const jwtToken = useReduxSelector((state) => state.user.token);
    const [username, setUsername] = useState("");

    const shoppingCartItems = useReduxSelector((state) => state.shoppingCart.items);
    const shoppingCartLoading = useReduxSelector((state) => state.shoppingCart.loading);

    const searchHandler = (keywords) => {
        for (let i = 0; i < keywords.length; i++) {
            if (keywords[i] !== " ") {
                navigate(`/search/${keywords}`);
                break;
            }
        }
    };

    const onLogout = () => {
        dispatch(userSlice.actions.logout());
        navigate("/");
    }

    useEffect(() => {
        if (jwtToken) {
            const token = jwt_decode<JwtPayload>(jwtToken);
            setUsername(token.username);
        }
    }, [jwtToken])

    return (
        <div>
            {/* app header */}
            <div className={styles["app-header"]}>
                {/* main header */}
                <Layout.Header className={styles["main-header"]}>
                    <div className={styles.inner}>
                        <img src={logo} alt="logo" className={styles["App-logo"]}/>
                        <Typography.Title level={3} className={styles.title}>
                            {t("header.title")}
                        </Typography.Title>
                        <Input.Search
                            placeholder={"Destination, attraction, etc."}
                            className={styles["search-input"]}
                            onSearch={(keywords) => searchHandler(keywords)}
                        />
                        {jwtToken ?
                            (<>
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
                                    onClick={() => navigate("/shoppingCart")}
                                    loading={shoppingCartLoading}
                                >
                                    {t("header.shoppingCart")}
                                    ({shoppingCartItems.length})
                                </Button>
                                <span className={styles.hail}>
                                    {t("header.hail")}
                                    <Typography.Text
                                        strong
                                        style={{color: "white"}}>
                                        {username}
                                    </Typography.Text>
                                    {t("header.welcome")}
                                </span>
                            </>) : (
                                <>
                                    <Button
                                        type="default"
                                        shape="round"
                                        size="middle"
                                        className={styles.button}
                                        onClick={() => navigate("/login")}
                                    >
                                        {t("header.login")}
                                    </Button>

                                    <Button
                                        type="default"
                                        shape="round"
                                        size="middle"
                                        className={styles.button}
                                        onClick={() => navigate("/signup")}
                                    >
                                        {t("header.signup")}
                                    </Button>
                                    <span className={styles.hail}>
                                        {t("header.welcome_without_login")}
                                    </span>
                                </>)
                        }


                    </div>

                </Layout.Header>
                {/* main menu */}
                <div className={styles["main-menu"]}>
                    <Menu mode={"horizontal"} className={styles["main-menu-inner"]}>
                        <Menu.Item key={"1"}>{t("header.home_page")}</Menu.Item>
                        <Menu.Item key={"2"}>{t("header.stays")}</Menu.Item>
                        <Menu.Item key={"3"}>{t("header.flights")}</Menu.Item>
                        <Menu.Item key={"4"}>{t("header.trains")}</Menu.Item>
                        <Menu.Item key={"5"}>{t("header.cars")}</Menu.Item>
                        <Menu.Item key={"6"}>{t("header.tours_tickets")}</Menu.Item>
                        <Menu.Item key={"7"}>{t("header.bundle_save")}</Menu.Item>
                        <Menu.Item key={"8"}>{t("header.attractions")}</Menu.Item>
                        <Menu.Item key={"9"}>{t("header.gift_cards")}</Menu.Item>
                        <Menu.Item key={"10"}>{t("header.rewards")}</Menu.Item>
                        <Menu.Item key={"11"}>{t("header.deals")}</Menu.Item>
                    </Menu>
                </div>
            </div>
        </div>
    )
};