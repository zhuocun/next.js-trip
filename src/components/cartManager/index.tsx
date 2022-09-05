import React from "react";
import { Button, Card, Col, Row, Skeleton, Table, Typography } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

const { Meta } = Card;
const { Title, Text } = Typography;

const columns: ColumnsType<CartItem> = [
    {
        title: "Item",
        dataIndex: "item",
        key: "item"
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount"
    }
];

export const CartManager: React.FC<CartManagerProps> = ({
                                                            loading,
                                                            originalPrice,
                                                            price,
                                                            onShoppingCartClear,
                                                            onCreateOrder
                                                        }) => {
    const orderData: CartItem[] = [
        {
            key: 1,
            item: "Full price: ",
            amount: <Text delete>$ {originalPrice}</Text>
        },
        {
            key: 3,
            item: "Discounted: ",
            amount: (
                <Title type="danger" level={3}>
                    $ {price}
                </Title>
            )
        }
    ];

    return (
        <Card
            style={{ width: 320, marginTop: 16 }}
            actions={[

                <Row key="">
                    <Col span={14}>
                        <Button type="primary" danger onClick={onCreateOrder} loading={loading}>
                            <CheckCircleOutlined />
                            Create Order
                        </Button>
                    </Col>
                    <Col span={10}>
                        <Button onClick={onShoppingCartClear} loading={loading}>
                            <DeleteOutlined />
                            Clear
                        </Button>
                    </Col>
                </Row>
            ]}
        >
            <Skeleton loading={loading} active>
                <Meta
                    title={<Title level={2}>Total</Title>}
                    description={
                        <Table<CartItem>
                            columns={columns}
                            dataSource={orderData}
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
