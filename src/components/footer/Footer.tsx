import {Dropdown, Layout, Menu, Typography} from "antd";
import React, {useState} from "react";
import {UpOutlined} from "@ant-design/icons";
import styles from "./Footer.module.css";
import store from "../../redux/store";
import {LanguageState} from "../../redux/language/languageReducer";
import {useTranslation} from "react-i18next";
import {
    SWITCH_LANGUAGE,
    ADD_LANGUAGE,
    addLanguageActionCreator,
    switchLanguageActionCreator
} from "../../redux/language/languageActions";

interface State extends LanguageState {}

export const Footer: React.FC = () => {
    const [language, setLanguage] = useState(store.getState().language);
    const [languageList, setLanguageList] = useState(store.getState().languageList);
    const {t} = useTranslation();

    // get data from store to display it
    const storeUpdateHandler = () => {
        setLanguage(store.getState().language);
        setLanguageList(store.getState().languageList);
    };

    store.subscribe(storeUpdateHandler);

    const menuClickHandler = (e) => {
        let action;
        if (e.key === "add-lang") {
            action = addLanguageActionCreator("new_lang", "New Language");
        } else {
            action = switchLanguageActionCreator(e.key);
        }
        store.dispatch(action);
    };

    return (
        <div>
            <Layout.Footer className={styles.footer}>
                <div className={styles.inner}>
                    <Typography.Title level={5} style={{textAlign: "center"}}>
                        {t("footer.detail")}
                    </Typography.Title>
                    <div className={styles.lang}>
                        <Dropdown.Button
                            overlay={
                                <Menu onClick={menuClickHandler}>
                                    {languageList.map((l) => {
                                        return (
                                            <Menu.Item key={l.code}>
                                                {l.name}
                                            </Menu.Item>
                                        )
                                    })}
                                    <Menu.Item key={"add-lang"}>
                                        {t("footer.add_new_language")}
                                    </Menu.Item>
                                </Menu>
                            }
                            style={{marginLeft: 15}}
                            icon={<UpOutlined />}
                        >
                            {language === "en" ? "English" : "简体中文"}
                        </Dropdown.Button>
                    </div>
                </div>
            </Layout.Footer>
        </div>
    )
};