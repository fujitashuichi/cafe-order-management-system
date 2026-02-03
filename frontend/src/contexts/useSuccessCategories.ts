import { useCategories } from './CategoriesContext'

export default function useSuccessCategories() {
    const categories = useCategories();

    if (categories.status !== "success") {
        throw new Error("Boundaryが異常値を通しています");
    }

    return categories.value;
}
