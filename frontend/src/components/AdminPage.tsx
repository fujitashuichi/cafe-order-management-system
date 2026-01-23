import { useState } from "react"
import type { Product } from "../types/Types";
import { usePorts } from "../contexts/PortContext";


function AdminPage() {
    const { backend: backendPort } = usePorts();
    const [name, setName] = useState<Product["name"]>("");
    const [price, setPrice] = useState<string>("-1");

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
            categoryId: 1
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

    return (
        <div style={{ padding: "20px", border: "1px solid #ccc" }}>
            <h2>管理者用：商品登録</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>商品名: </label>
                    <input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>価格: </label>
                    <input type="number" min={0} max={10000000} value={price == "-1" ? "" : price} onChange={e => setPrice(e.target.value)} />
                </div>
                <button type="submit">登録</button>
            </form>
        </div>
    )
}

export default AdminPage
