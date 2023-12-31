import React from "react";
import { Col, Divider, Row, Typography } from "antd";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";

const img1 = "/partner/microsoft.png";
const img2 = "/partner/youTube.png";
const img3 = "/partner/instagram.png";
const img4 = "/partner/facebook.png";

const companies = [
    { src: img1, title: "Microsoft" },
    { src: img2, title: "YouTube" },
    { src: img3, title: "Instagram" },
    { src: img4, title: "Facebook" }
];

const Partners: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.content}>
            <Divider orientation="left">
                <Typography.Title level={3}>
                    {t("home_page.partners")}
                </Typography.Title>
            </Divider>
            <Row>
                {companies.map((c, index) => (
                    <Col span={6} key={"partner-" + index}>
                        <img src={c.src} alt="partner" className={styles.img} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Partners;
