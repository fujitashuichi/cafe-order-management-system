import React, { useState } from 'react'
import type { Category, Product } from '../types/types';
import { useUrls } from '../contexts/urlContext';
import { useCategories } from '../contexts/CategoriesContext';

function AddProductForm() {
    const { backend: backendUrlCtx } = useUrls();
    const backendUrl = backendUrlCtx.dev;

    const CategoryData = useCategories();
    let categories: Category[] = [];
    if (CategoryData.status === "success") {
        categories = CategoryData.value;
    }

    const [name, setName] = useState<Product["name"]>("");
    const [price, setPrice] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<Product["categoryId"]>(1);


    const addProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            alert("商品名は必須です");
            return;
        }
        if (price == "-1") {
            alert("値段が設定されていません");
            return;
        } else if (price == "0") {
            const result = window.confirm("本当に無料の商品を登録しますか？");
            if (!result) return;
        }

        const newProduct = {
            name: name,
            price: Number(price),
            categoryId: categoryId
        }

        const response = await fetch(`${backendUrl}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            alert("商品を登録しました");
            setName("");
            setPrice(null);
        }
    };

    return (
        <div>
            <h2 className="text-2xl">商品登録</h2>
            <form className="border border-red-500 rounded p-5 w-fit mr-auto ml-auto" onSubmit={addProduct}>
                <div className="text-left">
                    <label htmlFor="name">商品名: </label>
                    <input className="min-w-60 border border-gray-300 rounded" key="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="text-left">
                    <label htmlFor="price">価格: </label>
                    <input className="w-20 border border-gray-300 rounded" key="price" type="number" min={0} max={10000000} value={price == null ? "" : price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="text-left">
                    <label htmlFor="category">カテゴリー: </label>
                    <select className="w-20 border border-gray-300 rounded" key="category" onChange={(e) => {e.preventDefault(); setCategoryId(Number(e.target.value))}}>
                        {categories.map(category => { return (<option key={category.id} value={category.id}>{category.name}</option>) })}
                    </select>
                </div>
                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold mt-6 py-2 px-4 rounded transition duration-200" type="submit">登録</button>
            </form>
        </div>
    )
}

export default AddProductForm
