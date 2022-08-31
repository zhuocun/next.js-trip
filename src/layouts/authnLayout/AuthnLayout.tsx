import React from "react";
import styles from "./AuthnLayout.module.css";
import logo from "../../assets/logo.svg";
import {Link} from "react-router-dom";
import {Layout} from "antd";
import {Footer} from "../../components";

const {Header, Content} = Layout;

interface PropsType {
    children: React.ReactNode;
}

export const AuthnLayout: React.FC<PropsType> = (props) => {

    return (
        <Layout className={styles["user-layout-container"]}>
            <Header className={styles["header"]}>

            </Header>
            <Content className={styles["content"]}>
                <div className={styles["top"]}>
                    <div className={styles["content-header"]}>
                        <Link to="/">
                            <img alt="logo" className={styles["logo"]} src={logo}/>
                            <span className={styles["title"]}>React Trip</span>
                        </Link>
                    </div>
                    <div className={styles["desc"]}>
                        <h3>Make travel more enjoyable!</h3>
                    </div>
                    {props.children}
                </div>
            </Content>
            <Footer/>
        </Layout>
    );
};
