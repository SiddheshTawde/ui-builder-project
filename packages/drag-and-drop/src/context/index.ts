import React from "react";
import { DnDState } from "../types";

interface DnDContextProps {
  state: DnDState;
  setState: React.Dispatch<DnDState>;
}

export const DnDContext = React.createContext<DnDContextProps | null>(null);

export const useDnD = (): DnDContextProps => {
  const context = React.useContext(DnDContext);
  if (!context) {
    throw new Error("useDnD must be used within a DnDProvider");
  }
  return context;
};
