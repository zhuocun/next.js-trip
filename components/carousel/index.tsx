import React from "react";
import styles from "./index.module.css";
import { Carousel as AntCarousel } from "antd";

const Carousel: React.FC = () => {
    const carouselImage1 = "/carousel/carousel_1.jpg";
    const carouselImage2 = "/carousel/carousel_2.jpg";

    return (
        <AntCarousel autoplay={true} className={styles.slider}>
            <img src={carouselImage1} alt={"img1"} />
            <img src={carouselImage2} alt={"img2"} />
        </AntCarousel>
    );
};

export default Carousel;
