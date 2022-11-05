import React, { useEffect } from "react";
import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../layouts";
import { useReduxDispatch, useReduxSelector } from "../redux/hooks";
import { getCollection } from "../redux/reducers/collectionSlice";
import { getShoppingCart } from "../redux/reducers/cartSlice";
import { SideMenu } from "../components/sideMenu";
import { Carousel } from "../components/carousel";
import { ProductCollection } from "../components/productCollection";
import { BusinessPartners } from "../components/partners";
import { NextPage } from "next";
import PageSpin from "../components/spin";

const sider1 = "/sider/sider_1.png";
const sider2 = "/sider/sider_2.png";
const sider3 = "/sider/sider_3.png";

const Home: NextPage = () => {
    const jwt = useReduxSelector((s) => s.auth.jwt);

    useEffect(() => {
        dispatch(getCollection());
        if (jwt) {
            dispatch(getShoppingCart(jwt));
        }
    }, [jwt]);

    const loading = useReduxSelector((s) => s.collections.loading);
    const error = useReduxSelector((s) => s.collections.error);
    const collections = useReduxSelector((s) => s.collections.collections);
    const dispatch = useReduxDispatch();
    const { t } = useTranslation();

    if (loading) {
        return <PageSpin />;
    }

    if (error) {
        return <div>error：{error}</div>;
    }

    return (
        <>
            <MainLayout>
                {/* content */}
                <Row style={{ marginTop: 20 }}>
                    <Col span={6}>
                        <SideMenu />
                    </Col>
                    <Col span={18}>
                        <Carousel />
                    </Col>
                </Row>
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="warning">
                            {t("home_page.hot_recommended")}
                        </Typography.Title>
                    }
                    sideImg={sider1}
                    touristRoutes={collections[0].touristRoutes}
                />
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="danger">
                            New Trips
                        </Typography.Title>
                    }
                    sideImg={sider2}
                    touristRoutes={collections[1].touristRoutes}
                />
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="success">
                            Domestic Trip
                        </Typography.Title>
                    }
                    sideImg={sider3}
                    touristRoutes={collections[2].touristRoutes}
                />
                <BusinessPartners />
            </MainLayout>
        </>
    );
};

export default Home;
