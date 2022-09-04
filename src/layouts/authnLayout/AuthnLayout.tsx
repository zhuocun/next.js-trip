import React from "react";
import styles from "./AuthnLayout.module.css";
import { Layout } from "antd";
import { Footer } from "../../components";
import Link from "next/link";

const { Header, Content } = Layout;

interface PropsType {
    children: React.ReactNode;
}

export const AuthnLayout: React.FC<PropsType> = (props) => {
    const logo = "/svg/logo.svg";
    return (
        <Layout className={styles["user-layout-container"]}>
            <Header className={styles["header"]}></Header>
            <Content className={styles["content"]}>
                <div className={styles["top"]}>
                    <div className={styles["content-header"]}>
                        <img alt="logo" className={styles["logo"]} src={logo} />
                        <Link href="/">
                            <span className={styles["title"]}>React Trip</span>
                        </Link>
                    </div>
                    <div className={styles["desc"]}>
                        <h3>Make travel more enjoyable!</h3>
                    </div>
                    {props.children}
                </div>
            </Content>
            <Footer />
        </Layout>
    );
};
