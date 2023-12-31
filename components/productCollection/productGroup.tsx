import { Col } from "antd";
import ProductImage from "./ProductImage";
import React from "react";

const productGroup = (touristRoutes: ITouristRoute[], span: number) => {
    return touristRoutes.map((route, index) => (
        <Col key={index} span={span}>
            <ProductImage touristRoute={route} size={"small"} />
        </Col>
    ));
};
export default productGroup;
