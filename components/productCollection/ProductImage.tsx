import React from "react";
import { Image, Typography } from "antd";
import Link from "next/link";

interface Props {
    size: "large" | "small";
    touristRoute: ITouristRoute;
}

const ProductImage: React.FC<Props> = ({ size, touristRoute }) => {
    return (
        <>
            {size === "large" ? (
                <Image
                    preview={false}
                    src={touristRoute.touristRoutePictures[0].url}
                    height={285}
                    width={488}
                />
            ) : (
                <Image
                    preview={false}
                    src={touristRoute.touristRoutePictures[0].url}
                    height={120}
                    width={240}
                />
            )}

            <div>
                <Link href={`./detail/${touristRoute.id}`}>
                    {touristRoute.title.slice(0, 25) + " "}
                </Link>
                <Typography.Text type="danger" strong>
                    from ${touristRoute.price}
                </Typography.Text>
            </div>
        </>
    );
};

export default ProductImage;
