import { useCategories } from './CategoriesContext'

export default function useCategoriesView() {
    const categories = useCategories();

    return {
        status: categories.status,
        error: categories.status === "error" ? categories.error : null,
        value: categories.status === "success" ? categories.value : null
    }
}
