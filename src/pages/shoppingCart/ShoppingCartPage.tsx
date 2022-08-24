import React from "react";
import {MainLayout} from "../../layouts";
import {Affix, Col, Row} from "antd";
import styles from "./ShoppingCartPage.module.css"
import {PaymentCard, ProductList} from "../../components";

export const ShoppingCartPage = () => {
    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={styles["product-list-container"]}></div>
                    {/*<ProductList data={} paging={}/>*/}
                </Col>
                <Col span={8}></Col>
                <Affix>
                    <div className={styles["payment-card-container"]}>
                        {/*
                        <PaymentCard
                            loading={}
                            originalPrice={}
                            price={}
                            onShoppingCartClear={}
                            onCheckout={}/>
                            */}
                    </div>
                </Affix>
            </Row>
        </MainLayout>
    )
}