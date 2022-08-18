import React from "react"
import styles from "./Header.module.css"
import logo from "../../assets/logo.svg"
import {Layout, Typography, Input, Menu, Button} from "antd"
import {UserOutlined} from "@ant-design/icons";

export const Header: React.FC = () => {
    return (
        <div>
            {/* app header */}
            <div className={styles["app-header"]}>
                {/* main header */}
                <Layout.Header className={styles["main-header"]}>
                    <div className={styles.inner}>
                        <img src={logo} alt="logo" className={styles["App-logo"]}/>
                        <Typography.Title level={3} className={styles.title}>React Trip</Typography.Title>
                        <Input.Search
                            placeholder={"Destination, attraction, etc."}
                            className={styles["search-input"]}
                        />
                        <Button
                            type="default"
                            shape="round"
                            icon={<UserOutlined />}
                            size="middle"
                            className={styles.button}
                        >
                            My Trips
                        </Button>
                    </div>
                </Layout.Header>
                {/* main menu */}
                <div className={styles["main-menu"]}>
                    <Menu
                        mode={"horizontal"}
                        className={styles["main-menu-inner"]}
                        items={[
                              {key: "1", label: "Home"},
                              {key: "2", label: "Weekend Trips"},
                              {key: "3", label: "Day Trips"},
                              {key: "4", label: "Trip Packages"},
                              {key: "5", label: "Theme Tours"},
                              {key: "6", label: "Luxury Tours"},
                              {key: "7", label: "Study Tours"},
                              {key: "8", label: "Special Occasions"},
                              {key: "9", label: "Visa"},
                              {key: "10", label: "Insurance"},
                          ]}
                    />
                </div>
            </div>
        </div>
    )
}