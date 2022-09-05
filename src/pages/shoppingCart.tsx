import React from "react";
import { MainLayout } from "../layouts";
import { Affix, Col, Row } from "antd";
import { useReduxDispatch, useReduxSelector } from "../redux/hooks";
import { clearShoppingCartItem, createOrder } from "../redux/reducers/shoppingCartSlice";
import { useRouter } from "next/router";
import { ProductList } from "../components/productList";
import { CartManager } from "../components/cartManager";

const ShoppingCart = () => {

    const loading = useReduxSelector((s) => s.shoppingCart.loading);
    const shoppingCartItems = useReduxSelector((s) => s.shoppingCart.items);
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken) as string;
    const dispatch = useReduxDispatch();
    const router = useRouter();

    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={"product-list-container"}>
                        <ProductList
                            data={shoppingCartItems.map((s) => s.touristRoute)}
                            pagination={null}
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <Affix>
                        <div className={"payment-card-container"}>
                            {/* cart management card */}
                            <CartManager
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
                                        router.push("/checkout").then();
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
    );
};

export default ShoppingCart;