import React from "react";
import { Button, Card, Col, Row, Skeleton, Table, Typography } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

const { Meta } = Card;
const { Title, Text } = Typography;

interface CartIntro {
    key: number;
    item: string;
    amount: string | number | JSX.Element;
}

interface Props {
    cartLoading: boolean;
    orderLoading: boolean;
    originalPrice: number;
    currentPrice: number;
    onClearCart: () => void;
    onCreateOrder: () => void;
}

const CartManager: React.FC<Props> = ({
                                          cartLoading,
                                          orderLoading,
                                          originalPrice,
                                          currentPrice,
                                          onClearCart,
                                          onCreateOrder
                                      }) => {

    const columns: ColumnsType<CartIntro> = [
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

    const orderData: CartIntro[] = [
        {
            key: 1,
            item: "Full price: ",
            amount: <Text delete>$ {originalPrice.toString().slice(0, 10)}</Text>
        },
        {
            key: 3,
            item: "Discounted: ",
            amount: (
                <Title type="danger" level={3}>
                    $ {currentPrice.toFixed(2)}
                </Title>
            )
        }
    ];

    return (
        <Card
            style={{ width: 320, marginTop: 16 }}
            actions={[
                <Row key={"buttons"}>
                    <Col span={14}>
                        <Button style={{ marginLeft: 20 }} type="primary" danger onClick={onCreateOrder}
                                loading={orderLoading}>
                            <CheckCircleOutlined />
                            Create Order
                        </Button>
                    </Col>
                    <Col span={10}>
                        <Button style={{ marginRight: 20 }} onClick={onClearCart}>
                            <DeleteOutlined />
                            Clear
                        </Button>
                    </Col>
                </Row>
            ]}
        >
            <Skeleton loading={cartLoading} active>
                <Meta
                    title={<Title level={2}>Total</Title>}
                    description={
                        <Table<CartIntro>
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

export default CartManager;
