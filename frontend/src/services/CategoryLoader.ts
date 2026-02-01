import type { CategoryLoaderType } from '../types/types.loader'
import { CategoryServices } from './CategoryServices'
import { useUrls } from '../contexts/urlContext'


/////////// Loader は unknown | Error を返します。


function CategoryLoader(): CategoryLoaderType {
    const { backend: backendUrlCtx } = useUrls();
    const backendUrl = backendUrlCtx.dev;

    const load: CategoryLoaderType["load"] = async () => {
        const service = new CategoryServices(backendUrl);
        const response = await service.fetchCategories();

        if (!response.ok) {
            return response.error;
        }
        return response.value;
    }

    return { load }
}

export default CategoryLoader
