import React, { useState } from "react";
import { Tag } from "antd";

const { CheckableTag } = Tag;

interface FilterTagProps {
    onSelect?: () => void;
    children?: React.ReactNode;
}

export const FilterTag: React.FC<FilterTagProps> = (props) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (checked) => {
        setChecked(checked);
    };

    return (
        <CheckableTag
            style={{ fontSize: 14 }}
            {...props}
            checked={checked}
            onChange={handleChange}
        />
    );
};
