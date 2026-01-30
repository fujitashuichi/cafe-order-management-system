import { createContext, useContext } from "react";
import type { PortContextType } from "../types/types.context";


export const PortContext = createContext<PortContextType | null>(null);

export const usePorts = (): PortContextType => {
    const ctx = useContext(PortContext);
    if (ctx === null) {
        throw new Error("Providerが設定されていません");
    }
    return ctx;
}