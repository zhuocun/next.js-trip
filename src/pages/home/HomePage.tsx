import React, {useEffect} from "react";
import {
    Carousel,
    SideMenu,
    ProductCollection,
    BusinessPartners,
} from "../../components";
import {Row, Col, Typography, Spin} from "antd";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import {useTranslation} from "react-i18next";
import {MainLayout} from "../../layouts";
import {useReduxDispatch, useReduxSelector} from "../../redux/hooks";
import {recommendProducts} from "../../redux/recommendProducts/slice";


export const HomePage: React.FC = () => {

    const loading = useReduxSelector((state) => state.recommendedProducts.loading);
    const error = useReduxSelector((state) => state.recommendedProducts.error);
    const productList = useReduxSelector((state) => state.recommendedProducts.productList);

    const dispatch = useReduxDispatch();
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(recommendProducts());
    }, [dispatch])


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
            <MainLayout>
                {/* content */}
                <Row style={{marginTop: 20}}>
                    <Col span={6}>
                        <SideMenu/>
                    </Col>
                    <Col span={18}>
                        <Carousel/>
                    </Col>
                </Row>
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="warning">
                            {t("home_page.hot_recommended")}
                        </Typography.Title>
                    }
                    sideImage={sideImage}
                    products={productList[0].touristRoutes}
                />
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="danger">
                            新品上市
                        </Typography.Title>
                    }
                    sideImage={sideImage2}
                    products={productList[1].touristRoutes}
                />
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="success">
                            国内游推荐
                        </Typography.Title>
                    }
                    sideImage={sideImage3}
                    products={productList[2].touristRoutes}
                />
                <BusinessPartners/>
            </MainLayout>
        </>
    );
};
