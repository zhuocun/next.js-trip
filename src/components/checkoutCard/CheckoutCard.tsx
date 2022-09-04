import React from "react";
import { Skeleton, Card, Button, Typography, Table } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";

const { Meta } = Card;
const { Title, Text } = Typography;

export interface Order {
    key: number;
    item: string;
    amount: string | number | JSX.Element;

}

export interface OrderSet {
    orderItems: OrderItems[];
    state: string;
}

interface OrderItems {
    touristRoute: {
        title: string
    };
    originalPrice: number;
    discountPresent: number;
}

const columns: ColumnsType<Order> = [
    {
        title: "产品",
        dataIndex: "item",
        key: "item"
    },
    {
        title: "价格",
        dataIndex: "amount",
        key: "amount"
    }
];

interface PropsType {
    loading: boolean;
    orderSet: OrderSet;
    onCheckout: () => void;
}

export const CheckoutCard: React.FC<PropsType> = ({
                                                      loading,
                                                      orderSet,
                                                      onCheckout
                                                  }) => {
    const router = useRouter();

    const paymentData: Order[] = orderSet
        ? orderSet.orderItems.map((i, index) => ({
            key: index,
            item: i.touristRoute.title,
            amount: (
                <>
                    <Text delete>$ {i.originalPrice} </Text>{" "}
                    <Text type="danger" strong>
                        $ {i.originalPrice * i.discountPresent}
                    </Text>
                </>
            )
        }))
        : [];

    return (
        <Card
            style={{ width: 600, marginTop: 50 }}
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
                            size="small"
                            bordered={false}
                            pagination={false}
                        />
                    }
                />
            </Skeleton>
        </Card>
    );
};
