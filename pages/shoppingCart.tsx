import React, { useEffect } from "react";
import { Affix, Col, Row } from "antd";
import { useReduxDispatch, useReduxSelector } from "redux/hooks";
import { clearCart, createOrder } from "redux/reducers/cartSlice";
import { useRouter } from "next/router";
import CartManager from "components/cartManager";
import ProductList from "components/productList";
import { NextPage } from "next";
import styles from "styles/shoppingCart.module.css";
import MainLayout from "layouts/mainLayout";

const ShoppingCart: NextPage = () => {
    const cartLoading = useReduxSelector((s) => s.cart.loading);
    const orderLoading = useReduxSelector((s) => s.order.loading);
    const cartItems = useReduxSelector((s) => s.cart.cartItems);
    const jwt = useReduxSelector((s) => s.auth.jwt);
    const dispatch = useReduxDispatch();
    const router = useRouter();

    const onCreateOrder = () => {
        if (cartItems.length < 1) {
            return;
        } else {
            dispatch(createOrder(jwt)).then(() => {
                router.push("/checkout");
            });
        }
    };

    useEffect(() => {
        if (!jwt) {
            router.push("/");
        }
    }, [jwt]);

    const onClearCart = () => {
        dispatch(
            clearCart({
                jwt: jwt,
                itemIds: cartItems.map((i) => i.id)
            })
        ).then(() => {
            router.push("/");
        });
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
                <Col span={17}>
                    <section className={"product-list-container"}>
                        <ProductList
                            data={cartItems.map((s) => s.touristRoute)}
                            pagination={null}
                            loading={cartLoading}
                        />
                    </section>
                </Col>
                <Col span={7}>
                    <Affix>
                        <section className={styles["payment-card-container"]}>
                            <CartManager
                                cartLoading={cartLoading}
                                orderLoading={orderLoading}
                                originalPrice={originalPrice}
                                currentPrice={currentPrice}
                                onCreateOrder={onCreateOrder}
                                onClearCart={onClearCart}
                            />
                        </section>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    );
};

export default ShoppingCart;
