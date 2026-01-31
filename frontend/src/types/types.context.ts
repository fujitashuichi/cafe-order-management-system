import type { Category, Product } from "./types";

export type UrlContextType = {
    frontend: {
        "dev": string
    },
    backend: {
        "dev": string
    }
};

export type ProductContextType = {
    products: Product[];
    loading: boolean;
    error: Error | null;
    reload: () => Promise<void>;
}

export type CategoriesContextType = {
    categories: Category[];
    loading: boolean;
    error: Error | null;
    reload: () => Promise<void>;
}
