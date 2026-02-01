import React, { useEffect, useState } from 'react'
import { ProductsContext } from './ProductsContext';
import ProductLoader from '../services/ProductLoader';
import type { Product } from '../types/types';
import type { ProductContextType } from '../types/types.context';


////////// エラーは上層で整理済み //////////

function ProductsProvider({ children }: { children: React.ReactNode }) {

    function isProduct(value: unknown): value is Product {
        return (
            typeof value === "object" &&
            value !== null &&
            "id" in value &&
            "name" in value &&
            "price" in value
        )
    }
    function isProductArray(value: unknown): value is Product[] {
        if (!Array.isArray(value)) {
            return false;
        }

        return value.every(isProduct);
    }


    const [status, setStatus] = useState<ProductContextType["status"]>("loading");
    const [body, setBody] = useState<ProductContextType["body"]>([]);

    const { load: loadProducts } = ProductLoader();

    useEffect(() => {
        const load = async () => {
            setStatus("loading");

            const data = await loadProducts();

            if (data instanceof Error) {
                setStatus("error");
                setBody(data);
                return;
            }

            if (!isProductArray(data)) {
                setStatus("error");
                setBody(new Error("取得した商品データが壊れています"));
                return;
            }

            setStatus("success");
            setBody(data);
        }
        load();
    }, [loadProducts]);

    return (
        <ProductsContext.Provider value={{ status, body }}>{children}</ProductsContext.Provider>
    )
}

export default ProductsProvider;
