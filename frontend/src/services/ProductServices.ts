import type { FetchResult } from "../types/common/result.types";


/////////////// Service は Error を値として返します


export class ProductServices {
    private readonly url: string

    constructor(url: string) {
        this.url = url;
    }

    // 情報が欠落していても、ユーザー相手の処理は止めない → try catch を使います.
    fetchProducts = async (): Promise<FetchResult<unknown, Error>> => {
        try {
            const response = await fetch(`${this.url}/api/products`);
            if (!response.ok) {
                return {
                    ok: false,
                    error: new Error("商品情報の取得に失敗しました")
                };
            }

            return {
                ok: true,
                value: await response.json()
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log(e);
                return {
                    ok: false,
                    error: new Error("商品情報が存在しません")
                };
            }

            console.log(e);
            return {
                ok: false,
                error: new Error("Unknown error")
            };
        }
    }
}
