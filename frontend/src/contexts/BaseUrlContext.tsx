import { createContext, useContext } from "react";
import type { BaseUrlType } from "../types/types.context";


export const BaseUrlContext = createContext<BaseUrlType | null>(null);

export const useBaseUrl = (): BaseUrlType => {
    const ctx = useContext(BaseUrlContext);

    if (ctx === null) {
        throw new Error("Providerが設定されていません");
    };

    return ctx;
}
