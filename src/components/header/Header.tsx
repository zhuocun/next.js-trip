import React from "react"
import styles from "./Header.module.css"
import logo from "../../assets/logo.svg"
import {Layout, Typography, Input, Menu, Button} from "antd"
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

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
                            onSearch={(keyword) => navigate("/search/" + keyword)}
                        />
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

                    </div>
                </Layout.Header>
                {/* main menu */}
                <div className={styles["main-menu"]}>
                    <Menu mode={"horizontal"} className={styles["main-menu-inner"]}>
                        <Menu.Item key={"1"}>{t("header.home_page")}</Menu.Item>
                        <Menu.Item key={"2"}>{t("header.weekend")}</Menu.Item>
                        <Menu.Item key={"3"}>{t("header.group")}</Menu.Item>
                        <Menu.Item key={"4"}>{t("header.backpack")}</Menu.Item>
                        <Menu.Item key={"5"}>{t("header.private")}</Menu.Item>
                        <Menu.Item key={"6"}>{t("header.cruise")}</Menu.Item>
                        <Menu.Item key={"7"}>{t("header.hotel")}</Menu.Item>
                        <Menu.Item key={"8"}>{t("header.local")}</Menu.Item>
                        <Menu.Item key={"9"}>{t("header.theme")}</Menu.Item>
                        <Menu.Item key={"10"}>{t("header.custom")}</Menu.Item>
                        <Menu.Item key={"11"}>{t("header.study")}</Menu.Item>
                        <Menu.Item key={"12"}>{t("header.visa")}</Menu.Item>
                        <Menu.Item key={"13"}>{t("header.enterprise")}</Menu.Item>
                        <Menu.Item key={"14"}>{t("header.high_end")}</Menu.Item>
                        <Menu.Item key={"15"}>{t("header.outdoor")}</Menu.Item>
                        <Menu.Item key={"16"}>{t("header.insurance")}</Menu.Item>
                    </Menu>
                </div>
            </div>
        </div>
    )
};