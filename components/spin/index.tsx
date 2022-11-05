import { Spin } from "antd";
import React from "react";

const PageSpin: React.FC = () => {
    return (
        <Spin
            size="large"
            style={{
                marginTop: "50vh",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%"
            }}
        />
    );
};

export default PageSpin;
