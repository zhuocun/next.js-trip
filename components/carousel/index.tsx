import React from "react";
import styles from "./index.module.css";
import { Carousel as AntCarousel } from "antd";
import Image from "next/image";

const Carousel: React.FC = () => {
    const carouselImage1 = "/carousel/carousel_1.jpg";
    const carouselImage2 = "/carousel/carousel_2.jpg";

    return (
        <AntCarousel autoplay className={styles.slider}>
            <Image
                src={carouselImage1}
                alt={"img1"}
                width={1200}
                height={250}
            />
            <Image
                src={carouselImage2}
                alt={"img2"}
                width={1200}
                height={250}
            />
        </AntCarousel>
    );
};

export default Carousel;
