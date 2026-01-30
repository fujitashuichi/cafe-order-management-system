import type { Category, Product } from "./types";

export type PortContextType = { frontend: string, backend: string };

export type BaseUrlType = { frontend: string, backend: string };

export type ProductContextType = {
    products: Product[] | null;
    loading: boolean;
    error: Error | null;
    reload: () => Promise<void>;
}

export type CategoriesContextType = {
    categories: Category[] | null;
    loading: boolean;
    error: Error | null;
    reload: () => Promise<void>;
}
