import type { LoaderResult } from '../types/types.loader'
import { CategoryServices } from './CategoryServices'
import { useUrls } from '../contexts/urlContext'
import { useEffect, useState } from 'react';


/////////// Load() は unknown | Error を返します。


function useCategoryLoader(): LoaderResult<unknown>{
    const { backend: backendUrlCtx } = useUrls();
    const backendUrl = backendUrlCtx.dev;

    const [result, setResult] = useState<LoaderResult<unknown>>({ status: "idle" });

    useEffect(() => {
        const load = async () => {
            setResult({ status: "loading" });

            const service = new CategoryServices(backendUrl);
            const data = await service.fetchCategories();

            if (!data.ok) {
                setResult({
                    status: "error",
                    error: data.error
                });
            } else {
                setResult({
                    status: "success",
                    value: data.value
                });
            }
        }
        load();
    }, []);

    return result;
}

export default useCategoryLoader
