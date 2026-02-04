import useSuccessProducts from "../../contexts/useSuccessProducts"
import AppButton from "../common/AppButton";
import type { Product } from "../../types/types";
import useSuccessCategories from "../../contexts/useSuccessCategories";
import { useUrls } from "../../contexts/UrlContext";
import { useState } from "react";
import EditProductModal from "./EditProductModal";


export const ProductsList = () => {
    const products = useSuccessProducts();
    const categories = useSuccessCategories();

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleUpdateCompleted = () => {
        // reloadProducts();
        setEditingProduct(null);
        alert("更新が完了しました");
    };

    const { backend: backendUrl } = useUrls();

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



    return (
        <div>
            <div>
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
