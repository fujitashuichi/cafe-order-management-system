import { createContext, useContext } from "react";
import type { ProductContextType } from "../types/types.context";

export const ProductsContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
    const ctx = useContext(ProductsContext);
    if (ctx === null) {
        throw new Error("Providerが設定されていません");
    }

    return ctx;
}
