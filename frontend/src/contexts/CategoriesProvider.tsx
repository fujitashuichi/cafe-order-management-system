import React, { useEffect, useState } from 'react'
import { CategoriesContext } from './CategoriesContext'
import CategoryLoader from '../services/CategoryLoader';
import type { Category } from '../types/types';
import type { CategoriesContextType } from '../types/types.context';

function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const isCategory = (value: unknown): value is Category => {
        return (
            typeof value === "object" &&
            value !== null &&
            "id" in value &&
            "name" in value &&
            "hasProduct" in value &&
            "products" in value
        )
    }
    const isCategoryArray = (value: unknown): value is Category[] => {
        if (!Array.isArray(value)) {
            return false;
        }

        return value.every(isCategory);
    }


    const [status, setStatus] = useState<CategoriesContextType["status"]>("loading");
    const [body, setBody] = useState<CategoriesContextType["body"]>([]);

    const { load: loadCategories } = CategoryLoader();

    useEffect(() => {
        const load = async () => {
            setStatus("loading");

            const data = await loadCategories();

            if (data instanceof Error) {
                setStatus("error");
                setBody(data);
                return;
            }

            if (!isCategoryArray(data)) {
                setStatus("error");
                setBody(new Error("カテゴリー情報が壊れています"));
                return;
            }

            setStatus("success");
            setBody(data);
        }
        load();
    }, [loadCategories]);

    return (
        <CategoriesContext.Provider value={{ status, body }}>{children}</CategoriesContext.Provider>
    )
}

export default CategoriesProvider
