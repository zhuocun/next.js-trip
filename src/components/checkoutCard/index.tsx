import React from "react";
import { Skeleton, Card, Button, Typography, Table } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";

const { Meta } = Card;
const { Title } = Typography;

interface Order {
    key: number;
    item: string;
    amount: string | number | JSX.Element;

}

interface OrderItems {
    touristRoute: {
        title: string
    };
    originalPrice: number;
    discountPresent: number;
}

export interface OrderSet {
    id: string;
    state: string;
    orderItems: OrderItems[];
}

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

interface PropsType {
    loading: boolean;
    orderSet: OrderSet | null;
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
