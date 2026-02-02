import React from 'react'
import { CategoriesContext } from './CategoriesContext'
import type { CategoriesContextType } from '../types/types.context';
import type { Category } from '../types/types';
import useCategoryLoader from '../services/useCategoryLoader';

function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const isCategory = (value: unknown): value is Category => {
        return (
            typeof value === "object" &&
            value !== null &&
            "id" in value &&
            "name" in value &&
            "hasProducts" in value &&
            "products" in value
        )
    }
    const isCategoryArray = (value: unknown): value is Category[] => {
        if (!Array.isArray(value)) {
            return false;
        }

        return value.every(isCategory);
    }


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
