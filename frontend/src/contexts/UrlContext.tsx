import { createContext, useContext } from "react";
import type { UrlContextType } from "../types/types.context";


export const UrlContext = createContext<UrlContextType | null>(null);

export const useUrls = (): UrlContextType => {
    const ctx = useContext(UrlContext);
    if (ctx === null) {
        throw new Error("Providerが設定されていません");
    }
    return ctx;
}