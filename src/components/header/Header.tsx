import React from "react"
import styles from "./Header.module.css"
import logo from "../../assets/logo.svg"
import {Layout, Typography, Input, Menu, Button, Dropdown} from "antd"
import {GlobalOutlined} from "@ant-design/icons";

export const Header = () => {
    return (
        <div>
            <div className={styles["top-header"]}>
                <div className={styles["inner"]}>
                    <Typography.Text>Make travel more enjoyable</Typography.Text>
                    <Dropdown.Button
                        style={{marginLeft: 15}}
                        overlay={
                            <Menu
                                items={[
                                    {key: "1", label: "English"},
                                    {key: "2", label: "中文"}
                                ]}
                            />
                        }
                        icon={<GlobalOutlined />}
                    >
                        Language
                    </Dropdown.Button>
                    <Button.Group className={styles["button-group"]}>
                        <Button>Register</Button>
                        <Button>Login</Button>
                    </Button.Group>
                </div>
            </div>

            <div className={styles["app-header"]}>
                <Layout.Header className={styles["main-header"]}>
                    <img src={logo} alt="" className={styles["App-logo"]}/>
                    <Typography.Title className={styles.title} level={3}>React Trip</Typography.Title>
                    <Input.Search
                        placeholder={"Destination, attraction, etc."}
                        className={styles["search-input"]}
                    />
                </Layout.Header>
                <Menu mode={"horizontal"} className={styles["main-menu"]}
                      items={[
                          {key: "1", label: "React Trip"},
                          {key: "2", label: "Weekend Trip"},
                          {key: "3", label: "Daily Trip"},
                          {key: "4", label: "Trip Packages"},
                          {key: "5", label: "Theme Tour"},
                          {key: "6", label: "Custom Tour"},
                          {key: "7", label: "Study Tour"},
                          {key: "8", label: "Visa"},
                          {key: "9", label: "Insurance"},
                      ]}
                />
            </div>
        </div>
    )
}