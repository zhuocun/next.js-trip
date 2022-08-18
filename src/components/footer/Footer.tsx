import {Dropdown, Layout, Menu, Typography} from "antd";
import React from "react";
import {UpOutlined} from "@ant-design/icons";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
    return (
        <div>
            <Layout.Footer className={styles.footer}>
                <div className={styles.inner}>
                    <Typography.Title level={5} style={{textAlign: "center"}}>
                        © 2022 React Trip. All Rights Reserved.
                    </Typography.Title>
                    <div className={styles["slogan-lang"]}>
                        <Typography.Text>Make travel more enjoyable</Typography.Text>
                        <Dropdown.Button overlay={
                            <Menu items={[
                                {key: "1", label: "English"},
                                {key: "2", label: "中文"}]}
                            />}
                            style={{marginLeft: 15}}
                            icon={<UpOutlined />}
                        >
                             Language
                        </Dropdown.Button>

                    </div>
                </div>
            </Layout.Footer>
        </div>
    )
}