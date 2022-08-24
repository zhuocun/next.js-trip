import {Dropdown, Layout, Menu, Typography} from "antd";
import React from "react";
import {UpOutlined} from "@ant-design/icons";
import styles from "./Footer.module.css";
import {useTranslation} from "react-i18next";
import {useReduxSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";
import {
    addLanguageActionCreator,
    switchLanguageActionCreator
} from "../../redux/language/languageActions";


export const Footer: React.FC = () => {
    const currentLanguage = useReduxSelector((state) => state.language.currentLanguage);
    const languageList = useReduxSelector((state) => state.language.languageList);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const menuClickHandler = (e) => {
        if (e.key === "add-lang") {
            dispatch(addLanguageActionCreator("new_lang", "New language"));
        } else {
            dispatch(switchLanguageActionCreator(e.key));
        }
    };

    return (
        <div>
            <Layout.Footer
                style={{backgroundColor: "#000072"}}
                className={styles.footer}>
                <div className={styles.inner}>
                    <Typography.Title level={5} style={{textAlign: "center", color: "white"}}>
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
                            icon={<UpOutlined/>}
                        >
                            {currentLanguage === "en" ? "English" : "简体中文"}
                        </Dropdown.Button>
                    </div>
                </div>
            </Layout.Footer>
        </div>
    )
};