import React from "react";
import styles from "./index.module.css";
import { Col, Divider, Row } from "antd";
import { ProductImage } from "./ProductImage";

interface ProductCollectionProps {
    title: JSX.Element;
    sideImage: string;
    touristRoute: ITouristRoute[] | ITouristRoute;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({
    title,
    sideImage,
    touristRoute
}) => {
    return (
        <div className={styles.content}>
            <Divider orientation="left">{title}</Divider>
            <Row>
                <Col span={4}>
                    <img
                        src={sideImage}
                        alt="sideImage"
                        className={styles["side-image"]}
                    />
                </Col>

                <Col span={20}>
                    <Row>
                        <Col span={12}>
                            <ProductImage
                                touristRoute={touristRoute[0]}
                                size={"large"}
                            />
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <ProductImage
                                        touristRoute={touristRoute[1]}
                                        size={"small"}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProductImage
                                        touristRoute={touristRoute[2]}
                                        size={"small"}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <ProductImage
                                        touristRoute={touristRoute[3]}
                                        size={"small"}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProductImage
                                        touristRoute={touristRoute[4]}
                                        size={"small"}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <ProductImage
                                touristRoute={touristRoute[5]}
                                size={"small"}
                            />
                        </Col>
                        <Col span={6}>
                            <ProductImage
                                touristRoute={touristRoute[6]}
                                size={"small"}
                            />
                        </Col>
                        <Col span={6}>
                            <ProductImage
                                touristRoute={touristRoute[7]}
                                size={"small"}
                            />
                        </Col>
                        <Col span={6}>
                            <ProductImage
                                touristRoute={touristRoute[8]}
                                size={"small"}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
