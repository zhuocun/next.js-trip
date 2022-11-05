import React, { useEffect } from "react";
import { Anchor, Button, Col, DatePicker, Divider, Menu, Row, Typography } from "antd";
import { commentMockData } from "../../../mocks/comments";
import { getProductDetail } from "../../redux/reducers/prodDetailSlice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { MainLayout } from "../../layouts";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCart } from "../../redux/reducers/shoppingCartSlice";
import { useRouter } from "next/router";
import { ProductIntro } from "../../components/productIntro";
import { ProductComments } from "../../components/productComments";
import { NextPage } from "next";
import styles from "../../styles/productDetail.module.css";
import PageSpin from "../../components/spin";

const { RangePicker } = DatePicker;

const ProductDetail: NextPage = () => {
    const { touristRouteId } = useRouter().query;
    const loading = useReduxSelector((s) => s.productDetail.loading);
    const error = useReduxSelector((s) => s.productDetail.error);
    const product = useReduxSelector((s) => s.productDetail.productDetail);
    const jwt = useReduxSelector((s) => s.authentication.jwt) as string;
    const shoppingCartLoading = useReduxSelector((s) => s.shoppingCart.loading);

    const dispatch = useReduxDispatch();

    useEffect(() => {
        if (touristRouteId) {
            dispatch(getProductDetail(touristRouteId));
        }
    }, [dispatch, touristRouteId]);

    if (loading) {
        return (
            <PageSpin />
        );
    }

    if (error) {
        return <div>error：{error}</div>;
    }

    return (
        <>
            <MainLayout>
                <div className={styles["product-intro-container"]}>
                    <Row>
                        {/* intro */}
                        <Col span={13}>
                            {product ?
                                (<ProductIntro
                                    title={product.title}
                                    description={product.description}
                                    originalPrice={product.originalPrice}
                                    coupons={product.coupons}
                                    points={product.points}
                                    price={product.price}
                                    rating={product.rating}
                                    touristRoutePictures={product.touristRoutePictures.map((p) => p.url)}
                                />) : ""}
                        </Col>
                        <Col span={11}>
                            {/* add to cart button */}
                            <Button
                                style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                                type="primary"
                                danger
                                loading={shoppingCartLoading}
                                onClick={() => {
                                    dispatch(addToCart({ jwt: jwt, touristRouteId: product?.id }));
                                }}
                            >
                                <ShoppingCartOutlined />
                                Add to cart
                            </Button>
                            {/* date */}
                            <RangePicker open style={{ marginTop: 20 }} />
                        </Col>
                    </Row>
                </div>
                {/* anchor menu */}
                <Anchor className={"product-detail-anchor"}>
                    <Menu mode="horizontal">
                        <Menu.Item key="1">
                            <Anchor.Link href="#features" title="Features"></Anchor.Link>
                        </Menu.Item>

                        <Menu.Item key="2">
                            <Anchor.Link href="#fees" title="Fees"></Anchor.Link>
                        </Menu.Item>

                        <Menu.Item key="3">
                            <Anchor.Link href="#notes" title="Notes"></Anchor.Link>
                        </Menu.Item>

                        <Menu.Item key="4">
                            <Anchor.Link href="#comments" title="Comments"></Anchor.Link>
                        </Menu.Item>
                    </Menu>
                </Anchor>
                {/* features */}
                <div id="features" className={"product-detail-container"}>
                    <Divider>
                        <Typography.Title level={3}>
                            Features
                        </Typography.Title>
                    </Divider>
                    {product ?
                        (<div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }} />) : ""}
                </div>
                {/* fees */}
                <div id="fees" className={"product-detail-container"}>
                    <Divider>
                        <Typography.Title level={3}>
                            Fees
                        </Typography.Title>
                    </Divider>
                    {product ?
                        (<div dangerouslySetInnerHTML={{ __html: product?.fees }} style={{ margin: 50 }} />) : ""}
                </div>
                {/* notes */}
                <div id="notes" className={"product-detail-container"}>
                    <Divider>
                        <Typography.Title level={3}>
                            Notes
                        </Typography.Title>
                    </Divider>
                    {product ?
                        (<div dangerouslySetInnerHTML={{ __html: product?.notes }} style={{ margin: 50 }} />) : ""}
                </div>
                {/* comments */}
                <div id="comments" className={"product-detail-container"}>
                    <Divider>
                        <Typography.Title level={3}>
                            Comments
                        </Typography.Title>
                    </Divider>
                    <div style={{ margin: 40 }}>
                        <ProductComments data={commentMockData} />
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default ProductDetail;
