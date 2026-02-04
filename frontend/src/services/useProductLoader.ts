import { ProductServices } from './ProductServices';
import type { LoaderResult } from '../types/types.loader';
import { useEffect, useState } from 'react';


////////// データ取得エラーはProductServiceで整理済み //////////


const useProductLoader = (): LoaderResult<unknown> => {
    const [result, setResult] = useState<LoaderResult<unknown>>({ status: "idle" });

    useEffect(() => {
        const load = async () => {
            setResult({ status: "loading" });
            const service = new ProductServices();
            const data = await service.fetchProducts();

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

    return result
}

export default useProductLoader
