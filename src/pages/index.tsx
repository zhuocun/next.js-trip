import React, { useEffect } from "react";
import {
    Carousel,
    SideMenu,
    ProductCollection,
    BusinessPartners
} from "../components";
import { Row, Col, Typography, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../layouts";
import { useReduxDispatch, useReduxSelector } from "../redux/hooks";
import { recommendProducts } from "../redux/recommendProducts/slice";

const sideImage1 = "/images/sider_2019_12-09.png";
const sideImage2 = "/images/sider_2019_02-04.png";
const sideImage3 = "/images/sider_2019_02-04-2.png";

const Home: React.FC = () => {
    const loading = useReduxSelector((s) => s.recommendedProducts.loading);
    const error = useReduxSelector((s) => s.recommendedProducts.error);
    const productList = useReduxSelector(
        (s) => s.recommendedProducts.productList
    );

    const dispatch = useReduxDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(recommendProducts());
    }, [dispatch]);

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
                    sideImage={sideImage1}
                    products={productList[0].touristRoutes}
                />
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="danger">
                            New Trips
                        </Typography.Title>
                    }
                    sideImage={sideImage2}
                    products={productList[1].touristRoutes}
                />
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="success">
                            Domestic Trip
                        </Typography.Title>
                    }
                    sideImage={sideImage3}
                    products={productList[2].touristRoutes}
                />
                <BusinessPartners />
            </MainLayout>
        </>
    );
};

export default Home;
