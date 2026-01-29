import React from 'react'
import { ProductsContext } from './ProductsContext';
import { ProductServices } from '../services/ProductServices';
import { useBaseUrl } from './BaseUrlContext';
import { usePorts } from './PortContext';


function ProductsProvider({ children }: { children: React.ReactNode }) {
    const { backend: baseUrl } = useBaseUrl();
    const { backend: port } = usePorts();
    const service = new ProductServices(`${baseUrl}${port}`);

    return (
        <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>
    )
}

export default ProductsProvider;
