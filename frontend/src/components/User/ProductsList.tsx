import { useState } from 'react';
import useSuccessProducts from '../../contexts/useSuccessProducts';
import type { Product } from '../../types/types';
import type { CartItem } from '../../types/common/types.order';
import ProductCard from './ProductCard';

function ProductsList() {
    const products = useSuccessProducts();

    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (productId: Product["id"], count: number): void => {
        setCart(prev => {
            const exists = prev.some(item => item.id === productId);

            if (exists) {
                const newCart = prev.map(item => item.id === productId ? { ...item, count: item.count + count } : item);
                return newCart;
            }

            return [
                ...prev,
                { id: productId, count: count }
            ]
        })
    }


    console.log("カート情報: " + cart);

    return (
        <div>
            <h2>商品一覧</h2>
            {
                products.map(item => {
                    return (
                        <div key={item.id}>
                            <ProductCard product={item} addToCart={addToCart} />
                        </div>
                    )
                })
            }
            {/*<AppButton variant='secondary'>"注文する"</AppButton>*/}
        </div>
    )
}

export default ProductsList
