import React from "react";
import { Reorder } from "framer-motion";

import { Edge } from "../types";
import Renderer from "./renderer";
import { useDnD } from "../context";
import { isEqual } from "lodash";

type Props = {
  className?: string;
  as?: keyof React.ReactHTML;
  styles?: React.CSSProperties;
};

export const Droppable = ({ as: AsElement = "div", ...props }: Props) => {
  const { state, dispatch } = useDnD();

  const [hovered, setHovered] = React.useState("");
  const [reorder, handleReorder] = React.useState(state.elements);

  React.useEffect(() => {
    if (!isEqual(state.elements, reorder)) {
      handleReorder(state.elements);
    }
  }, [state.elements]);

  React.useEffect(() => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: { elements: reorder },
    });
  }, [reorder]);

  const handleDrop = (event: React.DragEvent, edge: Edge) => {
    event.preventDefault();
    event.stopPropagation();
    setHovered("");

    if (state.dragging) {
      if (edge === null) {
        dispatch({
          type: "ADD_ELEMENT",
          payload: { dropped: state.dragging, target: event.currentTarget.id },
        });
        handleReorder([...reorder, state.dragging]);
      } else {
        dispatch({
          type: "INSERT_NODE",
          payload: {
            dropped: state.dragging,
            edge,
            target: event.currentTarget.id,
          },
        });
      }

      dispatch({
        type: "DRAGGING_ELEMENT",
        payload: { element: null },
      });
    }
  };
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setHovered(event.currentTarget.id);
  };
  const handleMouseOver = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setHovered(event.currentTarget.id);
  };
  const handleMouseLeave = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setHovered("");
  };

  return (
    <Reorder.Group
      id="dnd-root-canvas"
      values={reorder}
      onReorder={handleReorder}
      style={props.styles}
      className={props.className}
      onDrop={(event) => handleDrop(event, null)}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {reorder.map((element) => (
        <Renderer
          key={element.id}
          element={element}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragEnd={handleDragEnd}
          hovered={hovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseOver={handleMouseOver}
          handleMouseLeave={handleMouseLeave}
        />
      ))}
    </Reorder.Group>
  );
};
