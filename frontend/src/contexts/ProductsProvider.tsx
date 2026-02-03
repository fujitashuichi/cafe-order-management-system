import React from 'react'
import { ProductsContext } from './ProductsContext';
import type { ProductContextType } from '../types/types.context';
import useProductLoader from '../services/useProductLoader';
import { isProductArray } from '../validators/product';


////////// エラーは上層で整理済み //////////

////////// 将来的にデータ型検証を切り出す余地あり

function ProductsProvider({ children }: { children: React.ReactNode }) {
    let result: ProductContextType;

    const data = useProductLoader();

    switch (data.status) {
        case "idle":
            result = { status: "idle" };
            break;

        case "loading":
            result = { status: "loading" };
            break;

        case "error":
            result = { status: "error", error: data.error };
            break;

        case "success":
            if (!isProductArray(data.value)) {
                result = { status: "error", error: new Error("商品データが壊れています") }
            } else {
                result = { status: "success", value: data.value }
            }
            break;

        default:
            result = { status: "idle" }
    }

    return (
        <ProductsContext.Provider value={result}>{children}</ProductsContext.Provider>
    )
}

export default ProductsProvider;
