import { useProducts } from './ProductsContext'

export default function useSuccessProducts() {
    const products = useProducts();

    if (products.status !== "success") {
        throw new Error("Boundaryが異常値を通しています");
    }

    return products.value;
}
