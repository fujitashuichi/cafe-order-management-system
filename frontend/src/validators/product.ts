import type { Product } from "../types/types";

export const isProduct = (value: unknown): value is Product => {
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value &&
        "price" in value
    )
}

export const isProductArray = (value: unknown): value is Product[] => {
    if (!Array.isArray(value)) {
        return false;
    }

    return value.every(isProduct);
}