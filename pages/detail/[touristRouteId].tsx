import React, { useEffect } from "react";
import { Anchor, Button, Col, DatePicker, Divider, Menu, Row, Typography } from "antd";
import { commentMockData } from "../../mocks/comments";
import { getProductDetail } from "../../redux/reducers/prodDetailSlice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCart } from "../../redux/reducers/cartSlice";
import { useRouter } from "next/router";
import ProductIntro from "../../components/productIntro";
import ProductComments from "../../components/productComments";
import { NextPage } from "next";
import styles from "../../styles/productDetail.module.css";
import PageSpin from "../../components/spin";
import MainLayout from "../../layouts/mainLayout";

const { RangePicker } = DatePicker;

const ProductDetail: NextPage = () => {
    const { touristRouteId } = useRouter().query;
    const loading = useReduxSelector((s) => s.productDetail.loading);
    const error = useReduxSelector((s) => s.productDetail.error);
    const productDetail = useReduxSelector((s) => s.productDetail.productDetail);
    const jwt = useReduxSelector((s) => s.auth.jwt) as string;
    const cartLoading = useReduxSelector((s) => s.cart.loading);

    const dispatch = useReduxDispatch();

    const onAddToCart = () => {
        dispatch(addToCart({ jwt, touristRouteId: productDetail?.id }));
    };

    useEffect(() => {
        if (touristRouteId) {
            dispatch(getProductDetail(touristRouteId));
        }
    }, [dispatch, touristRouteId]);

    if (loading) {
        return <PageSpin />;
    }

    if (error) {
        return <div>error：{error}</div>;
    }

    return (
        <MainLayout>
            <div className={styles["product-intro-container"]}>
                <Row>
                    {/* intro */}
                    <Col span={13}>
                        {productDetail ?
                            <ProductIntro productDetail={productDetail} /> : null}
                    </Col>
                    <Col span={11}>
                        {/* add to cart button */}
                        {jwt ?
                            <Button
                                style={{ marginTop: 50, display: "block" }}
                                type="primary"
                                danger
                                loading={cartLoading}
                                onClick={onAddToCart}
                            >
                                <ShoppingCartOutlined />
                                Add to cart
                            </Button> : null
                        }
                        {/* date */}
                        <RangePicker open style={{ marginTop: 29 }} />
                    </Col>
                </Row>
            </div>
            {/* anchor menu */}
            <Anchor className={styles["product-detail-anchor"]}>
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
            <div id="features" className={styles["product-detail-container"]}>
                <Divider>
                    <Typography.Title level={3}>
                        Features
                    </Typography.Title>
                </Divider>
                {productDetail ?
                    (<div dangerouslySetInnerHTML={{ __html: productDetail.features }}
                          style={{ margin: 50 }} />) : null}
            </div>
            {/* fees */}
            <div id="fees" className={styles["product-detail-container"]}>
                <Divider>
                    <Typography.Title level={3}>
                        Fees
                    </Typography.Title>
                </Divider>
                {productDetail ?
                    (<div dangerouslySetInnerHTML={{ __html: productDetail?.fees }} style={{ margin: 50 }} />) : null}
            </div>
            {/* notes */}
            <div id="notes" className={styles["product-detail-container"]}>
                <Divider>
                    <Typography.Title level={3}>
                        Notes
                    </Typography.Title>
                </Divider>
                {productDetail ?
                    (<div dangerouslySetInnerHTML={{ __html: productDetail?.notes }} style={{ margin: 50 }} />) : null}
            </div>
            {/* comments */}
            <div id="comments" className={styles["product-detail-container"]}>
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
    );
};

export default ProductDetail;
