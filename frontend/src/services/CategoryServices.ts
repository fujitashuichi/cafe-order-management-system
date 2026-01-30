import type { FetchResult } from "../types/common/result.types";
import type { Category } from "../types/types";

export class CategoryServices{
    private readonly url: string;

    constructor (url: string) {
        this.url = url;
    }

    fetchCategories = async (): Promise<FetchResult<Category[], Error>> => {
        // ユーザー相手の処理は止めない
        try {
            const response = await fetch(`${this.url}`);

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
}