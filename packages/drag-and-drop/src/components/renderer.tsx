import React from "react";
import { isEqual } from "lodash";
import { Reorder } from "framer-motion";

import { useDnD } from "../context";
import { DnDElementType } from "../types";
import { cn, updateChildrenById } from "../utils";
import EdgeDropIndicator from "./edge-drop-indicator";

type Props = {
  hovered: string;
  element: DnDElementType;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent) => void;
  handleMouseEnter: (e: React.MouseEvent) => void;
  handleMouseOver: (e: React.MouseEvent) => void;
  handleMouseLeave: (e: React.MouseEvent) => void;
};

const Renderer = (props: Props) => {
  const { state, dispatch } = useDnD();
  const [reorder, handleReorder] = React.useState(props.element.children);

  React.useEffect(() => {
    if (!isEqual(props.element.children, reorder)) {
      handleReorder(props.element.children);
    }
  }, [props.element.children]);

  React.useEffect(() => {
    const updated = updateChildrenById(
      state.elements,
      props.element.id || "",
      reorder,
    );

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: { elements: updated },
    });
  }, [reorder]);

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_ELEMENT",
      payload: { id: props.element.id || "" },
    });
  };
  const selectElement = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({
      type: "SELECT_ELEMENT",
      payload: { id: props.element.id || "" },
    });
  };

  return (
    <>
      <Reorder.Item
        id={props.element.id}
        as={props.element.tag}
        value={props.element}
        onDrop={props.handleDrop}
        onDragOver={props.handleDragOver}
        onMouseEnter={props.handleMouseEnter}
        onMouseOver={props.handleMouseOver}
        onMouseLeave={props.handleMouseLeave}
        onClick={selectElement}
        style={props.element.attributes?.style}
        className={cn(
          "dnd-relative dnd-gap-2 dnd-rounded dnd-border-2 dnd-border-dashed dnd-pt-8 dnd-text-center",
          { "dnd-border-transparent/20": props.hovered === props.element.id },
          { "dnd-border-indigo-500": state.selected === props.element.id },
        )}
      >
        <div className="dnd-absolute dnd-left-0 dnd-top-0 dnd-flex dnd-w-full dnd-items-center dnd-justify-between dnd-px-2">
          <span className="dnd-text-sm dnd-text-neutral-400">
            {props.element.title}
          </span>

          {props.hovered !== props.element.id ? null : (
            <button
              className="dnd-h-fit dnd-w-fit dnd-text-xs dnd-text-red-500"
              onClick={handleRemove}
            >
              Remove
            </button>
          )}
        </div>

        {reorder.length === 0 ? null : (
          <Reorder.Group
            axis={props.element.title === "Row" ? "x" : "y"}
            values={reorder}
            onReorder={handleReorder}
            style={props.element.attributes?.style}
          >
            <EdgeDropIndicator
              index={-1}
              reorder={reorder}
              handleReorder={handleReorder}
              title={props.element.title}
            />
            {reorder.map((child, index) => (
              <React.Fragment key={child.id}>
                <Renderer
                  element={child}
                  handleDrop={props.handleDrop}
                  handleDragOver={props.handleDragOver}
                  handleDragEnd={props.handleDragEnd}
                  handleMouseEnter={props.handleMouseEnter}
                  handleMouseOver={props.handleMouseOver}
                  handleMouseLeave={props.handleMouseLeave}
                  hovered={props.hovered}
                />

                <EdgeDropIndicator
                  index={index}
                  reorder={reorder}
                  handleReorder={handleReorder}
                  title={props.element.title}
                />
              </React.Fragment>
            ))}
          </Reorder.Group>
        )}
      </Reorder.Item>
    </>
  );
};

export default Renderer;
