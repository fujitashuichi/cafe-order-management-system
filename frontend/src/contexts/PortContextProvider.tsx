import type { ReactNode } from "react";
import type { PortContextType } from "../types/Types";
import { PortContext } from "./PortContext";

export const PortProvider = ({ children }: { children: ReactNode }) => {
    const portSettings: PortContextType = { frontend: "5173", backend: "5107" };

    return <PortContext.Provider value={portSettings}>{children}</PortContext.Provider>
};
