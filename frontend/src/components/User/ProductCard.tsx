import { useState } from "react";
import type { Product } from "../../types/types"
import AppButton from "../common/AppButton"

type props = {
    product: Product,
    addToCart: (item: Product["id"], count: number) => void
}


function ProductCard(props: props) {
    const product = props.product;
    const addToCart = props.addToCart;

    const [count, setCount] = useState<string>("1");

    return (
        <div>
            <h3>{product.name}</h3>
            <img src={product.image || ""} alt="no image" />
            <p>
                {product.price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY'}) }
            </p>
            <AppButton variant="secondary" onClick={() => addToCart(product.id, Number(count))}>カートに入れる</AppButton>
            <input type="number" min={1} max={99} step={1} value={count} onChange={(e) => setCount(e.target.value)} />
        </div>
    )
}

export default ProductCard
