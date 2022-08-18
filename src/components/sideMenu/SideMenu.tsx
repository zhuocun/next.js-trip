import React from "react";
import styles from "./SideMenu.module.css";
import {sideMenuList} from "./mockup";
import {GifOutlined} from "@ant-design/icons";
import {Menu} from "antd";

export const SideMenu: React.FC = () => {
    return (
        <Menu mode={"vertical"} className={styles["side-menu"]}
              items={sideMenuList.map((m) => ({
                  key: m.title,
                  label: m.title,
                  icon: <GifOutlined />,
                  children: m.subMenu.map((sm) => ({
                      key: sm.title,
                      label: sm.title,
                      icon: <GifOutlined />,
                      children: sm.subMenu.map((sms) => ({
                          key: sms,
                          label: sms,
                          icon: <GifOutlined />
                      }))
                  }))
              }))}
        />
    )
};