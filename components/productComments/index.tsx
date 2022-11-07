import React from "react";
import { Comment, List } from "antd";

interface Props {
    data: {
        author: string,
        avatar: string,
        content: string,
        createDate: string
    }[];
}

const ProductComments: React.FC<Props> = ({ data }) => {
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

export default ProductComments;
