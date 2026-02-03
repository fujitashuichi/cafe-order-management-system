import React from 'react'
import { useProducts } from '../../contexts/ProductsContext'
import Error from './Error';
import Loading from './Loading';

function ProductBoundary({ children }: { children: React.ReactNode }) {
    const products = useProducts();

    if (products.status === "idle" || products.status === "loading") {
        return <Loading />
    }

    if (products.status === "error") {
        return <Error />
    }

    return (
        <>{children}</>
    )
}

export default ProductBoundary
