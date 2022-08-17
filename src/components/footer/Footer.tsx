import {Layout, Typography} from "antd";
import React from "react";

export const Footer = () => {
    return (
        <div>
            <Layout.Footer>
                <Typography.Title level={3} style={{textAlign: "center"}}>
                    © 2022 React Trip. All Rights Reserved.
                </Typography.Title>
            </Layout.Footer>
        </div>
    )
}