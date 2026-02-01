import type { Category, Product } from "./types";

export type UrlContextType = {
    frontend: {
        "dev": string;
    };
    backend: {
        "dev": string;
    };
};

export type ProductContextType = {
    status: "loading" | "success" | "error";
    body: Product[] | Error;
}

export type CategoriesContextType = {
    status: "loading" | "success" | "error";
    body: Category[] | Error;
}
