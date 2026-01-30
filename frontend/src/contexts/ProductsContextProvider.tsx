import React, { useEffect, useState } from 'react'
import { ProductsContext } from './ProductsContext';
import { ProductServices } from '../services/ProductServices';
import { useBaseUrl } from './BaseUrlContext';
import { usePorts } from './PortContext';
import { type Result } from '../types/common/result.types';
import type { Product } from '../types/types';


function ProductsProvider({ children }: { children: React.ReactNode }) {
    const { backend: baseUrl } = useBaseUrl();
    const { backend: port } = usePorts();

    const [result, setResult] = useState<Result<Product[], Error> | null>(null);
    useEffect (() => {
        const fetch = async () => {
            const service = new ProductServices(`${baseUrl}${port}`);
            setResult(await service.fetchProducts());
        }
        fetch();
    }, [baseUrl, port]);

    if (result === null) throw new Error("商品データをまだ取得していません")

    if(!result.ok) {
        throw result.error;
    }

    const products = result.value;

    return (
        <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>
    )
}

export default ProductsProvider;
