import React from "react";
import { List, Rate, Space, Image, Tag, Typography } from "antd";
import { LikeOutlined, StarOutlined } from "@ant-design/icons";
import Link from "next/link";

interface TouristRoutePictures {
    url: string;
}

export interface Pagination {
    currentPage: number;
    pageSize: number | undefined;
    totalCount: number | undefined;
}

export interface TouristRoute {
    departureCity: string;
    description: string;
    discountPresent: number;
    id: string;
    originalPrice: number;
    price: number;
    rating: number;
    title: string;
    touristRoutePictures: TouristRoutePictures[];
    travelDays: string;
    tripType: string;
}

interface PropsType {
    data: TouristRoute[] | null;
    pagination?: Pagination;
    onPageChange?: (nextPage, pageSize) => void;
}

const listData = (productList: TouristRoute[] | null) =>
    productList?.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        tags: (
            <>
                {p.departureCity && (
                    <Tag color="#f50">{p.departureCity}出发</Tag>
                )}
                {p.travelDays && <Tag color="#108ee9">{p.travelDays} 天 </Tag>}
                {p.discountPresent && <Tag color="#87d068">超低折扣</Tag>}
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

export const ProductList: React.FC<PropsType> = ({ data, pagination }) => {
    const products = listData(data);
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={
                pagination
                    ? {
                          current: pagination.currentPage,
                          pageSize: pagination.pageSize,
                          total: pagination.totalCount
                      }
                    : false
            }
            dataSource={products}
            footer={
                pagination && (
                    <div>
                        搜索总路线: <Text strong>{pagination.totalCount}</Text>{" "}
                        条
                    </div>
                )
            }
            renderItem={(item) => (
                <List.Item
                    key={item.title}
                    actions={[
                        <Space key="list-vertical-star-o">
                            {React.createElement(StarOutlined)}
                            {156}
                        </Space>,
                        <Space key="list-vertical-like-o">
                            {React.createElement(LikeOutlined)}
                            {156}
                        </Space>,
                        <>
                            <Rate defaultValue={3} />
                            <Text strong className="ant-rate-text">
                                {item.rating}
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
                                            ¥ {item.originalPrice}
                                        </Text>
                                        <Text
                                            type="danger"
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 400
                                            }}
                                        >
                                            {" "}
                                            ¥ {item.price}
                                        </Text>
                                    </>
                                ) : (
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 400
                                        }}
                                    >
                                        ¥ {item.price}
                                    </Text>
                                )}{" "}
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
