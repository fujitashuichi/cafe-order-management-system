import { useProducts } from './ProductsContext'

export default function useProductsView() {
    const products = useProducts();

    return {
        status: products.status,
        error: products.status === "error" ? products.error : null,
        value: products.status === "success" ? products.value : null
    }
}
