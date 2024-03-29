import React from "react";
import { Dropdown, Layout, Menu, Typography } from "antd";
import { UpOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";
import { useReduxSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { languageSlice } from "../../redux/reducers/langSlice";

const Footer: React.FC = () => {
    const currentLanguage = useReduxSelector((s) => s.language.currentLanguage);
    const languageList = useReduxSelector((s) => s.language.languageList);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onClick = (e) => {
        if (e.key === "add-lang") {
            dispatch(languageSlice.actions.fetchAdd());
        } else {
            dispatch(languageSlice.actions.fetchSwitch(e.key));
        }
    };

    return (
        <div>
            <Layout.Footer
                style={{ backgroundColor: "#000072" }}
                className={styles.footer}
            >
                <div className={styles.inner}>
                    <Typography.Title
                        level={5}
                        style={{
                            textAlign: "center",
                            color: "white"
                        }}
                    >
                        {t("footer.detail")}
                    </Typography.Title>
                    <div className={styles.lang}>
                        <Dropdown.Button
                            overlay={
                                <Menu onClick={onClick}>
                                    {languageList.map((l) => {
                                        return (
                                            <Menu.Item key={l.code}>
                                                {l.name}
                                            </Menu.Item>
                                        );
                                    })}
                                    <Menu.Item key={"add-lang"}>
                                        {t("footer.add_new_language")}
                                    </Menu.Item>
                                </Menu>
                            }
                            style={{ marginLeft: 15 }}
                            icon={<UpOutlined />}
                        >
                            {currentLanguage === "en" ? "English" : "简体中文"}
                        </Dropdown.Button>
                    </div>
                </div>
            </Layout.Footer>
        </div>
    );
};

export default Footer;
