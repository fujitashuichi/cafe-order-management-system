import React from 'react'
import { CategoriesContext } from './CategoriesContext'
import type { CategoriesContextType } from '../types/types.context';
import useCategoryLoader from '../services/useCategoryLoader';
import { isCategoryArray } from '../validators/category';

function CategoriesProvider({ children }: { children: React.ReactNode }) {
    let result: CategoriesContextType;

    const data = useCategoryLoader();

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
            if (!isCategoryArray(data.value)) {
                result = { status: "error", error: new Error("商品データが壊れています") }
            } else {
                result = { status: "success", value: data.value }
            }
            break;

        default:
            result = { status: "idle" }
    }

    return (
        <CategoriesContext.Provider value={result}>{children}</CategoriesContext.Provider>
    )
}

export default CategoriesProvider
