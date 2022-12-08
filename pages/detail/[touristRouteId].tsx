import React from "react";
import {
    Anchor,
    Button,
    Col,
    DatePicker,
    Divider,
    Menu,
    Row,
    Typography
} from "antd";
import { commentMockData } from "mocks/comments";
import { useReduxDispatch, useReduxSelector } from "redux/hooks";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { GetServerSideProps, NextPage } from "next";
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
    const jwt = useReduxSelector((s) => s.auth.jwt) as string;
    const cartLoading = useReduxSelector((s) => s.cart.loading);

    const dispatch = useReduxDispatch();

    const onAddToCart = () => {
        dispatch(addToCart({ jwt, touristRouteId: productDetail?.id }));
    };

    return (
        <MainLayout>
            <section className={styles["product-intro-container"]}>
                <Row>
                    {/* intro */}
                    <Col span={13}>
                        {productDetail ? (
                            <ProductIntro productDetail={productDetail} />
                        ) : null}
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
                        <RangePicker open style={{ marginTop: 25 }} />
                    </Col>
                </Row>
            </section>
            {/* anchor menu */}
            <Anchor className={styles["product-detail-anchor"]}>
                <Menu mode="horizontal">
                    <Menu.Item key="1">
                        <Anchor.Link
                            href="#features"
                            title="Features"
                        ></Anchor.Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <Anchor.Link href="#fees" title="Fees"></Anchor.Link>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <Anchor.Link href="#notes" title="Notes"></Anchor.Link>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <Anchor.Link
                            href="#comments"
                            title="Comments"
                        ></Anchor.Link>
                    </Menu.Item>
                </Menu>
            </Anchor>
            {/* features */}
            <section
                id="features"
                className={styles["product-detail-container"]}
            >
                <Divider>
                    <Typography.Title level={3}>Features</Typography.Title>
                </Divider>
                {productDetail ? (
                    <article
                        dangerouslySetInnerHTML={{
                            __html: productDetail.features
                        }}
                        style={{ margin: 50 }}
                    />
                ) : null}
            </section>
            {/* fees */}
            <section id="fees" className={styles["product-detail-container"]}>
                <Divider>
                    <Typography.Title level={3}>Fees</Typography.Title>
                </Divider>
                {productDetail ? (
                    <article
                        dangerouslySetInnerHTML={{
                            __html: productDetail?.fees
                        }}
                        style={{ margin: 50 }}
                    />
                ) : null}
            </section>
            {/* notes */}
            <section id="notes" className={styles["product-detail-container"]}>
                <Divider>
                    <Typography.Title level={3}>Notes</Typography.Title>
                </Divider>
                {productDetail ? (
                    <article
                        dangerouslySetInnerHTML={{
                            __html: productDetail?.notes
                        }}
                        style={{ margin: 50 }}
                    />
                ) : null}
            </section>
            {/* comments */}
            <section
                id="comments"
                className={styles["product-detail-container"]}
            >
                <Divider>
                    <Typography.Title level={3}>Comments</Typography.Title>
                </Divider>
                <div style={{ margin: 40 }}>
                    <ProductComments data={commentMockData} />
                </div>
            </section>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps<{
    productDetail: IProductDetail;
}> = async (context) => {
    try {
        const productDetail = (
            await axios.get(
                `http://123.56.149.216:8080/api/touristRoutes/${context.params?.touristRouteId}`
            )
        ).data;
        return { props: { productDetail } };
    } catch (err) {
        return { notFound: true };
    }
};

export default ProductDetail;
