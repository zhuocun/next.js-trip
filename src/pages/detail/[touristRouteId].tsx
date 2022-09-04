import React, { useEffect } from "react";
import { Anchor, Button, Col, Divider, Menu, Row, Spin, Typography } from "antd";
import { ProductIntro, ProductComments } from "../../components";
import styles from "../../styles/productDetail.css";
import { DatePicker } from "antd";
import { commentMockData } from "../../../mocks/comments";
import { getProductDetail } from "../../redux/productDetail/slice";
import { useReduxSelector, useReduxDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layouts";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";
import { useRouter } from "next/router";

const { RangePicker } = DatePicker;


const ProductDetail: React.FC = () => {
    // get parameter through router
    const { touristRouteId } = useRouter().query;

    // get states from Redux
    const loading = useReduxSelector((s) => s.productDetail.loading);
    const error = useReduxSelector((s) => s.productDetail.error);
    const product = useReduxSelector((s) => s.productDetail.productDetail);
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken) as string;
    const shoppingCartLoading = useReduxSelector((s) => s.shoppingCart.loading);

    const dispatch = useReduxDispatch();


    useEffect(() => {
        if (touristRouteId) {
            dispatch(getProductDetail(touristRouteId));
        }
    }, [dispatch, touristRouteId]);

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%"
                }}
            />
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
                            <ProductIntro
                                title={product.title}
                                shortDescription={product.description}
                                price={product.originalPrice}
                                coupons={product.coupons}
                                points={product.points}
                                discount={product.price}
                                rating={product.rating}
                                pictures={product.touristRoutePictures.map((p) => p.url)}
                            />
                        </Col>
                        <Col span={11}>
                            {/* add to cart button */}
                            <Button
                                style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                                type="primary"
                                danger
                                loading={shoppingCartLoading}
                                onClick={() => {
                                    dispatch(addShoppingCartItem({ jwtToken, touristRouteId: product.id }));
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
                    <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }} />
                </div>
                {/* fees */}
                <div id="fees" className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>
                            Fees
                        </Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }} />
                </div>
                {/* notes */}
                <div id="notes" className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>
                            Notes
                        </Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }} />
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
        </>
    );
};

export default ProductDetail;