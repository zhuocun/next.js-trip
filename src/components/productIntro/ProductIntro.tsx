import React from "react";
import styles from "./ProductIntro.module.css";
import {Typography, Carousel, Image, Rate, Table} from "antd";
import {ColumnsType} from "antd/es/table"


interface PropsType {
    title: string;
    shortDescription: string;
    price: string | number;
    coupons: string;
    points: string;
    discount: string;
    rating: string;
    pictures: string[];
}

const columns: ColumnsType<RowType> = [
    {
        key: "",
        title: "",
        dataIndex: "title",
        align: "left",
        width: "center"
    },
    {
        key: "",
        title: "",
        dataIndex: "description",
        align: "center"
    }
];

interface RowType {
    key: number;
    title: string;
    description: string | number | JSX.Element;
}

export const ProductIntro: React.FC<PropsType> = ({
    title,
    shortDescription,
    price,
    coupons,
    discount,
    rating,
    pictures
}) => {
    const tableDataSource: RowType[] = [
        {
            key: 0,
            title: "Route name",
            description: title,
        },
        {
            key: 1,
            title: "Price",
            description: (
                <>
                    $
                    <Typography.Text type="danger" strong>
                        {price}
                    </Typography.Text>
                </>
            ),
        },
        {
            key: 2,
            title: "Discount",
            description: discount ? (
                <>
                    $<Typography.Text delete>{price}</Typography.Text>{" "}
                    <Typography.Text type="danger" strong>
                        ${discount}
                    </Typography.Text>
                </>
            ) : (
                "Full price"
            ),
        },
        {
            key: 3,
            title: "Get coupons",
            description: coupons ? discount : "No coupons",
        },
        {
            key: 4,
            title: "Ratings",
            description: (
                <>
                    <Rate allowHalf defaultValue={+rating} />
                    <Typography.Text style={{ marginLeft: 10 }}>
                        {rating} / 5
                    </Typography.Text>
                </>
            ),
        }
    ]

    return (
        <div className={styles["intro-container"]}>
            {/* product title */}
            <Typography.Title level={4}>{title}</Typography.Title>
            {/* product short description */}
            <Typography.Text>{shortDescription}</Typography.Text>
            {/* price */}
            <div className={styles["intro-detail-content"]}>
                <Typography.Text style={{marginLeft: 20}}>
                    $
                    <span className={styles["intro-detail-strong-text"]}>
                        {price}
                    </span>
                    {""} / person
                </Typography.Text>
                {/* rating */}
                <Typography.Text style={{marginLeft: 50}}>
                    rating: {" "}
                    <span className={styles["intro-detail-strong-text"]}>
                        {rating}
                    </span>
                </Typography.Text>
            </div>
            {/* carousel */}
            <Carousel autoplay slidesToShow={3}>
                {pictures.map((p) => <Image height={150} src={p}/>)}
            </Carousel>
            {/* product detail in table */}
            <Table<RowType>
                columns={columns}
                dataSource={tableDataSource}
                size="small"
                bordered={false}
                pagination={false}
            />
        </div>
    )
}