import React from "react";
import { isEqual } from "lodash";
import { Reorder } from "framer-motion";

import { useDnD } from "../context";
import { Renderer } from "./renderer";
import { addElementToId } from "../utils";
import { DnDElementType, DnDState } from "../types";
import { EdgeDropIndicator } from "./edge-drop-indicator";

type Props = {
  className?: string;
  as?: keyof React.ReactHTML;
  styles?: React.CSSProperties;
};

const ROOT_ID = "dnd-root-canvas";

export const Droppable = ({ as: AsElement = "div", ...props }: Props) => {
  const { state, setState } = useDnD();

  const [hovered, setHovered] = React.useState("");
  const [reorder, handleReorder] = React.useState<DnDElementType[]>([]);

  React.useEffect(() => {
    window.addEventListener("keyup", handleDeselect);

    return () => window.removeEventListener("keyup", handleDeselect);
  }, [state.selected]);

  const handleDeselect = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setState({ ...state, selected: null });
    }
  };

  React.useEffect(() => {
    if (!isEqual(reorder, state.elements)) {
      handleReorder(state.elements);
    }
  }, [state.elements]);

  React.useEffect(() => {
    if (!isEqual(reorder, state.elements)) {
      setState({ ...state, elements: reorder });
    }
  }, [reorder]);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setHovered("");

    if (state.dragging) {
      const target = event.currentTarget.id;

      setState({
        ...state,
        elements: addElementToId(state.elements, state.dragging, target, -2),
        dragging: null,
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
      id={ROOT_ID}
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
        index={-1}
        title="body"
        target={ROOT_ID}
        reorder={reorder}
        handleReorder={handleReorder}
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
            title="body"
            index={index}
            target={ROOT_ID}
            reorder={reorder}
            handleReorder={handleReorder}
          />
        </React.Fragment>
      ))}
    </Reorder.Group>
  );
};
