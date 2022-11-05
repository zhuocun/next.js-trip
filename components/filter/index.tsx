import React from "react";
import { Divider } from "antd";
import { Filter } from "./Filter";
import styles from "./index.module.css";

export const FilterArea: React.FC = () => {
    return (
        <>
            <Filter
                title="Route Rating"
                tags={["1 star", "2 star", "3 star", "4 star", "5 star"]}
            />
            <Divider dashed className={styles["filter-divider"]} />
            <Filter
                title="Destination"
                tags={["Sydney", "New York", "Beijing", "Tokyo"]}
            />
            <Divider dashed className={styles["filter-divider"]} />
            <Filter
                title="Travel Days"
                tags={["2 days", "3 days", "4 days", "5 days", "6 days"]}
            />
            <Divider dashed className={styles["filter-divider"]} />
            <Filter
                title="Holiday"
                tags={["Christmas", "National Day", "Lunar New Year"]}
            />
        </>
    );
};
