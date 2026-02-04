import { useState } from "react";
import type { Category, Product } from "../../types/types"
import AppButton from "../common/AppButton";
import { useUrls } from "../../contexts/UrlContext";

type EditModalProps = {
    product: Product;
    categories: Category[];
    onClose: () => void;
    onUpdate: (UpdateProduct: Product) => void;
}


function EditProductModal({ product, categories, onClose, onUpdate }: EditModalProps) {
    const { backend: backendUrlCtx } = useUrls();
    const backendUrl = backendUrlCtx.dev;

    const [name, setName] = useState<Product["name"]>(product.name);
    const [price, setPrice] = useState<Product["price"]>(product.price);
    const [categoryId, setCategoryId] = useState<Product["categoryId"]>(product.categoryId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`${backendUrl}/api/products/${product.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price: Number(price), categoryId })
        });

        if (response.ok) {
            onUpdate(await response.json());
            onClose();
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-b-lg rounded-t-lg min-w-80 w-fit h-fit">
                <h2 className="text-2xl mb-5 text-red-500">商品情報を編集</h2>
                <form className="flex flex-col justify-center items-center" onSubmit={(e) => handleSubmit(e)}>
                    <p className="mb-5"><b>{product.name}</b> を編集</p>
                    <div>
                        <label htmlFor="name">名前: </label>
                        <input className="border border-gray-300 rounded" id="name" type="text" minLength={1} maxLength={15} value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="price">値段: </label>
                        <input className="border border-gray-300 rounded" id="price" type="number" min={0} max={10000000} value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    </div>
                    <div>
                        <label htmlFor="category">カテゴリー: </label>
                        <select className="border border-gray-300 rounded" id="category" name="" onChange={(e) => setCategoryId(parseInt(e.target.value))}>
                            {categories.map((item: Category) => { return (<option key={item.id} value={item.id}>{item.name}</option>) })}
                        </select>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <AppButton type="submit" variant="primary">更新</AppButton>
                        <AppButton type="button" variant="danger" onClick={onClose}>キャンセル</AppButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProductModal
