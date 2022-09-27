import React from "react";
import { Comment, List } from "antd";

interface ProductCommentsProps {
    data: {
        author: string,
        avatar: string,
        content: string,
        createDate: string
    }[];
}

export const ProductComments: React.FC<ProductCommentsProps> = ({ data }) => {
    return (
        <List
            dataSource={data}
            itemLayout="horizontal"
            renderItem={(item) => {
                return (
                    <li>
                        <Comment
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.createDate}
                        />
                    </li>
                );
            }}
        />
    );
};
