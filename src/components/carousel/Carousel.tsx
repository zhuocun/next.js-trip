import React from "react";
import styles from "./Carousel.module.css";
import { Image as AntImage, Carousel as AntCarousel } from "antd";

export const Carousel: React.FC = () => {
    const carouselImage1 = "/images/carousel_1.jpg";
    const carouselImage2 = "/images/carousel_2.jpg";
    const carouselImage3 = "/images/carousel_3.jpg";

    return (
        <AntCarousel autoplay className={styles.slider}>
            <AntImage src={carouselImage1} />
            <AntImage src={carouselImage2} />
            <AntImage src={carouselImage3} />
        </AntCarousel>
    );
};
