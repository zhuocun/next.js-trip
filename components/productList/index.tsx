import React from "react";
import { List, Rate, Tag, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";

const listData = (productList: ITouristRoute[] | null) =>
    productList?.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        tags: (
            <>
                {p.departureCity && (
                    <Tag color="#f50">From {p.departureCity}</Tag>
                )}
                {p.travelDays && (
                    <Tag color="#108ee9">{p.travelDays} Days </Tag>
                )}
                {p.discountPresent && <Tag color="#87d068">Discount</Tag>}
                {p.tripType && <Tag color="#2db7f5">{p.tripType}</Tag>}
            </>
        ),
        imgSrc: p.touristRoutePictures[0].url,
        price: p.price,
        originalPrice: p.originalPrice,
        discountPresent: p.discountPresent,
        rating: p.rating
    }));

const { Text } = Typography;

export interface Props {
    data: ITouristRoute[] | null;
    pagination: IPagination | null;
    onPageChange?: (nextPage, pageSize) => void;
    loading: boolean;
}

const ProductList: React.FC<Props> = ({
    data,
    pagination,
    onPageChange,
    loading
}) => {
    const products = listData(data);
    return (
        <List
            loading={loading}
            itemLayout="vertical"
            size="large"
            pagination={
                pagination
                    ? {
                          current: pagination.currentPage,
                          pageSize: pagination.pageSize,
                          total: pagination.totalCount,
                          onChange: onPageChange
                      }
                    : false
            }
            dataSource={products}
            footer={
                pagination && (
                    <div style={{ fontSize: 17, marginLeft: 23 }}>
                        {"Searching results: "}
                        <Text strong>{pagination.totalCount}</Text>
                    </div>
                )
            }
            renderItem={(item, index) => (
                <List.Item
                    key={index}
                    actions={[
                        <>
                            <Rate defaultValue={item.rating} allowHalf />
                            <Text strong className="ant-rate-text">
                                {item.rating ? item.rating : null}
                            </Text>
                        </>
                    ]}
                    extra={
                        <Image
                            width={272}
                            height={172}
                            alt="image"
                            src={item.imgSrc}
                        />
                    }
                >
                    <List.Item.Meta
                        title={
                            <>
                                {item.discountPresent ? (
                                    <>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 400
                                            }}
                                            delete
                                        >
                                            $ {item.originalPrice}
                                        </Text>
                                        <Text
                                            type="danger"
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 400
                                            }}
                                        >
                                            {" $" + item.price + " "}
                                        </Text>
                                    </>
                                ) : (
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 400
                                        }}
                                    >
                                        {"$" + item.price + " "}
                                    </Text>
                                )}
                                <Link href={"/detail/" + item.id}>
                                    {item.title}
                                </Link>
                            </>
                        }
                        description={item.tags}
                    />
                    {item.description}
                </List.Item>
            )}
        />
    );
};

export default ProductList;
