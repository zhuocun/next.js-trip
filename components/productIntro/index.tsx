import React from "react";
import styles from "./index.module.css";
import { Carousel, Image, Rate, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";

interface ProductDescription {
    key: number;
    title: string;
    description: string | number | JSX.Element | undefined;
}

interface Props {
    title: string;
    description: string;
    originalPrice: string;
    coupons: string;
    points: string;
    price: string;
    rating: string;
    touristRoutePictures: string[];
}

export const ProductIntro: React.FC<Props> = ({
                                                  title,
                                                  description,
                                                  originalPrice,
                                                  coupons,
                                                  price,
                                                  rating,
                                                  touristRoutePictures
                                              }) => {

    const columns: ColumnsType<ProductDescription> = [
        {
            key: "title",
            dataIndex: "title",
            align: "left"
        },
        {
            key: "description",
            dataIndex: "description",
            align: "center"
        }
    ];

    const tableDataSource: ProductDescription[] = [
        {
            key: 0,
            title: "Route name",
            description: title
        },
        {
            key: 1,
            title: "Price",
            description: (
                <>
                    $
                    <Typography.Text type="danger" strong>
                        {originalPrice}
                    </Typography.Text>
                </>
            )
        },
        {
            key: 2,
            title: "Discount",
            description: price ? (
                <>
                    $<Typography.Text delete>{originalPrice}</Typography.Text>{" "}
                    <Typography.Text type="danger" strong>
                        ${price}
                    </Typography.Text>
                </>
            ) : (
                "Full price"
            )
        },
        {
            key: 3,
            title: "Get coupons",
            description: coupons ? price : "No coupons"
        },
        {
            key: 4,
            title: "Rating",
            description: rating ? <Rate allowHalf defaultValue={+rating} /> : "No data"
        }
    ];

    return (
        <div className={styles["intro-container"]}>
            {/* product title */}
            <Typography.Title level={4}>{title}</Typography.Title>
            {/* product description */}
            <Typography.Text>{description}</Typography.Text>
            {/* price */}
            <div className={styles["intro-detail-content"]}>
                <Typography.Text style={{ marginLeft: 20 }}>
                    $
                    <span className={styles["intro-detail-strong-text"]}>
                        {originalPrice + " "}
                    </span>
                    / Person
                </Typography.Text>
                {/* rating */}
                <Typography.Text style={{ marginLeft: 50 }}>
                    {rating ? "Rating: " : null}
                    <span className={styles["intro-detail-strong-text"]}>
                        {rating ? rating + " / 5" : null}
                    </span>
                </Typography.Text>
            </div>
            {/* carousel */}
            <Carousel autoplay slidesToShow={3}>
                {touristRoutePictures.map((p, index) => <Image preview={false} key={index} height={150} src={p} />)}
            </Carousel>
            {/* product detail in table */}
            <Table<ProductDescription>
                columns={columns}
                dataSource={tableDataSource}
                size="small"
                bordered={false}
                pagination={false}
            />
        </div>
    );
};
