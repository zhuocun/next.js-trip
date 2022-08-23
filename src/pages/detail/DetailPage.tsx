import React, {useEffect} from "react"
import {useParams} from "react-router-dom";
import {Anchor, Col, Divider, Menu, Row, Spin, Typography} from "antd";
import {Header, Footer, ProductIntro, ProductComments} from "../../components";
import styles from "./DetailPage.module.css"
import {DatePicker} from 'antd';
import {commentMockData} from "./mockup";
import {getProductDetail} from "../../redux/productDetail/slice";
import {useReduxSelector, useAppDispatch} from "../../redux/hooks";

type MatchParams = {
    touristRouteId: string
};

const {RangePicker} = DatePicker;


export const DetailPage: React.FC = () => {
    // get parameter through router
    const {touristRouteId} = useParams<MatchParams>();

    // get states from Redux
    const loading = useReduxSelector(state => state.productDetail.loading);
    const error = useReduxSelector(state => state.productDetail.error);
    const product = useReduxSelector(state => state.productDetail.data);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(touristRouteId) {
            dispatch(getProductDetail(touristRouteId))
        }
    },[dispatch, touristRouteId])

        if (loading) {
            return (
                <Spin
                    size="large"
                    style={{
                        marginTop: 200,
                        marginBottom: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                    }}
                />
            );
        }

        if (error) {
            return <div>error：{error}</div>;
        }

    return (
        <>
            <Header />
            <div className={styles["page-content"]}>
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
                        {/* date */}
                        <Col span={11}>
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
                    <div dangerouslySetInnerHTML={{__html: product.features}} style={{margin: 50}} />
                </div>
                {/* fees */}
                <div id="fees" className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>
                            Fees
                        </Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{__html: product.fees}} style={{margin: 50}} />
                </div>
                {/* notes */}
                <div id="notes" className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>
                            Notes
                        </Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{__html: product.notes}} style={{margin: 50}} />
                </div>
                {/* comments */}
                <div id="comments" className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>
                            Comments
                        </Typography.Title>
                    </Divider>
                    <div style={{margin: 40}} >
                        <ProductComments data={commentMockData} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};