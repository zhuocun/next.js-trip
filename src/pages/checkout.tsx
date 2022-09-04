import React from "react";
import {CreditCard, CheckoutCard} from "../components";
import {MainLayout} from "../layouts";
import {Row, Col} from "antd";
import {useReduxSelector, useReduxDispatch} from "../redux/hooks";
import {checkout} from "../redux/order/slice";
import {getShoppingCart} from "../redux/shoppingCart/slice";

export const CheckoutPage: React.FC = () => {
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken) as string;
    const loading = useReduxSelector((s) => s.order.loading);
    const order = useReduxSelector((s) => s.order.currentOrder);
    const dispatch = useReduxDispatch();

    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <CreditCard/>
                </Col>
                <Col span={12}>
                    <CheckoutCard
                        loading={loading}
                        order={order}
                        // call redux
                        onCheckout={() => {
                            // checkout
                            dispatch(checkout({jwtToken, orderId: order.id}));
                            // refresh shopping cart to update header
                            dispatch(getShoppingCart(jwtToken));
                        }}
                    />
                </Col>
            </Row>
        </MainLayout>
    );
};
