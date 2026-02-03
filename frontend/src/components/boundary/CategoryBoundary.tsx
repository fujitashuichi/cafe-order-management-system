import React from 'react'
import { useCategories } from '../../contexts/CategoriesContext'
import Error from './Error';
import Loading from './Loading';

function CategoryBoundary({ children }: { children: React.ReactNode }) {
    const categories = useCategories();

    if (categories.status === "idle" || categories.status === "loading") {
        return <Loading />
    }

    if (categories.status === "error") {
        return <Error />
    }

    return (
        <>{children}</>
    )
}

export default CategoryBoundary
