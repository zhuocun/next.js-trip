import React from "react";
import styles from "./index.module.css";
import { Carousel as AntCarousel, Image } from "antd";

export const Carousel: React.FC = () => {
    const carouselImage1 = "/images/carousel_1.jpg";
    const carouselImage2 = "/images/carousel_2.jpg";

    return (
        <AntCarousel autoplay className={styles.slider}>
            <Image preview={false} src={carouselImage1} />
            <Image preview={false} src={carouselImage2} />
        </AntCarousel>
    );
};
