import type { Category } from "../types/types";

export const isCategory = (value: unknown): value is Category => {
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value &&
        "hasProducts" in value &&
        "products" in value
    )
}

export const isCategoryArray = (value: unknown): value is Category[] => {
    if (!Array.isArray(value)) {
        return false;
    }

    return value.every(isCategory);
}