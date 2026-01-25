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

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCategories = async (): Promise<void> => {
            const response = await fetch(`http://localhost:${backendPort}/api/categories`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setCategories(await response.json());
        };
        const fetchProducts = async (): Promise<void> => {
            const response = await fetch(`http://localhost:${backendPort}/api/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setProducts(await response.json());
        }

        const fetchData = async () => {
            await fetchCategories();
            await fetchProducts();
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
            setProducts([...products, await response.json()]);
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
            const response = await fetch(`http://localhost:${backendPort}/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(id)
            });

            if (response.ok) {
                alert("正常に削除されました");
                setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
                // prev: previous (以前の) の意味で、更新前の値などに使う
            }
        } catch (err) {
            alert("商品の削除に失敗しました");
            console.error("商品の削除に失敗: ", err);
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
            <form action="" style={{ marginBottom: "50px" }}>
                <label htmlFor="newCategory">新しいカテゴリを追加する</label>
                <input id="newCategory" type="text" minLength={1} maxLength={15} value={inputCategoryName || ""} placeholder="15文字以内" onChange={(e) => setInputCategoryName(e.target.value)} />
                <button type="submit" onClick={(e) => addCategory(e)}>追加</button>
            </form>
            <div style={{ maxHeight: "900px", overflowY: "auto" }}>
                <table>
                    <thead>
                        <tr>
                            <th>商品名</th>
                            <th>値段</th>
                            <th>カテゴリー</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item =>
                            <tr key={item.id}>
                                <td style={{ padding: "10px" }}>{item.name}</td>
                                <td style={{ padding: "10px" }}>{item.price}</td>
                                <td style={{ padding: "10px" }}>{categories.find(category => category.id == item.categoryId)?.name || "未分類"}</td>
                                <td>
                                    <button id={item.id} type="submit" style={{ color: "#ff0000", marginLeft: "20px" }} onClick={(e) => deleteProduct(e, item.id)}>削除</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminPage
