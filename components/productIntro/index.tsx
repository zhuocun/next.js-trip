import React from "react";
import styles from "./index.module.css";
import { Carousel, Rate, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";

interface ProductDescription {
    key: number;
    title: string;
    description: string | number | JSX.Element | undefined;
}

interface Props {
    productDetail: IProductDetail;
}

const ProductIntro: React.FC<Props> = ({ productDetail }) => {
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
            description: productDetail.title
        },
        {
            key: 1,
            title: "Price",
            description: (
                <>
                    $
                    <Typography.Text type="danger" strong>
                        {productDetail.originalPrice}
                    </Typography.Text>
                </>
            )
        },
        {
            key: 2,
            title: "Discount",
            description: productDetail.price ? (
                <>
                    $
                    <Typography.Text delete>
                        {productDetail.originalPrice}
                    </Typography.Text>{" "}
                    <Typography.Text type="danger" strong>
                        ${productDetail.price}
                    </Typography.Text>
                </>
            ) : (
                "Full price"
            )
        },
        {
            key: 3,
            title: "Rating",
            description: productDetail.rating ? (
                <Rate allowHalf defaultValue={+productDetail.rating} />
            ) : (
                "No data"
            )
        }
    ];

    return (
        <div className={styles["intro-container"]}>
            {/* product title */}
            <Typography.Title level={4}>{productDetail.title}</Typography.Title>
            {/* product description */}
            <Typography.Text>{productDetail.description}</Typography.Text>
            {/* price */}
            <div className={styles["intro-detail-content"]}>
                <Typography.Text style={{ marginLeft: 20 }}>
                    $
                    <span className={styles["intro-detail-strong-text"]}>
                        {productDetail.originalPrice + " "}
                    </span>
                    / Person
                </Typography.Text>
                {/* rating */}
                <Typography.Text style={{ marginLeft: 50 }}>
                    {productDetail.rating ? "Rating: " : null}
                    <span className={styles["intro-detail-strong-text"]}>
                        {productDetail.rating
                            ? productDetail.rating + " / 5"
                            : null}
                    </span>
                </Typography.Text>
            </div>
            {/* carousel */}
            <Carousel autoplay slidesToShow={3}>
                {productDetail.touristRoutePictures.map((p, index) => (
                    <img
                        key={index}
                        height={150}
                        src={p.url}
                        alt={"carouselPic"}
                    />
                ))}
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

export default ProductIntro;
