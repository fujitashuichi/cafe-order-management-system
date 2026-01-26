import { useEffect, useState } from "react"
import type { Category, Product } from "../types/Types";
import { usePorts } from "../contexts/PortContext";
import EditProductModal from "./EditProductModal";
import AppButton from "./common/AppButton";


function AdminPage() {
    const { backend: backendPort } = usePorts();
    const [name, setName] = useState<Product["name"]>("");
    const [price, setPrice] = useState<string>("-1");
    const [categoryId, setCategoryId] = useState<Product["categoryId"]>(1);

    const [categories, setCategories] = useState<Category[]>([]);
    const [inputCategoryName, setInputCategoryName] = useState<Category["name"]>();

    const [products, setProducts] = useState<Product[]>([]);

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

    const handleUpdateCompleted = (updated: Product) => {
        setProducts(products.map(p => p.id === updated.id ? updated : p));
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
            const response = await fetch(`http://localhost:${backendPort}/api/categories/${id}`, {
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
                setCategories(prevCategories => prevCategories.filter(c => c.id !== id));
            }
        } catch (err) {
            alert("商品の削除に失敗しました");
            console.error("商品の削除に失敗: ", err);
        }
    };

    return (
        <div className="p-5 border border-gray-300">
            <h2 className="text-2xl">商品登録</h2>
            <form className="border border-red-500 rounded p-5 w-fit mr-auto ml-auto" onSubmit={addProduct}>
                <div className="text-left">
                    <label htmlFor="name">商品名: </label>
                    <input className="min-w-60 border border-gray-300 rounded" key="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="text-left">
                    <label htmlFor="price">価格: </label>
                    <input className="w-20 border border-gray-300 rounded" key="price" type="number" min={0} max={10000000} value={price == "-1" ? "" : price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="text-left">
                    <label htmlFor="category">カテゴリー: </label>
                    <select className="w-20 border border-gray-300 rounded" key="category" onChange={(e) => {e.preventDefault(); setCategoryId(Number(e.target.value))}}>
                        {categories.map(category => { return (<option key={category.id} value={category.id}>{category.name}</option>) })}
                    </select>
                </div>
                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold mt-6 py-2 px-4 rounded transition duration-200" type="submit">登録</button>
            </form>
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
                    onUpdate={(product) => handleUpdateCompleted(product)}
                    backendPort={backendPort}
                />
            )}
        </div>
    )
}

export default AdminPage
