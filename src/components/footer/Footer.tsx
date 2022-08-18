import {Dropdown, Layout, Menu, Typography} from "antd";
import React, {useState} from "react";
import {UpOutlined} from "@ant-design/icons";
import styles from "./Footer.module.css";
import store from "../../redux/store";
import {LanguageState} from "../../redux/languageReducer";

interface State extends LanguageState {}

export const Footer: React.FC = () => {
    const storeState = store.getState();
    const [language, setLanguage] = useState(storeState.language);
    const [languageList, setLanguageList] = useState(storeState.languageList);
    const storeUpdateHandler = () => {
        setLanguage(storeState.language);
        setLanguageList(storeState.languageList);
    };
    store.subscribe(storeUpdateHandler);

    const menuClickHandler = (e) => {
        let action;
        if (e.key === "new") {
            action = {type: "add_lang", payload: {code: "new_lang", name: "New language"}};
        } else {
            action = {type: "switch_lang", payload: e.key};
        }
        store.dispatch(action);
    };

    return (
        <div>
            <Layout.Footer className={styles.footer}>
                <div className={styles.inner}>
                    <Typography.Title level={5} style={{textAlign: "center"}}>
                        © 2022 React Trip. All Rights Reserved.
                    </Typography.Title>
                    <div className={styles.lang}>
                        <Dropdown.Button
                            overlay={
                                <Menu
                                    onClick={menuClickHandler}
                                    items={[
                                        ...languageList.map((l) => {
                                            return {key: l.code, label: l.name};
                                        }),
                                        {key: "new", label: "Add new Language"}
                                    ]}
                                />
                        }
                            style={{marginLeft: 15}}
                            icon={<UpOutlined />}
                        >
                            {language === "en" ? "English" : "中文"}
                        </Dropdown.Button>
                    </div>
                </div>
            </Layout.Footer>
        </div>
    )
};