import CategoryBoundary from "../boundary/CategoryBoundary";
import ProductBoundary from "../boundary/ProductBoundary";
import AddCategoryForm from "./AddCategoryForm";
import AddProductForm from "./AddProductForm";
import { CategoriesList } from "./CategoriesList";
import { ProductsList } from "./ProductsList";


////////// Boundaryによって、Successケースだけを扱えるようにしています



function AdminPage() {
    return (
        <div className="p-5 border border-gray-300">
            <CategoryBoundary>

                <AddProductForm />
                <AddCategoryForm />

                <ProductBoundary>
                    <ProductsList />
                </ProductBoundary>

                <CategoriesList />

            </CategoryBoundary>
        </div>
    )
}

export default AdminPage
