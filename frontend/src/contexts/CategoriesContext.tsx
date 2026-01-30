import { createContext, useContext } from "react";
import type { CategoriesContextType } from "../types/types.context";

export const CategoriesContext = createContext<CategoriesContextType | null>(null);

export const useCategories = (): CategoriesContextType => {
    const ctx = useContext(CategoriesContext);

    if (ctx === null) {
        throw new Error("CategoriesProviderが設定されていません");
    }

    return ctx;
}
