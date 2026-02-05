import type { Product } from "../types"

export type CartItem = {
    id: Product["id"],
    count: number
}