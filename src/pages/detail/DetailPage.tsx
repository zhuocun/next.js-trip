import React from "react"
import {useParams} from "react-router-dom";

interface MatchParams {
    touristRouteId: string;
    other: string;
}

export const DetailPage = () => {
    const params = useParams<keyof MatchParams>();
    return (
        <div>Detail Page {params.touristRouteId} {params.other}</div>
    )
};