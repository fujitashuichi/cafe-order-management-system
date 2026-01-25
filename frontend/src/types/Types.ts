export type PortContextType = { frontend: string, backend: string };

export type Product = {
    id: string;
    name: string;
    price: number;
    image: string | null;
    categoryId: number;
};

export type Category = {
    id: number;
    name: string;
    hasProducts: boolean;
    products: Product[]
}
