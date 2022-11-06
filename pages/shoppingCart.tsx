import React, { useEffect } from "react";
import { Affix, Col, Row } from "antd";
import { useReduxDispatch, useReduxSelector } from "../redux/hooks";
import { clearCart, createOrder } from "../redux/reducers/cartSlice";
import { useRouter } from "next/router";
import { ProductList } from "../components/productList";
import { CartManager } from "../components/cartManager";
import { NextPage } from "next";
import styles from "../styles/shoppingCart.module.css";
import MainLayout from "../layouts/mainLayout";

const ShoppingCart: NextPage = () => {
    const loading = useReduxSelector((s) => s.cart.loading);
    const cartItems = useReduxSelector((s) => s.cart.cartItems);
    const jwt = useReduxSelector((s) => s.auth.jwt);
    const dispatch = useReduxDispatch();
    const router = useRouter();

    const onCreateOrder = () => {
        if (cartItems.length < 1) {
            return;
        } else {
            dispatch(createOrder(jwt));
            router.push("/checkout").then();
        }
    };

    useEffect(() => {
        if (!jwt) {
            router.push("/").then();
        }
    }, [jwt]);

    const onClearCart = () => {
        dispatch(
            clearCart({
                jwt: jwt,
                itemIds: cartItems.map((i) => i.id)
            })
        );
    };

    const originalPrice = cartItems
        .map((i) => i.originalPrice)
        .reduce((a, b) => a + b, 0);

    const currentPrice = cartItems
        .map(
            (i) => i.originalPrice * (i.discountPresent ? i.discountPresent : 1)
        )
        .reduce((a, b) => a + b, 0);

    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={"product-list-container"}>
                        <ProductList
                            data={cartItems.map((s) => s.touristRoute)}
                            pagination={null}
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <Affix>
                        <div className={styles["payment-card-container"]}>
                            <CartManager
                                loading={loading}
                                originalPrice={originalPrice}
                                currentPrice={currentPrice}
                                onCreateOrder={onCreateOrder}
                                onClearCart={onClearCart}
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    );
};

export default ShoppingCart;
