import React from "react";
import {MainLayout} from "../../layouts";
import {Affix, Col, Row} from "antd";
import styles from "./ShoppingCartPage.module.css"
import {CartMgmtCard, ProductList} from "../../components";
import {useReduxDispatch, useReduxSelector} from "../../redux/hooks";
import {createOrder, clearShoppingCartItem} from "../../redux/shoppingCart/slice";
import {useNavigate} from "react-router-dom";

export const ShoppingCartPage = () => {

    const loading = useReduxSelector((s) => s.shoppingCart.loading);
    const shoppingCartItems = useReduxSelector((s) => s.shoppingCart.items);
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken) as string;
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();

    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={styles["product-list-container"]}>
                        <ProductList
                            data={shoppingCartItems.map((s) => s.touristRoute)}
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <Affix>
                        <div className={styles["payment-card-container"]}>
                            {/* cart management card */}
                            <CartMgmtCard
                                loading={loading}
                                // calculate full original price
                                originalPrice={shoppingCartItems
                                    .map((s) => s.originalPrice)
                                    .reduce((a, b) => a + b, 0)}
                                // calculate discount price if needed
                                price={shoppingCartItems
                                    .map((s) =>
                                        s.originalPrice *
                                        (s.discountPresent ? s.discountPresent : 1))
                                    .reduce((a, b) => a + b, 0)}
                                // call redux, create order
                                onCreateOrder={() => {
                                    if (shoppingCartItems.length < 1) {
                                        return;
                                    } else {
                                        dispatch(createOrder(jwtToken));
                                        navigate("/placeOrder");
                                    }
                                }}
                                onShoppingCartClear={() => {
                                    dispatch(
                                        clearShoppingCartItem({
                                            jwtToken,
                                            itemIds: shoppingCartItems.map((s) => s.id)
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