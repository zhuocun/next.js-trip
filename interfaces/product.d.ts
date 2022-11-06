interface IProductDetail {
    id: string;
    title: string;
    description: string;
    originalPrice: string;
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
