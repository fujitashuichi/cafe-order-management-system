import type { Category, Product } from "./types";

export type UrlContextType = {
    frontend: {
        "dev": string;
    };
    backend: {
        "dev": string;
    };
};

export type ProductContextType =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error", error: Error }
    | { status: "success", value: Product[] };

export type CategoriesContextType =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error", error: Error }
    | { status: "success", value: Category[] };
