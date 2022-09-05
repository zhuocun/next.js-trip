import React from "react";
import styles from "./index.module.css";
import { Col, Divider, Row } from "antd";
import { ProductImage } from "./ProductImage";
import { ProductCollectionProps } from "../../interfaces/productCollections";

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
                                id={touristRoute[0].id}
                                size={"large"}
                                title={touristRoute[0].title}
                                imageSrc={
                                    touristRoute[0].touristRoutePictures[0].url
                                }
                                price={touristRoute[0].price}
                            />
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <ProductImage
                                        id={touristRoute[1].id}
                                        size={"small"}
                                        title={touristRoute[1].title}
                                        imageSrc={
                                            touristRoute[1]
                                                .touristRoutePictures[0].url
                                        }
                                        price={touristRoute[1].price}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProductImage
                                        id={touristRoute[2].id}
                                        size={"small"}
                                        title={touristRoute[2].title}
                                        imageSrc={
                                            touristRoute[2]
                                                .touristRoutePictures[0].url
                                        }
                                        price={touristRoute[2].price}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <ProductImage
                                        id={touristRoute[3].id}
                                        size={"small"}
                                        title={touristRoute[3].title}
                                        imageSrc={
                                            touristRoute[3]
                                                .touristRoutePictures[0].url
                                        }
                                        price={touristRoute[3].price}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProductImage
                                        id={touristRoute[4].id}
                                        size={"small"}
                                        title={touristRoute[4].title}
                                        imageSrc={
                                            touristRoute[4]
                                                .touristRoutePictures[0].url
                                        }
                                        price={touristRoute[4].price}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <ProductImage
                                id={touristRoute[5].id}
                                size={"small"}
                                title={touristRoute[5].title}
                                imageSrc={
                                    touristRoute[5].touristRoutePictures[0].url
                                }
                                price={touristRoute[5].price}
                            />
                        </Col>
                        <Col span={6}>
                            <ProductImage
                                id={touristRoute[6].id}
                                size={"small"}
                                title={touristRoute[6].title}
                                imageSrc={
                                    touristRoute[6].touristRoutePictures[0].url
                                }
                                price={touristRoute[6].price}
                            />
                        </Col>
                        <Col span={6}>
                            <ProductImage
                                id={touristRoute[7].id}
                                size={"small"}
                                title={touristRoute[7].title}
                                imageSrc={
                                    touristRoute[7].touristRoutePictures[0].url
                                }
                                price={touristRoute[7].price}
                            />
                        </Col>
                        <Col span={6}>
                            <ProductImage
                                id={touristRoute[8].id}
                                size={"small"}
                                title={touristRoute[8].title}
                                imageSrc={
                                    touristRoute[8].touristRoutePictures[0].url
                                }
                                price={touristRoute[8].price}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
