import { useState } from "react";
import type { Category, Product } from "../types/Types"

type EditModalProps = {
    product: Product;
    categories: Category[];
    onClose: () => void;
    onUpdate: (UpdateProduct: Product) => void;
    backendPort: string;
}


function EditProductModal({ product, categories, onClose, onUpdate, backendPort }: EditModalProps) {
    const [name, setName] = useState<Product["name"]>(product.name);
    const [price, setPrice] = useState<Product["price"]>(product.price);
    const [categoryId, setCategoryId] = useState<Product["categoryId"]>(product.categoryId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:${backendPort}/api/products/${product.id}`, {
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
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
                <h3>商品情報を編集</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <strong>{product.name}を編集</strong>
                    <div>
                        <label htmlFor="name">名前: </label>
                        <input id="name" type="text" minLength={1} maxLength={15} value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="price">値段: </label>
                        <input id="price" type="number" min={0} max={10000000} value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    </div>
                    <div>
                        <label htmlFor="category">カテゴリー: </label>
                        <select id="category" name="" onChange={(e) => setCategoryId(parseInt(e.target.value))}>
                            {categories.map((item: Category) => { return (<option key={item.id} value={item.id}>{item.name}</option>) })}
                        </select>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <button type="submit">更新</button>
                        <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>キャンセル</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProductModal
