import React from "react";
import { Button, Card, Skeleton, Table, Typography } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";

const { Meta } = Card;
const { Title } = Typography;

export interface OrderInfo {
    key: number;
    item: string;
    originalPrice: string | number | JSX.Element;
    currentPrice: string | number | JSX.Element;
}

interface CheckoutCardProps {
    loading: boolean;
    orderSet: IOrderSet | null;
    onCheckout: () => void;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({
                                                       loading,
                                                       orderSet,
                                                       onCheckout
                                                   }) => {
    const router = useRouter();
    const columns: ColumnsType<OrderInfo> = [
        {
            title: "Product",
            dataIndex: "item",
            key: "item"
        },
        {
            title: "Original Price",
            dataIndex: "originalPrice",
            key: "originalPrice"
        },
        {
            title: "Current Price",
            dataIndex: "currentPrice",
            key: "currentPrice"
        }
    ];

    const paymentData: OrderInfo[] = orderSet
        ? orderSet.orderItems.map((i, index) => ({
            key: index,
            item: i.touristRoute.title.slice(0, 25),
            originalPrice: (
                <Title level={5} delete>$ {i.originalPrice} </Title>
            ),
            currentPrice: (
                <Title type="danger" level={5}>
                    $ {(i.originalPrice * i.discountPresent).toFixed(2)}
                </Title>
            )
        }))
        : [];

    return (
        <Card
            style={{ width: 650, marginTop: 50 }}
            actions={[
                orderSet && orderSet.state === "Completed" ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            router.push("/").then();
                        }}
                        loading={loading}
                    >
                        <HomeOutlined />
                        Home
                    </Button>
                ) : (
                    <Button type="primary" danger onClick={onCheckout} loading={loading}>
                        <CheckCircleOutlined />
                        Checkout
                    </Button>
                )
            ]}
        >
            <Skeleton loading={loading} active>
                <Meta
                    title={
                        <Title level={2}>
                            {orderSet && orderSet.state === "Completed" ? "Payment successful" : "Total"}
                        </Title>
                    }
                    description={
                        <Table<OrderInfo>
                            columns={columns}
                            dataSource={paymentData}
                            showHeader={false}
                            size="large"
                            bordered={false}
                            pagination={false}
                        />
                    }
                />
            </Skeleton>
        </Card>
    );
};

export default CheckoutCard;
