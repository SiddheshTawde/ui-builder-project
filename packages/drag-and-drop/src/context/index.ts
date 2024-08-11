import React from "react";
import { DnDActions, DnDState } from "../types";

interface DnDContextProps {
  state: DnDState;
  dispatch: React.Dispatch<DnDActions>;
}

export const DnDContext = React.createContext<DnDContextProps | null>(null);

export const useDnD = (): DnDContextProps => {
  const context = React.useContext(DnDContext);
  if (!context) {
    throw new Error("useDnD must be used within a DnDProvider");
  }
  return context;
};
