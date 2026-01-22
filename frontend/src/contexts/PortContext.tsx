import { createContext, useContext } from "react";
import type { PortContextType } from "../types/Types";

export const PortContext = createContext<PortContextType>({ frontend: "", backend: "" });

export const usePorts = () => useContext(PortContext);
