import { useState } from "react";
import { useUrls } from "../../contexts/UrlContext";
import type { Category } from "../../types/types";
import useSuccessCategories from "../../contexts/useSuccessCategories";
import CategoryBoundary from "../boundary/CategoryBoundary";

function AddCategoryForm() {
    const categories = useSuccessCategories();

    const { backend: backendUrl } = useUrls();
    const [inputCategoryName, setInputCategoryName] = useState<Category["name"]>();

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

    return (
        <CategoryBoundary>
            <form className="mt-5" onSubmit={(e) => addCategory(e)}>
                <label className="text-orange-500 text-2xs" htmlFor="newCategory">新しいカテゴリを追加する: </label>
                <input className="border border-gray-300 rounded" id="newCategory" type="text" minLength={1} maxLength={15} value={inputCategoryName || ""} placeholder="15文字以内" onChange={(e) => setInputCategoryName(e.target.value)} />
                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-200" type="submit">追加</button>
            </form>
        </CategoryBoundary>
    )
}

export default AddCategoryForm
