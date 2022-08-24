import React from "react";
import {MainLayout} from "../../layouts";
import {Affix, Col, Row} from "antd";
import styles from "./ShoppingCartPage.module.css"
import {PaymentCard, ProductList} from "../../components";
import {useReduxDispatch, useReduxSelector} from "../../redux/hooks";
import {checkout, clearShoppingCartItem} from "../../redux/shoppingCart/slice";
import {useNavigate} from "react-router-dom";

export const ShoppingCartPage = () => {

    const loading = useReduxSelector((state) => state.shoppingCart.loading);
    const shoppingCartItems = useReduxSelector((state) => state.shoppingCart.items);
    const jwtToken = useReduxSelector((state) => state.user.token) as string;
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();

    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={styles["product-list-container"]}>
                    <ProductList
                        data={shoppingCartItems.map((state) => state.touristRoute)}
                    />
                    </div>
                </Col>
                <Col span={8}>
                <Affix>
                    <div className={styles["payment-card-container"]}>
                        <PaymentCard
                            loading={loading}
                            originalPrice={shoppingCartItems
                                .map((state) => state.originalPrice)
                                .reduce((a, b) => a + b, 0)}
                            price={shoppingCartItems
                                .map((state) =>
                                    state.originalPrice *
                                    (state.discountPresent ? state.discountPresent : 1))
                                .reduce((a, b) => a + b, 0)}
                            onCheckout={() => {
                                if (shoppingCartItems.length < 1) {
                                    return;
                                } else {
                                    dispatch(checkout(jwtToken));
                                    navigate("/placeOrder");
                                }
                            }}
                            onShoppingCartClear={() => {
                                dispatch(
                                    clearShoppingCartItem({
                                        jwtToken,
                                        itemIds: shoppingCartItems.map((state) => state.id)
                                    })
                                );
                            }}
                        />

                    </div>
                </Affix>
                </Col>
            </Row>
        </MainLayout>
    )
}