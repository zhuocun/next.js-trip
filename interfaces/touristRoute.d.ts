interface ITouristRoute {
    id: string;
    title: string;
    departureCity: string;
    description: string;
    discountPresent: number;
    originalPrice: number;
    price: number;
    rating: number;
    touristRoutePictures: {
        url: string;
    }[];
    travelDays: string;
    tripType: string;
}
