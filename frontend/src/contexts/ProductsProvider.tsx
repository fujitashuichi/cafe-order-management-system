import React, { useCallback, useEffect, useState } from 'react'
import { ProductsContext } from './ProductsContext';
import type { ProductContextType } from '../types/types.context';
import { ProductServices } from '../services/ProductServices';
import { useUrls } from './urlContext';


function ProductsProvider({ children }: { children: React.ReactNode }) {
    const { backend: backendUrlCtx } = useUrls();
    const backendUrl = backendUrlCtx.dev;

    const [products, setProducts] = useState<ProductContextType["products"]>([]);
    const [loading, setLoading] = useState<ProductContextType["loading"]>(true);
    const [error, setError] = useState<ProductContextType["error"]>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);

        const service = new ProductServices(`${backendUrl}`);
        const response = await service.fetchProducts();

        if (response.ok) {
            setProducts(response.value);
        } else {
            setError(response.error);
        }

        setLoading(false);
    }, [backendUrl]);

    useEffect(() => {
        reload();
    }, [backendUrl, reload])

    return (
        <ProductsContext.Provider value={{ products, loading, error, reload }}>{children}</ProductsContext.Provider>
    )
}

export default ProductsProvider;
