import React, { useCallback, useEffect, useState } from 'react'
import { CategoriesContext } from './CategoriesContext'
import type { CategoriesContextType } from '../types/types.context'
import { CategoryServices } from '../services/CategoryServices';
import { useBaseUrl } from './BaseUrlContext';
import { usePorts } from './PortContext';

function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const { backend: baseUrl } = useBaseUrl();
    const { backend: port } = usePorts();

    const [categories, setCategories] = useState<CategoriesContextType["categories"]>(null);
    const [loading, setLoading] = useState<CategoriesContextType["loading"]>(true);
    const [error, setError] = useState<CategoriesContextType["error"]>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);

        const service = new CategoryServices(`${baseUrl}${port}`);
        const response = await service.fetchCategories();

        if (response.ok) {
            setCategories(response.value);
        } else {
            setError(response.error);
        }

        setLoading(false);
    }, [baseUrl, port]);

    useEffect(() => {
        reload();
    }, [baseUrl, port, reload]);

    return (
        <CategoriesContext.Provider value={{ categories, loading, error, reload }}>{children}</CategoriesContext.Provider>
    )
}

export default CategoriesProvider
