import React from "react";
import { Col, Divider, Row, Typography } from "antd";
import styles from "./index.module.css";

const img1 = "/partner/microsoft.png";
const img2 = "/partner/youtube.png";
const img3 = "/partner/instagram.png";
const img4 = "/partner/facebook.png";

const companies = [
    { src: img1, title: "Microsoft" },
    { src: img2, title: "Youtube" },
    { src: img3, title: "Ins" },
    { src: img4, title: "Facebook" }
];

export const Partners: React.FC = () => {
    return (
        <div className={styles.content}>
            <Divider orientation="left">
                <Typography.Title level={3}>Partners</Typography.Title>
            </Divider>
            <Row>
                {companies.map((c, index) => (
                    <Col span={6} key={"business-partner-" + index}>
                        <img
                            src={c.src}
                            alt="business-partner"
                            className={styles.img}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};