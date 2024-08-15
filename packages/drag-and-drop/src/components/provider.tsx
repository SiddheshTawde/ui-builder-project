import React from "react";
import { DnDState } from "../types";
import { DnDContext } from "../context";
type Props = {
  children?: React.ReactNode;
  state: DnDState;
  setState: React.Dispatch<React.SetStateAction<DnDState>>;
};

export const Provider = ({ children, state, setState }: Props) => {
  return (
    <DnDContext.Provider value={{ state, setState }}>
      {children}
    </DnDContext.Provider>
  );
};
