import React, { useCallback, useEffect, useState } from 'react'
import { ProductsContext } from './ProductsContext';
import { useBaseUrl } from './BaseUrlContext';
import { usePorts } from './PortContext';
import type { ProductContextType } from '../types/types.context';
import { ProductServices } from '../services/ProductServices';


function ProductsProvider({ children }: { children: React.ReactNode }) {
    const { backend: baseUrl } = useBaseUrl();
    const { backend: port } = usePorts();

    const [products, setProducts] = useState<ProductContextType["products"]>(null);
    const [loading, setLoading] = useState<ProductContextType["loading"]>(true);
    const [error, setError] = useState<ProductContextType["error"]>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);

        const service = new ProductServices(`${baseUrl}${port}`);
        const response = await service.fetchProducts();

        if (response.ok) {
            setProducts(response.value);
        } else {
            setError(response.error);
        }

        setLoading(false);
    }, [baseUrl, port]);

    useEffect(() => {
        reload();
    }, [baseUrl, port, reload])

    return (
        <ProductsContext.Provider value={{ products, loading, error, reload }}>{children}</ProductsContext.Provider>
    )
}

export default ProductsProvider;
