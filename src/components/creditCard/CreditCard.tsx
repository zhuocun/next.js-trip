import React from "react";
import {PaymentInputsWrapper, usePaymentInputs} from "react-payment-inputs";
import images from "react-payment-inputs/images";
import {Card} from "antd";
import styles from "./CreditCard.module.css";

export const CreditCard = () => {
    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
    } = usePaymentInputs();

    return (
        <Card
            title="信用卡"
            bordered={false}
            className={styles["payment-credit-card"]}
        >
            <PaymentInputsWrapper {...wrapperProps}>
                <svg {...getCardImageProps({images})} />
                <input {...getCardNumberProps()} />
                <input {...getExpiryDateProps()} />
                <input {...getCVCProps()} />
            </PaymentInputsWrapper>
        </Card>
    );
};