import { useEffect, useState } from "react"
import type { Category, Product } from "../types/Types";
import { usePorts } from "../contexts/PortContext";


function AdminPage() {
    const { backend: backendPort } = usePorts();
    const [name, setName] = useState<Product["name"]>("");
    const [price, setPrice] = useState<string>("-1");
    const [categoryId, setCategoryId] = useState<Product["categoryId"]>(1);

    const [categories, setCategories] = useState<Category[]>([]);
    const [inputCategoryName, setInputCategoryName] = useState<Category["name"]>();

    // DBからカテゴリーをすべて取得し、setCategoriesまで実行してくれる関数
    const fetchCategories = async (): Promise<void> => {
        const response = await fetch(`http://localhost:${backendPort}/api/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        setCategories(await response.json());
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchCategories();
        };
        fetchData();
    }, [backendPort]);


    const handleSubmit = async (e: React.FormEvent) => {
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

        const response = await fetch(`http://localhost:${backendPort}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            alert("商品を登録しました");
            setName("");
            setPrice("-1");
        }
    };


    // カテゴリーを追加するだけで、登録手順には影響を与えない
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
            const response = await fetch(`http://localhost:${backendPort}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: inputCategoryName })
            });

            if (response.ok) {
                setCategories([...categories, await response.json()]);
                alert("新しいカテゴリーを追加しました");
                setInputCategoryName("");
            }
        }catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: "20px", border: "1px solid #ccc" }}>
            <h2>管理者用：商品登録</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">商品名: </label>
                    <input key="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="price">価格: </label>
                    <input key="price" type="number" min={0} max={10000000} value={price == "-1" ? "" : price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="category">カテゴリー: </label>
                    <select key="category" onChange={(e) => {e.preventDefault(); setCategoryId(Number(e.target.value))}}>
                        {categories.map(category => { return (<option key={category.id} value={category.id}>{category.name}</option>) })}
                    </select>
                </div>
                <button type="submit">登録</button>
            </form>
            <form action="">
                <label htmlFor="newCategory">新しいカテゴリを追加する</label>
                <input id="newCategory" type="text" minLength={1} maxLength={15} value={inputCategoryName || ""} placeholder="15文字以内" onChange={(e) => setInputCategoryName(e.target.value)} />
                <button type="submit" onClick={(e) => addCategory(e)}>追加</button>
            </form>
        </div>
    )
}

export default AdminPage
