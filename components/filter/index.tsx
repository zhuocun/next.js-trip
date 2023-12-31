import React from "react";
import { Divider } from "antd";
import Filter from "./Filter";
import styles from "./index.module.css";

const FilterArea: React.FC = () => {
    const filterData = [
        {
            title: "Route Rating",
            tags: ["1 star", "2 star", "3 star", "4 star", "5 star"]
        },
        {
            title: "Destination",
            tags: ["Sydney", "New York", "Beijing", "Tokyo"]
        },
        {
            title: "Travel Days",
            tags: ["2 days", "3 days", "4 days", "5 days", "6 days"]
        },
        {
            title: "Holiday",
            tags: ["Christmas", "National Day", "Lunar New Year"]
        }
    ];
    return (
        <>
            {filterData.map((filter) => (
                <>
                    <Filter title={filter.title} tags={filter.tags} />
                    <Divider dashed className={styles["filter-divider"]} />
                </>
            ))}
        </>
    );
};

export default FilterArea;
