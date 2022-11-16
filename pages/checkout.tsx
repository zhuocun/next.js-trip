import React from "react";
import { Col, Row } from "antd";
import { useReduxDispatch, useReduxSelector } from "redux/hooks";
import { checkout } from "../redux/reducers/orderSlice";
import { getShoppingCart } from "redux/reducers/cartSlice";
import CreditCard from "components/creditCard";
import CheckoutCard from "components/checkoutCard";
import { NextPage } from "next";
import MainLayout from "layouts/mainLayout";

const Checkout: NextPage = () => {
    const jwtToken = useReduxSelector((s) => s.auth.jwt);
    const loading = useReduxSelector((s) => s.order.loading);
    const orderSet = useReduxSelector((s) => s.order.currentOrder);
    const dispatch = useReduxDispatch();

    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <CreditCard />
                </Col>
                <Col span={12}>
                    <CheckoutCard
                        loading={loading}
                        orderSet={orderSet}
                        onCheckout={() => {
                            dispatch(
                                checkout({
                                    jwt: jwtToken,
                                    orderId: orderSet?.id
                                })
                            );
                            dispatch(getShoppingCart(jwtToken));
                        }}
                    />
                </Col>
            </Row>
        </MainLayout>
    );
};

export default Checkout;
