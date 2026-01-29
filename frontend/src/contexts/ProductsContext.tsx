import { createContext, useContext } from "react";
import type { Product } from "../types/types";

export const ProductsContext = createContext<Product[] | null>(null);

export const useProducts = () => {
    const ctx = useContext(ProductsContext);
    if (ctx === null) {
        throw new Error("Providerが設定されていません");
    }
}
