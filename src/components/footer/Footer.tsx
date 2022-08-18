import {Layout, Typography} from "antd";
import React from "react";

export const Footer: React.FC = () => {
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