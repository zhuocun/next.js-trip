import React from "react";
import styles from "./index.module.css";
import { Col, Divider, Row } from "antd";
import ProductImage from "./ProductImage";
import productGroup from "./productGroup";

interface Props {
    title: JSX.Element;
    sideImg: string;
    touristRoutes: ITouristRoute[];
}

const ProductCollection: React.FC<Props> = ({
    title,
    sideImg,
    touristRoutes
}) => {
    const productGroup1: ITouristRoute[] = [];
    const productGroup2: ITouristRoute[] = [];
    const productGroup3: ITouristRoute[] = [];
    touristRoutes.slice(1).forEach(function (t, index) {
        if (index <= 1) {
            productGroup1.push(t);
        } else if (index >= 2 && index <= 3) {
            productGroup2.push(t);
        } else {
            productGroup3.push(t);
        }
    });

    return (
        <div className={styles.content}>
            <Divider orientation="left">{title}</Divider>
            <Row>
                <Col span={4}>
                    <img
                        src={sideImg}
                        alt="side image"
                        className={styles["side-image"]}
                    />
                </Col>

                <Col span={20}>
                    <Row>
                        <Col span={12}>
                            <ProductImage
                                touristRoute={touristRoutes[0]}
                                size={"large"}
                            />
                        </Col>
                        <Col span={12}>
                            <Row>{productGroup(productGroup1, 12)}</Row>
                            <Row>{productGroup(productGroup2, 12)}</Row>
                        </Col>
                    </Row>
                    <Row>{productGroup(productGroup3, 6)}</Row>
                </Col>
            </Row>
        </div>
    );
};

export default ProductCollection;
