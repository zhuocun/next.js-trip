interface IOrderSet {
    id: string;
    state: string;
    orderItems: {
        touristRoute: {
            title: string
        },
        originalPrice: number,
        discountPresent: number
    }[];
}
