import React from "react";
import { Image, Typography } from "antd";
import Link from "next/link";
import { ProductImageProps } from "../../interfaces/productCollections";

export const ProductImage: React.FC<ProductImageProps> = ({
    id,
    size,
    imageSrc,
    price,
    title
}) => {
    return (
        <>
            {size === "large" ? (
                <Image src={imageSrc} height={285} width={488} />
            ) : (
                <Image src={imageSrc} height={120} width={240} />
            )}

            <div>
                <Link href={`./detail/${id}`}>{title.slice(0, 25)}</Link>{" "}
                <Typography.Text type="danger" strong>
                    from ${price}
                </Typography.Text>
            </div>
        </>
    );
};
