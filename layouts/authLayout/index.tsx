import React from "react";
import styles from "./index.module.css";
import { Layout } from "antd";
import Link from "next/link";
import Footer from "../../components/footer";

const { Content } = Layout;

interface PropsType {
    children: React.ReactNode;
}

const AuthLayout: React.FC<PropsType> = (props) => {
    const logo = "/logo.svg";
    return (
        <Layout className={styles["user-layout-container"]}>
            <Content className={styles["content"]}>
                <div className={styles["top"]}>
                    <div className={styles["content-header"]}>
                        <img alt="logo" className={styles["logo"]} src={logo} />
                        <Link href="/">
                            <span className={styles["title"]}>
                                Next.js Trip
                            </span>
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

export default AuthLayout;
