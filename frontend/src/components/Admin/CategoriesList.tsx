import useSuccessCategories from "../../contexts/useSuccessCategories"
import type { Category } from "../../types/types";
import AppButton from "../common/AppButton";
import { useUrls } from "../../contexts/UrlContext";

export const CategoriesList = () => {
    const categories = useSuccessCategories();

    const { backend: backendUrl } = useUrls();

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
    )
}