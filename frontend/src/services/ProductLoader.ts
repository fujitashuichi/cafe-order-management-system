import { ProductServices } from './ProductServices';
import type { ProductLoaderType } from '../types/types.loader';
import { useUrls } from '../contexts/urlContext';


////////// データ取得エラーはProductServiceで整理済み //////////


const ProductLoader = (): ProductLoaderType => {
    const { backend: backendUrlCtx } = useUrls();
    const backendUrl = backendUrlCtx.dev;

    const load: ProductLoaderType["load"] = async () => {
        const service = new ProductServices(`${backendUrl}`);
        return await service.fetchProducts();
    }

    return {
        load
    }
}

export default ProductLoader
