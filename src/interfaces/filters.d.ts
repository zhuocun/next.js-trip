import React from "react";

interface FilterProps {
    title: string;
    tags: string[];
}

interface FilterTagProps {
    onSelect?: () => void;
    children?: React.ReactNode;
}
