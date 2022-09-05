export interface FullProductDetail {
    id: string;
    title: string;
    description: string;
    originalPrice: string;
    coupons: string;
    points: string;
    price: string;
    rating: string;
    touristRoutePictures: {
        url: string
    }[];
    features: string;
    fees: string;
    notes: string;
}

export interface MainProductDetail {
    title: string;
    description: string;
    originalPrice: string;
    coupons: string;
    points: string;
    price: string;
    rating: string;
    touristRoutePictures: string[];
}
