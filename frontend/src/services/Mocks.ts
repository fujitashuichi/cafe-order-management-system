import type { Category, Product } from "../types/types";

const products: Product[] = [
    { id: "000000", name: "Latte Scumato", price: 260, image: null, categoryId: 4 },
    { id: "000001", name: "Cappuccino", price: 100, image: null, categoryId: 2 },
    { id: "000002", name: "Espresso", price: 130, image: null, categoryId: 3 },
    { id: "000003", name: "Espresso Latte", price: 160, image: null, categoryId: 4 }
];

const categories: Category[] = [
    {
        id: 1, name: "other", hasProducts: false,
        products: products.filter(item => item.categoryId === 1)
    },
    {
        id: 2, name: "cappuccino", hasProducts: true,
        products: products.filter(item => item.categoryId === 2)
    },
    {
        id: 3, name: "espresso", hasProducts: true,
        products: products.filter(item => item.categoryId === 3)
    },
    {
        id: 4, name: "latte", hasProducts: true,
        products: products.filter(item => item.categoryId === 4)
    }
]

export const ProductsMock = async (): Promise<Response> => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const random = Math.random();

    if (random < 0.2) {
        const error = { message: "ProductsMock: ランダムに例外処理の検査を行っています" };
        const response = new Response((JSON.stringify(error)), {
            status: 500
        });
        return response;
    }

    const response = new Response((JSON.stringify(products)), {
        status: 200
    });
    return response;
}


export const CategoriesMock = async (): Promise<Response> => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const random = Math.random();

    if (random < 0.2) {
        const error = { message: "CategoriesMock: ランダムに例外処理の検査をしています" };
        const response = new Response((JSON.stringify(error)), {
            status: 500
        });
        return response;
    }

    const response = new Response((JSON.stringify(categories)), {
        status: 200
    });
    return response;
}
