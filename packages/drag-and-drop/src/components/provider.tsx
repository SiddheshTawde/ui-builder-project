import React from "react";
import { DnDState } from "../types";
import { DnDContext } from "../context";
import { useImmerReducer } from "use-immer";
import { reducer } from "../redux/reducer";

type Props = {
  children?: React.ReactNode;
  state: DnDState;
  setState: React.Dispatch<React.SetStateAction<DnDState>>;
};

export const Provider = (props: Props) => {
  const [state, dispatch] = useImmerReducer(reducer, props.state);

  React.useEffect(() => {
    props.setState(state);
  }, [state]);

  React.useEffect(() => {
    window.addEventListener("keyup", handleDeselect);

    return () => window.removeEventListener("keyup", handleDeselect);
  }, []);

  const handleDeselect = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      dispatch({
        type: "SELECT_ELEMENT",
        payload: { id: "" },
      });
    }
  };

  return (
    <DnDContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DnDContext.Provider>
  );
};
