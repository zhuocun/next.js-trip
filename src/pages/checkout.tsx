import React from "react";
import { MainLayout } from "../layouts";
import { Col, Row } from "antd";
import { useReduxDispatch, useReduxSelector } from "../redux/hooks";
import { checkout } from "../redux/reducers/orderSlice";
import { getShoppingCart } from "../redux/reducers/shoppingCartSlice";
import { CreditCard } from "../components/creditCard";
import { CheckoutCard } from "../components/checkoutCard";
import { NextPage } from "next";

const Checkout: NextPage = () => {
    const jwtToken = useReduxSelector((s) => s.authentication.jwt) as string;
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
                            // checkout
                            dispatch(checkout({ jwtToken, orderId: orderSet?.id }));
                            // refresh shopping cart to update header
                            dispatch(getShoppingCart(jwtToken));
                        }}
                    />
                </Col>
            </Row>
        </MainLayout>
    );
};

export default Checkout;
