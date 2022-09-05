export interface Order {
    key: number;
    item: string;
    amount: string | number | JSX.Element;
}

export interface OrderItems {
    touristRoute: {
        title: string
    };
    originalPrice: number;
    discountPresent: number;
}

export interface OrderSet {
    id: string;
    state: string;
    orderItems: OrderItems[];
}

export interface CheckoutCardProps {
    loading: boolean;
    orderSet: OrderSet | null;
    onCheckout: () => void;
}
