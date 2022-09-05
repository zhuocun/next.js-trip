import React, { useState } from "react";
import { Tag } from "antd";
import { FilterTagProps } from "../../interfaces/filters";

const { CheckableTag } = Tag;

export const FilterTag: React.FC<FilterTagProps> = (props) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (checked) => {
        setChecked(checked);
    };

    return (
        <CheckableTag {...props} checked={checked} onChange={handleChange} />
    );
};
