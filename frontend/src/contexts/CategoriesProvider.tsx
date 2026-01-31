import React, { useCallback, useEffect, useState } from 'react'
import { CategoriesContext } from './CategoriesContext'
import type { CategoriesContextType } from '../types/types.context'
import { CategoryServices } from '../services/CategoryServices';
import { useUrls } from './urlContext';

function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const { backend: backendUrlCtx } = useUrls();
    const backendUrl = backendUrlCtx.dev;

    const [categories, setCategories] = useState<CategoriesContextType["categories"]>([]);
    const [loading, setLoading] = useState<CategoriesContextType["loading"]>(true);
    const [error, setError] = useState<CategoriesContextType["error"]>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);

        const service = new CategoryServices(`${backendUrl}`);
        const response = await service.fetchCategories();

        if (response.ok) {
            setCategories(response.value);
        } else {
            setError(response.error);
        }

        setLoading(false);
    }, [backendUrl]);

    useEffect(() => {
        reload();
    }, [backendUrl, reload]);

    return (
        <CategoriesContext.Provider value={{ categories, loading, error, reload }}>{children}</CategoriesContext.Provider>
    )
}

export default CategoriesProvider
