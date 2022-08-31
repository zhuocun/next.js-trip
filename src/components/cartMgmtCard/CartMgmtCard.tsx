import React from "react";
import {
    Skeleton,
    Card,
    Button,
    Typography,
    Table, Row, Col,
} from "antd";
import {DeleteOutlined, CheckCircleOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";

const {Meta} = Card;
const {Title, Text} = Typography;

interface Item {
    key: number;
    item: string;
    amount: string | number | JSX.Element;
}

const columns: ColumnsType<Item> = [
    {
        title: "Item",
        dataIndex: "item",
        key: "item",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
    },
];

interface PropsType {
    loading: boolean;
    originalPrice: number;
    price: number;
    onShoppingCartClear: () => void;
    onCreateOrder: () => void;
}

export const CartMgmtCard: React.FC<PropsType> = ({
                                                            loading,
                                                            originalPrice,
                                                            price,
                                                            onShoppingCartClear,
                                                            onCreateOrder,
                                                        }) => {
    const orderData: Item[] = [
        {
            key: 1,
            item: "Full price: ",
            amount: <Text delete>$ {originalPrice}</Text>,
        },
        {
            key: 3,
            item: "Discounted: ",
            amount: (
                <Title type="danger" level={2}>
                    $ {price}
                </Title>
            ),
        },
    ];

    return (
        <Card
            style={{width: 320, marginTop: 16}}
            actions={[
                // eslint-disable-next-line react/jsx-key
                <Row>
                    <Col span={14}>
                        <Button type="primary" danger onClick={onCreateOrder} loading={loading}>
                            <CheckCircleOutlined/>
                            Create Order
                        </Button>
                    </Col>
                    <Col span={10}>
                        <Button onClick={onShoppingCartClear} loading={loading}>
                            <DeleteOutlined/>
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
                        <Table<Item>
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
