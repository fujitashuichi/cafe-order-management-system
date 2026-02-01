import { useState } from "react"
import type { Category, Product } from "../types/types";
import { useProducts } from "../contexts/ProductsContext";
import { useCategories } from "../contexts/CategoriesContext";
import AppButton from "../components/common/AppButton"
import EditProductModal from "./EditProductModal";
import { useUrls } from "../contexts/urlContext";
import AddProductForm from "./AddProductForm";



////////// TODO(遙か先に見据える理想): Provider統合後、statusをUIから隠蔽する
////////// まずは、Errorをbodyに含めない設計を目指す



function AdminPage() {
    const { backend: backendUrlCtx } = useUrls();
    const backendUrl = backendUrlCtx.dev;

    const { status: productStatus, body: productData } = useProducts();
    const { status: categoryStatus, body: categoryData } = useCategories();

    const [inputCategoryName, setInputCategoryName] = useState<Category["name"]>();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    //  loading  //

    if (productStatus === "loading") {
        return <h1>商品読み込み中...</h1>;
    }
    if (categoryStatus === "loading") {
        return <h1>商品カテゴリー読み込み中...</h1>;
    }

    //  end Loading  //

    if (productStatus === "error") {
        console.log(productStatus);
        return <h1>商品情報取得エラー</h1>
    }
    if (categoryStatus === "error") {
        console.log(categoryStatus);
        return <h1>商品カテゴリー取得エラー</h1>
    }

    if (productData instanceof Error) {
        console.log(productData);
        return <h1>商品情報取得エラー</h1>
    }
    if (categoryData instanceof Error) {
        console.log(categoryData);
        return <h1>商品カテゴリー取得エラー</h1>
    }

    const products = productData;
    const categories = categoryData;

    const handleUpdateCompleted = () => {
        // reloadProducts();
        setEditingProduct(null);
        alert("更新が完了しました");
    };

    const deleteProduct = async (e: React.FormEvent, id: Product["id"]) => {
        e.preventDefault();

        const product = products.find(item => item.id === id);
        if (!product) {
            alert("! 削除する商品が見つかりません。再読み込みを試しても解決しない場合、開発者に連絡してください");
            return;
        }
        const result = window.confirm(`本当に${product.name}を削除しますか?`);
        if (!result) return;

        try {
            const response = await fetch(`${backendUrl}/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(id)
            });

            if (response.ok) {
                alert("正常に削除されました");
                // reloadProducts();
            }
        } catch (err) {
            alert("商品の削除に失敗しました");
            console.error("商品の削除に失敗: ", err);
        }
    };


    const addCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputCategoryName) {
            alert("カテゴリーを追加するにはカテゴリー名を入力してください");
            return;
        }
        if (categories.some(item => item.name == inputCategoryName)) {
            alert("そのカテゴリーは既に登録されています");
            return;
        };

        try {
            const response = await fetch(`${backendUrl}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: inputCategoryName })
            });

            if (response.ok) {
                // reloadCategories();
                alert("新しいカテゴリーを追加しました");
                setInputCategoryName("");
            }
        }catch (err) {
            console.error(err);
        }
    };

    const deleteCategory = async (e: React.FormEvent, id: Category["id"]) => {
        e.preventDefault();

        const category = categories.find(item => item.id === id);
        if (!category) {
            alert("! 削除するカテゴリーが見つかりません。再読み込みを試しても解決しない場合、開発者に連絡してください");
            return;
        }
        const result = window.confirm(`本当に${category.name}を削除しますか?`);
        if (!result) return;

        try {
            const response = await fetch(`${backendUrl}/api/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(id)
            });

            if (response.status == 400) {
                alert("商品が紐ずいているため、削除できません");
            }

            if (response.ok) {
                alert("正常に削除されました");
                // reloadCategories();
            }
        } catch (err) {
            alert("商品の削除に失敗しました");
            console.error("商品の削除に失敗: ", err);
        }
    };

    return (
        <div className="p-5 border border-gray-300">

            <AddProductForm />

            <form className="mt-5" onSubmit={(e) => addCategory(e)}>
                <label className="text-orange-500 text-2xs" htmlFor="newCategory">新しいカテゴリを追加する: </label>
                <input className="border border-gray-300 rounded" id="newCategory" type="text" minLength={1} maxLength={15} value={inputCategoryName || ""} placeholder="15文字以内" onChange={(e) => setInputCategoryName(e.target.value)} />
                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-200" type="submit">追加</button>
            </form>
            <div className="max-h-screen mt-20" style={{ maxHeight: "900px", overflowY: "auto" }}>
                <h2 className="text-2xl">商品一覧</h2>
                <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-y-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-center text-2xs font-medium text-gray-500 uppercase tracking-wider">商品名</th>
                            <th className="px-6 py-3 text-center text-2xs font-medium text-gray-500 uppercase tracking-wider">値段</th>
                            <th className="px-6 py-3 text-center text-2xs font-medium text-gray-500 uppercase tracking-wider">カテゴリー</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((item: Product) =>
                            <tr key={item.id}>
                                <td className="p-2.5 text-center">{item.name}</td>
                                <td className="p-2.5 text-center">{item.price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })}</td>
                                <td className="p-2.5 text-center">{categories.find(category => category.id == item.categoryId)?.name || "未分類"}</td>
                                <td>
                                    <AppButton id={item.id} type="button" variant="primary" onClick={() => setEditingProduct(item)}>編集</AppButton>
                                </td>
                                <td>
                                    <AppButton id={item.id} type="button" variant="danger" onClick={(e) => deleteProduct(e, item.id)}>削除</AppButton>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="max-h-80 overflow-y-auto mt-20">
                <h2 className="text-2xl">カテゴリー一覧</h2>
                <table className="w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-y-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-center text-2xs font-medium text-gray-500 uppercase tracking-wider">カテゴリー名</th>
                            <th className="px-6 py-3 text-center text-2xs font-medium text-gray-500 uppercase tracking-wider">商品の有無</th>
                            <th className="px-6 py-3 text-center text-2xs font-medium text-gray-500 uppercase tracking-wider">商品数</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((item: Category) =>
                            <tr key={item.id}>
                                <td className="p-2.5 text-center">{item.name}</td>
                                <td className="p-2.5 text-center">{item.hasProducts ? "○" : "×"}</td>
                                <td className="p-2.5 text-center">{item.products.length}</td>
                                <td>
                                    <AppButton id={String(item.id)} type="submit" variant="danger" onClick={(e) => deleteCategory(e, item.id)}>削除</AppButton>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    categories={categories}
                    onClose={() => {setEditingProduct(null)}}
                    onUpdate={() => handleUpdateCompleted()}
                />
            )}
        </div>
    )
}

export default AdminPage
