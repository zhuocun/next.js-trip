import { Col } from "antd";
import ProductImage from "./ProductImage";
import React from "react";

const productGroup = (touristRoutes: ITouristRoute[], span: number) => {
    return touristRoutes.map((t, index) => (
        <Col key={index} span={span}>
            <ProductImage touristRoute={t} size={"small"} />
        </Col>
    ));
};
export default productGroup;
