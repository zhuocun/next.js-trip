interface CartManagerProps {
    loading: boolean;
    originalPrice: number;
    price: number;
    onShoppingCartClear: () => void;
    onCreateOrder: () => void;
}

interface CartItem {
    key: number;
    item: string;
    amount: string | number | JSX.Element;
}
