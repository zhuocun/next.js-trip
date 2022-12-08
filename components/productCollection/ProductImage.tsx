import React from "react";
import { Typography } from "antd";
import Link from "next/link";
import Image from "next/image";

interface Props {
    size: "large" | "small";
    touristRoute: ITouristRoute;
}

const ProductImage: React.FC<Props> = ({ size, touristRoute }) => {
    return (
        <>
            {size === "large" ? (
                <Image
                    src={touristRoute.touristRoutePictures[0].url}
                    height={285}
                    width={488}
                    alt={"largePic"}
                />
            ) : (
                <Image
                    src={touristRoute.touristRoutePictures[0].url}
                    height={120}
                    width={240}
                    alt={"normalPic"}
                />
            )}

            <div>
                <Link href={`./detail/${touristRoute.id}`}>
                    {touristRoute.title.length > 26
                        ? touristRoute.title.slice(0, 26).concat("... ")
                        : touristRoute.title.concat(" ")}
                </Link>
                <Typography.Text type="danger" strong>
                    from ${touristRoute.price}
                </Typography.Text>
            </div>
        </>
    );
};

export default ProductImage;
