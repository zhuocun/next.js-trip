import React from "react"
import styles from "./Header.module.css"
import logo from "../../assets/logo.svg"
import {Layout, Typography, Input, Menu, Button} from "antd"
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
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
                    <Menu mode={"horizontal"} className={styles["main-menu-inner"]}
                          items={[
                              { key: "1", label: t("header.home_page") },
                              { key: "2", label: t("header.weekend") },
                              { key: "3", label: t("header.group") },
                              { key: "4", label: t("header.backpack") },
                              { key: "5", label: t("header.private") },
                              { key: "6", label: t("header.cruise") },
                              { key: "7", label: t("header.hotel") },
                              { key: "8", label: t("header.local") },
                              { key: "9", label: t("header.theme") },
                              { key: "10", label: t("header.custom") },
                              { key: "11", label: t("header.study") },
                              { key: "12", label: t("header.visa") },
                              { key: "13", label: t("header.enterprise") },
                              { key: "14", label: t("header.high_end") },
                              { key: "15", label: t("header.outdoor") },
                              { key: "16", label: t("header.insurance") },
                          ]}
                    />
                </div>
            </div>
        </div>
    )
};