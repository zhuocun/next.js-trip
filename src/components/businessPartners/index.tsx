import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import styles from "./index.module.css";

const image1 = "/images/microsoft-80658_640.png";
const image2 = "/images/icon-720944_640.png";
const image3 = "/images/follow-826033_640.png";
const image4 = "/images/facebook-807588_640.png";

const companies = [
    { src: image1, title: "Microsoft" },
    { src: image2, title: "Youtube" },
    { src: image3, title: "Ins" },
    { src: image4, title: "Facebook" }
];

export const BusinessPartners: React.FC = () => {
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
