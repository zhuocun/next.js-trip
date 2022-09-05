import React from "react";
import { Button, Card, Skeleton, Table, Typography } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import { CheckoutCardProps, Order } from "../../interfaces/orders";

const { Meta } = Card;
const { Title } = Typography;

const columns: ColumnsType<Order> = [
    {
        title: "Product",
        dataIndex: "item",
        key: "item"
    },
    {
        title: "Price",
        dataIndex: "amount",
        key: "amount"
    }
];


export const CheckoutCard: React.FC<CheckoutCardProps> = ({
                                                              loading,
                                                              orderSet,
                                                              onCheckout
                                                          }) => {
    const router = useRouter();

    const paymentData: Order[] = orderSet
        ? orderSet.orderItems.map((i, index) => ({
            key: index,
            item: i.touristRoute.title.slice(0, 25),
            amount: (
                <>
                    <Title level={5} delete>$ {i.originalPrice} </Title>
                    <Title type="danger" level={5}>
                        $ {i.originalPrice * i.discountPresent}
                    </Title>
                </>
            )
        }))
        : [];

    return (
        <Card
            style={{ width: 500, marginTop: 50 }}
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
                        <Table<Order>
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
