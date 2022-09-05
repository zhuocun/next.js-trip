import { TouristRoute } from "../components/productList";

interface ProductCollectionProps {
    title: JSX.Element;
    sideImage: string;
    touristRoute: TouristRoute[];
}

interface ProductImageProps {
    id: string | number;
    size: "large" | "small";
    imageSrc: string;
    price: string | number;
    title: string;
}
