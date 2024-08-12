import React from "react";
import { isEqual } from "lodash";
import { Reorder } from "framer-motion";

import { DnDElementType, Edge } from "../types";
import Renderer from "./renderer";
import { useDnD } from "../context";
import EdgeDropIndicator from "./edge-drop-indicator";

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

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setHovered("");

    if (state.dragging) {
      dispatch({
        type: "ADD_ELEMENT",
        payload: { dropped: state.dragging, target: event.currentTarget.id },
      });
      handleReorder([...reorder, state.dragging]);

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
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <EdgeDropIndicator
        parent="dnd-root-canvas"
        index={-1}
        reorder={reorder}
        handleReorder={handleReorder}
        title="body"
      />
      {reorder.map((element, index) => (
        <React.Fragment key={element.id}>
          <Renderer
            element={element}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
            hovered={hovered}
            handleMouseEnter={handleMouseEnter}
            handleMouseOver={handleMouseOver}
            handleMouseLeave={handleMouseLeave}
          />
          <EdgeDropIndicator
            parent="dnd-root-canvas"
            index={index}
            reorder={reorder}
            handleReorder={handleReorder}
            title="body"
          />
        </React.Fragment>
      ))}
    </Reorder.Group>
  );
};
