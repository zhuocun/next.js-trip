import React from "react";
import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import SideMenu from "components/sideMenu";
import Carousel from "../components/carousel";
import ProductCollection from "../components/productCollection";
import Partners from "../components/partners";
import { GetStaticProps, NextPage } from "next";
import MainLayout from "../layouts/mainLayout";
import axios from "axios";

const sider1 = "/sider/sider_1.png";
const sider2 = "/sider/sider_2.png";
const sider3 = "/sider/sider_3.png";

interface Props {
    collections: ICollection[];
}

const Home: NextPage<Props> = (Props) => {
    const collections = Props.collections;
    const { t } = useTranslation();

    return (
        <MainLayout>
            <Row style={{ marginTop: 24 }}>
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
            <Partners />
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps<{
    collections: ICollection[]
}> = async () => {
    try {
        const collections = (
            await axios.get("http://123.56.149.216:8080/api/productCollections")
        ).data;
        return { props: { collections }, revalidate: 1000 * 60 };
    } catch (err) {
        return { notFound: true };
    }
};

export default Home;
