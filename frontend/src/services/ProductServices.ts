import getBackendUrl from "../env/getBackendUrl";
import type { FetchResult } from "../types/common/result.types";
import type { Product } from "../types/types";


/////////////// Service は Error を値として返します
/////////////// ※JSONはunknownで渡るため、Providerで解析する前提です （2026-02-04時点）.


export class ProductServices {
    private readonly url = getBackendUrl();

    // 情報が欠落していても、Errorを下に渡す → throwはしません.
    fetchProducts = async (): Promise<FetchResult<unknown>> => {
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

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
                return {
                    ok: false,
                    error: error
                };
            }

            console.error("unknown error: " + error);
            return {
                ok: false,
                error: new Error("Unknown error")
            };
        }
    }

    postProducts = async (newProductName: Product["name"], newProductPrice: Product["price"], categoryId: Product["categoryId"]) => {
        const response = await fetch(`${this.url}/api/products/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newProductName,
                    price: newProductPrice,
                    categoryId: categoryId
                })
            });

        if (!response.ok) {
            throw new Error("商品情報を更新できません")
        }
    }

    deleteProduct = async (id: Product["id"]) => {
        const response = await fetch(`${this.url}/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

        if (!response.ok) {
            throw new Error("商品の削除に失敗しました");
        }
    }

    putProduct = async (id: Product["id"], name: Product["name"], price: Product["price"], categoryId: Product["categoryId"]) => {
        const response = await fetch(`${this.url}/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, price: Number(price), categoryId })
            });

        if (!response.ok) {
            throw new Error("商品の編集に失敗しました");
        }
    }
}
