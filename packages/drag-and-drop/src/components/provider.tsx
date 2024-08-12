import React from "react";
import { DnDState } from "../types";
import { DnDContext } from "../context";
import { useImmerReducer } from "use-immer";
import { reducer } from "../redux/reducer";
import { isEqual } from "lodash";

type Props = {
  children?: React.ReactNode;
  state: DnDState;
  setState: React.Dispatch<React.SetStateAction<DnDState>>;
};

export const Provider = (props: Props) => {
  const [state, dispatch] = useImmerReducer(reducer, props.state);

  React.useEffect(() => {
    if (!isEqual(props.state, state)) {
      props.setState(state);
    }
  }, [state]);

  React.useEffect(() => {
    if (!isEqual(props.state.elements, state.elements)) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: { elements: props.state.elements },
      });
    }
  }, [props.state.elements]);

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
