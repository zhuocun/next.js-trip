export interface Pagination {
    currentPage: number;
    pageSize: number | undefined;
    totalCount: number | undefined;
}

export interface TouristRoute {
    departureCity: string;
    description: string;
    discountPresent: number;
    id: string;
    originalPrice: number;
    price: number;
    rating: number;
    title: string;
    touristRoutePictures: {
        url: string
    }[];
    travelDays: string;
    tripType: string;
}

export interface ProductListProps {
    data: TouristRoute[] | null;
    pagination?: Pagination;
    onPageChange?: (nextPage, pageSize) => void;
}
