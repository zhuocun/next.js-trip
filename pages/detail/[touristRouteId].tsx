import React, { useEffect, useState } from "react";
import {
    Anchor,
    Button,
    Col,
    DatePicker,
    Divider,
    Menu,
    MenuProps,
    Row,
    Typography
} from "antd";
import { commentMockData } from "mocks/comments";
import { useReduxDispatch, useReduxSelector } from "redux/hooks";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styles from "styles/productDetail.module.css";
import axios from "axios";
import { addToCart } from "redux/reducers/cartSlice";
import ProductIntro from "components/productIntro";
import ProductComments from "components/productComments";
import MainLayout from "layouts/mainLayout";

const { RangePicker } = DatePicker;

const ProductDetail: NextPage<{
    productDetail: IProductDetail;
}> = ({ productDetail }) => {
    const jwt = useReduxSelector((s) => s.auth.jwt);
    const cartLoading = useReduxSelector((s) => s.cart.loading);

    const dispatch = useReduxDispatch();

    const onAddToCart = () => {
        dispatch(
            addToCart({ jwt: jwt || "", touristRouteId: productDetail?.id })
        );
    };

    const [time, setTime] = useState(false);
    useEffect(() => {
        setTime(true);
    }, []);

    const menuItems: MenuProps["items"] = [
        {
            key: "features",
            label: <Anchor.Link href="#features" title="Features" />
        },
        {
            key: "fees",
            label: <Anchor.Link href="#fees" title="Fees" />
        },
        {
            key: "notes",
            label: <Anchor.Link href="#notes" title="Notes" />
        },
        {
            key: "comments",
            label: <Anchor.Link href="#comments" title="Comments" />
        }
    ];

    if (productDetail) {
        return (
            <MainLayout>
                <section className={styles["product-intro-container"]}>
                    <Row>
                        {/* intro */}
                        <Col span={13}>
                            <ProductIntro productDetail={productDetail} />
                        </Col>
                        <Col span={11}>
                            {/* add to cart button */}
                            {jwt ? (
                                <Button
                                    style={{ marginTop: 50, display: "block" }}
                                    type="primary"
                                    danger
                                    loading={cartLoading}
                                    onClick={onAddToCart}
                                >
                                    <ShoppingCartOutlined />
                                    Add to cart
                                </Button>
                            ) : null}
                            {/* date */}
                            {time ? (
                                <RangePicker open style={{ marginTop: 25 }} />
                            ) : null}
                        </Col>
                    </Row>
                </section>
                {/* anchor menu */}
                <Anchor className={styles["product-detail-anchor"]}>
                    <Menu mode="horizontal" items={menuItems} />
                </Anchor>
                {/* features */}
                <section className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>Features</Typography.Title>
                    </Divider>
                    <article
                        dangerouslySetInnerHTML={{
                            __html: productDetail.features
                        }}
                        style={{ margin: 50 }}
                    />
                </section>
                {/* fees */}
                <section className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>Fees</Typography.Title>
                    </Divider>
                    <article
                        dangerouslySetInnerHTML={{
                            __html: productDetail.fees
                        }}
                        style={{ margin: 50 }}
                    />
                </section>
                {/* notes */}
                <section className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>Notes</Typography.Title>
                    </Divider>
                    <article
                        dangerouslySetInnerHTML={{
                            __html: productDetail.notes
                        }}
                        style={{ margin: 50 }}
                    />
                </section>
                {/* comments */}
                <section className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>Comments</Typography.Title>
                    </Divider>
                    <div style={{ margin: 40 }}>
                        <ProductComments data={commentMockData} />
                    </div>
                </section>
            </MainLayout>
        );
    } else return null;
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    };
};

export const getStaticProps: GetStaticProps<{
    productDetail: IProductDetail;
}> = async (context) => {
    try {
        const productDetail = (
            await axios.get(
                `http://123.56.149.216:8080/api/touristRoutes/${context.params?.touristRouteId}`
            )
        ).data;
        return { props: { productDetail }, revalidate: 1000 * 60 };
    } catch (err) {
        return { notFound: true };
    }
};

export default ProductDetail;
