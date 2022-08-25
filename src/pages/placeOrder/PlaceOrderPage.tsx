import React from "react";
import {CreditCard, CheckOutCard} from "../../components";
import {MainLayout} from "../../layouts";
import {Row, Col} from "antd";
import {useReduxSelector, useReduxDispatch} from "../../redux/hooks";
import {placeOrder} from "../../redux/order/slice";

export const PlaceOrderPage: React.FC = () => {
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
                    <CheckOutCard
                        loading={loading}
                        order={order}
                        onCheckout={() => {
                            dispatch(placeOrder({jwtToken, orderId: order.id}));
                        }}
                    />
                </Col>
            </Row>
        </MainLayout>
    );
};
