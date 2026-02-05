import getApiUrl from "../env/getApiUrl";
import { isMocks } from "../env/isMocks";
import type { FetchResult } from "../types/common/result.types";
import type { Category } from "../types/types";
import { CategoriesMock } from "./Mocks";


/////////////// Service は Error を値として返します
/////////////// ※JSONはunknownで渡るため、Providerで解析する前提です （2026-02-04時点）.


export class CategoryServices{
    private readonly url = getApiUrl();

    fetchCategories = async (): Promise<FetchResult<unknown>> => {
        try {
            let response: Response;
            if (isMocks) {
                response = await CategoriesMock();
            } else {
                response = await fetch(`${this.url}/api/categories`);
            }

            if (!response.ok) {
                return {
                    ok: false,
                    error: new Error("カテゴリー情報を取得できません")
                }
            }

            return {
                ok: true,
                value: await response.json()
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                return {
                    ok: false,
                    error: new Error("商品情報が存在しません")
                };
            }

            return {
                ok: false,
                error: new Error("unknown error")
            };
        }
    }

    postCategory = async (newCategoryName: Category["name"]) => {
        const response = await fetch(`${this.url}/api/categories/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: newCategoryName })
            });

        if (!response.ok) {
            throw new Error("カテゴリー情報を更新できません")
        }
    }

    deleteCategory = async (id: Category["id"]) => {
        const response = await fetch(`${this.url}/api/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

        if (!response.ok) {
            throw new Error("商品カテゴリーの削除に失敗しました")
        }
    }
}