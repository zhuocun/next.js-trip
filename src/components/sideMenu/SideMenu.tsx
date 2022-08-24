import React from "react";
import styles from "./SideMenu.module.css";
import {sideMenuList} from "./mockup";
import {MenuUnfoldOutlined} from "@ant-design/icons";
import {Menu} from "antd";

export const SideMenu: React.FC = () => {
    return (
        <Menu
            mode={"vertical"}
            className={styles["side-menu"]}
            items={sideMenuList.map((m) => ({
                key: m.title,
                label: m.title,
                icon: <MenuUnfoldOutlined/>,
                children: m.subMenu.map((sm) => ({
                    key: sm.title,
                    label: sm.title,
                    icon: <MenuUnfoldOutlined/>,
                    children: sm.subMenu.map((sms) => ({
                        key: sms,
                        label: sms,
                        icon: <MenuUnfoldOutlined/>
                    }))
                }))
            }))}
        />
    )
};