import type { Result } from "../types/common/result.types";
import type { Product } from "../types/types";

export class ProductServices {
    private readonly url: string

    constructor(url: string) {
        this.url = url;
    }

    // 情報が欠落していても、ユーザー相手の処理は止めない → try catch を使います.
    fetchProducts = async (): Promise<Result<Product[], Error>> => {
        try {
            const response = await fetch(`${this.url}/api/products`);
            if (!response.ok) {
                const result: Result<Product[], Error> = { ok: false, error: new Error("URLの取得に失敗しました") };
                return result;
            }
            const data = await response.json();
            const result: Result<Product[], Error> = { ok: true, value: data }
            return result;
        } catch (e) {

            if (typeof e === "undefined") {
                const result: Result<Product[], Error> = { ok: false, error: new Error("URLが存在しません") };
                return result;
            }

            if (typeof e === "string") {
                const result: Result<Product[], Error> = { ok: false, error: new Error(String(e)) };
                return result;
            }

            const result: Result<Product[], Error> = { ok: false, error: new Error("Unknown error") };
            return result;
        }
    }
}
